/* Переключение страниц шторкой */
export default function curtainChange(params) {
    let activePage = 0;
    let touchStartPos = [0, 0];

    const pages = document.querySelectorAll(params.selectors),
        numPages = pages.length,
        easeTime = params.easeTime || 1,
        easeFunction = params.easeFunction || 'ease-in-out',
        isBackgroundZoomable = params.isBackgroundZoomable || false,
        minWidth = params.minWidth || 0;
    const curtainBGs = [];
    
    if ($(window).width() > minWidth) {
        document.addEventListener('DOMContentLoaded', initPages);
    
        document.addEventListener('touchstart', (e) => {
            touchStartPos = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        });
    }

    function initPages () {
        document.querySelector('body').style.overflow = 'hidden';
        pages.forEach((page, i) => {
            page.classList.add('curtainPage');
            page.style.zIndex = numPages - i;
            page.style.transition = `height ${easeTime}s ${easeFunction}`;
            page.style.height = '100vh';
            page.querySelector('.t396__artboard').style.height = '100vh';
            page.querySelector('.t-bgimg') ? curtainBGs.push(page.querySelector('.t-bgimg')) : curtainBGs.push(null);
        });
        document.addEventListener('wheel', desctopScroller);
        document.addEventListener('touchend', mobileScroller);
        scaleBGs(0);
        curtainBGs.forEach(bg => bg.style.transition = `transform ${easeTime}s`);
    }

    function scaleBGs(ind) {
        if (!isBackgroundZoomable) {
            return;
        }
        if (curtainBGs[ind]) {
            curtainBGs[ind].style.transition = `transform ${easeTime}s ${easeFunction}`;
            curtainBGs[ind].style.transform = "scale(1)";
        }
        setTimeout(function() {
            curtainBGs.forEach((bg, i) => {
                if (i != ind && curtainBGs[i]) {
                    bg.style.transition = `none`;
                    bg.style.transform = "scale(1.1)";
                }
            });
        }, easeTime*1000);
    };

    function desctopScroller(event) {
        const direction = Math.sign(event.deltaY);
        const nextPage = activePage + direction;
        pageChange(nextPage)
    }

    function mobileScroller(e) {
        const touchEndPos = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        let direction = 0;
        if ((touchStartPos[1] > touchEndPos[1] + 25) || (isPageWithVideos && (touchStartPos[0] > touchEndPos[0] + 25))) {
            direction = 1;
        } else if ((touchStartPos[1] < touchEndPos[1] - 25) || (isPageWithVideos && (touchStartPos[0] < touchEndPos[0] - 25))) {
            direction = -1;
        } else {
            direction = 0;
        }
        const nextPage = activePage + direction;
        if(direction !== 0) {
            pageChange(nextPage);
        }
    }
    
    function pageChange(nextPage) {
        if (nextPage < numPages && nextPage >= 0) {
            document.removeEventListener('wheel', desctopScroller);  
            document.removeEventListener('touchend', mobileScroller); 
            pages.forEach((page, i) => {
                if (i < nextPage) {
                    page.style.height = '0';
                } else {
                    page.style.height = '100vh';
                }
            });
            scaleBGs(nextPage);
        
            setTimeout(() => {
                document.addEventListener('wheel', desctopScroller);
                document.addEventListener('touchend', mobileScroller);
                activePage = nextPage;
            }, easeTime < 1.5 ? 1500 : easeTime*1000);
        }
    }
}