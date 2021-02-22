import Highway from '@dogstudio/highway/src/highway';
import Fade from './Fade';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TweenMax } from "gsap";
import 'leaflet';
import './leaflet-sleep';

const H = new Highway.Core({
    transitions: {
        default: Fade
    }
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0); 
}; 

const body = document.querySelector('body');
const main = document.querySelector('main');
const article = document.querySelector('article');

const nav = document.querySelector('.nav');
const project = document.querySelector('.project');

const iconMenu = document.querySelector('.icon--open');
const iconLogo = document.querySelector('.nav__logo');
const iconToggle = document.querySelector('.nav__toggle')

const isMobile = window.matchMedia('(max-width: 800px)');

// ---------- Loading transition -----------//
document.onreadystatechange = function() { 
    if (document.readyState !== "complete") { 
        const images = document.querySelectorAll('img');
        imagesLoaded(images, ()=> {
            console.log('images loaded');
            const tl = gsap.timeline({ defaults: {
                ease: "Quart.easeOut"
            }, 
            });
            tl.from('.loading', {
                duration: 1.2,
                y: 50,
                scaleY: 0,
                stagger: .1,
                onComplete: ()=> {
                    document.querySelector('.transition').style.display = 'none';
                    animationIntro(); 
                }
            }), 'same';
            tl.to('.transition', {
                duration: 1,
                opacity: 0,
            });
        })
    } else {
        
    }
}; 
// ---------- Intro animation -----------
function animationIntro() {
    let rotate = 5;
    let scale = 0.8;
    TweenMax.from('.at-nav', 3, {
        delay: .5,
        opacity: 0,
        ease: 'Quart.easeOut'
    });
    if (isMobile.matches) {
        rotate = 0;
        scale = 1;
    }
    if (article.classList.contains('index-transition')) {
        invertNav()
        TweenMax.from ('.at_hero-title', 1, {
            delay: 0,
            y: 200, 
            scaleY: 0.5,
            stagger: .1,
            ease: 'Quart.easeOut'
        });
        TweenMax.from ('.at_hero-img', 2, {
            delay: .2,
            opacity: 0,
            scale: 1.2,
            ease: 'Quart.easeOut'
        });
        TweenMax.from ('.at_hero-owner', 1, {
            delay: .5,
            y: 100, 
            opacity: 0,
            stagger: .2,
            ease: 'Quart.easeOut'
        });
        TweenMax.from ('.at_hero-arrow', 1, {
            delay: .7,
            y: -50, 
            opacity: 0,
            ease: 'Quart.easeOut'
        });

        const scrollDown = document.getElementById('go-down'); 
        const scrollToFooter = document.getElementById('project');
            scrollDown.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToFooter.scrollIntoView({behavior: 'smooth'});
        });
    
        // --------- SlideShow ----------
        slideshow()
    }         
    else if (article.classList.contains('about-transition')) {
        TweenMax.from ('.at_about-title', 1.5, {
            delay: 0,
            opacity: 0,
            rotate: rotate,
            y: 200,
            scaleY: .8,
            ease: 'Quart.easeOut',
        });
        TweenMax.from ('.at_about-text--left', 1.5, {
            delay: 0,
            y: 500, 
            rotate: rotate,
            opacity: 1,
            scaleY: .8,
            stagger: .3,
            ease: 'Quart.easeOut',
        });
        TweenMax.from ('.at_about-text--right', 1.5, {
            delay: 0,
            y: 500, 
            rotate: rotate,
            opacity: 1,
            scale: .8,
            stagger: .2,
            ease: 'Quart.easeOut',
        });
        
        // leaflet ----- location mapping
        const mymap = L.map('mapid').setView([35.26620382954966, 139.05008072703748], 15);
            
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '',
            maxZoom: 180,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoicGF3ZWx6ZW5raXNoIiwiYSI6ImNrazhoZGhsMjBudjkyb212NDQyeTl1aW0ifQ.oGGwQ8xYAtyFIMLG-J3G5A'
        }).addTo(mymap);

        L.marker([35.26620382954966, 139.05008072703748]).addTo(mymap)
            .bindPopup('We are here!')
            .openPopup();
    }
    else if (article.classList.contains('gallery-transition')) {
        TweenMax.from ('.at_gallery-title', 1.5, {
            delay: 0,
            opacity: 0,
            rotate: rotate,
            y: 200,
            scaleY: .8,
            ease: 'Quart.easeOut',
        });
        TweenMax.from ('.at_gallery-text--left', 1.5, {
            delay: 0,
            y: 500, 
            rotate: rotate,
            opacity: 1,
            scaleY: .8,
            stagger: .3,
            ease: 'Quart.easeOut',
        });
    } 
    else if (article.classList.contains('contact-transition')) {
        TweenMax.from ('.at_contact-formbar', 2, {
            delay: .5,
            opacity: 0,
            x: 1000,
            width: 0,
            ease: 'Quart.easeOut',
            stagger: 0.2
        });
        TweenMax.from ('.at_contact-splittingbar', 2, {
            delay: 0,
            opacity: 0,
            height: 0,
            ease: 'Quart.easeOut',
        });
        TweenMax.from ('.at_contact-text--left', 1, {
            delay: 0,
            y: 10, 
            rotate: rotate,
            opacity: 0,
            scale: scale,
            stagger: .2,
            ease: 'Quart.easeOut',
        });
        TweenMax.from ('.at_contact-text--right', 1.5, {
            delay: .5,
            y: 50, 
            rotate: -rotate,
            opacity: 0,
            scale: scale,
            stagger: .2,
            ease: 'Quart.easeOut',
        });
        TweenMax.from ('.at_contact-footer', 1.5, {
            delay: 1.5,
            y: 10, 
            opacity: 0,
            ease: 'Quart.easeOut',
        });
    }
    
};
// document.addEventListener("DOMContentLoaded", animationIntro());

function slideshow() {
    const slideDelay = 3;
        const slideDuration = 1;
        let snapX;

        const slides = document.querySelectorAll(".slide");
        const progressWrap = gsap.utils.wrap(0, 1);
        const numSlides = slides.length;

        gsap.set(slides, {
            xPercent: i => i * 100
        });

        const wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
        const timer = gsap.delayedCall(slideDelay, autoPlay);

        const animation = gsap.to(slides, {
            xPercent: "+=" + (numSlides * 100),
            duration: 1,
            ease: "none",
            paused: true,
            repeat: -1,
            modifiers: {
                xPercent: wrap
            }
        });

        const proxy = document.createElement("div");
        let slideAnimation = gsap.to({}, {});
        let slideWidth = 0;
        let wrapWidth = 0;
        resize();

        window.addEventListener("resize", resize);

        function animateSlides(direction) {
            timer.restart(true);
            slideAnimation.kill();
            
            const x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
            slideAnimation = gsap.to(proxy, {
                x: x,
                duration: slideDuration,
                onUpdate: updateProgress
            });  
        }

        function autoPlay() {  
            animateSlides(-1);
        }

        function updateProgress() { 
            animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
        }

        function resize() {
        
            const norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
                slideWidth = slides[0].offsetWidth;
                wrapWidth = slideWidth * numSlides;
                snapX = gsap.utils.snap(slideWidth);
                
                gsap.set(proxy, {
                    x: norm * wrapWidth
            });
        
            animateSlides(0);
            slideAnimation.progress(1);
        }
}

// ---------- Toggle -----------
const scrollUp = document.querySelector('.nav__toggle');
const sectionBeginning = document.getElementById('top');

scrollUp.addEventListener('click', function(e) {
    e.preventDefault();
    sectionBeginning.scrollIntoView({behavior: 'smooth'});
});

// ----------- Menu -----------
class Menu {
    constructor(el){
        this.el = el;
        this.el.openMenu = this.el.querySelector('.action--open');
        this.el.closeMenu = this.el.querySelector('.action--close');
        this.el.openMenu.addEventListener('click', ()=> this.open());
        this.el.closeMenu.addEventListener('click', ()=> this.close());

        this.el.mainMenu = this.el.querySelector('.menu__item-main')
        this.el.innerMenu = this.el.querySelector('.menu__item-inner');
        this.el.innerLinks = this.el.querySelectorAll('.menu-links > a.nav__section-anchor');
        this.el.innerContact = this.el.querySelectorAll('.menu-contact > a.nav__section-anchor');
        this.el.innerBar = this.el.querySelector('.menu-bar');
        this.el.innerLinks.forEach(elem => {
            elem.addEventListener('click', ()=> this.animate());
        });
    }
    open() {
        this.toggle('open');
    }
    close() {
        this.toggle('close');
    }
    toggle(action) {
        this.el.classList[action === 'open' ? 'add' : 'remove']('menu--open');
        const mainM = this.el.mainMenu;
        const innerM = this.el.innerMenu;
        if (action === 'open'){
            TweenMax.to([mainM, innerM], 1.2, {
                ease: 'Quart.easeOut',
                opacity: 1,
                onStart: ()=>{
                    body.classList.contains('index-transition') && scrollY < project.offsetTop ? classicNav('transparent') : classicNav('var(--primary_color)');
                }
            });
        }
        else {
            TweenMax.to(mainM, 1.2, {
                delay: .5,
                ease: 'Quart.easeOut',
                opacity: 0,
                onUpdate: ()=>{
                    body.classList.contains('index-transition') && (scrollY < project.offsetTop) ? invertNav() : classicNav('var(--primary_color)');
                }
            });
            TweenMax.to(innerM, 1.2, {
                ease: 'Quart.easeOut',
                opacity: 0
            });
        }
        TweenMax.to(this.el.openMenu, action === 'open' ? 0.5 : 0.5, {
            delay: action === 'open' ? 0 : .5,
            ease: action === 'open' ? 'Quint.easeOut' : 'Quart.easeOut',
            opacity: action === 'open' ? 0 : 1
        });
        TweenMax.to(this.el.closeMenu, .9, {
            ease: action === 'open' ? 'Quint.easeOut' : 'Quart.easeInOut',
            startAt: action === 'open' ? {rotation: 0} : null,
            opacity: action === 'open' ? 1 : 0,
            rotation: action === 'open' ? 180 : 360
        });
        TweenMax.staggerTo(this.el.innerLinks, action === 'open' ? .5 : .25, {
            delay: action === 'open' ? .5 : 0,
            startAt: action === 'open' ? {opacity: 0} : null,
            opacity: action === 'open' ? 1 : 0,
            rotate: action === 'open' ? 0 : null,
            ease: action === 'open' ? 'Quint.easeOut' : 'Quart.easeInOut'
        }, 
            action === 'open' ? 0.2 : -0.2);
        TweenMax.staggerTo(this.el.innerContact, action === 'open' ? .5 : .25, {
            delay: action === 'open' ? .5 : 0,
            startAt: action === 'open' ? {opacity: 0} : null,
            opacity: action === 'open' ? 1 : 0,
            rotate: action === 'open' ? 0 : null,
            ease: action === 'open' ? 'Quint.easeOut' : 'Quart.easeInOut'
        }, 
            action === 'open' ? 0.2 : -0.2);    
        TweenMax.to(this.el.innerBar, action === 'open' ? 1.5 : .5, {
            delay: action === 'open' ? .5 : 0,
            startAt: action === 'open' ? {opacity: 0} : null,
            opacity: action === 'open' ? 1 : 0,
            height: action === 'open' ? '60%' : 0,
            ease: action === 'open' ? 'Quint.easeOut' : 'Quart.easeInOut' 
        }, 
        action === 'open' ? 0.2 : -0.2);      
    }
    animate() {
        this.close();
    }   
}   
const menu = new Menu(document.querySelector('div.menu'));

// ------------ Nav Scroll ----------
let prevScrollpos = window.pageYOffset;
window.onscroll =  function() {
    let currentScrollPos = window.pageYOffset;
    prevScrollpos > currentScrollPos ? nav.style.top = '0' : nav.style.top = '-100px';
    prevScrollpos = currentScrollPos;
    article.classList.contains('index-transition') && scrollY < project.offsetTop ? invertNav() : classicNav();
}     
function invertNav() {
    nav.style.background = 'transparent';
    iconMenu.style.fill = 'var(--primary_color)';
    iconLogo.style.filter = 'invert()';
    iconToggle.style.filter = 'invert()';

}
function classicNav() {
    nav.style.background = 'var(--primary_color)';
    iconMenu.style.fill = 'var(--text_color)';
    iconLogo.style.filter = 'none';
    iconToggle.style.filter = 'none';
}
// ----------- Scroll anim -----------
function scrollAnimation(element) {
    let y = 500;
    let rotate = 0;
    let scale = 1;

    if (element.classList.contains('as-image')) {
        y = 500;  
    }
    else if (element.classList.contains('as-image-parallax')) {
        return test();
    }
    else if (element.classList.contains('as-text--span')) {
        y = 0;
    }
    else if (element.classList.contains('as-text--left')) {
        y = 100;
        rotate = 5;
        scale = .8;
    }
    else if (element.classList.contains('as-text--right')) {
        y = 100;
        rotate = -5;
        scale = .8;
    }
    gsap.fromTo(element, {delay: 0, y: y, rotate: rotate, opacity: 0, scale: scale }, {
        duration: 1, 
        y: 0, 
        rotate: 0,
        opacity: 1,
        scale: 1,
        ease: 'Quart.easeOut',
    });
    function test(){
        TweenMax.from(element, 1, {
            scale: 1.5,
            ease: 'Quart.easeOut',
        });
    };
};  
function hide(element) {
    gsap.set(element, {
        duration: 0.5,
        opacity: 0
    });
};  
document.addEventListener("DOMContentLoaded", function() {
    if (isMobile.matches) {
        return
    }
    else {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".as-main").forEach(function(element) {
        hide(element);
        
            ScrollTrigger.create({
                trigger: element,
                onEnter: function() { scrollAnimation(element)},
                start: 'top bottom',
                end: 'top center',
            });
        });
    }
});



