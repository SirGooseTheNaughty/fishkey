"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = setBurgerTrigger;

var _getElemDim = _interopRequireDefault(require("./getElemDim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* утилита для настройки иконки бургера */
function setBurgerTrigger(isTriggerCustom, triggerBlock, triggerElems, toggleFunction) {
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
    triggerElems.customOn.addEventListener("click", function () {
      toggleFunction();
      triggerElems.customOn.style.display = "none";
      triggerElems.customOff.style.display = "flex";
    });
    triggerElems.customOff.addEventListener("click", function () {
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
    var triggerElem = triggerBlock.querySelector('.tn-elem');
    triggerElem.innerHTML = "\n            <div id=\"nav-icon\">\n                <span></span>\n                <span></span>\n                <span></span>\n            </div>\n        ";
    var burgerButton = triggerBlock.querySelector('#nav-icon');
    burgerButton.style.width = (0, _getElemDim["default"])(triggerElem, "width") + 'px';
    burgerButton.style.height = (0, _getElemDim["default"])(triggerElem, "height") + 'px';
    burgerButton.style.pointerEvents = 'auto';
    $(burgerButton).children().css({
      height: triggerElems.triggerLineHeight,
      'background-color': triggerElems.triggerColor
    });
    burgerButton.addEventListener('click', function () {
      toggleFunction();
      burgerButton.classList.toggle('open');
    });
  }
}