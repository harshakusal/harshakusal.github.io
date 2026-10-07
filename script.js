/* Harsha Vardhan Ramisetty · portfolio interactions (vanilla JS, no build) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Hero video with graceful fallback ---------- */
  var hero = $(".hero");
  var video = $(".hero__video");
  var fallback = $(".hero__fallback");
  var heroPhoto = $(".hero__photo");
  if (video) {
    var showVideo = function () { hero.classList.add("has-video"); };
    var noVideo = function () { hero.classList.remove("has-video"); video.remove(); };
    if (video.readyState >= 2) showVideo();
    video.addEventListener("loadeddata", showVideo);
    video.addEventListener("error", noVideo);
    var src = video.querySelector("source");
    if (src) src.addEventListener("error", noVideo);
    if (reduce) { video.removeAttribute("autoplay"); try { video.pause(); } catch (e) {} }
  }
  function imgFallback(img, holder) {
    if (!img || !holder) return;
    var fail = function () { holder.classList.add("no-photo"); };
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  }
  imgFallback(heroPhoto, fallback);
  imgFallback($(".idcard__photo img"), $(".idcard__photo"));

  /* ---------- Nav: mobile toggle + active section ---------- */
  var nav = $(".nav"), toggle = $(".nav__toggle");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$(".nav__list a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); });
  });
  var links = {};
  $$(".nav__list a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  var map = { about: "home" }; // About has no nav item; keep Home lit
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = map[en.target.id] || en.target.id;
        $$(".nav__list a").forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        if (links[id]) { links[id].classList.add("is-active"); links[id].setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = $$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); ro.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- Flipping ID card ---------- */
  var card = $(".idcard");
  if (card) {
    var flip = function () {
      var f = card.classList.toggle("is-flipped");
      card.setAttribute("aria-pressed", f);
    };
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return; // let contact links work
      flip();
    });
    card.addEventListener("keydown", function (e) {
      if (e.target !== card) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
  }

  /* ---------- Periodic table of skills ---------- */
  var CAT = { lang: "Languages", back: "Backend", front: "Frontend", db: "Databases", cloud: "Cloud / DevOps", ai: "AI & Integrations" };
  var SKILLS = [
    ["Js", "JavaScript", "lang", null, "ES6+ across Node.js backends and React frontends in every role since 2022."],
    ["Ts", "TypeScript", "lang", 3, "Typed NestJS services and React components for Mockwin.ai."],
    ["Sq", "SQL", "lang", null, "Schema design and query optimization on PostgreSQL and MySQL."],
    ["Nd", "Node.js", "back", 4, "Backend applications at YPoint Analytics, Tekreant and Coding Limits."],
    ["Ns", "NestJS", "back", 3, "Scalable backend services and reusable modules for Mockwin.ai and Servm.ai."],
    ["Ex", "Express.js", "back", 3, "Backend REST APIs for Labsquire and projects at YPoint Analytics."],
    ["Ra", "REST APIs", "back", null, "Secure APIs for auth, recruiter management, candidate onboarding, scheduling and reports."],
    ["Ms", "Microservices", "back", null, "Microservices-based application development at Tekreant."],
    ["Jw", "JWT", "back", null, "JWT authentication with role-based authorization on Mockwin.ai."],
    ["Sw", "Swagger", "back", null, "OpenAPI documentation for the Mockwin.ai REST APIs."],
    ["Pm", "Postman", "back", null, "API testing for backend services at YPoint Analytics."],
    ["Re", "React.js", "front", 1, "Responsive, reusable frontend components for Mockwin.ai."],
    ["Nx", "Next.js", "front", 2, "React framework for production web apps."],
    ["Ht", "HTML5", "front", null, "Semantic markup for responsive web interfaces."],
    ["Cs", "CSS3", "front", null, "Responsive web design and UI styling."],
    ["Pg", "PostgreSQL", "db", 3, "Optimized schemas for Mockwin.ai; used extensively at Tekreant."],
    ["My", "MySQL", "db", null, "Schemas and query optimization for Servm.ai, Labsquire, Wheels Global and Mockwin.ai."],
    ["Mg", "MongoDB", "db", 2, "Optimized MongoDB database performance at YPoint Analytics."],
    ["Rd", "Redis", "db", 3, "Caching to improve backend performance on Mockwin.ai."],
    ["La", "AWS Lambda", "cloud", 2, "Serverless functions on AWS."],
    ["Ec", "AWS EC2", "cloud", 2, "Compute instances on AWS."],
    ["S3", "AWS S3", "cloud", 2, "Secure, encrypted document, image and media storage for Mockwin.ai."],
    ["Dk", "Docker", "cloud", null, "Basic working knowledge."],
    ["Gt", "Git", "cloud", null, "Version control at Tekreant and Coding Limits; code reviews on Mockwin.ai."],
    ["Gh", "GitHub", "cloud", null, "Repositories and collaboration at github.com/harshakusal."],
    ["Ci", "CI/CD", "cloud", null, "Deployment pipelines at Tekreant."],
    ["Lg", "LangGraph", "ai", null, "AI workflow orchestration for Mockwin.ai interviews."],
    ["Lc", "LangChain", "ai", null, "LLM application building blocks alongside LangGraph."],
    ["Dg", "Deepgram", "ai", null, "Speech-to-text for AI interview transcription on Mockwin.ai."],
    ["Wa", "WhatsApp API", "ai", null, "WhatsApp Business API reminders, candidate notifications and recruiter updates."],
    ["Rz", "Razorpay", "ai", null, "Orders, payment verification, webhooks and refunds on Mockwin.ai."]
  ];
  var FULL = { "WhatsApp API": "WhatsApp Business API", "Docker": "Docker (basic)", "Swagger": "Swagger (OpenAPI)", "Deepgram": "Deepgram Speech-to-Text", "Razorpay": "Razorpay Payment Gateway", "JavaScript": "JavaScript (ES6+)" };
  var table = $("#ptable"), panel = $("#elementPanel");
  var ep = { tile: $("#epTile"), cat: $("#epCat"), name: $("#epName"), years: $("#epYears"), use: $("#epUse") };
  var COLORS = { lang: "var(--c-lang)", back: "var(--c-back)", front: "var(--c-front)", db: "var(--c-db)", cloud: "var(--c-cloud)", ai: "var(--c-ai)" };
  var light = { db: 1, cloud: 1, ai: 1 };
  var isMobile = function () { return window.matchMedia("(max-width: 860px)").matches; };

  SKILLS.forEach(function (s, i) {
    var b = document.createElement("button");
    b.className = "el el--" + s[2];
    b.type = "button";
    b.setAttribute("role", "listitem");
    b.dataset.i = i;
    b.dataset.cat = s[2];
    b.setAttribute("aria-label", (FULL[s[1]] || s[1]) + ", " + CAT[s[2]]);
    b.innerHTML = '<span class="n">' + String(i + 1).padStart(2, "0") + '</span><span class="s">' + s[0] + '</span><span class="nm">' + (s[1] === "Microservices" ? "Micro&shy;services" : s[1]) + "</span>";
    table.appendChild(b);
  });
  var tiles = $$(".el", table);

  function show(i, open) {
    var s = SKILLS[i];
    tiles.forEach(function (t) { t.classList.toggle("is-active", +t.dataset.i === i); });
    ep.tile.style.background = COLORS[s[2]];
    ep.tile.style.color = light[s[2]] ? "var(--ink)" : "#fff";
    ep.tile.innerHTML = '<span class="n">' + String(i + 1).padStart(2, "0") + '</span><span class="s">' + s[0] + "</span>";
    ep.cat.textContent = CAT[s[2]];
    ep.name.textContent = FULL[s[1]] || s[1];
    ep.years.textContent = s[3] ? s[3] + (s[3] === 1 ? " year" : " years") + " of experience" : "";
    ep.use.textContent = s[4];
    if (open && isMobile()) panel.classList.add("is-open");
  }
  tiles.forEach(function (t) {
    var i = +t.dataset.i;
    t.addEventListener("mouseenter", function () { if (!isMobile()) show(i, false); });
    t.addEventListener("focus", function () { show(i, false); });
    t.addEventListener("click", function () { show(i, true); });
  });
  $(".element-panel__close").addEventListener("click", function () { panel.classList.remove("is-open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { panel.classList.remove("is-open"); nav.classList.remove("is-open"); } });
  document.addEventListener("click", function (e) {
    if (panel.classList.contains("is-open") && !e.target.closest("#elementPanel") && !e.target.closest(".el")) panel.classList.remove("is-open");
  });
  show(3, false); // Node.js by default

  $$(".chip").forEach(function (c) {
    c.addEventListener("click", function () {
      var f = c.dataset.filter;
      $$(".chip").forEach(function (x) { x.classList.toggle("is-on", x === c); x.setAttribute("aria-pressed", x === c); });
      tiles.forEach(function (t) { t.classList.toggle("is-dim", f !== "all" && t.dataset.cat !== f); });
      if (f !== "all") { var first = tiles.filter(function (t) { return t.dataset.cat === f; })[0]; if (first) show(+first.dataset.i, false); }
    });
  });

  /* ---------- Work carousel ---------- */
  var car = $("#carousel");
  var arrows = $$(".arrow");
  function step() { var c = car.querySelector(".pcard"); return c ? c.getBoundingClientRect().width + 22 : 400; }
  function updateArrows() {
    var max = car.scrollWidth - car.clientWidth - 4;
    arrows[0].disabled = car.scrollLeft <= 4;
    arrows[1].disabled = car.scrollLeft >= max;
  }
  arrows.forEach(function (a) {
    a.addEventListener("click", function () { car.scrollBy({ left: step() * +a.dataset.dir, behavior: reduce ? "auto" : "smooth" }); });
  });
  car.addEventListener("scroll", function () { window.requestAnimationFrame(updateArrows); }, { passive: true });
  car.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); car.scrollBy({ left: step(), behavior: "smooth" }); }
    if (e.key === "ArrowLeft") { e.preventDefault(); car.scrollBy({ left: -step(), behavior: "smooth" }); }
  });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  /* ---------- Achievements marquee: clone for a seamless loop ---------- */
  var track = $(".marquee__track");
  if (track && !reduce) {
    $$(".mcard", track).forEach(function (m) {
      var c = m.cloneNode(true);
      c.setAttribute("aria-hidden", "true");
      track.appendChild(c);
    });
  }
})();
