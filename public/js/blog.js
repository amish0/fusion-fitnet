fetch("data/blog.json")
  .then(res => res.json())
  .then(posts => {
    const grid = document.getElementById("blogGrid");
    posts.forEach(p => {
      grid.innerHTML += `
        <div class="blog-card">
          <h3>${p.title}</h3>
          <small>${p.date}</small>
          <p>${p.excerpt}</p>
        </div>
      `;
    });
  });
