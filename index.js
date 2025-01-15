document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".nav-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });

      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
