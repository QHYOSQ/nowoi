// Common JavaScript functions for all pages

// Create toast message
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Search functionality
function setupSearch() {
  const searchInput = document.querySelector('.search-wrap input') || document.getElementById('tool-search');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }
}

function performSearch() {
  const searchInput = document.querySelector('.search-wrap input') || document.getElementById('tool-search');
  if (searchInput) {
    const query = searchInput.value.toLowerCase().trim();
    const toolLinks = document.querySelectorAll('.card, .tool-card, [data-tool-card]');
    
    // 首先显示所有工具和分类标题
    toolLinks.forEach(link => {
      link.style.display = '';
    });
    
    // 获取所有分类标题
    const categoryTitles = document.querySelectorAll('.section h3');
    categoryTitles.forEach(title => {
      title.style.display = '';
    });
    
    // 获取所有工具列表区域
    const toolSections = document.querySelectorAll('.section');
    toolSections.forEach(section => {
      section.style.display = '';
    });
    
    if (query !== '') {
      // 检查每个工具是否匹配
      toolLinks.forEach(link => {
        // 搜索工具标题
        const title = link.querySelector('h3, h4')?.textContent.toLowerCase() || '';
        // 搜索工具描述
        const description = link.querySelector('p')?.textContent.toLowerCase() || '';
        // 搜索工具功能标签
        const dataToolCard = link.getAttribute('data-tool-card')?.toLowerCase() || '';
        // 搜索工具完整文本
        const fullText = link.textContent.toLowerCase();
        
        // 检查是否匹配任一搜索条件
        const isMatch = title.includes(query) || description.includes(query) || dataToolCard.includes(query) || fullText.includes(query);
        link.style.display = isMatch ? '' : 'none';
      });
      
      // 检查每个分类是否有匹配的工具
      categoryTitles.forEach(title => {
        const categorySection = title.nextElementSibling;
        if (categorySection && categorySection.classList.contains('grid')) {
          const toolCards = categorySection.querySelectorAll('.card, .tool-card, [data-tool-card]');
          let hasVisibleTools = false;
          
          toolCards.forEach(card => {
            if (card.style.display !== 'none') {
              hasVisibleTools = true;
            }
          });
          
          // 如果没有可见的工具，隐藏分类标题
          if (!hasVisibleTools) {
            title.style.display = 'none';
          }
        }
      });
      
      // 检查每个工具列表区域是否有可见的分类
      toolSections.forEach(section => {
        const categoryTitlesInSection = section.querySelectorAll('h3');
        let hasVisibleCategories = false;
        
        categoryTitlesInSection.forEach(title => {
          if (title.style.display !== 'none') {
            hasVisibleCategories = true;
          }
        });
        
        // 如果没有可见的分类，隐藏整个工具列表区域
        if (!hasVisibleCategories) {
          section.style.display = 'none';
        }
      });
    }
  }
}

// Copy to clipboard functionality
function setupCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      let output = this.previousElementSibling;
      if (!output || output.tagName !== 'TEXTAREA') {
        output = this.closest('.tool-box').querySelector('textarea');
      }
      if (output) {
        output.select();
        document.execCommand('copy');
        showToast('Copied to clipboard!');
      }
    });
  });
}

// Set current year in footer
function setCurrentYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupSearch();
  setupCopyButtons();
  setCurrentYear();
});

// ToolKit utility for copy functionality
window.ToolKit = {
  copyFrom: function(id) {
    const node = document.getElementById(id);
    if (!node) return;
    node.select();
    document.execCommand('copy');
    showToast('Copied to clipboard!');
  }
};