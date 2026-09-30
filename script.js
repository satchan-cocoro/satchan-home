'use strict';
const menu = document.querySelector('.mobile-menu');
if (menu) {
  const summary = menu.querySelector('summary');
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.open = false;
      const href = link.getAttribute('href');
      const target = href && href.startsWith('#') ? document.querySelector(href) : null;
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
      }
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) { menu.open = false; summary.focus(); }
  });
  document.addEventListener('click', event => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  matchMedia('(min-width: 901px)').addEventListener('change', event => {
    if (event.matches) menu.open = false;
  });
}
// Keep anchor destinations clear of the header, including enlarged text.
const header = document.querySelector('.site-header');
if (header && 'ResizeObserver' in window) {
  const updateOffset = () => document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  new ResizeObserver(updateOffset).observe(header);
  updateOffset();
}
