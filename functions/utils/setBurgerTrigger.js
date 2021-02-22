/* утилита для настройки иконки бургера */
import getElemDim from "./getElemDim"
export default function setBurgerTrigger(isTriggerCustom, triggerBlock, triggerElems, toggleFunction) {
    $(triggerBlock).css({
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        top: '0',
        left: '0',
        'z-index': '999999999',
        'pointer-events': 'none'
    });

    if (isTriggerCustom) {
        triggerElems.customOn.addEventListener("click", () => {
            toggleFunction();
            triggerElems.customOn.style.display = "none";
            triggerElems.customOff.style.display = "flex";
        });
        triggerElems.customOff.addEventListener("click", () => {
            toggleFunction();
            triggerElems.customOn.style.display = "flex";
            triggerElems.customOff.style.display = "none";
        });
        triggerElems.customOff.style.display = "none";
        triggerElems.customOn.style.pointerEvents = "auto";
        triggerElems.customOff.style.pointerEvents = "auto";
        triggerElems.customOn.classList.add("burgerToggler", "burgerButton");
        triggerElems.customOff.classList.add("burgerToggler", "burgerButton");
    } else {
        const triggerElem = triggerBlock.querySelector('.tn-elem');
        triggerElem.innerHTML = `
            <div id="nav-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        const burgerButton = triggerBlock.querySelector('#nav-icon');
        burgerButton.style.width = getElemDim(triggerElem, "width") + 'px';
        burgerButton.style.height = getElemDim(triggerElem, "height") + 'px';
        burgerButton.style.pointerEvents = 'auto';
        $(burgerButton).children().css({
            height: triggerElems.triggerLineHeight,
            'background-color': triggerElems.triggerColor
        });
        burgerButton.addEventListener('click', () => {
            toggleFunction();
            burgerButton.classList.toggle('open');
        });
    }
}