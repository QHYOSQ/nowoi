(() => {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();



// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Under construction switch =====
// 网站正式上线时，取消下面一行的注释即可
// document.getElementById("underConstructionOverlay").style.display = "none";
