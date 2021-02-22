/* видео в кружок */
export default function videoCircle(params) {
    const videoCircle = document.querySelectorAll(params.videos);
    const autoSize = params.autoSize == undefined ? true : params.autoSize;
    videoCircle.forEach((video, i) => {
        if (autoSize) {
            params.circleDiams[i] = Math.max(video.getAttribute('data-field-height-value'), video.getAttribute('data-field-width-value'));
        }
        video.style.clipPath = `circle(${params.circleDiams[i]/2}px at center)`;
        video.style.pointerEvents = params.hasClick ? 'auto' : 'none';
    });
}