(() => {
  const terminal = document.getElementById('terminal');
  const label    = document.getElementById('terminal-label');

  const presets = [
    {
      lines: [
        '> Changing hardware serials...',
        '> Applying spoof...',
        '> Done.'
      ],
      label: 'Changing Hardware Serials...'
    },
    {
      lines: [
        '> Loading kernel driver...',
        '> Loading modules...',
        '> Done.'
      ],
      label: 'Loading cheat kernel driver...'
    }
  ];

  let currentPresetIndex = 0;

  const typePreset = () => {
    const preset = presets[currentPresetIndex];
    label.textContent = preset.label;

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';

    const typeNextChar = () => {
      if (lineIndex >= preset.lines.length) {
        // Done with this preset → next one after 1.5s
        currentPresetIndex = (currentPresetIndex + 1) % presets.length;
        setTimeout(() => {
          terminal.textContent = ''; // clear
          typePreset();
        }, 1500);
        return;
      }

      if (charIndex === 0) {
        currentLine = preset.lines[lineIndex];
        if (lineIndex > 0) terminal.textContent += '\n';
      }

      terminal.textContent += currentLine[charIndex];
      charIndex++;

      if (charIndex >= currentLine.length) {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 400); // pause between lines
      } else {
        setTimeout(typeNextChar, 60);  // char speed
      }
    };

    typeNextChar();
  };

  // Start after page paint
  setTimeout(typePreset, 600);
})();

  document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.modern-navbar');
    setTimeout(() => navbar.classList.add('fade-in'), 100);

    function handleScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);
  });





        document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('image-comparison');
            const divider = document.getElementById('divider');
            const beforeWrapper = document.getElementById('before-wrapper');
            const beforeImage = document.getElementById('before-image');
            const comparisonSection = document.getElementById('comparison-section');
            

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target); 
                    }
                });
            }, {
                threshold: 0.2 
            });
            

            observer.observe(comparisonSection);
            

            function adjustBeforeImageWidth() {
                const containerWidth = container.offsetWidth;
                beforeImage.style.width = containerWidth * 2 + 'px'; 
            }
            

            adjustBeforeImageWidth();
            
           
            window.addEventListener('resize', adjustBeforeImageWidth);
      
            let position = 50;
            updatePosition(position);
            
     
            container.addEventListener('mousedown', startDrag);
            container.addEventListener('touchstart', startDrag);
            
            function startDrag(e) {
                if (e.type === 'mousedown') {
                    e.preventDefault();
                }
                
                document.addEventListener('mousemove', drag);
                document.addEventListener('touchmove', drag);
                document.addEventListener('mouseup', endDrag);
                document.addEventListener('touchend', endDrag);
            }
            
            function drag(e) {
                const containerRect = container.getBoundingClientRect();
                const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
                const x = clientX - containerRect.left;
                position = (x / containerRect.width) * 100;
                position = Math.max(0, Math.min(100, position));
                updatePosition(position);
            }
            
            function endDrag() {
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', drag);
                document.removeEventListener('mouseup', endDrag);
                document.removeEventListener('touchend', endDrag);
            }
            
            function updatePosition(position) {
                divider.style.left = `${position}%`;
                beforeWrapper.style.width = `${position}%`;
            }
        });

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.game-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 24; // width + margin
  const visibleCards = 4;
  const totalSlides = cards.length - visibleCards;

  // Auto-slide every 4 seconds
  let autoSlide = setInterval(() => {
    moveToNext();
  }, 4000);

  function moveToNext() {
    currentIndex = (currentIndex + 1) % (totalSlides + 1);
    updateCarousel();
  }

  function moveToPrev() {
    currentIndex = currentIndex === 0 ? totalSlides : currentIndex - 1;
    updateCarousel();
  }

  function updateCarousel() {
    const offset = -currentIndex * cardWidth;
    track.style.transform = `translateX(${offset}px)`;

    // Reset auto-slide on manual click
    clearInterval(autoSlide);
    autoSlide = setInterval(moveToNext, 4000);
  }

  nextBtn.addEventListener('click', () => {
    moveToNext();
  });

  prevBtn.addEventListener('click', () => {
    moveToPrev();
  });

  // Pause on hover
  const carousel = document.getElementById('gamesCarousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
  carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(moveToNext, 4000);
  });

  // Touch support (mobile swipe)
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) moveToNext();
      else moveToPrev();
    }
  });
});