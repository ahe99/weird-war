const socket = io.connect('https://weirdwar-server.herokuapp.com/', { transports: ['websocket'] });
let realhex = document.getElementsByClassName('realhex'); //顯示的棋盤
let coverhex = document.getElementsByClassName('coverhex'); //棋子所在棋盤
let myturn = true;
let enemyTeam = [{}, {}, {}];
//console.log(socket);
// let enemyTeam = [{
//     "img": "https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/wa47.png",
//     "id": 4,
//     "type": "water",
//     "dead": false,
//     "ability": true
//   },
//   {
//     "img": "https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/wa5c.png",
//     "id": 5,
//     "type": "water",
//     "dead": false,
//     "ability": true
//   },
//   {
//     "img": "https://raw.githubusercontent.com/ACS107135/weirdwar-server/master/Gene/w149.png",
//     "id": 6,
//     "type": "water",
//     "dead": false,
//     "ability": true
//   }
// ];
let burnedCells = [];
let currentSelect = {};
//////////

function findBattle() {
  //console.log(myTeam);
  for (let chess of myTeam) {
    if (chess.img === undefined) {
      popAlert('請先選擇好隊伍成員！');
      backList(0);
      return 0;
    }
  }
  ///
  switchPage(0);
  burnedCells = [];
  myTeam[0].at = 46;
  myTeam[1].at = 48;
  myTeam[2].at = 50;
  //enemyTeam = enemyChess;
  // enemyTeam[0].at = 1;
  // enemyTeam[1].at = 3;
  // enemyTeam[2].at = 5;
  //初始myTeam
  for (let i = 0; i < 3; i++) {
    myTeam[i].ability = true;
    myTeam[i].dead = false;
    myTeam[i].next = findMove(myTeam[i]);
  }
  toServer.findMatch();
}
//記得json
socket.on("start", (player) => { //
  popAlert('找到對戰!');
  //player_id:1 or 2
  //console.log(player);
  //player = JSON.parse(player);
  if (player.player_id == '1') {
    myturn = true;
  } else if (player.player_id == '2') {
    myturn = false;
  }
  toServer.firstSubmit();
  //nested socket on??
}); //配對到收到start訊號
//nested socket on
socket.on("firstenemy", (enemyChess) => {
  console.log(enemyChess);
  enemyTeam = enemyChess;
  switchTeamChessAt(enemyTeam);
  refreshDashboard();
  refreshGravyargd();
  resetCells();
  startBoard();
  if (myturn == true) {
    popAlert('你是先手!');
  } else if (myturn == false) {
    popAlert('你是後手!');
  }

  console.log('start match');
  console.log('-----------------');

})

// socket.on("gameover", () => {
//   console.log(123);
//   popSum('敗北...<br><br>點擊來返回主頁面...');
// });
socket.on("enemysurreder", () => {
  console.log(123);
  popSum('對手投降，勝利!<br><br>點擊來返回主頁面...');
});
socket.on("newturn", (enemyChess) => {
  console.log(enemyChess);

  enemyTeam = enemyChess;
  switchTeamChessAt(enemyTeam);
  //console.log(enemyTeam);
  startMyTurn();
}); //enemychessmoving
socket.on("burncell", (cell) => {
  const table = [ //對照表
    45, 46, 47, 48, 49, 50, 51,
    37, 38, 39, 40, 41, 42, 43, 44,
    30, 31, 32, 33, 34, 35, 36,
    22, 23, 24, 25, 26, 27, 28, 29,
    15, 16, 17, 18, 19, 20, 21,
    7, 8, 9, 10, 11, 12, 13, 14,
    0, 1, 2, 3, 4, 5, 6
  ]
  cell = table[cell];
  burnedCells.push(cell);
  //console.log(enemyTeam);

});
socket.on("darkswap", (myChess) => {
  console.log(myTeam);
  myTeam = myChess;
  console.log(myTeam);
  switchTeamChessAt(myTeam);
})

/*解決攻擊對面無法收到*/
socket.on("gotattacked", (myChess) => {
  myTeam = myChess;
  switchTeamChessAt(myTeam);
})
let toServer = {
    findMatch: function() {
      socket.emit('find', ); //發送配對訊號
    },
    firstSubmit: function() {
      //console.log(JSON.stringify(myTeam));
      socket.emit('firstsubmit', myTeam);
    },
    cancelFind: function() {
      socket.emit('cancel_find');
      backList(0);
    },
    endTurn: function() {
      //console.log(JSON.stringify(myTeam));
      socket.emit('endturn', myTeam);
    },
    burnCell: function(cellNum) { //fire ability
      //console.log(JSON.stringify(burnedCells));
      socket.emit('burncell', cellNum);
    },
    darkswap: function() { //dark ability
      //console.log(JSON.stringify(enemyTeam));
      socket.emit('darkswap', enemyTeam);
    },
    surrender: function() {
      //console.log('surrender');
      socket.emit('surrender');
    },
    winByReach: function() {
      //console.log('victory');
      socket.emit('victory');
    },
    winByEat: function() {
      //console.log('victory');
      socket.emit('victory');
    },

    /*解決攻擊對面無法收到*/
    attackChess: function() {
        socket.emit('attack', enemyTeam);
      }
      // timeout: function() {
      //   socket.emit('timeout', {});
      // },
  }
  ////////////


function startBoard( /*enemyChess*/ ) { //初始化棋盤
  for (let i = 0; i < 52; i++) {
    realhex[i].textContent = i;
  }
  // //changeOptCellsColor([46, 48, 50]);
  // for (let member of myTeam) {
  //   let cellNum = member.at;
  //   //console.log('my:' + cellNum);
  //   realhex[cellNum].textContent = cellNum;
  //   realhex[cellNum].onclick = function() { showPossibleMoves(this); }
  //   coverhex[cellNum].getElementsByTagName('img')[0].src = member.img;
  // }
  // for (let member of enemyTeam) {
  //   let cellNum = member.at;
  //   //console.log('enemy:' + cellNum);
  //   //realhex[cellNum].textContent = cellNum;
  //   coverhex[cellNum].getElementsByTagName('img')[0].src = member.img;
  // }
  document.getElementsByClassName('searchpage')[0].style.display = 'none';
  document.getElementsByClassName('battlepage')[0].style.display = 'block';
  console.log('your team:');
  console.log(myTeam);
  console.log('enemy team:')
  console.log(enemyTeam);
  console.log('-----------------');
}

function refreshDashboard() {
  document.getElementsByClassName('askagainboard')[0].style.display = 'none';
  if (myturn) {
    document.getElementsByClassName('turn')[0].textContent = "輪到你了!"
    if (currentSelect.ability === true) {
      document.getElementsByClassName('ability')[0].classList.remove('disable');
    } else {
      document.getElementsByClassName('ability')[0].classList.add('disable');
    }
  } else {
    document.getElementsByClassName('turn')[0].textContent = "對手思考中..."
    document.getElementsByClassName('ability')[0].classList.add('disable');
  }
}

function asksurrender() {
  document.getElementsByClassName('askagainboard')[0].style.display = 'grid';
}

function cancelsurrender() {
  document.getElementsByClassName('askagainboard')[0].style.display = 'none';
}

function surrender() {
  console.log('you\'ve surrendered');
  popSum('你投降了<br><br>點擊來返回主頁面...');
  document.getElementsByClassName('askagainboard')[0].style.display = 'none';

  toServer.surrender();
}

function endMyTurn() { //
  console.log('your turn now ends');
  console.log('-----------------');
  console.log('your team:');
  console.log(myTeam);
  console.log('enemy team:')
  console.log(enemyTeam);
  console.log('-----------------');
  myturn = false;
  toServer.endTurn();
  resetCells();
  refreshDashboard();
  refreshGravyargd();
  //toServer.
}

function startMyTurn() {
  console.log('your turn now starts');
  console.log('-----------------');
  // console.log('your team:');
  // console.log(myTeam);
  // console.log('enemy team:')
  // console.log(enemyTeam);
  // console.log('-----------------');
  myturn = true;
  resetCells();
  refreshDashboard();
  refreshGravyargd();
  checkOver();
}

function switchTeamChessAt(team) { //敵我的棋盤是相反所以要調整
  console.log('switch');
  const table = [ //對照表
    45, 46, 47, 48, 49, 50, 51,
    37, 38, 39, 40, 41, 42, 43, 44,
    30, 31, 32, 33, 34, 35, 36,
    22, 23, 24, 25, 26, 27, 28, 29,
    15, 16, 17, 18, 19, 20, 21,
    7, 8, 9, 10, 11, 12, 13, 14,
    0, 1, 2, 3, 4, 5, 6
  ]
  for (let i = 0; i < 3; i++) {
    if (team[i].at !== undefined) {
      console.log(team[i]);
      console.log(team[i].next);
      team[i].at = table[team[i].at];
      if (typeof(team[i].next) === 'object') {
        team[i].next = team[i].next.map(data => table[data]);
      } else {
        team[i].next = [table[team[i].next]];
      }
    }
  }
}

function renderChosen(chess) {
  chess.classList.add('chosen');
}

function checkOver() {
  let count = 0;
  for (let member of enemyTeam) {
    if (member.dead === true) {
      count += 1;
    }
  }
  if (count === 3) {
    toServer.winByEat();
    // console.log(myTeam);
    // console.log(enemyTeam);
    popSum('勝利!<br><br>點擊來返回主頁面...');
    return 0;
  }
  for (let chess of myTeam) {
    if (chess.at >= 0 && chess.at <= 6) {
      toServer.winByReach();
      // console.log(myTeam);
      // console.log(enemyTeam);
      popSum('勝利!<br><br>點擊來返回主頁面...');
      return 0;
    }
  }
  ///
  count = 0;
  for (let member of myTeam) {
    if (member.dead === true) {
      count += 1;
    }
  }
  if (count === 3) {
    // console.log(myTeam);
    // console.log(enemyTeam);
    popSum('敗北...<br><br>點擊來返回主頁面...');
    return 0;
  }
  for (let chess of enemyTeam) {
    if (chess.at >= 45 && chess.at <= 51) {
      // console.log(myTeam);
      // console.log(enemyTeam);
      popSum('敗北...<br><br>點擊來返回主頁面...');
      return 0;
    }
  }
}