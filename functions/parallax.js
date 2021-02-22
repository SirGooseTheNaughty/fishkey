/* прилипание картинок */
import initCoordTracking from "./utils/initCoordTracking.js"
export default function parallax(params) {
    const parallaxTargets = document.querySelectorAll(params.selectors),
        minWidth = params.minWidth || 1200;

    let parallaxTarget,
        parallaxRect = {},
        parallaxRectCenter = {x: 0, y: 0};

    if ($(window).width() > minWidth) {
        parallaxTargets.forEach(target => initCoordTracking(target, 'mousemove', 'rel', true, true, {}));
        $(parallaxTargets).addClass('parallax');
        $(parallaxTargets).on('mouseenter', function () {
            parallaxTarget = this;
            parallaxRect = parallaxTarget.getBoundingClientRect();
            parallaxRectCenter = {
                x: parallaxRect.x + parallaxRect.width/2,
                y: parallaxRect.y + parallaxRect.height/2
            };
            $(this).attr('parallax', true);
            document.addEventListener('mousemove', listener);
        })
        .on('mouseleave', function () {
            document.removeEventListener('mousemove', listener);
            $(this).attr('parallax', false);
            parallaxTarget.setAttribute('data-target-x', 0);
            parallaxTarget.setAttribute('data-target-y', 0);
        });
    }

    function listener(e) {
        parallaxTarget.setAttribute('data-target-x', (e.clientX - parallaxRectCenter.x)/4);
        parallaxTarget.setAttribute('data-target-y', (e.clientY - parallaxRectCenter.y)/4);
    }
}