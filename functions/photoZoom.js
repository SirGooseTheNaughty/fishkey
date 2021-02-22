/* Зум фото */
export default function photoZoom(params) {
    const photos = document.querySelectorAll(params.photos),
        easeTime = params.easeTime || 0.4,
        scale = params.scale || 1.2,
        minWidth = params.minWidth || 1200,
        easeFunction = params.easeFunction || 'ease-in-out';

    if ($(window).width() > minWidth) {
        photos.forEach(photo => {
            photo.parentElement.style.overflow = 'hidden';
            photo.style.transition = `transform ${easeTime}s ${easeFunction}`;
            photo.addEventListener('mouseenter', function() {
                this.style.transform =` scale(${scale})`;
            });
            photo.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        })
    }
}