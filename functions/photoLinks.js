/* переход на страницы по картинкам */
export default function photoLinks(params) {
    const { photos } = params;
    if ($(window).width() > params.minWidth) {
        photos.forEach((photoSelector, i) => {
            const photo = document.querySelector(photoSelector);
            photo.setAttribute('data-imgLink', photo.querySelector('a').getAttribute('href'));
            photo.querySelector('a').removeAttribute('href');
            photo.style.cursor = 'pointer';
            photo.addEventListener('click', photoLinkOpener);
        });
    }

    function photoLinkOpener () {
        const link = this.getAttribute('data-imgLink');
        const newTab = params.newTab || false;
        $(this).clone().insertBefore(this);
        const clone = this.previousSibling;
        $(clone).css({
            position: 'fixed',
            top: this.getBoundingClientRect().top + 'px',
            left: this.getBoundingClientRect().left + 'px',
            'z-index': '999999'
        });
        setTimeout(() => {
            $(clone).css({
                transition: '1s ease',
                top: '0',
                left: '0',
                width: '100vw'
            });
            setTimeout(() => {
                setTimeout(() => clone.remove(), 250);
                if (newTab) {
                    window.open(link, '_blank');
                } else {
                    document.location.href = link;
                }
            }, 1000);
        }, 100);
    }
}