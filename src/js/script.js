'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const header = document.querySelector('.header');
  const burger = document.querySelector('.header__burger');
  const wrapper = document.querySelector('.wrapper');
  const headerLinks = document.querySelectorAll('.header__link, .header__sublink');
  const scrollWidth = window.innerWidth - wrapper.offsetWidth + 'px';
  const headerBtns = document.querySelectorAll('.header__link--submenu');
  const footerBtns = document.querySelectorAll('.footer__link--submenu');
  const headerSublists = document.querySelectorAll('.header__sublist');
  const footerSublists = document.querySelectorAll('.footer__sublist');
  const menuAnimation = gsap.timeline({ paused: true });
  const startAnimation = gsap.timeline();
  let isOpen = false;

  // //Start Animation
  startAnimation.from('.wrapper', {
    opacity: 0,
    duration: 1,
  }).from('.header', {
    opacity: 0,
    duration: 1,
  }).from('.hero__info', {
    y: 200,
    opacity: 0,
    duration: 1,
  }, '-=0.5')

  //Menu Animation
  gsap.matchMedia().add('(max-width: 1200px)', () => {
    menuAnimation.to('.overlay', {
      opacity: 1,
      visibility: 'visible',
    }).to('.overlay__block', {
      duration: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      stagger: 0.07,
      ease: 'power3.inOut'
    }).to('.header__menu', {
      opacity: 1,
      visibility: 'visible',
      duration: 0.4
    }).to('.header__link', {
      opacity: 1,
      visibility: 'visible',
    }, '-=0.6').to('.header__sublink', {
      opacity: 1,
      visibility: 'visible',
    }, '-=0.6');
  });

  burger.addEventListener('click', () => {
    let ariaLabel = burger.getAttribute('aria-label');
    burger.classList.toggle('active');

    if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      if (burger.classList.contains('active')) {
        setTimeout(function () {
          document.body.style.paddingRight = scrollWidth;
          header.style.paddingRight = scrollWidth;
          document.body.classList.add('hidden');
        }, 600);
      } else {
        setTimeout(function () {
          document.body.classList.remove('hidden');
          document.body.style.paddingRight = '';
          header.style.paddingRight = '';
        }, 2200);
      }
    } else {
      if (burger.classList.contains('active')) {
        setTimeout(function () {
          document.body.classList.add('hidden');
        }, 600);
      } else {
        setTimeout(function () {
          document.body.classList.remove('hidden');
        }, 2200);
      }
    }

    if (ariaLabel === 'Open menu') {
      burger.setAttribute('aria-label', 'Close menu');
    } else {
      burger.setAttribute('aria-label', 'Open menu');
    }

    if (isOpen) {
      menuAnimation.reverse();
    } else {
      menuAnimation.play();
    }
    isOpen = !isOpen;
  });

  if (!isOpen) {
    headerLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuAnimation.reverse();
        burger.setAttribute('aria-label', 'Open menu');
        burger.classList.remove('active');
        isOpen = !isOpen;
      })
    });
  }

  //Header On Scroll
  function headerOnScroll() {
    if (window.scrollY > 0) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  }

  //Header Submenu
  function showSubmenu(btns, sublist) {

    btns.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget;

        btns.forEach(el => {
          if (el !== target) {
            el.classList.remove('active');
            if (el.nextElementSibling) {
              el.nextElementSibling.classList.remove('active');
            }
          }
        });

        item.classList.toggle('active');

        if (item.nextElementSibling) {
          item.nextElementSibling.classList.toggle('active');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        removeActiveClass();
      }
    });

    function removeActiveClass() {
      btns.forEach(btn => {
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
        }
      });

      sublist.forEach(list => {
        if (list.classList.contains('active')) {
          list.classList.remove('active');
        }
      });
    }

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!target.closest('.header__sublist') && !target.closest('.header__link--submenu') && !target.closest('.footer__link--submenu')) {
        removeActiveClass();
      }
    });
  }

  showSubmenu(footerBtns, footerSublists);

  window.addEventListener('scroll', () => {
    headerOnScroll();
  });

  window.addEventListener('load', () => {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    if (viewportWidth > 1200) {
      showSubmenu(headerBtns, headerSublists);
    }

    headerOnScroll();
  });

  window.addEventListener('resize', () => {
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
    if (viewportWidth > 1200) {
      showSubmenu(headerBtns, headerSublists);
    }
  });




});


