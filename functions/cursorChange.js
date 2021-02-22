/* замена курсора */
import initCoordTracking from "./utils/initCoordTracking.js"
export default function cursorChange(params) {
    const triggers = params.triggers || null,
        hasNewNormalStyle = params.hasNewNormalStyle || false,
        isCursorHidden = params.isCursorHidden || false,
        enableMixBlendMode = params.mixBlendMode || false,
        sourceOfNormal = params.sourceOfNormal || 'external',
        minWidth = params.minWidth || 1200,
        numStates = params.numStates || 0,
        sourceOfStates = params.sourceOfStates || 'external',
        normalExternal = params.normalExternal || '',
        normalInternal = params.normalInternal || null,
        statesExternal = params.statesExternal || null,
        statesInternal = params.statesInternal || null,
        hasDelay = params.hasDelay || false,
        delaySpeed = params.delaySpeed || 1,
        stateStyles = {},
        stateInners = [];
    let normalStyle = params.normalStyle;

    if ($(window).width() > minWidth) {
        cursorChange_add();
    }

    function cursorChange_add() {
        $("body").prepend(`
            <div class="cursor-changed">
                <div class="cursor-border"></div>
                <div class="cursor-normalStyle"></div>
            </div>`
        );
        const cursor = document.querySelector('.cursor-changed'),
            cursorBorder = cursor.querySelector('.cursor-border'),
            cursorNormal = cursor.querySelector('.cursor-normalStyle');
        $(cursor).css({
            position: 'fixed',
            left: '-100px',
            top: '0',
            overflow: 'visible',
            'z-index': '10000000000',
            'pointer-events': 'none',
            'mix-blend-mode': enableMixBlendMode ? 'difference' : 'normal'
        });

        if (hasNewNormalStyle) {
            if (sourceOfNormal == "internal") {
                const gif = getGif(normalInternal);
                cursorNormal.backgroundImage = gif;
            } else {
                cursorNormal.innerHTML = normalExternal;
            }
            if (isCursorHidden) {
                document.documentElement.style.cursor = 'none';
            }
        } else {
            normalStyle = {opacity: '0'};
        }
        $(cursorBorder).css(normalStyle);

        for (let i = 0; i < numStates; i++) {
            stateStyles[i] = params.stateStyles[i];
            stateStyles[i].opacity = '1';
            $(cursor).append(`<div class="cursor-state-${i}"></div>`);
            stateInners[i] = document.querySelector(`.cursor-state-${i}`);
            stateInners[i].style.opacity = 0;
            if (sourceOfStates[i] == "internal") {
                const { gif, width, height} = getGif(statesInternal[i]);
                $(stateInners[i]).css({
                    backgroundImage: gif,
                    backgroundSize: "100%",
                    width: width + 'px',
                    height: height + "px"
                })
                stateInners[i].style.backgroundImage = gif;
                stateInners[i].style.backgroundSize = "100%";
            } else {
                stateInners[i].innerHTML = statesExternal ? statesExternal[i] : "";
            }
        }

        $(cursor).children().css({
            display: 'grid',
            'place-items': 'center',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            top: '0',
            left: '0',
            transition: '0.25s ease'
        });

        if (hasDelay) {
            initCoordTracking(cursor, 'mousemove', 'abs', true, true, {delaySpeed, framerate: 15});
            document.addEventListener('mousemove', (e) => {
                cursor.setAttribute('data-target-x', e.clientX);
                cursor.setAttribute('data-target-y', e.clientY);
            });
        } else {
            document.addEventListener('mousemove', (event) => {
                $(cursor).css({
                    left: event.pageX,
                    top: event.pageY - $(window).scrollTop()
                });
            });
        }


        for (let i = 0; i < numStates; i++) {
            $(triggers[i]).css('cursor', 'none');
            $(triggers[i]).attr('data-makes-cursor-state', i);
            $(triggers[i]).mouseenter(turnCursorStateOn).mouseleave(turnCursorStateOff);
        }

        function turnCursorStateOn () {
            $(stateInners).css('opacity','0');
            stateInners.forEach(inner => inner.style.opacity = '0');
            const state = this.getAttribute('data-makes-cursor-state');
            $(cursorBorder).css(stateStyles[state]);
            cursorNormal.style.opacity = 0;
            stateInners[state].style.opacity = 1;
        }
        function turnCursorStateOff () {
            stateInners.forEach(inner => inner.style.opacity = '0');
            $(cursorBorder).css(normalStyle);
            cursorNormal.style.opacity = 1;
        }
        function getGif (selector) {
            const cont = document.querySelector(selector);
            const gif = cont.querySelector(`.tn-atom`).getAttribute('data-original');
            $(cont).remove();
            return {
                gif: `url(${gif})`,
                width: cont.getAttribute('data-field-width-value'),
                height: cont.getAttribute('data-field-height-value')
            }
        }
    }
}