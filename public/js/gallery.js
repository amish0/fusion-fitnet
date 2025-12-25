fetch("data/gallery.json")
  .then(res => res.json())
  .then(images => {
    const grid = document.getElementById("galleryGrid");
    images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.onclick = () => openLightbox(src);
      grid.appendChild(img);
    });
  });

function openLightbox(src) {
  document.getElementById("lightbox").style.display = "flex";
  document.getElementById("lightboxImg").src = src;
}

document.getElementById("closeLightbox").onclick = () =>
  document.getElementById("lightbox").style.display = "none";
