/* перетаскивалка */
import initCoordTracking from "./utils/initCoordTracking.js"
export default function horDrag(params) {
    const horDragGallery = document.querySelector(params.block),
        horDragObj = horDragGallery.querySelector('div').firstElementChild;
    const hasDelay = params.hasDelay || false;
    const delaySpeed = params.delaySpeed || 1;
    const minWidth = params.minWidth || 0;

    let dragStartX = 0,
        dragObjStartX = 0,
        horDragMinLeft = 0,
        horDragMaxLeft = 0;

    if ($(window).width() > minWidth) {
        if (hasDelay) {
            initCoordTracking(horDragObj, 'mousemove', 'rel', true, false, {delaySpeed, framerate: 15});
        }
        horDragObj.style.overflow = 'visible';
        horDragObj.style.cursor = 'pointer';
        document.body.style.overflowX = 'hidden';

        const elements = horDragObj.querySelectorAll('.tn-elem'),
            lefts = [],
            widths = [];

        elements.forEach((el, i) => {
            lefts[i] = +el.getBoundingClientRect().x;
            widths[i] = +el.getAttribute('data-field-width-value');
        });

        const offsetLeft = Math.min.apply(Math, lefts),
            maxRight = Math.max.apply(Math, lefts),
            rightCorner = offsetLeft + maxRight + widths[lefts.indexOf(maxRight)];

        $(horDragObj).css({
            position: 'relative',
            top: '0',
            left: '0',
            width: rightCorner + 'px'
        });

        horDragMaxLeft = $(window).width() - $(horDragObj).width();

        if (hasDelay) {
            horDragObj.addEventListener('mousedown', function(event) {
                dragStartX = event.clientX;
                document.addEventListener('mousemove', horDragDelay);
            });
            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', horDragDelay);
                dragObjStartX = +horDragObj.getAttribute('data-target-x');
            });
        } else {
            horDragObj.addEventListener('mousedown', function(event) {
                dragStartX = event.clientX;
                document.addEventListener('mousemove', horDrag);
            });
            document.addEventListener('mouseup', function(event) {
                document.removeEventListener('mousemove', horDrag);
                dragObjStartX = +horDragObj.getAttribute('data-current-x');
            });
        }
    }

    function horDrag(event) {
        const start = event.clientX || event.touches[0].clientX;
        const horDragShift = start - dragStartX,
            horDragNewPos = dragObjStartX + horDragShift;
        if (horDragNewPos < horDragMinLeft && horDragNewPos > horDragMaxLeft) {
            horDragObj.style.transform = `translate(${dragObjStartX + horDragShift}px, 0)`;
            horDragObj.setAttribute('data-current-x', dragObjStartX + horDragShift);
        } else if (horDragNewPos > horDragMinLeft) {
            horDragObj.style.transform = `translate(${horDragMinLeft}px, 0)`;
            horDragObj.setAttribute('data-current-x', horDragMinLeft);
        } else if (horDragNewPos < horDragMaxLeft) {
            horDragObj.style.transform = `translate(${horDragMaxLeft}px, 0)`;
            horDragObj.setAttribute('data-current-x', horDragMaxLeft);
        }
    }

    function horDragDelay(event) {
        const horDragShift = event.clientX - dragStartX,
            horDragNewPos = dragObjStartX + horDragShift;
        if (horDragNewPos < horDragMinLeft && horDragNewPos > horDragMaxLeft) {
            horDragObj.setAttribute('data-target-x', dragObjStartX + horDragShift);
        } else if (horDragNewPos > horDragMinLeft) {
            horDragObj.setAttribute('data-target-x', horDragMinLeft);
        } else if (horDragNewPos < horDragMaxLeft) {
            horDragObj.setAttribute('data-target-x', horDragMaxLeft);
        }
    }
}