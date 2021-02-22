/* утилита для плавного расчета координат */
export default function initCoordTracking(obj, trigger, positioning, hasX, hasY, params) {
    let isIntSet = false;
    let coordInt = '';
    const framerate = params.framerate || 20;
    const speed = params.delaySpeed || 1;
    const tolerance = params.tolerance || 1;
    const oneCoordChange = params.customFunction || smoothChange;

    if (hasX) {
        obj.setAttribute('data-current-x', 0);
        obj.setAttribute('data-target-x', 0);
    }
    if (hasY) {
        obj.setAttribute('data-current-y', 0);
        obj.setAttribute('data-target-y', 0);
    }

    document.addEventListener(trigger, (e) => {
        if (!isIntSet) {
            coordInt = setInterval(() => {
                requestAnimationFrame(moveObj);
            }, framerate);
            isIntSet = true;
        }
    });

    function moveObj() {
        const curr = {
            x: null,
            y: null
        };
        const target = {
            x: null,
            y: null
        };
        const newCoord = {
            x: null,
            y: null
        };
        const translation = {
            x: 0,
            y: 0
        };
        let totalError = 0;
        if (hasX) {
            curr.x = +obj.getAttribute('data-current-x');
            target.x = +obj.getAttribute('data-target-x');
            newCoord.x = oneCoordChange(curr.x, target.x);
            obj.setAttribute('data-current-x', newCoord.x);
            if (positioning == 'abs') {
                obj.style.left = newCoord.x + 'px';
            } else {
                translation.x = newCoord.x + 'px';
            }
            totalError += Math.abs(target.x - curr.x);
        }
        if (hasY) {
            curr.y = +obj.getAttribute('data-current-y');
            target.y = +obj.getAttribute('data-target-y');
            newCoord.y = oneCoordChange(curr.y, target.y);
            obj.setAttribute('data-current-y', newCoord.y);
            if (positioning == 'abs') {
                obj.style.top = newCoord.y + 'px';
            } else {
                translation.y = newCoord.y + 'px';
            }
            totalError += Math.abs(target.y - curr.y);
        }
        if (positioning == 'rel') {
            obj.style.transform = `translate(${translation.x}, ${translation.y})`;
        }
        if (totalError < tolerance) {
            clearInterval(coordInt);
            isIntSet = false;
        }
    }
    
    function smoothChange(curr, target) {
        const leng = target - curr;
        const rise = 0.8*Math.sign(leng)*Math.cbrt(speed*Math.abs(leng)*Math.abs(leng));
        if (Math.abs(rise) < tolerance) {
            return target;
        }
        return curr + rise;
    }
}