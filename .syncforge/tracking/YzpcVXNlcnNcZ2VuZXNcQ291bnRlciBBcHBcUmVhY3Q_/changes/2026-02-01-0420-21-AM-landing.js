// Simple animation for the landing page
window.onload = function() {
  const container = document.querySelector('.container');
  if (container) {
    container.style.opacity = 0;
    container.style.transform = 'translateY(40px)';
    setTimeout(() => {
      container.style.transition = 'all 0.7s cubic-bezier(.4,0,.2,1)';
      container.style.opacity = 1;
      container.style.transform = 'translateY(0)';
    }, 100);
  }
};