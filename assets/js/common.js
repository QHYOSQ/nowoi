// Common JavaScript functions for all pages - Optimized Version
(function() {
  'use strict';

  // Utility: Debounce function for performance
  function debounce(fn, wait) {
    let t;
    return function(...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  // Toast notification
  window.showToast = function(msg, type = 'info', duration = 3000) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    
    // Set styles based on type
    const commonStyles = {
      position: 'fixed',
      top: '80px',
      right: '20px',
      borderRadius: '8px',
      padding: '12px 20px',
      fontSize: '0.9rem',
      zIndex: '1000',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      animation: 'slideIn 0.3s ease',
      minWidth: '200px',
      textAlign: 'center'
    };
    
    const typeStyles = {
      success: {
        background: '#4CAF50',
        color: '#ffffff',
        border: '1px solid #45a049'
      },
      error: {
        background: '#f44336',
        color: '#ffffff',
        border: '1px solid #d32f2f'
      },
      info: {
        background: '#4CAF50',
        color: '#ffffff',
        border: '1px solid #45a049'
      }
    };
    
    const style = typeStyles[type] || typeStyles.info;
    Object.assign(toast.style, commonStyles, style);
    
    // Add animation if not already present
    if (!document.querySelector('style#toast-animation')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'toast-animation';
      styleEl.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `;
      document.head.appendChild(styleEl);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  };

  // Search functionality with debouncing
  function setupSearch() {
    const searchInput = document.getElementById('tool-search') || document.querySelector('.search-wrap input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput) return;

    const performSearch = debounce(() => {
      const query = searchInput.value.toLowerCase().trim();
      const toolLinks = document.querySelectorAll('.card[data-tool-card]');
      
      // Reset visibility
      toolLinks.forEach(link => link.style.display = '');
      document.querySelectorAll('.section h3').forEach(h => h.style.display = '');
      document.querySelectorAll('.section').forEach(s => s.style.display = '');
      
      if (!query) {
        if (searchResults) searchResults.style.display = 'none';
        return;
      }

      // Filter tools
      const matches = [];
      toolLinks.forEach(link => {
        const title = (link.querySelector('h3, h4')?.textContent || '').toLowerCase();
        const desc = (link.querySelector('p')?.textContent || '').toLowerCase();
        const tags = (link.getAttribute('data-tool-card') || '').toLowerCase();
        const isMatch = title.includes(query) || desc.includes(query) || tags.includes(query);
        
        link.style.display = isMatch ? '' : 'none';
        if (isMatch && searchResults) {
          matches.push({
            title: link.querySelector('h3, h4')?.textContent || '',
            desc: link.querySelector('p')?.textContent || '',
            href: link.href
          });
        }
      });

      // Update dropdown results
      if (searchResults) {
        if (matches.length && query.length >= 2) {
          searchResults.innerHTML = '<ul>' + 
            matches.slice(0, 5).map(m => 
              `<li><a href="${m.href}"><strong>${m.title}</strong><span>${m.desc}</span></a></li>`
            ).join('') + '</ul>';
          searchResults.style.display = 'block';
        } else {
          searchResults.style.display = 'none';
        }
      }

      // Hide empty categories
      document.querySelectorAll('.section h3').forEach(title => {
        const grid = title.nextElementSibling;
        if (grid?.classList.contains('grid')) {
          const visible = [...grid.querySelectorAll('.card')].some(c => c.style.display !== 'none');
          title.style.display = visible ? '' : 'none';
        }
      });
    }, 150);

    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });

    // Close search on outside click
    document.addEventListener('click', e => {
      if (searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  // Dark mode
  function setupDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;
    
    // Check saved preference or system preference
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved === 'enabled' || (!saved && prefersDark)) {
      html.classList.add('dark-mode');
      if (toggle) toggle.textContent = 'Light Mode';
    }

    if (toggle) {
      toggle.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        const isDark = html.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        toggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      });
    }
  }

  // Smooth scroll for anchor links
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Copy buttons
  function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const output = btn.closest('.tool-box')?.querySelector('textarea');
        if (output) {
          output.select();
          document.execCommand('copy');
          showToast('Copied to clipboard!');
        }
      });
    });
  }

  // Set current year
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupSearch();
    setupDarkMode();
    setupSmoothScroll();
    setupCopyButtons();
    setYear();
  }

  // ToolKit utilities
  window.ToolKit = {
    copyFrom: function(id) {
      const el = document.getElementById(id);
      if (el) {
        el.select();
        document.execCommand('copy');
        showToast('Copied to clipboard!');
      }
    }
  };
})();
