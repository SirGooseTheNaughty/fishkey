"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=setBurgerTrigger;var _getElemDim=_interopRequireDefault(require("./getElemDim"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function setBurgerTrigger(e,t,n,s){var i,r;$(t).css({position:"fixed",width:"100vw",height:"100vh",top:"0",left:"0","z-index":"999999999","pointer-events":"none"}),e?(n.customOn.addEventListener("click",function(){s(),n.customOn.style.display="none",n.customOff.style.display="flex"}),n.customOff.addEventListener("click",function(){s(),n.customOn.style.display="flex",n.customOff.style.display="none"}),n.customOff.style.display="none",n.customOn.style.pointerEvents="auto",n.customOff.style.pointerEvents="auto",n.customOn.classList.add("burgerToggler","burgerButton"),n.customOff.classList.add("burgerToggler","burgerButton")):((i=t.querySelector(".tn-elem")).innerHTML='\n            <div id="nav-icon">\n                <span></span>\n                <span></span>\n                <span></span>\n            </div>\n        ',(r=t.querySelector("#nav-icon")).style.width=(0,_getElemDim.default)(i,"width")+"px",r.style.height=(0,_getElemDim.default)(i,"height")+"px",r.style.pointerEvents="auto",$(r).children().css({height:n.triggerLineHeight,"background-color":n.triggerColor}),r.addEventListener("click",function(){s(),r.classList.toggle("open")}))}