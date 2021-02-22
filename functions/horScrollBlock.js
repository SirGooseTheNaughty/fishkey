/* горизонтальный скролл элементов одного блока */
import initCoordTracking from "./utils/initCoordTracking.js"
export default function horScrollBlock(parameters) {
    const horScrollBlock = document.querySelector(parameters.block),
        header = parameters.header ? document.querySelector(parameters.header) : null,
        minWidth = parameters.minWidth || 1200,
        totalShift = parameters.totalShift,
        blockHeight = parameters.blockHeight,
        hasDelay = parameters.hasDelay || false,
        delaySpeed = parameters.delaySpeed || 1;

    let headerTop = 0,
        headerHeight = 0,
        horScrollContainer = {};
    
    if ($(window).width() > minWidth) {
        const children = $(horScrollBlock.querySelector('.t396__artboard')).children();

        $(children).wrapAll('<div class="horScrollContainer"></div>');
        horScrollContainer = document.querySelector('.horScrollContainer');

        if (header) {
            headerTop = $(header).offset().top;
            headerHeight = $(header).height();
        } else {
            headerTop = $(horScrollContainer).offset().top;
        }

        if (hasDelay) {
            initCoordTracking(horScrollContainer, 'scroll', 'rel', true, true, {delaySpeed, framerate: 15});
        }

        $(horScrollContainer).css({top: '0', left: '0',});
        header ? $(header).css({top: '0', left: '0', width: '100vw', 'z-index': '100'}) : false;
        $(horScrollBlock).css({
            height: totalShift + blockHeight + 'px',
            backgroundColor: window.getComputedStyle(horScrollBlock.querySelector('.t396__artboard')).backgroundColor,
            overflow: 'hidden'
        });
        horScrollContainer.parentElement.style.overflow = 'visible';

        if (hasDelay) {
            window.addEventListener('scroll', () => {
                horScrollBlockDelay_handler();
            });
        } else {
            window.addEventListener('scroll', () => {
                horScrollBlock_handler();
            });
        }
    }

    function horScrollBlock_handler() {
        const wt = $(window).scrollTop(),
            horScrollShift = +wt - headerTop;
        if (wt < headerTop) {
            $(horScrollContainer).css({
                'position': 'relative',
                transform: 'translate(0)'
            });
            header ? $(header).css({'position': 'relative'}) : false;
        } else if (horScrollShift < totalShift) {
            $(horScrollContainer).css({
                'position': 'fixed',
                transform: `translate(-${horScrollShift}px, ${headerHeight}px)`
            });
            header ? $(header).css({position: 'fixed', transform: 'translate(0)'}) : false;
            horScrollBlock.style.paddingBottom = `${headerHeight}px`;
        } else {
            $(horScrollContainer).css({
                'position': 'relative',
                'padding-bottom': '0',
                transform: `translate(-${totalShift}px, ${totalShift}px)`
            });
            header ? $(header).css({position: 'relative', transform: `translate(0, ${totalShift}px)`}) : false;
            horScrollBlock.style.paddingBottom = '0';
        }
    }

    function horScrollBlockDelay_handler() {
        const wt = $(window).scrollTop(),
            horScrollShift = +wt - headerTop;
        if (wt < headerTop) {
            $(horScrollContainer).css({
                'position': 'relative'
            });
            horScrollContainer.setAttribute('data-target-x', 0);
            horScrollContainer.setAttribute('data-target-y', 0);
            horScrollContainer.setAttribute('data-current-y', 0);
            header ? $(header).css({'position': 'relative'}) : false;
        } else if (horScrollShift < totalShift) {
            $(horScrollContainer).css({
                'position': 'fixed'
            });
            horScrollContainer.setAttribute('data-target-x', -horScrollShift);
            horScrollContainer.setAttribute('data-target-y', headerHeight);
            horScrollContainer.setAttribute('data-current-y', headerHeight);

            header ? $(header).css({position: 'fixed', transform: 'translate(0)'}) : false;
            horScrollBlock.style.paddingBottom = `${headerHeight}px`;
        } else {
            $(horScrollContainer).css({
                'position': 'relative',
                'padding-bottom': '0'
            });
            horScrollContainer.setAttribute('data-target-x', -totalShift);
            horScrollContainer.setAttribute('data-target-y', totalShift);
            horScrollContainer.setAttribute('data-current-y', totalShift);

            header ? $(header).css({position: 'relative', transform: `translate(0, ${totalShift}px)`}) : false;
            horScrollBlock.style.paddingBottom = '0';
        }
    }
}