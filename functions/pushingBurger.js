/* вытесняющий бургер */
export default function pushingBurger(params) {
    const burgerBlock = document.querySelector(params.burgerBlock),
        triggerBlock = document.querySelector(params.triggerBlock),
        burgerPosition = params.burgerPosition,
        burgerWidth = params.burgerWidth || $(window).width(),
        triggerLineHeight = params.triggerLineHeight || 4,
        triggerColor = params.triggerColor || 'black',
        easeTime = params.easeTime || 0.8,
        easeFunction = params.easeFunction || 'cubic-bezier(.8,0,.2,1)',
        triggerElem = triggerBlock.querySelector('.tn-elem'),
        burgerLinks = burgerBlock.querySelectorAll('a'),
        burgerArtboard = burgerBlock.querySelector('div').firstElementChild,
        burgerVh = burgerArtboard.getAttribute('data-artboard-height_vh'),
        burgerHeight = burgerVh ? +burgerVh*$(window).height()/100 : burgerArtboard.getAttribute('data-artboard-height');
    
    const allBlocks = document.querySelectorAll('[id ^= "rec"]'),
        allUsedBlocks = [...allBlocks].filter(block => !block.querySelector('.t-popup') && block != triggerBlock && block != burgerBlock);

    let pushingShiftX = 0,
        pushingShiftY = 0;
    
    $(allUsedBlocks).wrapAll('<div class="pushingBurger_blocksWrapper"></div>');
    const blocksWrapper = document.querySelector('.pushingBurger_blocksWrapper');
    $(blocksWrapper).css('transition', `transform ${easeTime}s ${easeFunction}`);

    $(burgerBlock).css({
        position: 'fixed',
        'z-index': '99',
        width: '100vw',
        height: burgerHeight + 'px',
        transition: `transform ${easeTime}s ${easeFunction}`,
        'background-color': window.getComputedStyle(burgerBlock.querySelector('.t396__artboard')).backgroundColor
    });
    $(burgerBlock).attr('data-burgeropened', 'false');

    switch (burgerPosition) {
        case 'top':
            $(burgerBlock).css({
                width: '100vw',
                top: `-${burgerHeight}px`,
                left: '0',
            });
            pushingShiftY = burgerHeight;
            break;
        case 'bottom':
            $(burgerBlock).css({
                width: '100vw',
                bottom: `${-burgerHeight}px`,
                left: '0',
            });
            pushingShiftY = -burgerHeight;
            break;
        case 'left':
            $(burgerBlock).css({
                width: burgerWidth + 'px',
                height: '100vh',
                top: '0',
                left: `${-burgerWidth}px`,
            });
            pushingShiftX = burgerWidth;
            $('body').css('overflowX', 'hidden');
            break;
        case 'right':
            $(burgerBlock).css({
                width: burgerWidth + 'px',
                height: '100vh',
                top: '0',
                right: `${-burgerWidth}px`,
            });
            pushingShiftX = -burgerWidth;
            $('body').css('overflowX', 'hidden');
            break;
        default:
            $(burgerBlock).css({
                width: '100vw',
                top: `-${burgerHeight}px`,
                left: '0',
            });
            pushingShiftY = burgerHeight;
            break;
    }

    // инициализация триггера
    $(triggerBlock).css({
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        'z-index': '99999999',
        'pointer-events': 'none'
    });
    triggerElem.innerHTML = `
        <div id="nav-icon">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    const burgerButton = triggerBlock.querySelector('#nav-icon');
    burgerButton.style.width = triggerElem.getAttribute('data-field-width-value') + 'px';
    burgerButton.style.height = triggerElem.getAttribute('data-field-height-value') + 'px';
    burgerButton.style.pointerEvents = 'auto';
    $(burgerButton).children().css({
        height: triggerLineHeight + 'px',
        'background-color': triggerColor
    });
    // !!! инициализация триггера

    burgerButton.addEventListener('click', toggleBurger);
    $(burgerLinks).on('click', toggleBurger);
    if (params.addTriggers) {   // если надо добавить триггеры
        const addTriggers = document.querySelectorAll(params.addTriggers);
        $(addTriggers).on('click', toggleBurger);
        $(addTriggers).css('cursor', 'pointer');
    }

    function toggleBurger() {
        if ($(burgerBlock).attr('data-burgeropened') == 'false') {
            $(blocksWrapper).css('transform', `translate(${pushingShiftX}px, ${pushingShiftY}px)`);
            $(burgerBlock).css('transform', `translate(${pushingShiftX}px, ${pushingShiftY}px)`);
            $(burgerBlock).attr('data-burgeropened', 'true');
            burgerButton.classList.add('open');
        } else {
            $(blocksWrapper).css('transform', 'translate(0)');
            $(burgerBlock).css('transform', 'translate(0)');
            $(burgerBlock).attr('data-burgeropened', 'false');
            burgerButton.classList.remove('open');
        }
    }
}