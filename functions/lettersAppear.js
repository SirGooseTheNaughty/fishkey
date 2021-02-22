/* появление текста по букве */
export default function lettersAppear(parameters) {
    const letterSpeed = parameters.letterSpeed || 2;
    const totalSpeed = parameters.totalSpeed || 3;
    const minWidth = parameters.minWidth || 0;
    const delay = parameters.delay || 0;
    const isRandom = parameters.isRandom || false;
    let offset = parameters.offset || 0;
    const textElem = document.querySelector(`${parameters.selector} .tn-atom`),
        text = textElem.innerText.split(''),
        numLetters = text.length;
    isNaN(offset) ? offset = 0 : offset = $(window).height()*offset/100;

    const maxDelay = totalSpeed - letterSpeed;
    let tag = 'span';
    if (textElem.querySelector('em')) {
        tag = 'em';
    }

    if ($(window).width() > minWidth) {
        textElem.innerHTML = '';

        if (isRandom) {
            text.forEach(letter => {
                $(textElem).append(`<${tag} style="opacity: 0; transition: opacity ${letterSpeed}s ease ${maxDelay*Math.random()}s">${letter}</${tag}>`);
            });
        } else {
            text.forEach((letter, i) => {
                $(textElem).append(`<${tag} style="opacity: 0; transition: opacity ${letterSpeed}s ease ${maxDelay*(i/numLetters)}s">${letter}</${tag}>`);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            document.addEventListener('scroll', appearOnScroll);
            appearOnScroll();
        });
    }

    function lettersAppear() {
        $(textElem).children(tag).css('opacity', '1');
    }
    function appearOnScroll() {
        if ($(textElem).offset().top < $(window).scrollTop() + $(window).height() - offset ) {
            setTimeout(() => {
                lettersAppear();
            }, 1000*delay);
            document.removeEventListener('scroll', appearOnScroll)
        }
    }
}