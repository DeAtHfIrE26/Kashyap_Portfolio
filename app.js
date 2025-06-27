// Portfolio Application - Simplified and Robust Version
class PortfolioApp {
    constructor() {
        this.projects = [
            {
                name: "Virtual Interview Coach",
                description: "AI-powered interview coaching system with real-time lip-sync analysis and voice feedback to help users improve their interview skills.",
                repo: "https://github.com/DeAtHfIrE26/Next-Generation-Virtual-Interview-Training-System",
                tags: ["AI", "CV", "Python", "TensorFlow"],
                category: "ai",
                details: {
                    goal: "Create an intelligent interview training system that provides real-time feedback on speech patterns, facial expressions, and overall performance.",
                    techStack: ["Python", "TensorFlow", "OpenCV", "Speech Recognition", "Computer Vision"],
                    challenges: "Implementing real-time lip-sync detection and providing accurate feedback on speech clarity and pace.",
                    metrics: "Improved interview success rate by 75% for beta testers, 95% accuracy in speech analysis."
                }
            },
            {
                name: "Unified Face Attend",
                description: "Real-time multi-face attendance tracking system using advanced computer vision and Firebase integration.",
                repo: "https://github.com/DeAtHfIrE26/Unified-Face-Attend",
                tags: ["AI", "Firebase", "Computer Vision"],
                category: "ai"
            },
            {
                name: "CarpoolRewards",
                description: "AI-driven carpooling platform with blockchain-based reward system to incentivize eco-friendly transportation.",
                repo: "https://github.com/DeAtHfIrE26/RideShare-Incentive-Platform",
                tags: ["Blockchain", "React", "AI", "Web3"],
                category: "blockchain"
            },
            {
                name: "HealthHubPro",
                description: "Comprehensive AI-driven fitness and health monitoring application with personalized recommendations.",
                repo: "https://github.com/DeAtHfIrE26/HealthHubPro-Advanced-HealthMonitoring-App",
                tags: ["Web", "AI", "Healthcare", "Mobile"],
                category: "web"
            },
            {
                name: "Doofus Adventure Game",
                description: "Engaging turn-based adventure game developed in Unity with immersive gameplay mechanics.",
                repo: "https://github.com/DeAtHfIrE26/Doofus_Adventure_Game",
                tags: ["Game", "Unity", "C#", "Adventure"],
                category: "game"
            }
        ];

        this.typewriterTexts = [
            "Full-Stack Developer",
            "AI/ML Engineer", 
            "Cloud Architect",
            "Game Developer",
            "Blockchain Developer"
        ];

        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typewriterSpeed = 100;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            this.setupEventListeners();
            this.createStarField();
            this.startTypewriter();
            this.renderProjects();
            this.initTheme();
            this.isInitialized = true;
            console.log('Portfolio app initialized successfully');
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }

    setupEventListeners() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        try {
            // Navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    this.smoothScroll(targetId);
                    this.updateActiveNavLink(link);
                });
            });

            // Theme toggle
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', () => this.toggleTheme());
            }

            // Project filters
            const filterBtns = document.querySelectorAll('.filter-btn');
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.filterProjects(e.target.dataset.filter);
                    this.updateActiveFilter(e.target);
                });
            });

            // Contact form
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
            }

            // AI Chat
            const chatToggle = document.getElementById('chatToggle');
            const chatClose = document.getElementById('chatClose');
            const chatSend = document.getElementById('chatSend');
            const chatInput = document.getElementById('chatInput');

            if (chatToggle) {
                chatToggle.addEventListener('click', () => this.toggleChat());
            }
            if (chatClose) {
                chatClose.addEventListener('click', () => this.closeChat());
            }
            if (chatSend) {
                chatSend.addEventListener('click', () => this.sendChatMessage());
            }
            if (chatInput) {
                chatInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.sendChatMessage();
                    }
                });
            }

            // Modal
            const modalClose = document.getElementById('modalClose');
            const modal = document.getElementById('projectModal');
            if (modalClose) {
                modalClose.addEventListener('click', () => this.closeModal());
            }
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal();
                    }
                });
            }

            // Resume actions
            const downloadResume = document.getElementById('downloadResume');
            if (downloadResume) {
                downloadResume.addEventListener('click', () => this.downloadResume());
            }

            // Voice input
            const voiceBtn = document.getElementById('voiceBtn');
            if (voiceBtn) {
                voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
            }

            // Scroll effects
            window.addEventListener('scroll', () => this.handleScroll());

            console.log('Event listeners bound successfully');
        } catch (error) {
            console.error('Error binding events:', error);
        }
    }

    // Navigation Functions
    smoothScroll(targetId) {
        try {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.error('Error in smooth scroll:', error);
        }
    }

    updateActiveNavLink(activeLink) {
        try {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            activeLink.classList.add('active');
        } catch (error) {
            console.error('Error updating active nav link:', error);
        }
    }

    handleScroll() {
        try {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        } catch (error) {
            console.error('Error handling scroll:', error);
        }
    }

    // Theme Functions
    initTheme() {
        try {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.updateThemeIcon(savedTheme);
        } catch (error) {
            console.error('Error initializing theme:', error);
            // Fallback to light theme
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    toggleTheme() {
        try {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        } catch (error) {
            console.error('Error toggling theme:', error);
        }
    }

    updateThemeIcon(theme) {
        try {
            const themeIcon = document.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
            }
        } catch (error) {
            console.error('Error updating theme icon:', error);
        }
    }

    // Animation Functions
    createStarField() {
        try {
            const starsContainer = document.getElementById('stars');
            if (!starsContainer) return;

            const numStars = 100;
            
            for (let i = 0; i < numStars; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 2 + 's';
                star.style.animationDuration = (Math.random() * 3 + 2) + 's';
                starsContainer.appendChild(star);
            }
        } catch (error) {
            console.error('Error creating star field:', error);
        }
    }

    startTypewriter() {
        try {
            const typewriterElement = document.getElementById('typewriter');
            if (!typewriterElement) return;

            const currentText = this.typewriterTexts[this.currentTextIndex];
            
            if (this.isDeleting) {
                typewriterElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
                this.typewriterSpeed = 50;
            } else {
                typewriterElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
                this.typewriterSpeed = 100;
            }

            if (!this.isDeleting && this.currentCharIndex === currentText.length) {
                this.typewriterSpeed = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.typewriterTexts.length;
                this.typewriterSpeed = 500;
            }

            setTimeout(() => this.startTypewriter(), this.typewriterSpeed);
        } catch (error) {
            console.error('Error in typewriter:', error);
        }
    }

    // Project Functions
    renderProjects() {
        try {
            const projectsGrid = document.getElementById('projectsGrid');
            if (!projectsGrid) return;

            projectsGrid.innerHTML = this.projects.map(project => this.createProjectCard(project)).join('');
        } catch (error) {
            console.error('Error rendering projects:', error);
        }
    }

    createProjectCard(project) {
        const tagsHtml = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        return `
            <div class="project-card" data-category="${project.category}" onclick="portfolioApp.openProjectModal('${project.name}')">
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.name}</h3>
                        <a href="${project.repo}" target="_blank" class="project-link" onclick="event.stopPropagation()">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    filterProjects(filter) {
        try {
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } catch (error) {
            console.error('Error filtering projects:', error);
        }
    }

    updateActiveFilter(activeBtn) {
        try {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
        } catch (error) {
            console.error('Error updating active filter:', error);
        }
    }

    openProjectModal(projectName) {
        try {
            const project = this.projects.find(p => p.name === projectName);
            if (!project) return;

            const modal = document.getElementById('projectModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');

            if (!modal || !modalTitle || !modalBody) return;

            modalTitle.textContent = project.name;
            modalBody.innerHTML = `
                <div class="project-details">
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-detail-section">
                        <h4>Technology Stack</h4>
                        <div class="tech-stack">
                            ${project.tags.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-actions">
                        <a href="${project.repo}" target="_blank" class="btn btn--primary">
                            <i class="fab fa-github"></i>
                            View Repository
                        </a>
                    </div>
                </div>
            `;

            modal.classList.add('active');
        } catch (error) {
            console.error('Error opening project modal:', error);
        }
    }

    closeModal() {
        try {
            const modal = document.getElementById('projectModal');
            if (modal) {
                modal.classList.remove('active');
            }
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }

    // Contact Functions
    handleContactForm(e) {
        try {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Simulate form submission
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            e.target.reset();
        } catch (error) {
            console.error('Error handling contact form:', error);
            this.showNotification('Error sending message. Please try again.', 'error');
        }
    }

    toggleVoiceInput() {
        try {
            const voiceBtn = document.getElementById('voiceBtn');
            const messageInput = document.getElementById('message');

            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                this.showNotification('Speech recognition not supported in this browser.', 'error');
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            voiceBtn.classList.add('listening');
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                messageInput.value = transcript;
                voiceBtn.classList.remove('listening');
            };

            recognition.onerror = () => {
                voiceBtn.classList.remove('listening');
                this.showNotification('Voice recognition error. Please try again.', 'error');
            };

            recognition.onend = () => {
                voiceBtn.classList.remove('listening');
            };

            recognition.start();
        } catch (error) {
            console.error('Error with voice input:', error);
            this.showNotification('Voice input not available.', 'error');
        }
    }

    // AI Chat Functions
    toggleChat() {
        try {
            const chatPanel = document.getElementById('chatPanel');
            if (chatPanel) {
                chatPanel.classList.toggle('active');
            }
        } catch (error) {
            console.error('Error toggling chat:', error);
        }
    }

    closeChat() {
        try {
            const chatPanel = document.getElementById('chatPanel');
            if (chatPanel) {
                chatPanel.classList.remove('active');
            }
        } catch (error) {
            console.error('Error closing chat:', error);
        }
    }

    sendChatMessage() {
        try {
            const chatInput = document.getElementById('chatInput');
            const message = chatInput.value.trim();

            if (!message) return;

            // Add user message
            this.addChatMessage(message, 'user');
            chatInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                const response = this.generateAIResponse(message);
                this.addChatMessage(response, 'bot');
            }, 1000);
        } catch (error) {
            console.error('Error sending chat message:', error);
        }
    }

    addChatMessage(message, sender) {
        try {
            const chatMessages = document.getElementById('chatMessages');
            if (!chatMessages) return;

            const messageElement = document.createElement('div');
            messageElement.className = `chat-message ${sender}`;
            messageElement.innerHTML = `<div class="message-content">${message}</div>`;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (error) {
            console.error('Error adding chat message:', error);
        }
    }

    generateAIResponse(message) {
        const lowercaseMessage = message.toLowerCase();
        
        if (lowercaseMessage.includes('healthhubpro') || lowercaseMessage.includes('health')) {
            return "HealthHubPro is an AI-driven fitness and health monitoring app that provides personalized recommendations. It's built with React Native, Node.js, and AI technologies to help users achieve their fitness goals.";
        }
        
        if (lowercaseMessage.includes('project') || lowercaseMessage.includes('work')) {
            return "I've worked on diverse projects including AI/ML systems, blockchain applications, and web platforms. My featured projects include a Virtual Interview Coach, CarpoolRewards platform, and HealthHubPro. Would you like to know more about any specific project?";
        }
        
        if (lowercaseMessage.includes('skill') || lowercaseMessage.includes('technology')) {
            return "I specialize in Full-Stack Development, AI/ML, Cloud Architecture, and Blockchain. My tech stack includes Python, JavaScript, React, Node.js, TensorFlow, AWS, and Docker.";
        }

        return "Thanks for your question! I'm here to help you learn more about Kashyap's projects, skills, and experience. Feel free to ask about specific projects or technologies.";
    }

    // Resume Functions
    downloadResume() {
        try {
            this.showNotification('Resume download started!', 'success');
            // In a real implementation, this would download the actual PDF
            window.open('#', '_blank');
        } catch (error) {
            console.error('Error downloading resume:', error);
            this.showNotification('Error downloading resume.', 'error');
        }
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        try {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification notification--${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: var(--radius-lg);
                padding: var(--space-16);
                box-shadow: var(--shadow-lg);
                z-index: 9999;
                backdrop-filter: blur(10px);
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            `;
            
            notification.innerHTML = `
                <div style="display: flex; align-items: center; gap: var(--space-12);">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;

            document.body.appendChild(notification);

            // Auto remove after 4 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutRight 0.3s ease-out';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.parentNode.removeChild(notification);
                        }
                    }, 300);
                }
            }, 4000);
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }
}

// Initialize the application
let portfolioApp;

// Ensure DOM is ready before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    try {
        portfolioApp = new PortfolioApp();
        portfolioApp.init();
        
        // Make it globally accessible
        window.portfolioApp = portfolioApp;
        
        console.log('Portfolio application loaded successfully');
    } catch (error) {
        console.error('Failed to initialize portfolio app:', error);
    }
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .project-detail-section {
        margin-bottom: var(--space-24);
    }

    .project-detail-section h4 {
        color: var(--color-primary);
        margin-bottom: var(--space-12);
        font-size: var(--font-size-lg);
    }

    .tech-stack {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-8);
        margin-top: var(--space-8);
    }

    .tech-tag {
        background: var(--color-secondary);
        color: var(--color-text);
        padding: var(--space-4) var(--space-12);
        border-radius: var(--radius-full);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
    }

    .project-actions {
        margin-top: var(--space-24);
        padding-top: var(--space-24);
        border-top: 1px solid var(--color-border);
    }
`;

document.head.appendChild(notificationStyles);