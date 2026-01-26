// Blog functionality
let blogPosts = [];

function loadBlog() {
  fetch('/api/blog')
    .then(response => response.json())
    .then(data => {
      blogPosts = data;
      renderBlog();
    })
    .catch(err => console.error('Error loading blog:', err));
}

function renderBlog() {
  const blogList = document.querySelector('.blog-list');
  if (!blogList) return;

  blogList.innerHTML = blogPosts.slice(0, 3).map(post => `
    <article class="blog-card">
      <h3>${post.title}</h3>
      <p class="date">${post.date}</p>
      <p>${post.excerpt}</p>
      <a href="/blog/${post.id}" class="read-more">Read More →</a>
    </article>
  `).join('');
}

// Initialize blog
document.addEventListener('DOMContentLoaded', () => {
  console.log('Blog.js loaded');
});
