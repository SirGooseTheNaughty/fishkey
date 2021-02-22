/* утилита для получения значений размеров на разной ширине экрана */
export default function getElemDim (elem, dim) {
    const tildaBreakpoints = [1200, 980, 640, 480, 320];
    const ww = $(window).width();
    let currentBreakpoint;
    let result = null;
    const queries = [
        `data-field-${dim}-value`,
        `data-field-${dim}-res-960-value`,
        `data-field-${dim}-res-640-value`,
        `data-field-${dim}-res-480-value`,
        `data-field-${dim}-res-320-value`
    ];
    for(let i = 0; i < tildaBreakpoints.length; i++) {
        if (ww > tildaBreakpoints[i]) {
            currentBreakpoint = i;
            break;
        }
    }
    for(let i = currentBreakpoint; i >= 0; i--) {
        result = elem.getAttribute(queries[i]);
        if (result) {
            return result;
        }
    }
}