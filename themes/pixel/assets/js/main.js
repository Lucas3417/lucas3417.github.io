// 主题切换：默认跟随 html[data-theme]（主题设置），可手动切换，localStorage 记忆
(function () {
  const KEY = "pixel-theme";
  const btn = document.getElementById("themeBtn");
  if (!btn) return;

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
  }

  // 初始化：优先 localStorage，其次 html 属性（来自主题设置），再跟随系统
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === "light" || saved === "dark") {
    apply(saved);
  } else {
    const init = document.documentElement.getAttribute("data-theme");
    if (init === "light" || init === "dark") {
      apply(init);
    } else {
      const dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      apply(dark ? "dark" : "light");
    }
  }

  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    apply(cur === "dark" ? "light" : "dark");
  });
})();
