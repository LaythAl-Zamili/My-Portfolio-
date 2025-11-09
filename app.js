// Theme toggle
(function () {
  var isLight = localStorage.getItem("theme") === "light";
  if (isLight) document.documentElement.classList.add("light");
  var modeBtn = document.getElementById("mode");
  if (modeBtn) {
    modeBtn.addEventListener("click", function () {
      document.documentElement.classList.toggle("light");
      localStorage.setItem(
        "theme",
        document.documentElement.classList.contains("light") ? "light" : "dark"
      );
    });
  }
})();

// Mobile menu toggle (accessible)
(function () {
  var menuBtn = document.getElementById("menu");
  var links = document.getElementById("navLinks");
  if (!menuBtn || !links) return;
  function setOpen(open) {
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () {
    setOpen(!links.classList.contains("open"));
  });
  links.addEventListener("click", function (e) {
    if (e.target.matches("a")) setOpen(false);
  });
})();

// Tabs behavior
(function () {
  var tabs = document.querySelectorAll(".tab");
  if (!tabs.length) return;
  var panels = {
    student: document.getElementById("tab-student"),
    engineer: document.getElementById("tab-engineer"),
    trader: document.getElementById("tab-trader"),
  };
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (o) {
        o.classList.remove("active");
        o.setAttribute("aria-selected", "false");
      });
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      Object.keys(panels).forEach(function (k) {
        panels[k].hidden = k !== t.dataset.tab;
      });
    });
  });
})();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var id = a.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Thesis demo scorer (toy heuristic)
(function () {
  var dialog = document.getElementById("demo");
  var openBtn = document.getElementById("open-demo");
  if (openBtn && dialog) {
    openBtn.addEventListener("click", function () {
      dialog.showModal();
    });
  }
  var input = document.getElementById("urlInput");
  var out = document.getElementById("urlResult");

  var weights = {
    suspiciousTLD: 0.28,
    hasIP: 0.22,
    longPath: 0.14,
    manyDigits: 0.12,
    atSign: 0.12,
    hyphenHost: 0.12,
  };

  function score(u) {
    try {
      var url = new URL(u);
      var host = url.hostname;
      var path = url.pathname + url.search;
      var tld = host.split(".").pop();
      var riskyTLD =
        /zip|mov|xyz|top|club|click|link|country|gq|tk|work|asia|kim|men|party|trade|download|account|support/i.test(
          tld
        );
      var hasIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
      var manyDigits = (u.match(/\d/g) || []).length >= 6;
      var longPath = path.length > 40;
      var atSign = u.includes("@");
      var hyphenHost = host.includes("-");
      var p = 0;
      p += riskyTLD ? weights.suspiciousTLD : 0;
      p += hasIP ? weights.hasIP : 0;
      p += longPath ? weights.longPath : 0;
      p += manyDigits ? weights.manyDigits : 0;
      p += atSign ? weights.atSign : 0;
      p += hyphenHost ? weights.hyphenHost : 0;
      if (p > 0.95) p = 0.95;
      if (p < 0.02) p = 0.02;
      return p;
    } catch (_) {
      return null;
    }
  }

  var scoreBtn = document.getElementById("scoreUrl");
  if (scoreBtn) {
    scoreBtn.addEventListener("click", function () {
      if (!input || !out) return;
      var v = input.value.trim();
      var s = score(v);
      if (s == null) {
        out.textContent = "Please enter a valid URL (include https://).";
        return;
      }
      var label =
        s > 0.55
          ? "⚠️ Likely risky"
          : s > 0.35
          ? "◔ Uncertain"
          : "✓ Looks normal";
      out.textContent = label + " — score " + (s * 100).toFixed(1) + "%";
    });
  }
})();

// Year + placeholder link
(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
  var li = document.getElementById("linkedin");
  if (li) li.href = "https://www.linkedin.com/in/";
})();
