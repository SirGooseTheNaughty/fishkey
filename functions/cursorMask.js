// Маска курсором
export default function cursorMask(params) {
    const minWidth = params.minWidth || 1200,
        clipRadius = params.clipRadius || 100,
        maskingPages = document.querySelectorAll(params.maskingPages),
        originalPages = document.querySelectorAll(params.originalPages);

    if ($(window).width() > minWidth) {
        maskingPages.forEach((page, i) => {
            const originalPage = originalPages[i];
            page.style.position = 'absolute';
            page.style.width = window.getComputedStyle(originalPage).width;
            page.style.height = window.getComputedStyle(originalPage).height;
            page.style.top = $(originalPage).offset().top + 'px';
            page.style.clipPath = `circle(${clipRadius} at -100px -100px)`;
            page.style.zIndex = '50';
        });

        document.addEventListener('mousemove', (event) => {
            maskingPages.forEach(page => {
                page.style.clipPath = `circle(${clipRadius}px at ${event.pageX}px ${event.pageY - $(page).offset().top}px`;
            });
        });
    }
}