/* смена экранов по скроллу */
export default function screenChangeOnScroll(params) {
    const pages = document.querySelectorAll(params.blocks);
    const minWidth = params.minWidth || 1200;
    const animTime = params.animTime || 0.8;
    let activePage = 0;

    if ($(window).width() > minWidth) {
        $(pages).css({
            'position': 'fixed',
            'width': '100vw',
            'height': '100vh',
            'top': '100vh',
            'left': '0',
        });
        pages[0].style.top = '0';
        pages.forEach(page => {
            page.style.backgroundColor = window.getComputedStyle(page.querySelector('div').querySelector('div')).backgroundColor;
            page.style.transition = `top ${animTime}s cubic-bezier(.75,0,.25,1)`;
        });
    
        document.addEventListener('wheel', pageChange);
    }
    
    function pageChange(event) {
        let delta = event.deltaY;
        if (delta >= 0) {
            nextPage(1);
        } else {
            nextPage(-1);
        }
    }

    function nextPage(direction) {
        const nexPage = activePage + direction;
        if(nexPage < pages.length && nexPage >= 0) {
            document.removeEventListener('wheel', pageChange);
            pages[nexPage].style.top = '0';
            
            if (direction > 0) {
                pages[activePage].style.top = '-100vh';
            } else {
                pages[activePage].style.top = '100vh';
            }
            setTimeout(() => {
                activePage = activePage + direction;
                document.addEventListener('wheel', pageChange);
            }, animTime*1000);
        }
    }
}