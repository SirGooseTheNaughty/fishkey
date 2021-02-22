/* фото за элементами */
import initCoordTracking from "./utils/initCoordTracking"
export default function bgPhotos(params) {
    const elemSelectors = params.elements,
        photoSelectors = params.photos,
        delaySpeed = params.delaySpeed || 0.1,
        elems = [],
        photos = [];

    elemSelectors.forEach((selector, i) => {
        elems.push(document.querySelector(selector));
        photos.push(document.querySelector(photoSelectors[i]));
    })

    let currentRect;
    let currentCenter;

    function LP__mousemove(e) {
        photos[activeLink].setAttribute('data-target-x', (e.clientX - currentCenter.x));
        photos[activeLink].setAttribute('data-target-y', (e.clientY - currentCenter.y));
    }

    if ($(window).width() > params.minWidth) {
        photos.forEach(target => initCoordTracking(target, 'mousemove', 'rel', true, true, {framerate: 10, delaySpeed, tolerance: 0.1}));
        elems.forEach((elem, i) => {
            $(elem).attr('assocWith', i);
            elem.parentElement.style.zIndex = 5;
            const newPadding = (parseInt(window.getComputedStyle(elem).width, 10) - parseInt(window.getComputedStyle(elem).height, 10))/2 + 'px';
            elem.style.padding = `${newPadding} 0 ${newPadding} 0`;
            elem.style.marginTop = '-' + newPadding;
            elem.style.borderRadius = '50%';
        });
        photos.forEach((photo, i) => {
            $(photo).attr('assocWith', i);
            $(photo).css({
                'z-index': '1',
                'opacity': '0',
                'transition': 'opacity 0.25s ease, transform 0.1s linear'
            });
        });
    
        $(elems).on('mouseenter', function (e) {
            activeLink = $(this).attr('assocWith');
            photos[activeLink].style.opacity = 1;
            photos[activeLink].style.transition = 'opacity 0.25s ease, transform 0s';
            currentRect = elems[activeLink].getBoundingClientRect();
            currentCenter = {
                x: currentRect.x + currentRect.width/2,
                y: currentRect.y + currentRect.height/2
            };
            photos[activeLink].setAttribute('data-current-x', (e.clientX - currentCenter.x));
            photos[activeLink].setAttribute('data-current-y', (e.clientY - currentCenter.y));
            document.addEventListener('mousemove', LP__mousemove);
        })
        .on('mouseleave', function () {
            document.removeEventListener('mousemove', LP__mousemove);
            photos[activeLink].style.transition = 'opacity 0.25s ease, transform 0.25s linear';
            photos[activeLink].style.opacity = 0;
            photos[activeLink].setAttribute('data-target-x', 0);
            photos[activeLink].setAttribute('data-target-y', 0);
        });
    }
}