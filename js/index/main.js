"use strict";function swapCSS(s){document.getElementById("linkedcss").setAttribute("href",s)}var winjs=!1,swapButton=document.getElementById("swapButton");swapButton.addEventListener("click",function(){swapCSS(winjs?"css/index.css":"css/bootstrap-winjs.css"),winjs=!winjs},!1);
