/* появление текста */
export default function textAppear(parameters) {
    const { divider, trigger } = parameters;
    const txtAppConts = document.querySelectorAll(parameters.selectors);   // появляющийся текст
    const spacing = parameters.spacing ? parameters.spacing + 'px' : '5px';
    const minWidth = parameters.minWidth || 0;
    const animSpeed = parameters.animSpeed || 400;
    const wordSpeed = parameters.wordSpeed || 50;
    const offsets = parameters.offsets || null;
    const txtAppWordConts = [];
    offsets.forEach((offset, i) => {
        if (isNaN(offsets[i])) {
            offsets[i] = 0;
        } else {
            offsets[i] = $(window).height()*offset/100;
        }
    });

    function txtAppear(contNum) {
        let i = 0;
        const txtApp_interval = setInterval(() => {
            if (!txtAppWordConts[contNum][i]) {
                clearInterval(txtApp_interval);
            }
            else {
                txtAppWordConts[contNum][i].style.transition = `${animSpeed/1000}s ease`;
                txtAppWordConts[contNum][i].style.top = '0';
            }
            i++;
        }, wordSpeed);
    }

    function txtReappear(contNum) {
        txtAppWordConts[contNum].forEach(word => {
            word.style.transition = `none`;
            word.style.top = '2em';
        });
        txtAppear(contNum);
    }
    
    function scrollTrigger() {
        const appeared = txtAppWordConts.map((vector, i) => $(vector).offset().top < $(window).scrollTop() + $(window).height() - offsets[i]);
        appeared.forEach((isVisible, i) => {
            if (isVisible) {
                txtAppear(i);
            }
        })
    }

    if ($(window).width() > minWidth) {
        txtAppConts.forEach((txtAppCont, contNum) => {
            txtAppCont = txtAppCont.firstElementChild;
            const txtApp = txtAppCont.textContent;
            let txtAppWords = [];
            if (divider == 'w') {
                txtAppWords = txtApp.split(' ');
                txtAppCont.innerHTML = '';
                txtAppWords.forEach((word, i) => {
                    txtAppCont.innerHTML += `<p style='overflow: hidden; display: inline-block; padding: 0 ${spacing} 1rem 0; margin-bottom: -1rem'>
                                                <span class='txtAppWordCont${contNum}'>${word} </span>
                                            </p>`;
                });
            } else if (divider == 'p') {
                txtAppWords = txtApp.split('. ');
                txtAppCont.innerHTML = '';
                txtAppWords.forEach((word, i) => {
                    if (i == txtAppWords.length - 1) {
                        txtAppCont.innerHTML += `<p style='overflow: hidden; display: inline-block; padding-right: ${spacing}'>
                                                    <span class='txtAppWordCont${contNum}'>${word} </span>
                                                </p>`;
                    } else {
                        txtAppCont.innerHTML += `<p style='overflow: hidden; display: inline-block; padding: 0 ${spacing} 1rem 0; margin-bottom: -1rem'>
                                                    <span class='txtAppWordCont${contNum}'>${word}.</span>
                                                </p>`;
                    }
                });
            } else if (divider == 'l') {
                txtAppWords = txtApp.split(';;');
                txtAppCont.innerHTML = '';
                txtAppWords.forEach((word, i) => {
                    txtAppCont.innerHTML += `<p style='overflow: hidden; display: inline-block; padding: 0 ${spacing} 1rem 0; margin-bottom: -1rem'>
                                                <span class='txtAppWordCont${contNum}'>${word} </span>
                                            </p>`;
                });
            } else {
                txtAppWords = txtApp.split('');
                txtAppCont.innerHTML = '';
                txtAppWords.forEach((word, i) => {
                    if (word == ' ') {
                        txtAppCont.innerHTML += `<p style='overflow: hidden; display: inline-block; padding-right: ${spacing}'><span class='txtAppWordCont${contNum}'>${word} </span></p>`;
                    } else {
                        txtAppCont.innerHTML += `<p style='overflow: hidden; display: inline-block;'><span class='txtAppWordCont${contNum}'>${word} </span></p>`;
                    }
                });
            }

            txtAppWordConts[contNum] = document.querySelectorAll(`.txtAppWordCont${contNum}`);

            txtAppCont.style.paddingBottom = '0.15em';
            txtAppCont.style.overflow = 'hidden';

            $(txtAppWordConts[contNum]).css({
                position: 'relative'
            }); 
            if (trigger == 'scroll') {
                $(txtAppWordConts[contNum]).css({
                    top: '2em',
                }); 
            }
        });
        
        if (trigger == 'scroll') {
            document.addEventListener('DOMContentLoaded', () => {
                scrollTrigger();
                document.addEventListener('scroll', scrollTrigger);
            })
        } else {
            txtAppConts.forEach((cont, i) => {
                const contNum = i;
                function reapp() {
                    txtReappear(contNum);
                }
                cont.addEventListener('mouseenter', reapp);
            })
        }
    }
}