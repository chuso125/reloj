var changeTrigger = document.getElementById("change");
var clock ="analogo";
changeTrigger.addEventListener("click", function(){
  if(clock==="analogo"){
    clock = "digital";
  }else {
    clock = "analogo";
  }
});
var currentdate = new Date(); 
var s = currentdate.getSeconds();
var m = currentdate.getMinutes();
var h = currentdate.getHours();
if(h>12){
  h = h-12;
}
function changeTime(hours,minutes,seconds){
  var html = '';
  if(seconds === 60){
    seconds = 0;
    minutes++;
   if(minutes === 60){
      minutes=0;
      hours++;
    }
    if(hours === 12){
      hours = 0;
    }
  }
  html = '<div class="needle h h-'+ hours+'"><div class="middle h"></div></div><div class="needle m m-'+minutes+'"><div class="middle m"></div></div><div class="needle s s-'+seconds+'"><div class="middle s"></div></div>';
    return [html,hours,minutes,seconds]
}
function renderHours(){
  var html = "";
  for (var i = 1; i <= 12; i++) {
    html += '<div class="hour-' + i + '"><div class="number">'+ i + '</div></div>';
  }

  return html;
}
var hours = document.getElementById("hours");
var needles = document.getElementById("needles");
var reloj = document.getElementById("clock");
var analog = document.getElementById("analog");
hours.innerHTML = renderHours();
setInterval(function(){ 
  s++;
  var time = changeTime(h,m,s);
  needles.innerHTML = time[0];
  h = time[1];
  m = time[2];
  s = time[3];
  if(clock==="analogo"){
    reloj.innerHTML = "<div class='analog'>"+analog.innerHTML+"</div>";
  }else{
    reloj.innerHTML = "<div class='digital'>"+h+":"+m+":"+s+"</div>";
  }
}, 1000);