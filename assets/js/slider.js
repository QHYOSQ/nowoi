(() => {
  const slider = document.getElementById("slider");
  const buttons = document.querySelectorAll(".nav-btn");
  if (!slider) return;
  let currentPage = 0;
  const pages = ["resources", "tools"];

  // 如果 URL hash 指定了页面（#resources 或 #tools），初始化跳转到对应页
  const initialHash = location.hash.replace('#', '');
  if (pages.includes(initialHash)) {
    currentPage = pages.indexOf(initialHash);
  }

  function updateSlider() {
    // 每个 slide 占 slider 宽度的一半（50%），因此按 50% 的步长移动
    slider.style.transform = `translateX(-${currentPage * 50}%)`;
    buttons.forEach((btn, index) => {
      btn.classList.toggle("active", index === currentPage);
    });
  }

  // page: 'resources'|'tools' ; pushHash 控制是否更新 location.hash（hashchange 会触发）
  function go(page, pushHash = true) {
    const index = pages.indexOf(page);
    if (index !== -1) {
      currentPage = index;
      updateSlider();
      if (pushHash) location.hash = page;
    }
  }

  // Button navigation — 同时更新 hash
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      go(btn.dataset.target);
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      currentPage = Math.max(0, currentPage - 1);
      updateSlider();
      location.hash = pages[currentPage];
    } else if (e.key === "ArrowRight") {
      currentPage = Math.min(pages.length - 1, currentPage + 1);
      updateSlider();
      location.hash = pages[currentPage];
    }
  });

  // Touch/Swipe support
  let startX = 0;
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentPage < pages.length - 1) {
        currentPage++;
      } else if (diff < 0 && currentPage > 0) {
        currentPage--;
      }
      updateSlider();
      location.hash = pages[currentPage];
    }
  });

  // 当 hash 改变（例如从外部链接打开 explore.html#tools）时响应
  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '');
    if (pages.includes(h)) go(h, false);
  });

  // Initialize
  updateSlider();
})();