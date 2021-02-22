/* вырисовка вектора */
import getElemDim from "./utils/getElemDim"
export default function vectorDraw(params) {
    let { selectors, svgs, trigger, hoverTriggers, offsets } = params;
    const animFunction = params.animFunction || 'ease';
    const animTime = params.animTime || 0.5;
    const minWidth = params.minWidth || 0;
    const logoLengths = [], logoPaths = [];

    if ($(window).width() > minWidth) {
        (trigger != 'hover' && trigger !='scroll') ? trigger = 'scroll' : null;
        const vd_forSVG = document.querySelectorAll(selectors);
        vd_forSVG.forEach((space, i) => {
            $(space).html(svgs[i]);
            if (isNaN(offsets[i])) {
                offsets[i] = 0;
            } else {
                offsets[i] = $(window).height()*offsets[i]/100;
            }
        });
        vd_forSVG.forEach((space, i) => {
            logoPaths[i] = space.querySelector('path');
            logoLengths[i] = logoPaths[i].getTotalLength();
            $(logoPaths[i]).css({
                'stroke-dasharray': logoLengths[i],
                'stroke-dashoffset': logoLengths[i],
                'animation-duration': animTime + 's',
                'animation-timing-function': animFunction
            });
            const desiredWidth = getElemDim(space, "width");
            const coeff = desiredWidth/(+space.querySelector('svg').getAttribute('width'));
            space.querySelector('svg').style.transform = `scale(${coeff})`;
            space.querySelector('svg').style.transformOrigin = 'top left';
        });
        
        if (trigger == 'hover') {
            const triggers = [];
            hoverTriggers.forEach((trigger, i) => triggers[i] = document.querySelector(trigger) );
            triggers.forEach((trigger, i) => {
                trigger.setAttribute('data-vectorNum', i);
                trigger.addEventListener('mouseenter', hoverDraw);
                trigger.addEventListener('mouseleave', hoverDraw);
            })
        } else {
            scrollDraw();
            document.addEventListener('scroll', scrollDraw);
        }
    }

    function hoverDraw() {
        const vector = this.getAttribute('data-vectorNum');
        logoPaths[vector].classList.toggle('draw-svg');
    }

    function scrollDraw() {
        const visible = logoPaths.map((vector, i) => $(vector).offset().top < $(window).scrollTop() + $(window).height() - offsets[i]);
        visible.forEach((isVisible, i) => {
            if (isVisible) {
                logoPaths[i].classList.add('draw-svg');
            }
        })
    }
}