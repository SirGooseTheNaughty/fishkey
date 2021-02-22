/* появление фото из угла */
export default function cornerPhotos(params) {
    const cornerPhotos = document.querySelectorAll(params.photos),
        initialVisibility = params.initialVisibility || 0,
        startPos = params.startPos || 'left-top',
        transitionTime = params.transitionTime || 0.5,
        isHorScroll = params.isHorScroll || false,
        minWidth = params.minWidth || 0,
        offsets = [];
    let showingRule;
    const ww = $(window).width(),
        wh = $(window).height();

    if ($(window).width() > minWidth) {
        let clipPath = '';
        switch (startPos) {
            case 'left-top':
                clipPath = `polygon(0 0, ${initialVisibility}% 0, ${initialVisibility}% ${initialVisibility}%, 0 ${initialVisibility}%)`;
                break;
            case 'top':
                clipPath = `polygon(0 0, 100% 0, 100% ${initialVisibility}%, 0 ${initialVisibility}%)`;
                break;
            case 'right-top':
                clipPath = `polygon(${100 - initialVisibility}% 0, 100% 0, 100% ${initialVisibility}%, ${100 - initialVisibility}% ${initialVisibility}%)`;
                break;
            case 'right':
                clipPath = `polygon(${100 - initialVisibility}% 0, 100% 0, 100% 100%, ${100 - initialVisibility}% 100%)`;
                break;
            case 'right-bottom':
                clipPath = `polygon(${100 - initialVisibility}% ${100 - initialVisibility}%, 100% ${100 - initialVisibility}%, 100% 100%, ${100 - initialVisibility}% 100%)`;
                break;
            case 'bottom':
                clipPath = `polygon(0 ${100 - initialVisibility}%, 100% ${100 - initialVisibility}%, 100% 100%, 0 100%)`;
                break;
            case 'left-bottom':
                clipPath = `polygon(0 ${100 - initialVisibility}%, ${initialVisibility}% ${100 - initialVisibility}%, ${initialVisibility}% 100%, 0 100%)`;
                break;
            case 'left':
                clipPath = `polygon(0 0, ${initialVisibility}% 0, ${initialVisibility}% 100%, 0 100%)`;
                break;
            default:
                clipPath = `polygon(0 0, ${initialVisibility}% 0, ${initialVisibility}% ${initialVisibility}%, 0 ${initialVisibility}%)`;
                break;
        }

        cornerPhotos.forEach((photo, i) => {
            const offsetPercentage = params.offsets[i] || 0;
            if (isHorScroll) {
                offsets[i] = offsetPercentage*$(window).width()/100;
                showingRule = function (photo, i) {
                    const et = $(photo).offset().left;
                    return (ww - offsets[i] > et)
                };
            } else {
                offsets[i] = offsetPercentage*$(window).height()/100;
                showingRule = function (photo, i) {
                    const et = $(photo).offset().top;
                    return ($(window).scrollTop() + wh - offsets[i] > et)
                };
            }

            $(photo).css({
                'clip-path': clipPath,
                transition: `${transitionTime}s ease`
            });

            photo.setAttribute('data-clipping', i);
            photo.setAttribute('data-clipped', 'true');
        });
    
        document.addEventListener('scroll', showOnScroll);
    }
    
    function showOnScroll() {
        cornerPhotos.forEach((photo, i) => {
            if(showingRule(photo, i) && (photo.getAttribute('data-clipped') == 'true')) {
                $(photo).css('clip-path', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)');
                photo.setAttribute('data-clipped', 'false');
            }
        });
    }
}