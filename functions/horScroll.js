/* горизонтальный скролл нескольких блоков */
import initCoordTracking from "./utils/initCoordTracking.js"
export default function horScroll(params) {
    const horScrollBlocks = document.querySelectorAll(params.blocks),
        horScrollMinWidth = params.minWidth || 1200,
        speedCoeff = params.speedCoeff || 1,
        hasDelay = params.hasDelay || false,
        delaySpeed = params.delaySpeed || 1,

        horScrollwh = $(window).height(),
        horScrollww = $(window).width(),
        horScrollBlocksNum = $(horScrollBlocks).length,
        horScrollTotalHeight = (horScrollBlocksNum-1)*horScrollww/speedCoeff + horScrollwh,
        horScrollBlockTop = $(horScrollBlocks[0]).offset().top,
        horScrollStop = (horScrollBlocksNum-1)*horScrollww/speedCoeff;
    let horScrollContainer = '';

    if ($(window).width() > horScrollMinWidth) {
        $(horScrollBlocks).wrapAll('<div class="horScrollContainer"></div>');
        horScrollContainer = document.querySelector('.horScrollContainer');
        if (hasDelay) {
            initCoordTracking(horScrollContainer, 'scroll', 'rel', true, true, {framerate: 15, delaySpeed});
        }
        $(horScrollContainer).wrap('<div class="horScrollStaticContainer"></div>');
        $('.horScrollStaticContainer').css({
            'background-color': horScrollBlocks[0].querySelector('.t396__artboard').style.backgroundColor, 
            'position': 'relative', 
            'overflow': 'hidden', 
            'height': `${horScrollTotalHeight}px`
        });
        $(horScrollContainer).css({'position': 'relative', 'top': '0', 'left': '0'});
        $(horScrollBlocks).css({
            'position': 'absolute',
            'width': '100vw',
            'height': '100vh',
            'top': '0'
        });
        horScrollBlocks.forEach((block, i) => {
            block.style.left = i*horScrollww+'px';
        });
    
        if (hasDelay) {
            document.addEventListener('scroll', horizontalScrollDelay);
        } else {
            document.addEventListener('scroll', horizontalScroll);
        }
    }

    function horizontalScroll() {
        const wt = $(window).scrollTop();
        let horScrollShift = +wt - horScrollBlockTop;
        if (horScrollShift < 0) {
            $(horScrollContainer).css({
                position: 'relative',
                transform: 'translate(0)'
            });
        } else if (horScrollShift < horScrollStop) {
            $(horScrollContainer).css({
                position: 'fixed',
                transform: `translate(${-horScrollShift*speedCoeff}px, 0)`
            });
        } else {
            $(horScrollContainer).css({
                position: 'relative',
                transform: `translate(${-horScrollStop*speedCoeff}px, ${horScrollStop}px)`
            });
        }
    }

    function horizontalScrollDelay() {
        const wt = $(window).scrollTop();
        let horScrollShift = +wt - horScrollBlockTop;
        if (horScrollShift < 0) {
            $(horScrollContainer).css({
                position: 'relative'
            });
            horScrollContainer.setAttribute('data-target-x', 0);
            horScrollContainer.setAttribute('data-target-y', 0);
        } else if (horScrollShift < horScrollStop) {
            $(horScrollContainer).css({
                position: 'fixed'
            });
            horScrollContainer.setAttribute('data-target-x', -horScrollShift*speedCoeff);
            horScrollContainer.setAttribute('data-target-y', 0);
            horScrollContainer.setAttribute('data-current-y', 0);
        } else {
            $(horScrollContainer).css({
                position: 'relative'
            });
            horScrollContainer.setAttribute('data-current-y', horScrollStop);
            horScrollContainer.setAttribute('data-target-x', -horScrollStop*speedCoeff);
            horScrollContainer.setAttribute('data-target-y', horScrollStop);
        }
    }
}