var state = {
  mat: [
  [0,0,0],
  [0,0,0],
  [0,0,0]
  ],
  won: false,
  wonMat: [
  [0,0],
  [0,0],
  [0,0]
  ],
  winner: ""
}
var turn = true;
var outerBox = document.getElementById("outer-box");
outerBox.innerHTML = render(state);
var innerBoxes = document.getElementsByClassName("inner");
var reset = document.getElementById("reset");
reset.addEventListener("click", function(){
  state = {
    mat: [
    [0,0,0],
    [0,0,0],
    [0,0,0]
    ],
    won: false,
    wonMat: [
    [0,0],
    [0,0],
    [0,0]
    ],
    winner: ""
  };
  outerBox.innerHTML = render(state);
  addListener();
});

function checkSides(sign,signY,mat,x,y,signo){
  var won = false;
  var retMat = [[]];
  if(mat[x+(1*sign)][y]===signo&&mat[x+(2*sign)][y]===signo){
    won = true;
    retMat= [[x,y],[x+(1*sign),y],[x+(2*sign),y]];
  }else if(mat[x][y+(1*signY)]===signo&&mat[x][y+(2*signY)]===signo){
    won = true;
    retMat= [[x,y],[x,y+(1*signY)],[x,y+(2*signY)]];
  }else if(mat[x+(1*sign)][y+(1*signY)]===signo&&mat[x+(2*sign)][y+(2*signY)]===signo){
    won = true;
    retMat= [[x,y],[x+(1*sign),y+(1*signY)],[x+(2*sign),y+(2*signY)]];
  }
  return [retMat,won];
}
function checkMiddle(sign,signY,mat,x,y,signo){
  var won = false;
  var retMat = [[]];
  if ((x===0||y===0||y===2||x===2)&&mat[x+signY][y+sign]===signo&&mat[x+(2*signY)][y+(2*sign)]===signo) {
    won = true;
    retMat= [[x,y],[x+signY,y+sign],[x+(2*signY),y+(2*sign)]];
  }else if(mat[x+sign][y+signY]===signo&&mat[x-sign][y-signY]===signo){
    won = true;
    retMat= [[x-sign,y-signY],[x,y],[x+sign,y+signY]];
  }
  return [retMat,won];
}
function play(mat,y,x,signo){
  x = parseInt(x);
  y = parseInt(y);
  var retMat = [[,],[,],[,]];
  var won = false;
  mat[x][y] = signo;
  if(y===0&&x===0){
    check = checkSides(1,1,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y===2&&x===0) {
    check = checkSides(1,-1,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y===0&&x===2) {
    check = checkSides(-1,1,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y===2&&x===2) {
    check = checkSides(-1,-1,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y==1&&x===0) {
    check = checkMiddle(0,1,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y==1&&x===2) {
    check = checkMiddle(0,-1,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y==0&&x===1) {
    check = checkMiddle(1,0,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y==2&&x===1) {
    check = checkMiddle(-1,0,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
  }else if (y==1&&x===1) {
    check = checkMiddle(0,1,mat,x,y,signo);
    retMat = check[0];
    won = check[1];
    if(won===false){
      check = checkMiddle(1,0,mat,x,y,signo);
      retMat = check[0];
      won = check[1];
      if(won===false){
        check = checkMiddle(1,1,mat,x,y,signo);
        retMat = check[0];
        won = check[1];
        if(won===false){
          check = checkMiddle(-1,1,mat,x,y,signo);
          retMat = check[0];
          won = check[1];
        }
      }
    }
  }
  return [mat,won,retMat]
}
function render(state){
  var html = "";
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if(state.won===true){
        if((state.wonMat[0][1]===i&&state.wonMat[0][0]===j)||(state.wonMat[1][1]===i&&state.wonMat[1][0]===j)||(state.wonMat[2][1]===i&&state.wonMat[2][0]===j))
          html+='<div id="box-'+i+'-'+j+'" class="box inner won">';
        else
          html+='<div id="box-'+i+'-'+j+'" class="box inner end">';
      }
      else{
          html+='<div id="box-'+i+'-'+j+'" class="box inner">';
        }
      if(state.mat[j][i]==="x"){
        html+='<div class="letter">x</div></div>';
      }else if(state.mat[j][i]==="o"){
        html+='<div class="letter">o</div></div>';
      }else{
        html +='</div>';
      }
    };
  };
  if (state.won === true)
    html+="<div class='won-alert'>El jugador "+state.winner+" gano</div>";
  return html;
}
function addListener(){
  for (var i = 0; i < innerBoxes.length; i++) {
    innerBoxes[i].addEventListener("click", function(){
      if(this.innerHTML===''){
        if(turn){ 
          turn = false;
          var played = play(state.mat,this.id[4],this.id[6],"x");
          state.mat = played[0];
          state.won = played[1];
          state.wonMat = played[2];
          state.winner = "x";
        }else {
          turn = true;
          var played = play(state.mat,this.id[4],this.id[6],"o")
          state.mat = played[0];
          state.won = played[1];
          state.wonMat = played[2];
          state.winner = "o";
        } 
        outerBox.innerHTML = render(state);
        if(state.won ===false)
          addListener();
      }   
    });
  }
}
addListener();
