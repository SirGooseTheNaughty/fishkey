/* односторонняя кнопка */
export default function oneSideButton(params) {
    const targetOneSideButtonsPars = document.querySelectorAll(params.selectors),  // кнопки (второй уровень)
        oneSideButtonStyle = {
            firstColor: params.firstColor || 'black',			    // код первого цвета
            secondColor: params.secondColor || 'white',		    // код второго цвета
            whereTo: params.whereTo || 'left',                // направление смещения: right / left / top / bottom
            firstTextColor: params.firstTextColor || 'white',         // код первого цвета текста
            secondTextColor: params.secondTextColor || 'black',         // код второго цвета текста
            animTime: params.animTime || 400                  // время анимации (в миллисекундах)
        },
        minWidth = params.minWidth || 1200;    // минимальная ширина экрана для анимации

    let animTimeout = '';
    function changeOneSideButton(firstColor, secondColor, button) {
        button.setAttribute('isAnimEnded', false);
        $(button).css({
            "transition": `${oneSideButtonStyle.animTime/1000}s ease`,
            "background-position": oneSideButtonStyle.secondPosition
        });
        animTimeout = setTimeout(function(){
            $(button).css({
                'transition': 'none',
                'background': `linear-gradient(${oneSideButtonStyle.whereTo}, ${secondColor} 50%, ${firstColor} 50%)`,
                'background-position': oneSideButtonStyle.firstPosition,
                'background-size': oneSideButtonStyle.backgroundSize
            });
            button.setAttribute('isAnimEnded', true);
        }, oneSideButtonStyle.animTime);
    }

    if ($(window).width() > minWidth) {
        const targetButtons = [];
        targetOneSideButtonsPars.forEach((button, i) => {
            targetButtons[i] = button.firstElementChild;
        });
        oneSideButtonStyle.backgroundSize = (oneSideButtonStyle.whereTo == 'left' || oneSideButtonStyle.whereTo == 'right') ? '200% 100%' : '100% 200%';
        if (oneSideButtonStyle.whereTo == 'left') {
            oneSideButtonStyle.firstPosition = 'left bottom';
            oneSideButtonStyle.secondPosition = 'right bottom';
        } else if (oneSideButtonStyle.whereTo == 'right') {
            oneSideButtonStyle.firstPosition = 'right bottom';
            oneSideButtonStyle.secondPosition = 'left bottom';
        } else if (oneSideButtonStyle.whereTo == 'top') {
            oneSideButtonStyle.firstPosition = 'left top';
            oneSideButtonStyle.secondPosition = 'left bottom';
        } else if (oneSideButtonStyle.whereTo == 'bottom') {
            oneSideButtonStyle.firstPosition = 'left bottom';
            oneSideButtonStyle.secondPosition = 'left top';
        }  
        oneSideButtonStyle.whereTo = 'to ' + oneSideButtonStyle.whereTo;  
        $(targetButtons).css({
            'background': `linear-gradient(${oneSideButtonStyle.whereTo}, ${oneSideButtonStyle.secondColor} 50%, ${oneSideButtonStyle.firstColor} 50%)`,
            'background-position': oneSideButtonStyle.firstPosition,
            'background-size': oneSideButtonStyle.backgroundSize,
            'color': oneSideButtonStyle.firstTextColor
        });

        

        $(targetButtons).attr('isAnimEnded', true);
        
        $(targetButtons).on('mouseenter', function() {
                if (this.getAttribute('isAnimEnded') == 'true') {
                    changeOneSideButton(oneSideButtonStyle.secondColor, oneSideButtonStyle.firstColor, this);
                } else {
                    clearTimeout(animTimeout);
                    $(this).css({"background-position": oneSideButtonStyle.firstPosition});
                    this.setAttribute('isAnimEnded', true);
                }
                $(this).css('color', oneSideButtonStyle.secondTextColor);
            })
            .on('mouseleave', function() {
                if (this.getAttribute('isAnimEnded') == 'true') {
                    changeOneSideButton(oneSideButtonStyle.firstColor, oneSideButtonStyle.secondColor, this);
                } else {
                    clearTimeout(animTimeout);
                    $(this).css({"background-position": oneSideButtonStyle.firstPosition});
                    this.setAttribute('isAnimEnded', true);
                }
                $(this).css('color', oneSideButtonStyle.firstTextColor);
            });
    }
}