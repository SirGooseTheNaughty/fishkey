/* универсальный бургер */
import setBurgerTrigger from "./utils/setBurgerTrigger.js"
export default function uniBurger(params) {
    const burgerBlock = document.querySelector(params.burgerBlock),
        triggerBlock = document.querySelector(params.triggerBlock),
        isTriggerCustom = params.isTriggerCustom || false,
        triggerElems = {
            std: {},
            customOn: {},
            customOff: {},
            triggerLineHeight: 1,
            triggerColor: 'black'
        },
        // triggerElem = triggerBlock.querySelector('.tn-elem'),
        burgerTransTime = params.burgerTime || 1,
        burgerElemsTransTime = params.elementsTime || 0.4,
        startPos = [
            params.verticalPosition || 'top',
            params.horizontalPosition || 'left'
        ],
        burgerShape = params.burgerShape || 'circle',
        shownStyle = {'z-index': '99'},
        hiddenStyle = {
            'width': '0',
            'height': '0',
            'z-index': '0'
        },
        burgerLinks = burgerBlock.querySelectorAll('a');

    if (isTriggerCustom) {
        triggerElems.customOn = document.querySelector(params.customOn);
        triggerElems.customOff = document.querySelector(params.customOff);
    } else {
        triggerElems.triggerLineHeight = params.triggerLineHeight || 2;
        triggerElems.triggerColor = params.triggerColor || 'black';
    }

    // инициализация триггера
    setBurgerTrigger(isTriggerCustom, triggerBlock, triggerElems, toggleBurger);

    $(burgerBlock).wrap('<div class="burgerWrapper"></div>');
    const burgerWrapper = document.querySelector('.burgerWrapper');

    function burgerReshape() {
        const ww = $(window).width() + 17,
            wh = $(window).height(),
            maxDim = Math.max(ww, wh);

        switch (burgerShape) {
            case 'rect': 
                shownStyle.width = '100vw';
                shownStyle.height = '100vh';
                if (startPos[0] == 'center') {
                    hiddenStyle.top = '50%';
                    shownStyle.top = '0';
                } else if (startPos[0] == 'bottom') {
                    hiddenStyle.top = '100%';
                    shownStyle.top = '0';
                } else {
                    hiddenStyle[startPos[0]] = '0';
                }
                if (startPos[1] == 'center') {
                    hiddenStyle.left = '50%';
                    shownStyle.left = '0';
                } else {
                    hiddenStyle[startPos[1]] = '0';
                }
                break;
            case 'square': 
                shownStyle.width = maxDim;
                shownStyle.height = maxDim;
                if (startPos[0] == 'center') {
                    hiddenStyle.top = '50%';
                    shownStyle.top = (wh - ww)/2 + 'px';
                } else if (startPos[0] == 'bottom') {
                    hiddenStyle.top = '100%';
                    shownStyle.top = (wh - ww) + 'px';
                } else {
                    hiddenStyle[startPos[0]] = '0';
                }
                if (startPos[1] == 'center') {
                    hiddenStyle.left = '50%';
                    shownStyle.left = '0';
                } else {
                    hiddenStyle[startPos[1]] = '0';
                }
                break;
            case 'circle': 
                $(burgerWrapper).css('border-radius', '50%');
                let diameter = 2*Math.sqrt(ww*ww/4 + wh*wh/4);
                if ((startPos[0] != 'center') || (startPos[1] != 'center')) {
                    diameter = 2*Math.sqrt(ww*ww + wh*wh);
                }
                if (startPos[0] == 'center') {
                    hiddenStyle.top = '50%';
                    shownStyle.top = -(diameter - wh)/2 + 'px';
                } else if (startPos[0] == 'bottom') {
                    hiddenStyle.top = '100%';
                    shownStyle.top = -(diameter/2 - wh) + 'px';
                } else if (startPos[0] == 'top') {
                    hiddenStyle.top = '0';
                    shownStyle.top = -diameter/2 + 'px';
                }
                if (startPos[1] == 'center') {
                    hiddenStyle.left = '50%';
                    shownStyle.left = -(diameter - ww)/2 + 'px';
                } else if (startPos[1] == 'right') {
                    hiddenStyle.right = '0';
                    shownStyle.right = -diameter/2 + 'px';
                } else if (startPos[1] == 'left') {
                    hiddenStyle.left = '0';
                    shownStyle.left = -diameter/2 + 'px';
                }
                shownStyle.width = diameter;
                shownStyle.height = diameter;
                break;
        }
    }

    (function burgerInit() {
        const burgerBGColor = $(burgerBlock).children('div').children('div').css('background-color');
        $(burgerBlock).children('div').children('div').css('background-color', 'none');
        burgerBlock.classList.add('burgerBlock', 'burgerHidden');
        
        burgerReshape();

        $(burgerWrapper).css({
            'background-color': burgerBGColor,
            'width': '0',
            'height': '0',
            'transition': `${burgerTransTime}s ease`,
            'z-index': '9998'
        });
    })();

    $(burgerWrapper).css(hiddenStyle);

    $(burgerBlock).css('transition', `opacity ${burgerElemsTransTime}s ease`);

    function toggleBurger() {
        if (burgerBlock.classList.contains('burgerHidden')) {
            document.documentElement.style.overflowY = 'burgerHidden';
            $(burgerWrapper).css(shownStyle);
            setTimeout(() => {
                burgerBlock.classList.remove('burgerHidden');
                burgerBlock.classList.add('burgerShown');
            }, 1000*burgerTransTime);
        } else {
            burgerBlock.classList.add('burgerHidden');
            burgerBlock.classList.remove('burgerShown');
            setTimeout(() => {
                document.documentElement.style.overflowY = 'auto';
                $(burgerWrapper).css(hiddenStyle);
            }, 1000*burgerElemsTransTime);
            
        }
    }

    burgerLinks.forEach(burgerLink => burgerLink.addEventListener('click', toggleBurger));

    window.onresize = burgerReshape;
}