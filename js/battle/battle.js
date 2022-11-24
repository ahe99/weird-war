const socket = io.connect('https://weirdwar-server.herokuapp.com/', { transports: ['websocket'] });
let realhex = document.getElementsByClassName('realhex'); //顯示的棋盤
let coverhex = document.getElementsByClassName('coverhex'); //棋子所在棋盤
let myturn = true;
// let enemyTeam = [{}, {}, {}];
//console.log(socket);
let enemyTeam = [{
    img: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/g3b7.png",
    id: 4,
    type: "dark",
    dead: false,
    ability: true
  },
  {
    img: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/w1b9.png",
    id: 5,
    type: "water",
    dead: false,
    ability: true
  },
  {
    img: "https://raw.githubusercontent.com/ahe99/weirdwar-server/master/Gene/sa49.png",
    id: 6,
    type: "Light",
    dead: false,
    ability: true
  }
];
let burnedCells = [];
let currentSelect = {};
//////////

async function findBattle() {
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

  await sleep(500)

  burnedCells = [];

  //初始myTeam
  myTeam[0].at = 46;
  myTeam[1].at = 48;
  myTeam[2].at = 50;
  //enemyTeam = enemyChess;
  for (let i = 0; i < 3; i++) {
    myTeam[i].ability = true;
    myTeam[i].dead = false;
    myTeam[i].next = findMove(myTeam[i]);
  }

  //初始enemyTeam
  enemyTeam[0].at = 46;
  enemyTeam[1].at = 48;
  enemyTeam[2].at = 50;
  for (let i = 0; i < 3; i++) {
    enemyTeam[i].ability = true;
    enemyTeam[i].dead = false;
    enemyTeam[i].next = findMove(myTeam[i]);
  }
  switchTeamChessAt(enemyTeam)
  // enemyTeam[0].at = 1;
  // enemyTeam[1].at = 3;
  // enemyTeam[2].at = 5;

  startBoard()
}

function startBoard( /*enemyChess*/ ) { //初始化棋盤
  for (let i = 0; i < 52; i++) {
    realhex[i].textContent = i;
  }

  document.getElementsByClassName('searchpage')[0].style.display = 'none';
  document.getElementsByClassName('battlepage')[0].style.display = 'block';

  // switchTeamChessAt(enemyTeam);
  refreshDashboard();
  refreshGravyargd();
  resetCells();

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
    console.log('before team[i]',team[i])
    if (team[i].at !== undefined) {
      // console.log(team[i]);
      // console.log(team[i].next);
      team[i].at = table[team[i].at];
      if (typeof(team[i].next) === 'object') {
        team[i].next = team[i].next.map(data => table[data]);
      } else {
        team[i].next = [table[team[i].next]];
      }
    }
    console.log('after team[i]',team[i])

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
    // console.log(myTeam);
    // console.log(enemyTeam);
    popSum('勝利!<br><br>點擊來返回主頁面...');
    return 0;
  }
  for (let chess of myTeam) {
    if (chess.at >= 0 && chess.at <= 6) {
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