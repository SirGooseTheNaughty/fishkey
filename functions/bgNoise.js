/* шум на фоне */
export default function bgNoise(parameters) {
    const bgNoiseBlock = document.querySelector(parameters.selector),
        bgNoiser = bgNoiseBlock.querySelector('[data-elem-type="shape"]'),
        bgGrainer = bgNoiser.querySelector('.tn-atom'),
        grain = parameters.grain ? parameters.grain + 'px' : 'auto',
        zIndex = parameters.isCovering ? 999999999 : 0;
    bgNoiser.classList.add('bg-noise');
    bgNoiser.style.opacity = parameters.opacity/100 || 0.05;
    bgNoiser.style.zIndex = zIndex;
    bgNoiseBlock.style.height = '0';
    bgNoiseBlock.style.overflow = 'hidden';
    bgGrainer.style.backgroundRepeat = 'repeat';
    bgGrainer.style.backgroundSize = `${grain}`;
}