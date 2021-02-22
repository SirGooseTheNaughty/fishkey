/* хвост курсора */
export default function cursorTail(params) {
    const mt_color = params.color || 'red',
        mt_radius = params.radius || 10,
        mt_numPoints = params.numPoints || 50,
        mt_overallOpacity = params.opacity || 0.5,
        tailDelay = params.tailDelay || 5;

    let mt_circles = '',
        mouseX = 0,
        mouseY= 0;

    if ($(window).width() > params.minWidth) {
        $('body').prepend(
            `<svg id="mouseTail" xmlns="http://www.w3.org/2000/svg" 
            width="100vw" height="100vh" viewBox="0 0 100% 100%" 
            style="position: fixed; top: 0; left: 0; z-index: 99999"></svg>`
        );

        const svgns = "http://www.w3.org/2000/svg",
            svg = document.querySelector("#mouseTail");
    
        let newCircle = {};
        
        for (let i = mt_numPoints; i > 0; i--) {
            newCircle = document.createElementNS(svgns, "circle");
            newCircle.style.opacity = mt_overallOpacity*(i/mt_numPoints)/Math.sqrt(mt_numPoints);
            svg.appendChild(newCircle);
        }
        svg.style.pointerEvents = 'none';
        mt_circles = document.querySelectorAll('#mouseTail circle');
        $(mt_circles).attr({
            transform: 'matrix(1, 0, 0, 1, 0, 0)',
            r: mt_radius,
            fill: mt_color
        });
    
        setInterval(trailCoordsRefresh, tailDelay);
    
        document.addEventListener('mousemove', function(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });
    }

    function trailCoordsRefresh() {
        let circleX = 0, circleY = 0, circleNewX = 0, circleNewY = 0, speed = 10;

        mt_circles.forEach((circle, i) => {
            circleX = circle.getAttribute('transform').split(', ')[4];
            circleY = circle.getAttribute('transform').split(', ')[5];
            circleY = circleY.substr(0, circleY.length-1);
            circleNewX = +circleX + (mouseX - circleX)/(i + 1);
            circleNewY = +circleY + (mouseY - circleY)/(i + 1);
            circle.setAttribute("transform", `matrix(1, 0, 0, 1, ${circleNewX}, ${circleNewY})`);
        });
    }
}