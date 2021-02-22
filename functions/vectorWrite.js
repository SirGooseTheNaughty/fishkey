/* вырисовка надписи вектором */
import getElemDim from "./utils/getElemDim.js"

export default function vectorWrite(params) {
    let { selector, svg } = params;
    let logoPaths = [];
    let desiredWidth = 0;
    let coeff = 0;
    let strokeWidth = params.strokeWidth || 0.5;
    const offset = params.offset ? params.offset*$(window).height()/100 : 0;
    let animTime = params.animTime || 0.5;
    const minWidth = params.minWidth || 0;

    if ($(window).width() > minWidth) {
        strokeWidth = strokeWidth ? strokeWidth + 'px' : '1px';
        const vd_forSVG = document.querySelector(selector);
        $(vd_forSVG).html(svg);

        logoPaths = vd_forSVG.querySelectorAll('path');
        animTime = animTime/logoPaths.length;

        $(logoPaths).css({
            'animation-timing-function': 'linear',
            'stroke-width': strokeWidth,
            'fill-opacity': '0',
        });
        logoPaths.forEach((path, i) => {
            $(path).css({
                'stroke-dasharray': path.getTotalLength(),
                'stroke-dashoffset': path.getTotalLength(),
                stroke: path.getAttribute('fill'),
                'animation-duration': animTime + 's',
                'animation-delay': animTime*i + 's',
                transition: `fill-opacity ${animTime}s ease-in-out ${animTime*(i+0.5)}s`
            });
        });
        
        desiredWidth = getElemDim(vd_forSVG, "width");
        coeff = desiredWidth/(+vd_forSVG.querySelector('svg').getAttribute('width'));

        vd_forSVG.querySelector('svg').style.transformOrigin = `left`;
        vd_forSVG.querySelector('svg').style.transform = `scale(${coeff})`;

        scrollInit();
        document.addEventListener('scroll', scrollInit);
    }

    function scrollInit() {
        const isVisible = $(window).scrollTop() + $(window).height() > $(logoPaths[0]).offset().top + offset;
        if (isVisible) {
            document.removeEventListener('scroll', scrollInit);
            scrollDraw();
        }
    }
    function scrollDraw() {
        logoPaths.forEach(path => {
            path.classList.add('draw-svg');
            $(path).css({
                'fill-opacity': '1'
            });
        })
    }
}