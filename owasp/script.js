document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const currentSlideText = document.getElementById('current-slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Update slide counter
    function updateSlideCounter() {
        currentSlideText.textContent = `${currentSlide + 1}/${totalSlides}`;
    }
    
    // Show current slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Update buttons state
        prevButton.disabled = index === 0;
        nextButton.disabled = index === totalSlides - 1;
        
        // Update counter
        updateSlideCounter();
    }
    
    // Previous slide
    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
    
    // Next slide
    nextButton.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                showSlide(currentSlide);
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentSlide > 0) {
                currentSlide--;
                showSlide(currentSlide);
            }
        }
    });
    
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabSet = tab.parentElement;
            const tabContents = tabSet.parentElement.querySelectorAll('.tab-content');
            const tabId = tab.getAttribute('data-tab');
            
            // Deactivate all tabs in this set
            tabSet.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            
            // Activate clicked tab
            tab.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show selected tab content
            const targetContent = document.getElementById(`${tabId}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Initialize
    showSlide(currentSlide);
});
