// main.js — global behavior: nav toggle, search, contact form, progressive enhancements
(function(){
  // NAV TOGGLE
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(btn => {
    const navId = btn.getAttribute('aria-controls') || 'primaryNav';
    const nav = document.getElementById(navId);
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(nav) nav.setAttribute('aria-hidden', String(expanded));
    });
  });

  // HOME: render featured posts
  const featuredEl = document.getElementById('featuredPosts');
  if(featuredEl && window.BLOG){
    // Choose the first two posts as featured
    const featured = BLOG.POSTS.slice(0,2);
    featured.forEach(p => {
      const card = document.createElement('div');
      card.className = 'post-card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p class="post-meta">${p.date} • ${p.category}</p>
        <p>${p.excerpt}</p>
        <div style="margin-top:auto"><a class="btn ghost" href="post.html?id=${p.id}">Read</a></div>
      `;
      featuredEl.appendChild(card);
    });
  }

  // BLOG: initialize list, search, category
  const postsContainer = document.getElementById('posts');
  const search = document.getElementById('search');
  const category = document.getElementById('category');

  if(postsContainer && window.BLOG){
    BLOG.renderPosts(postsContainer, {});
    if(search){
      search.addEventListener('input', e => {
        BLOG.renderPosts(postsContainer, { query: e.target.value, category: category ? category.value : 'all' });
      });
    }
    if(category){
      BLOG.populateCategories(category);
      category.addEventListener('change', e => {
        BLOG.renderPosts(postsContainer, { query: search ? search.value : '', category: e.target.value });
      });
    }
  }

  // POST: render single post from query param
  const postArticle = document.getElementById('postArticle');
  if(postArticle && window.BLOG){
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    BLOG.renderSinglePost(postArticle, id);
  }

  // CONTACT: form handling with friendly feedback
  const form = document.getElementById('contactForm');
  if(form){
    const feedback = document.getElementById('contactFeedback');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if(!form.checkValidity()){
        feedback.textContent = 'Please complete the form correctly.';
        return;
      }
      const data = new FormData(form);
      // Simulated network request — replace with real endpoint later
      feedback.textContent = 'Sending...';
      await new Promise(r => setTimeout(r, 800));
      feedback.textContent = 'Message sent — thank you!';
      form.reset();
    });
  }

  // Small intersection observer for reveal animations
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.post-card, .card, .hero-content').forEach(el => io.observe(el));
})();
