/* текст над элементами */
import initCoordTracking from "./utils/initCoordTracking.js"
export default function hoverText(params) {
    const hoverTextObjects = document.querySelectorAll(params.selectors),
        hoverTextCursor = document.querySelector(params.cursor),
        hoverTexts = params.texts,
        isCursorHidden = params.isCursorHidden || false,
        minWidth = params.minWidth || 1200;

    if ($(window).width() > minWidth) {
        hoverTextObjects.forEach((obj, i) => {
            obj.setAttribute('data-text', hoverTexts[i]);
            obj.classList.add('textHover');
        });

        if (isCursorHidden) {
            hiddenCursor = 'none';
        } else {
            hiddenCursor = 'auto';
        }
    
        $(hoverTextCursor).css({
            transform: 'translate(-50%, -50%)',
            opacity: '0',
            position: 'fixed',
            top: '0',
            left: '0',
            'z-index': '9999',
            'pointer-events': 'none'
        });

        initCoordTracking(hoverTextCursor, 'mousemove', 'abs', true, true, {});
        document.addEventListener('mousemove', (e) => {
            hoverTextCursor.setAttribute('data-target-x', e.clientX);
            hoverTextCursor.setAttribute('data-target-y', e.clientY);
        });
    
        $(".textHover").mouseenter(function(event) {
                hoverTextCursor.firstElementChild.innerText = event.target.getAttribute('data-text');
                hoverTextCursor.style.transition = 'opacity 0.25s ease';
                hoverTextCursor.style.opacity = '1';
                document.documentElement.style.cursor = hiddenCursor;
            })
            .mouseleave(function(event) {
                hoverTextCursor.style.transition = 'opacity 0.1s ease';
                hoverTextCursor.style.opacity = '0';
                document.documentElement.style.cursor = 'auto';
            });
    } 
}