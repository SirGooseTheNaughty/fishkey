/* горизонтальный скролл всей страницы */
import initCoordTracking from "./utils/initCoordTracking.js"
export default function fullPageHorScroll(parameters) {
    const horScrollBlocks = document.querySelectorAll(parameters.blocks),
        horScrollMenu = parameters.menu ? document.querySelector(parameters.menu) : null,
        horScroll_minWidth = parameters.minWidth || 1200,
        horScroll_blockWidth = parameters.blockWidth || $(window).width(),
        hasDelay = parameters.hasDelay || false,
        delaySpeed = parameters.delaySpeed || 1;
        
    const horScrollwh = $(window).height(),
        horScrollBlocksNum = horScrollBlocks.length,
        horScrollTotalHeight = (horScrollBlocksNum-1)*horScroll_blockWidth + horScrollwh,
        horScrollMenuHeight = horScrollMenu ? $(horScrollMenu).height() : 0,
        horScrollBlockShifts = {};

    let horScrollContainer = {};

    if ($(window).width() > horScroll_minWidth) {
        $(horScrollBlocks).wrapAll('<div class="horScrollContainer"></div>');
        horScrollContainer = document.querySelector('.horScrollContainer');
        if (hasDelay) {
            initCoordTracking(horScrollContainer, 'scroll', 'rel', true, false, {delaySpeed, framerate: 15});
        }

        $(horScrollBlocks).css({
            'position': 'absolute',
            'width': horScroll_blockWidth+'px',
            'height': '100vh',
            'top': '0'
        });
        horScrollBlocks.forEach((block, i) => {
            block.style.left = `${i*horScroll_blockWidth}px`;
            horScrollBlockShifts['#'+block.getAttribute('id')] = `${i*horScroll_blockWidth}`;
        });
        if (horScrollMenu) {
            $(horScrollMenu).css({'position': 'fixed', 'width': '100%', 'z-index': '999'});
        }
        $(horScrollContainer).css({'position': 'fixed', 'top': horScrollMenuHeight, 'left': '0'});
        $(horScrollContainer).wrap('<div class="horScrollStaticContainer"></div>');
        $('.horScrollStaticContainer').css({
            'position': 'relative', 
            'top': horScrollMenuHeight, 
            'overflow': 'hidden', 
            'height': `${horScrollTotalHeight}px`
        });

        if (hasDelay) {
            window.addEventListener('scroll', () => {
                horizontalScrollDelay();
            });
        } else {
            window.addEventListener('scroll', () => {
                horizontalScroll();
            });
        }

        $('a').on('click', (e) => {
            if ($(e.target).attr('href').substring(0,4) == '#rec') {
                const dn = horScrollBlockShifts[$(e.target).attr('href')];
                $('html, body').animate({scrollTop: dn}, 400);
            }
        });
    }
    function horizontalScroll() {
        const wt = $(window).scrollTop();
        let horScrollShift = +wt;
        if (horScrollShift < (horScrollBlocksNum-1)*horScroll_blockWidth) {
            horScrollContainer.style.transform = `translate(${-horScrollShift}px, 0)`;
        }
    }
    function horizontalScrollDelay() {
        const wt = $(window).scrollTop();
        let horScrollShift = +wt;
        if (horScrollShift < (horScrollBlocksNum-1)*horScroll_blockWidth) {
            horScrollContainer.setAttribute('data-target-x', -horScrollShift);
        }
    }
}