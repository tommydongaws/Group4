/** Author Tommydon */
(function(){
let submitbtn = document.querySelector("#submitbtn");
let submitwrapper = document.querySelector("#submitwrapper");
  submitwrapper.onmouseover = (e) => {
  
  let currMargin = parseInt(submitbtn.style.marginLeft) || 0;
  let btnCoord = submitbtn.getBoundingClientRect();
  let offset=btnCoord.left-e.clientX+100;
  if(offset>0){
    if (btnCoord.right > document.body.clientWidth - 100) {
      currMargin-=100
    }
    else {
      currMargin+=100
    }
  }else{
      if (btnCoord.left < 0+100) {
        currMargin+=100
      }
      else {
         currMargin-=100
      }
    }
    submitbtn.style.marginLeft=currMargin+"px"
  
}})()