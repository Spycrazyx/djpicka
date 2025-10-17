// Initialize AOS animations
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 900,
        once: true,
      });
    }

@keyframes pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}
  
    // Optional: Hide nav when scrolling down
    let lastScroll = 0;
    const nav = document.getElementById("site-nav");
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 80) {
        nav.classList.add("nav-hidden");
      } else {
        nav.classList.remove("nav-hidden");
      }
      lastScroll = currentScroll;
    });
  });
  