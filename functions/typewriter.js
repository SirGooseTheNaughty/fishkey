/* пишущая машинка */
export default function typewriter(parameters) {
    const totalSpeed = parameters.totalSpeed || 2000;
    const minWidth = parameters.minWidth || 0;
    let offset = parameters.offset || 0;
    const tw_TextElem = document.querySelector(parameters.selector).firstElementChild,
        tw_Text = tw_TextElem.innerText.split("");

    if ($(window).width() > minWidth) {
        tw_TextElem.innerText = '';
    }

    offset = $(window).height()*offset/100;

    document.addEventListener('DOMContentLoaded', () => {
        tw_startWriting();
        document.addEventListener('scroll', tw_startWriting);
    })

    function tw_write() {
        const speed = totalSpeed / tw_Text.length;
        const tw_interval = setInterval(function() {
            if(!tw_Text[0]){
                    return clearInterval(tw_interval);
            }
            tw_TextElem.innerHTML += tw_Text.shift();
        }, speed);
        return false;
    }

    function tw_startWriting() {
        if ($(tw_TextElem).offset().top < $(window).scrollTop() + $(window).height() - offset) {
            tw_write();
            document.removeEventListener('scroll', tw_startWriting);
        }
    }
}