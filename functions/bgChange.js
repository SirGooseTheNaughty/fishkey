// смена фонов
export default function bgChange(params) {
    const { colors, breakpointBlocks } = params,
        minWidth = params.minWidth || 0,
        animTime = params.animTime || 0.5;
    const breakpoints = [],
        offsets = [];
    const body = document.querySelector('body');

    if ($(window).width() > minWidth) {
        bgChange();
        setTimeout(() => {
            body.style.transition = `background-color ${animTime}s linear`;
            breakpointBlocks.forEach((block, i) => {
                offsets[i] = $(window).height()*params.offsets[i]/100 || 0;
                breakpoints[i] = $(block).offset().top + offsets[i];
            });
        }, 50);
        document.addEventListener('scroll', bgChange);
    }

    function bgChange() {
        const scr = $(window).scrollTop();
        let currentColor = 0;
        breakpoints.forEach((breakpoint, i) => {
            if (scr > breakpoint) {
                currentColor = i + 1;
            }
        });
        body.style.backgroundColor = colors[currentColor];
    }
}