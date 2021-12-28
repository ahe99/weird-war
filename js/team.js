// let myTeam = [{
//   "img": "https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/wa5c.png",
//   "id": 0,
//   "type": "water",
//   "dead": false,
//   "ability": true
// }, {
//   "img": "https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/fa6c.png",
//   "id": 1,
//   "type": "fire",
//   "dead": false,
//   "ability": true
// }, {
//   "img": "https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/s1b7.png",
//   "id": 2,
//   "type": "light",
//   "dead": false,
//   "ability": true
// }];

let myTeam = [{}, {}, {}];
let myChess = new Array(); //使用者所有的棋子
let imgURL = 'https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/';

/* { "description": "HELLO!",
  "name": "Gene: 0361",
  "background_color": "#FFFFDF",
  "image": "https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/wa5c.png",
  "attributes": [ { "trait_type": "Type", "value": "Water" },
                  { "trait_type": "Head", "value": "Nothing" },
                  { "trait_type": "Eye", "value": "Glasses" },
                  { "trait_type": "Pattern", "value": "Nothing" }] }
*/

function refreshMyChess(chess, count) {
  let optChess = {}
  optChess.name = chess.name;
  optChess.img = chess.image;
  optChess.id = count;
  optChess.type = chess.attributes[0]['value'].toLowerCase();
  optChess.dead = false;
  optChess.at = undefined;
  if (optChess.type === 'water') {
    optChess.ability = false;
  } else {
    optChess.ability = true;
  }
  optChess.next = undefined;
  myChess.push(optChess);
}

function rederMyChess(count) { //reder team page
  let teampage = document.getElementsByClassName("chesswrapper")[0];
  //'<img class="chess" src="" onclick="pickChess(this)" >'
  let teamchess = document.createElement('img');
  teamchess.classList.add('chess');

  teamchess.src = myChess[count].img;
  teamchess.alt = myChess[count].id;
  teamchess.style.display = "block";
  teamchess.onclick = function() { pickChess(this); };

  teampage.appendChild(teamchess);
}

function pickChess(pickedChess) {
  //console.log(pickedChess);
  let teamchess = document.getElementsByClassName("teamchess");
  let flag = true; //判斷隊伍是否有空位
  //console.log('flag:' + flag);
  let pickedChessId = pickedChess.alt; //拿出id
  console.log('pick Chess:' + pickedChessId);
  console.log('-----------------');
  for (let member of myTeam) { //檢查是否已選
    if (member.id === Number(pickedChessId)) {
      popAlert('不可選擇重複棋子！');
      return 0;
    }
  }
  for (let i = 0; i < 3; i++) { //未滿,直接填上
    if (teamchess[i].classList.contains('empty')) {
      myTeam[i] = myChess.find(data => data.id === Number(pickedChessId));
      pickedChess.classList.add('locked');
      console.log(myTeam);
      console.log('-----------------');
      teamchess[i].alt = pickedChess.alt;
      teamchess[i].src = pickedChess.src;
      teamchess[i].classList.remove('empty');
      break;
    }
    if (i === 2) {
      flag = false;
    }
  }
  if (flag === false) { //已滿,先解除第三位棋子再補上
    unlockChess(2);
    flag = true;
    pickChess(pickedChess);
  }
  /**/
}

function unlockChess(count) { //解除已選棋子
  let teamchess = document.getElementsByClassName("teamchess");
  if (teamchess[count].classList.contains('empty')) {
    return 0;
  }
  let chesspage = document.getElementsByClassName("chesswrapper")[0];
  // console.log(chesspage.getElementsByClassName('chess'));
  // console.log(teamchess[count].alt);
  // console.log(chesspage.getElementsByClassName('chess')[teamchess[count].alt]);
  let toUnlockChess = chesspage.getElementsByClassName('chess')[teamchess[count].alt];

  toUnlockChess.classList.remove('locked'); //根據alt定位

  myTeam[count] = {};
  console.log(myTeam);
  console.log('-----------------');
  teamchess[count].src = 'assets/img/empty.png';
  teamchess[count].alt = undefined;
  teamchess[count].classList.add('empty');
  teamchess[count].classList.remove('chess');
  /**/
}