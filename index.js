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

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".nav-tab");
  const images = document.querySelectorAll("img");

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

  // Image expand functionality
  const overlay = document.createElement("div");
  overlay.classList.add("image-overlay");
  document.body.appendChild(overlay);

  images.forEach((image) => {
    image.addEventListener("click", () => {
      const expandedImage = document.createElement("img");
      expandedImage.src = image.src;
      expandedImage.setAttribute("data-scale", "1");
      expandedImage.style.cursor = "grab";
      overlay.innerHTML = "";
      overlay.appendChild(expandedImage);
      overlay.classList.add("show");
    });
  });

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.classList.remove("show");
    }
  });

  // Zoom functionality
  overlay.addEventListener("wheel", (event) => {
    const zoomableImage = overlay.querySelector("img");
    if (!zoomableImage) return;

    // Prevent default scrolling behavior
    event.preventDefault();

    // Get the current scale (defaults to 1 if not set)
    let scale = parseFloat(zoomableImage.getAttribute("data-scale")) || 1;

    // Adjust the scale based on the scroll direction
    const zoomStep = 0.1;
    if (event.deltaY < 0) {
      scale += zoomStep; // Zoom in
    } else if (event.deltaY > 0) {
      scale = Math.max(1, scale - zoomStep); // Zoom out, with minimum scale of 1
    }

    // Apply the scale to the image
    zoomableImage.style.transform = `scale(${scale})`;
    zoomableImage.setAttribute("data-scale", scale);
  });

  // Pan functionality
  let isDragging = false;
  let startX, startY;

  overlay.addEventListener("mousedown", (event) => {
    const zoomableImage = overlay.querySelector("img");
    if (!zoomableImage) return;

    isDragging = true;
    startX = event.clientX - (zoomableImage.offsetLeft || 0);
    startY = event.clientY - (zoomableImage.offsetTop || 0);
    zoomableImage.style.cursor = "grabbing";
    event.preventDefault();
  });

  overlay.addEventListener("mousemove", (event) => {
    const zoomableImage = overlay.querySelector("img");
    if (isDragging && zoomableImage) {
      const offsetX = event.clientX - startX;
      const offsetY = event.clientY - startY;
      zoomableImage.style.transformOrigin = "0 0";
      zoomableImage.style.left = `${offsetX}px`;
      zoomableImage.style.top = `${offsetY}px`;
      zoomableImage.style.position = "absolute";
    }
  });

  overlay.addEventListener("mouseup", () => {
    const zoomableImage = overlay.querySelector("img");
    if (isDragging && zoomableImage) {
      isDragging = false;
      zoomableImage.style.cursor = "grab";
    }
  });

  overlay.addEventListener("mouseleave", () => {
    const zoomableImage = overlay.querySelector("img");
    if (isDragging && zoomableImage) {
      isDragging = false;
      zoomableImage.style.cursor = "grab";
    }
  });
});
