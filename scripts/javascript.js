// peer review @goravson:
// Great job, cool touch on the submit button.
// Converted the if-else to a single line expression 

/** Author Tommydon */

(function(){
let submitbtn = document.querySelector("#submitbtn");
let submitwrapper = document.querySelector("#submitwrapper");
  submitwrapper.onmouseover = (e) => {
  
  let currMargin = parseInt(submitbtn.style.marginLeft) || 0;
  let btnCoord = submitbtn.getBoundingClientRect();
  let offset=btnCoord.left-e.clientX+100;
  if(offset>0){
    currMargin += (btnCoord.right > document.body.clientWidth - 100) ? -100 : 100;
  }else{
    currMargin += (btnCoord.left < 0+100) ? 100 : -100;
  }
    submitbtn.style.marginLeft=currMargin+"px"
  
}})()