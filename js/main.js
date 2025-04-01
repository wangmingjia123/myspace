// 初始化GSAP和ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化加载动画
    initLoader();
    // 创建浮动元素
    createFloatingElements();
    // 创建魔法星星
    createMagicalStars();
    // 创建抽象形状
    createAbstractShapes();
    // 创建记忆气泡
    createMemoryBubbles();
    // 初始化鼠标跟随效果
    initCursorFollower();
    // 初始化导航栏滚动效果
    initNavbar();
    // 初始化滚动动画
    initScrollAnimations();
    // 初始化表单提交
    initFormSubmit();
    // 初始化故事阅读按钮
    initStoryButtons();
    // 初始化记忆卡片筛选
    initMemoryFilter();
    // 初始化添加记忆按钮
    initAddMemoryButton();
    // 初始化文字扭曲效果
    initTextDistortion();
    // 初始化按钮粒子效果
    initButtonParticles();
    // 初始化魔法悬停效果
    initMagicHover();
});

// 初始化加载动画
function initLoader() {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    if (!loaderWrapper) return;
    
    // 创建加载动画
    for (let i = 0; i < 5; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('loader-bubble');
        bubble.style.setProperty('--delay', `${i * 0.2}s`);
        document.querySelector('.memory-bubble-loader').appendChild(bubble);
    }
    
    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        gsap.to(loaderWrapper, {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                loaderWrapper.style.display = 'none';
                // 页面加载完成后的入场动画
                playEntranceAnimation();
            }
        });
    });
}

// 页面入场动画
function playEntranceAnimation() {
    // 标题特效
    const titleElement = document.querySelector('.memory-title');
    if (titleElement) {
        let titleText = titleElement.textContent;
        titleElement.innerHTML = '';
        
        // 逐字添加并设置动画
        for (let i = 0; i < titleText.length; i++) {
            const span = document.createElement('span');
            span.textContent = titleText[i];
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(20px) rotateX(90deg)';
            titleElement.appendChild(span);
            
            gsap.to(span, {
                opacity: 1,
                transform: 'translateY(0) rotateX(0)',
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                delay: 0.1 * i
            });
        }
    }
    
    // 添加一些随机飘浮的元素
    addRandomFloatingElements();
}

// 添加随机飘浮元素
function addRandomFloatingElements() {
    const colors = [
        'rgba(255, 126, 185, 0.4)',
        'rgba(122, 252, 255, 0.4)',
        'rgba(254, 255, 156, 0.4)',
        'rgba(255, 247, 64, 0.4)'
    ];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const element = document.createElement('div');
            element.classList.add('entrance-floating-element');
            
            // 随机属性
            const size = Math.random() * 60 + 20;
            const colorIndex = Math.floor(Math.random() * colors.length);
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 5 + 3;
            
            // 应用样式
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            element.style.backgroundColor = colors[colorIndex];
            element.style.left = `${posX}%`;
            element.style.top = `${posY}%`;
            element.style.position = 'fixed';
            element.style.borderRadius = '50%';
            element.style.filter = 'blur(8px)';
            element.style.zIndex = '0';
            element.style.pointerEvents = 'none';
            
            document.body.appendChild(element);
            
            // 添加动画
            gsap.fromTo(element,
                { scale: 0, opacity: 0 },
                { 
                    scale: 1, 
                    opacity: 1, 
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)",
                    delay: delay
                }
            );
            
            // 飘浮动画
            gsap.to(element, {
                y: -300 - Math.random() * 300,
                x: Math.random() * 100 - 50,
                opacity: 0,
                duration: duration,
                delay: delay + 0.8,
                ease: "power1.out",
                onComplete: () => {
                    document.body.removeChild(element);
                }
            });
        }, i * 100);
    }
}

// 初始化鼠标跟随效果
function initCursorFollower() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;
    
    // 设置初始大小和不透明度
    gsap.set(cursor, { 
        width: 30, 
        height: 30, 
        backgroundColor: 'rgba(142, 68, 173, 0.2)',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        zIndex: 9999,
        border: '1px solid rgba(142, 68, 173, 0.5)',
        opacity: 0
    });
    
    // 默认跟随鼠标
    document.addEventListener('mousemove', function(e) {
        gsap.to(cursor, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // 鼠标进入页面时显示
    document.addEventListener('mouseenter', function() {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
    });
    
    // 鼠标离开页面时隐藏
    document.addEventListener('mouseleave', function() {
        gsap.to(cursor, { opacity: 0, duration: 0.3 });
    });
    
    // 当鼠标悬停在链接或按钮上时放大光标
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .nav-link, .memory-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            gsap.to(cursor, {
                width: 60,
                height: 60,
                backgroundColor: 'rgba(142, 68, 173, 0.3)',
                borderColor: 'rgba(142, 68, 173, 0.8)',
                mixBlendMode: 'normal',
                duration: 0.3
            });
        });
        
        el.addEventListener('mouseleave', function() {
            gsap.to(cursor, {
                width: 30,
                height: 30,
                backgroundColor: 'rgba(142, 68, 173, 0.2)',
                borderColor: 'rgba(142, 68, 173, 0.5)',
                mixBlendMode: 'difference',
                duration: 0.3
            });
        });
    });
}

// 创建头部浮动元素
function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) return;
    
    const colors = [
        'rgba(255, 126, 185, 0.2)', 
        'rgba(122, 252, 255, 0.2)', 
        'rgba(254, 255, 156, 0.2)',
        'rgba(255, 247, 64, 0.2)'
    ];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // 设置随机大小、位置和颜色
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const colorIndex = Math.floor(Math.random() * colors.length);
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 15;
        
        // 设置随机形状
        const shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${posX}%`;
        element.style.top = `${posY}%`;
        element.style.backgroundColor = colors[colorIndex];
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        
        // 应用不同的形状
        if (shape === 'triangle') {
            element.style.borderRadius = '0';
            element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        } else if (shape === 'square') {
            element.style.borderRadius = '15%';
        } else if (shape === 'pentagon') {
            element.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
        } else if (shape === 'hexagon') {
            element.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
        }
        
        floatingContainer.appendChild(element);
    }
}

// 创建魔法星星
function createMagicalStars() {
    const starsContainer = document.querySelector('.magical-stars');
    if (!starsContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('magical-star');
        
        // 随机属性
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        
        // 应用样式
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.position = 'absolute';
        star.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)';
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        star.style.animation = `twinkle ${duration}s infinite alternate ease-in-out ${delay}s`;
        
        starsContainer.appendChild(star);
    }
}

// 创建抽象形状
function createAbstractShapes() {
    const shapesContainer = document.querySelector('.abstract-shapes');
    if (!shapesContainer) return;
    
    const shapes = [
        'M10,30 C15,10 35,10 40,30 C45,50 25,50 10,30 Z',
        'M10,10 L40,10 L25,40 Z',
        'M10,10 C20,20 30,0 40,10 C50,20 40,30 30,30 C20,30 0,20 10,10 Z',
        'M24.3,30 C11.4,30 5,43.3 5,50 C5,56.7 11.4,70 24.3,70 C37.2,70 43.6,56.7 43.6,50 C43.6,43.3 37.2,30 24.3,30 Z'
    ];
    
    const colors = [
        'rgba(255, 126, 185, 0.3)',
        'rgba(122, 252, 255, 0.3)',
        'rgba(254, 255, 156, 0.3)',
        'rgba(255, 247, 64, 0.3)'
    ];
    
    for (let i = 0; i < 15; i++) {
        const shapeEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        shapeEl.setAttribute('viewBox', '0 0 50 50');
        shapeEl.setAttribute('width', '100');
        shapeEl.setAttribute('height', '100');
        shapeEl.style.position = 'absolute';
        shapeEl.style.left = `${Math.random() * 100}%`;
        shapeEl.style.top = `${Math.random() * 100}%`;
        shapeEl.style.opacity = '0.6';
        shapeEl.style.transform = `rotate(${Math.random() * 360}deg)`;
        shapeEl.style.animation = `float ${Math.random() * 10 + 20}s infinite linear alternate`;
        shapeEl.style.animationDelay = `${Math.random() * 5}s`;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', shapes[Math.floor(Math.random() * shapes.length)]);
        path.setAttribute('fill', colors[Math.floor(Math.random() * colors.length)]);
        path.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
        path.setAttribute('stroke-width', '0.5');
        
        shapeEl.appendChild(path);
        shapesContainer.appendChild(shapeEl);
    }
}

// 文字扭曲效果
function initTextDistortion() {
    const textElements = document.querySelectorAll('.distortion-text');
    if (!textElements.length) return;
    
    textElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.querySelector('h1, h2, h3').textContent;
                    const characters = text.split('');
                    let html = '';
                    
                    characters.forEach(char => {
                        if (char === ' ') {
                            html += ' ';
                        } else {
                            html += `<span class="distort-char">${char}</span>`;
                        }
                    });
                    
                    entry.target.querySelector('h1, h2, h3').innerHTML = html;
                    
                    // 应用动画
                    const chars = entry.target.querySelectorAll('.distort-char');
                    chars.forEach((char, index) => {
                        gsap.from(char, {
                            opacity: 0,
                            y: Math.random() * 100 - 50,
                            x: Math.random() * 100 - 50,
                            rotation: Math.random() * 90 - 45,
                            scale: 0,
                            duration: 1.5,
                            ease: "elastic.out(1, 0.3)",
                            delay: 0.03 * index
                        });
                    });
                    
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(element);
    });
}

// 按钮粒子效果
function initButtonParticles() {
    const buttons = document.querySelectorAll('.memory-btn');
    if (!buttons.length) return;
    
    buttons.forEach(button => {
        const particlesContainer = button.querySelector('.btn-particles');
        if (!particlesContainer) return;
        
        // 鼠标悬停时触发粒子效果
        button.addEventListener('mouseenter', () => {
            particlesContainer.innerHTML = '';
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('span');
                particle.classList.add('btn-particle');
                
                // 随机属性
                const size = Math.random() * 10 + 5;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const duration = Math.random() * 1 + 0.5;
                const delay = Math.random() * 0.2;
                
                // 应用样式
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.position = 'absolute';
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                particle.style.transform = 'scale(0)';
                
                particlesContainer.appendChild(particle);
                
                // 粒子动画
                gsap.to(particle, {
                    scale: 1,
                    opacity: 0,
                    y: Math.random() * 100 - 50,
                    x: Math.random() * 100 - 50,
                    duration: duration,
                    delay: delay,
                    ease: "power1.out"
                });
            }
        });
    });
}

// 魔法悬停效果
function initMagicHover() {
    const elements = document.querySelectorAll('.magic-hover');
    if (!elements.length) return;
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 设置发光中心
            element.style.setProperty('--x', `${x}px`);
            element.style.setProperty('--y', `${y}px`);
            element.classList.add('active');
            
            // 添加魔法痕迹
            addMagicTrail(element, x, y);
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('active');
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 更新发光中心
            element.style.setProperty('--x', `${x}px`);
            element.style.setProperty('--y', `${y}px`);
            
            // 添加魔法痕迹
            if (Math.random() > 0.8) {
                addMagicTrail(element, x, y);
            }
        });
    });
}

// 添加魔法痕迹
function addMagicTrail(element, x, y) {
    const trail = document.createElement('div');
    trail.classList.add('magic-trail');
    
    // 应用样式
    trail.style.left = `${x}px`;
    trail.style.top = `${y}px`;
    trail.style.position = 'absolute';
    trail.style.width = '10px';
    trail.style.height = '10px';
    trail.style.borderRadius = '50%';
    trail.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = 1;
    
    element.appendChild(trail);
    
    // 动画
    gsap.to(trail, {
        width: '30px',
        height: '30px',
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
            element.removeChild(trail);
        }
    });
}

// 创建记忆气泡
function createMemoryBubbles() {
    const bubblesContainer = document.querySelector('.memory-bubbles');
    if (!bubblesContainer) return;
    
    const bubbleCount = 20;
    const dreamColors = [
        'rgba(255, 126, 185, 0.2)',
        'rgba(122, 252, 255, 0.2)',
        'rgba(254, 255, 156, 0.2)',
        'rgba(255, 247, 64, 0.2)'
    ];
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('memory-bubble');
        
        // 随机大小和位置
        const size = Math.random() * 120 + 60;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 15;
        const colorIndex = Math.floor(Math.random() * dreamColors.length);
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${posX}%`;
        bubble.style.top = `${posY}%`;
        bubble.style.backgroundColor = dreamColors[colorIndex];
        bubble.style.animationDelay = `${delay}s`;
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.borderRadius = '50%';
        bubble.style.filter = 'blur(5px)';
        
        // 添加记忆单词（可选）
        if (Math.random() > 0.7) {
            const words = ['童年', '欢笑', '旅行', '友情', '爱', '梦想', '向往', '家', '回忆', '感动'];
            const wordIndex = Math.floor(Math.random() * words.length);
            
            const text = document.createElement('span');
            text.textContent = words[wordIndex];
            text.style.position = 'absolute';
            text.style.top = '50%';
            text.style.left = '50%';
            text.style.transform = 'translate(-50%, -50%)';
            text.style.color = '#333';
            text.style.fontSize = `${size / 5}px`;
            text.style.fontWeight = '300';
            text.style.opacity = '0.8';
            text.style.fontFamily = 'Playfair Display, serif';
            text.style.fontStyle = 'italic';
            text.style.pointerEvents = 'none';
            
            bubble.appendChild(text);
        }
        
        bubblesContainer.appendChild(bubble);
    }
}

// 初始化导航栏滚动效果
function initNavbar() {
    const navbar = document.getElementById('mainNav');
    if (!navbar) return;
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动时导航栏变化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    });
    
    // 导航链接点击滚动效果
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 添加滚动动画
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetElement.offsetTop - 70,
                        autoKill: false
                    },
                    ease: "power4.inOut"
                });
                
                // 添加视觉反馈
                addScrollFeedback();
            }
        });
    });
}

// 添加滚动视觉反馈
function addScrollFeedback() {
    // 创建反馈元素
    const feedback = document.createElement('div');
    feedback.style.position = 'fixed';
    feedback.style.top = '50%';
    feedback.style.left = '50%';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.width = '100px';
    feedback.style.height = '100px';
    feedback.style.borderRadius = '50%';
    feedback.style.background = 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)';
    feedback.style.pointerEvents = 'none';
    feedback.style.zIndex = 9999;
    
    document.body.appendChild(feedback);
    
    // 动画
    gsap.fromTo(feedback, 
        { scale: 0, opacity: 1 },
        { 
            scale: 3, 
            opacity: 0, 
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
                document.body.removeChild(feedback);
            }
        }
    );
}

// 初始化滚动动画
function initScrollAnimations() {
    // 记忆卡片动画
    gsap.utils.toArray('.memory-card-container').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            delay: i * 0.2
        });
    });
    
    // 时间线动画
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            delay: i * 0.3
        });
    });
    
    // 图片墙动画
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        gsap.from(item, {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            delay: i * 0.1
        });
    });
    
    // 故事卡片动画
    gsap.utils.toArray('.story-card').forEach((card, i) => {
        gsap.from(card, {
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // 标题动画
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // 副标题动画
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
        gsap.from(subtitle, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: subtitle,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            delay: 0.2
        });
    });
    
    // 淡入元素
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
}

// 初始化表单提交
function initFormSubmit() {
    const messageForm = document.getElementById('messageForm');
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const title = document.getElementById('memoryTitle').value;
            const content = document.getElementById('memoryContent').value;
            
            // 表单验证
            if (!name || !title || !content) {
                showNotification('请填写所有字段', 'error');
                return;
            }
            
            // 模拟提交效果
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '提交中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // 重置表单
                messageForm.reset();
                submitBtn.innerHTML = '提交记忆';
                submitBtn.disabled = false;
                
                // 显示成功通知
                showNotification('你的记忆已成功提交！', 'success');
                
                // 添加一个新的记忆泡泡
                addNewMemoryBubble(title);
            }, 1500);
        });
    }
}

// 显示通知
function showNotification(message, type) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    gsap.to(notification, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
    });
    
    // 等待后隐藏并移除
    setTimeout(() => {
        gsap.to(notification, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// 添加新的记忆泡泡
function addNewMemoryBubble(title) {
    const bubblesContainer = document.querySelector('.memory-bubbles');
    const bubble = document.createElement('div');
    bubble.classList.add('memory-bubble');
    
    // 设置随机大小和位置
    const size = Math.random() * 100 + 100;
    const posX = Math.random() * 80 + 10;
    const posY = Math.random() * 80 + 10;
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${posX}%`;
    bubble.style.top = `${posY}%`;
    bubble.style.opacity = '0';
    bubble.style.transform = 'scale(0)';
    
    // 添加标题
    const titleElement = document.createElement('span');
    titleElement.textContent = title;
    titleElement.style.position = 'absolute';
    titleElement.style.top = '50%';
    titleElement.style.left = '50%';
    titleElement.style.transform = 'translate(-50%, -50%)';
    titleElement.style.color = 'rgba(0, 0, 0, 0.5)';
    titleElement.style.fontSize = `${size / 10}px`;
    titleElement.style.fontWeight = 'bold';
    titleElement.style.textAlign = 'center';
    titleElement.style.pointerEvents = 'none';
    
    bubble.appendChild(titleElement);
    bubblesContainer.appendChild(bubble);
    
    // 显示动画
    gsap.to(bubble, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        onComplete: () => {
            // 添加浮动动画
            bubble.style.animation = `float ${Math.random() * 10 + 15}s infinite linear`;
        }
    });
}

// 初始化故事阅读按钮
function initStoryButtons() {
    const storyButtons = document.querySelectorAll('.story-btn');
    
    storyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const storyCard = this.closest('.story-card');
            const storyTitle = storyCard.querySelector('h3').textContent;
            const storyExcerpt = storyCard.querySelector('.story-excerpt').textContent;
            
            showStoryModal(storyTitle, storyExcerpt);
        });
    });
    
    // 更多故事按钮
    const moreStoriesBtn = document.querySelector('.more-stories-btn');
    if (moreStoriesBtn) {
        moreStoriesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('更多故事功能即将推出！', 'info');
        });
    }
}

// 显示故事模态框
function showStoryModal(title, excerpt) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    
    // 生成完整故事（示例）
    const fullStory = excerpt + '这是一个长长的故事，讲述了关于回忆的点点滴滴。每个人的生命中都有难以忘怀的时刻，它们构成了我们的过去，影响着我们的现在和未来。这些记忆像是散落在时光长河中的珍珠，闪烁着属于自己的光芒。无论是欢笑还是泪水，都是生命中不可或缺的一部分。有时候，正是那些看似平凡的小事，在多年后回想起来，才发现它们是如此珍贵。';
    
    // 模态框内容
    modal.innerHTML = `
        <div class="story-modal-content">
            <span class="close-modal">&times;</span>
            <h2>${title}</h2>
            <div class="story-modal-body">
                <p>${fullStory}</p>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // 显示动画
    gsap.fromTo(modal.querySelector('.story-modal-content'), 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
    
    // 关闭按钮
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', function() {
        closeStoryModal(modal);
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeStoryModal(modal);
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeStoryModal(modal);
        }
    });
}

// 关闭故事模态框
function closeStoryModal(modal) {
    gsap.to(modal.querySelector('.story-modal-content'), {
        y: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
}

// 添加CSS样式
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 5px;
            color: white;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .notification.success {
            background-color: #2ecc71;
        }
        
        .notification.error {
            background-color: #e74c3c;
        }
        
        .notification.info {
            background-color: #3498db;
        }
        
        .story-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .story-modal-content {
            background-color: white;
            width: 90%;
            max-width: 700px;
            max-height: 80vh;
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 30px;
            cursor: pointer;
            color: #666;
            transition: all 0.3s ease;
        }
        
        .close-modal:hover {
            color: #e74c3c;
        }
        
        .story-modal-content h2 {
            padding: 20px;
            margin: 0;
            border-bottom: 1px solid #eee;
            background: linear-gradient(135deg, #8e44ad, #3498db);
            color: white;
            font-weight: 600;
        }
        
        .story-modal-body {
            padding: 20px;
            overflow-y: auto;
            max-height: calc(80vh - 70px);
            line-height: 1.8;
        }
    `;
    
    document.head.appendChild(style);
}

// 添加动态样式
addDynamicStyles();

// 页面加载完成动画
window.addEventListener('load', function() {
    // 隐藏加载动画（如果有）
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
            }
        });
    }
}); 