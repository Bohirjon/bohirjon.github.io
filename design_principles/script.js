// Presentation Controller
class PresentationController {
    constructor() {
                // ⚙️ CONFIGURATION: Change this to start from any slide (1-based index)
        this.startSlide = 1; // Change this number to start from a different slide
        
        this.currentSlide = 0;
        this.totalSlides = 30; // Updated for DRY slides
        this.slides = [];
        this.currentSlideElement = document.getElementById('current-slide');
        this.totalSlidesElement = document.getElementById('total-slides');
        this.slidesContainer = document.getElementById('slides-container');
        
        // Define slide files
        this.slideFiles = [
            'pages/slide-1-introduction.html',
            'pages/slide-2-solid-overview.html',
            'pages/SRP/slide-3-srp-theory.html',
            'pages/SRP/slide-4-srp-bad-example.html',
            'pages/SRP/slide-4-srp-example.html',
            'pages/SRP/slide-6-srp-orchestrator.html',
            'pages/OCP/slide-7-ocp-theory.html',
            'pages/OCP/slide-8-ocp-bad-example.html',
            'pages/OCP/slide-9-ocp-good-example.html',
            'pages/OCP/slide-10-ocp-factory.html',
            'pages/LSP/slide-11-lsp-theory.html',
            'pages/LSP/slide-12-lsp-bad-example.html',
            'pages/LSP/slide-13-lsp-good-example.html',
            'pages/LSP/slide-14-lsp-benefits.html',
            'pages/ISP/slide-15-isp-theory.html',
            'pages/ISP/slide-16-isp-bad-example.html',
            'pages/ISP/slide-17-isp-good-example.html',
            'pages/ISP/slide-18-isp-benefits.html',
            'pages/DIP/slide-19-dip-theory.html',
            'pages/DIP/slide-20-dip-bad-example.html',
            'pages/DIP/slide-21-dip-good-example.html',
            'pages/YAGNI/slide-22-yagni-theory.html',
            'pages/YAGNI/slide-23-yagni-bad-example.html',
            'pages/YAGNI/slide-24-yagni-good-example.html',
            'pages/KISS/slide-25-kiss-theory.html',
            'pages/KISS/slide-26-kiss-bad-example.html',
            'pages/KISS/slide-27-kiss-good-example.html',
            'pages/DRY/slide-28-dry-theory.html',
            'pages/DRY/slide-29-dry-bad-example.html',
            'pages/DRY/slide-30-dry-good-example.html'
        ];
        
        // Don't call init here - it will be called from DOMContentLoaded
    }

    async init() {
        // Load all slides
        await this.loadSlides();
        
        // Set initial state
        this.updateSlideCounter();
        this.addEventListeners();
        this.animateInitialElements();
        
        // Set total slides count
        this.totalSlidesElement.textContent = this.totalSlides;
        
        // Show start slide (convert 1-based to 0-based index)
        const startIndex = Math.max(0, Math.min(this.startSlide - 1, this.totalSlides - 1));
        this.currentSlide = startIndex;
        this.showSlide(startIndex);
        
        console.log(`🎬 Presentation started from slide ${this.startSlide} (${this.slideFiles[startIndex]})`);
    }

    async loadSlides() {
        try {
            for (let i = 0; i < this.slideFiles.length; i++) {
                const response = await fetch(this.slideFiles[i]);
                const html = await response.text();
                
                // Create a temporary div to parse the HTML
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Get the section element
                const slideSection = tempDiv.querySelector('section');
                if (slideSection) {
                    // Update the data-slide attribute
                    slideSection.setAttribute('data-slide', i.toString());
                    
                    // Add active class to first slide
                    if (i === 0) {
                        slideSection.classList.add('active');
                    } else {
                        slideSection.classList.remove('active');
                    }
                    
                    // Append to slides container
                    this.slidesContainer.appendChild(slideSection);
                    this.slides.push(slideSection);
                }
            }
            
            console.log(`✅ Loaded ${this.slides.length} slides successfully`);
        } catch (error) {
            console.error('❌ Error loading slides:', error);
        }
    }

    addEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.showSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.showSlide(this.totalSlides - 1);
                    break;
            }
        });

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;

            // Only handle horizontal swipes (ignore vertical scrolling)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }

            touchStartX = 0;
            touchStartY = 0;
        });

        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe animatable elements
        document.querySelectorAll('.principle-card, .code-bad, .code-good, .solid-letter').forEach(el => {
            observer.observe(el);
        });
    }

    showSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= this.totalSlides) return;

        // Remove active class from all slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index < slideIndex) {
                slide.classList.add('prev');
            }
        });

        // Add active class to current slide
        this.slides[slideIndex].classList.add('active');
        
        // Update current slide index
        this.currentSlide = slideIndex;
        
        // Update UI
        this.updateSlideCounter();
        
        // Animate slide content
        this.animateSlideContent(slideIndex);
    }

    nextSlide() {
        if (this.currentSlide < this.totalSlides - 1) {
            this.showSlide(this.currentSlide + 1);
        }
    }

    previousSlide() {
        if (this.currentSlide > 0) {
            this.showSlide(this.currentSlide - 1);
        }
    }

    updateSlideCounter() {
        this.currentSlideElement.textContent = this.currentSlide + 1;
        
        // Update navigation controls
        const prevBtn = document.querySelector('.nav-control:first-child');
        const nextBtn = document.querySelector('.nav-control:last-child');
        
        prevBtn.disabled = this.currentSlide === 0;
        nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }

    animateSlideContent(slideIndex) {
        const currentSlide = this.slides[slideIndex];
        const animatedElements = currentSlide.querySelectorAll('.animated-list li, .principle-card, .solid-letter, .code-bad, .code-good');
        
        // Reset animations
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
        });

        // Animate elements with staggered delay
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = `slideInUp 0.6s ease forwards`;
            }, index * 100);
        });
    }

    animateInitialElements() {
        // Animate initial slide elements
        const initialElements = document.querySelectorAll('.slide.active .animated-list li');
        initialElements.forEach((el, index) => {
            el.style.setProperty('--index', index);
        });
    }
}

// Additional interactive features
class InteractiveFeatures {
    constructor() {
        this.addCodeHighlighting();
        this.addHoverEffects();
        this.addProgressIndicator();
    }

    addCodeHighlighting() {
        // Temporarily disabled syntax highlighting to fix display issues
        // const codeBlocks = document.querySelectorAll('pre code');
        // codeBlocks.forEach(block => {
        //     this.highlightSyntax(block);
        // });
    }

    highlightSyntax(codeBlock) {
        let code = codeBlock.innerHTML;
        
        // Simple syntax highlighting for C#
        const patterns = [
            { pattern: /\b(public|private|class|static|void|decimal|int|string|Console)\b/g, class: 'keyword' },
            { pattern: /\b(\d+\.?\d*m?)\b/g, class: 'number' },
            { pattern: /"[^"]*"/g, class: 'string' },
            { pattern: /\/\/.*$/gm, class: 'comment' },
            { pattern: /\b([A-Z][a-zA-Z0-9]*)\b/g, class: 'type' }
        ];

        patterns.forEach(({ pattern, class: className }) => {
            code = code.replace(pattern, `<span class="${className}">$&</span>`);
        });

        codeBlock.innerHTML = code;
    }

    addHoverEffects() {
        // Add interactive hover effects to principle cards
        const cards = document.querySelectorAll('.principle-card, .solid-letter');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    addProgressIndicator() {
        // Create a progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = '<div class="progress-fill"></div>';
        
        // Add progress bar styles
        const style = document.createElement('style');
        style.textContent = `
            .progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                z-index: 1000;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #3498db, #e74c3c);
                transition: width 0.3s ease;
                width: 0%;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(progressBar);

        // Update progress based on current slide
        const updateProgress = () => {
            const progress = ((presentation.currentSlide + 1) / presentation.totalSlides) * 100;
            progressBar.querySelector('.progress-fill').style.width = `${progress}%`;
        };

        // Initial update and set up listener
        updateProgress();
        document.addEventListener('keydown', () => setTimeout(updateProgress, 100));
    }
}

// Utility functions for slideshow navigation
function nextSlide() {
    presentation.nextSlide();
}

function previousSlide() {
    presentation.previousSlide();
}

// Add CSS for syntax highlighting
const syntaxStyles = document.createElement('style');
syntaxStyles.textContent = `
    .keyword { color: #569cd6; font-weight: bold; }
    .number { color: #b5cea8; }
    .string { color: #ce9178; }
    .comment { color: #6a9955; font-style: italic; }
    .type { color: #4ec9b0; }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(syntaxStyles);

// Initialize presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    window.presentation = new PresentationController();
    await window.presentation.init();
    window.features = new InteractiveFeatures();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Prevent context menu on right click for cleaner presentation
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.slide')) {
            e.preventDefault();
        }
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🎯 Design Patterns & Principles Presentation Loaded!');
    console.log('📝 Navigation: Arrow keys, Space, Home/End');
    console.log('📱 Mobile: Swipe left/right');
    console.log('🖱️  Click navigation buttons or use footer controls');
});