/* ссылки италиком */
export default function italicLinks(params) {
    const selector = params.selector || '';
    if ($(window).width() > 1200) {
        const it_links = document.querySelectorAll(`${selector} a`);
        $(it_links).addClass('it-links');
    }
}