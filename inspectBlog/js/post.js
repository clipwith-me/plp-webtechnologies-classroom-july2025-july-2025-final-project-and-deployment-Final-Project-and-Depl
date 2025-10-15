  // posts.js — central data store for posts, easy to migrate to a CMS later
  const POSTS = [
    {
      id: 'growth-mindset',
      title: 'Building a Growth Mindset',
      excerpt: 'Simple habits that shift your thinking and accelerate progress.',
      body: `<p>Growth mindset means seeing challenges as opportunities...</p>`,
      date: '2025-08-10',
      category: 'Personal Development'
    },
    {
      id: 'stay-inspired',
      title: 'How to Stay Inspired Every Day',
      excerpt: 'Practical routines to keep your creativity flowing.',
      body: `<p>Inspiration is a practice. Start small...</p>`,
      date: '2025-07-24',
      category: 'Creativity'
    },
    {
      id: 'productivity-tips',
      title: '5 Practical Productivity Tips',
      excerpt: 'Small systems that compound into big wins over time.',
      body: `<p>Focus is the new currency. Try these rituals...</p>`,
      date: '2025-06-12',
      category: 'Productivity'
    }
  ];
  
  // Helper to render posts into a container
  function renderPosts(container, filter = {}){
  container.innerHTML = '';
  const filtered = POSTS.filter(post => {
    if(filter.category && filter.category !== 'all') return post.category === filter.category;
    if(filter.query) return post.title.toLowerCase().includes(filter.query.toLowerCase()) || post.excerpt.toLowerCase().includes(filter.query.toLowerCase());
    return true;
  });

  if(filtered.length === 0){
    container.innerHTML = '<p class="text-muted center">No posts match your search.</p>';
    return;
  }

  filtered.forEach(post => {
    const el = document.createElement('article');
    el.className = 'post-card';
    el.innerHTML = `
      <h3>${post.title}</h3>
      <p class="post-meta">${post.date} • ${post.category}</p>
      <p>${post.excerpt}</p>
      <div style="margin-top:auto"><a class="btn ghost" href="post.html?id=${post.id}">Read more</a></div>
    `;
    container.appendChild(el);
  });
}

// Populate categories select
function populateCategories(select){
  const cats = Array.from(new Set(POSTS.map(p => p.category)));
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    select.appendChild(opt);
  });
}

// Render single post by id (used in post.html)
function renderSinglePost(container, id){
  const post = POSTS.find(p => p.id === id);
  if(!post){
    container.innerHTML = '<p class="text-muted">Post not found.</p>';
    return;
  }
  container.innerHTML = `
    <h1>${post.title}</h1>
    <p class="post-meta">${post.date} • ${post.category}</p>
    <div class="post-body">${post.body}</div>
  `;
}

// Expose helpers globally
window.BLOG = { POSTS, renderPosts, populateCategories, renderSinglePost };