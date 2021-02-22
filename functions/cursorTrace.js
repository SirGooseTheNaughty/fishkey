/* след курсора */
export default function cursorTrace(params) {
    const minWidth = params.minWidth || 1200,
        mt_numPoints = params.numPoints || 50,
        mt_overallOpacity = params.opacity || 0.2,
        traceDelay = params.traceDelay || 5,
        mt_cursorStyle = params.cursorStyle,
        mt_trailStyle = params.traceStyle,
        trailCoords = {
            x: [],
            y: []
        };

    let mouseX = 0,
        mouseY= 0,
        mt_refreshInt = '',
        isRefreshing = false,
        mt_circles = '';

    if ($(window).width() > minWidth) {
        $('body').prepend(
            `<svg id="mouseTail" xmlns="http://www.w3.org/2000/svg" 
            width="100vw" height="100vh" viewBox="0 0 100% 100%" 
            style="position: fixed; top: 0; left: 0; z-index: 99999"></svg>`
        );

        const svgns = "http://www.w3.org/2000/svg",
            svg = document.querySelector("#mouseTail");

        let newCircle = {};
        
        for(let i = mt_numPoints; i > 0; i--) {
            newCircle = document.createElementNS(svgns, "circle");
            newCircle.style.opacity = mt_overallOpacity*(i/mt_numPoints)/Math.sqrt(mt_numPoints);
            svg.appendChild(newCircle);
        }
        svg.style.pointerEvents = 'none';
        mt_circles = document.querySelectorAll('#mouseTail circle');
        $(mt_circles).attr(mt_trailStyle);
        $(mt_circles[0]).attr(mt_cursorStyle);

        for (let i = 0; i < mt_numPoints; i++) {
            trailCoords.x[i] = 0;
            trailCoords.y[i] = 0;
        }
        
        document.addEventListener('mousemove', function(event) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            if (!isRefreshing) {
                mt_refreshInt = setInterval(trailCoordsRefresh, traceDelay);
                isRefreshing = true;
            }
        });
    }

    function trailCoordsRefresh() {
        trailCoords.x.unshift(mouseX);
        trailCoords.y.unshift(mouseY);
        trailCoords.x.pop();
        trailCoords.y.pop();

        mt_circles.forEach((circle, i) => {
            circle.setAttribute("transform", `matrix(1, 0, 0, 1, ${trailCoords.x[i]}, ${trailCoords.y[i]})`);
        });

        if ((mt_circles[0].getAttribute("transform") === mt_circles[98].getAttribute("transform"))) {
            clearInterval(mt_refreshInt);
            isRefreshing = false;
        }
    }
}