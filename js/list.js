function openSearchPage() {
  console.log('open searchpage');
  console.log('-----------------');

  document.getElementsByClassName("searchpage")[0].style.display = 'block';
}

function closeSearchPage() {
  console.log('close searchpage');
  console.log('-----------------');

  document.getElementsByClassName("searchpage")[0].style.display = 'none';
}

function openChessPage() {
  console.log('open chesspage');
  console.log('-----------------');
  document.getElementsByClassName("chesspage")[0].style.display = 'block';
}

function closeChessPage() {
  console.log('close chesspage');
  console.log('-----------------');
  document.getElementsByClassName("chesspage")[0].style.display = 'none';
}

function openTeamPage() {
  console.log('close teampage');
  console.log('-----------------');
  document.getElementsByClassName("teampage")[0].style.display = 'none';
}

function closeTeamPage() {
  console.log('close teampage');
  console.log('-----------------');
  document.getElementsByClassName("teampage")[0].style.display = 'none';
}

function switchMusic() {
  console.log('switch music');
  console.log('-----------------');
  let musicplayer = document.getElementsByClassName("musicplayer")[0];
  let audio = document.getElementById("music");
  if (musicplayer.textContent == "音樂：on") {
    musicplayer.textContent = "音樂：off";
    audio.muted = true;
  } else {
    musicplayer.textContent = "音樂：on";
    audio.muted = false;
  }

  /*music change*/
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
} //做等待時間之用 使用需在function前加上async
function switchPage(pageCount) { //切換頁面
  /*
  0:配對搜尋
  1:我的戰旗
  2:隊伍配置
  3:戰棋資訊
  4:戰鬥畫面
  */
  console.log('close listpage...');
  console.log("switch page to " + pageCount);
  console.log('-----------------');
  let from = document.getElementsByClassName("listpage")[0].style;
  if (pageCount == 4) { //battlepage
    let to = document.getElementsByClassName("battlepage")[0].style;
    fadeInPagesColor(from, to);
  } else { //others
    let to = document.getElementsByClassName("page")[pageCount].style;
    fadeInPagesColor(from, to);
  }
}

async function fadeInPagesColor(from, to) { //離開listpage
  //old: rgb(153, 164, 252)
  //new: rgb(230, 178, 136)

  from.display = 'none';

  let oldR = 153;
  let oldG = 164;
  let oldB = 252;
  let newR = 230;
  let newG = 178;
  let newB = 136;
  to.display = 'block';
  to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
  while (oldG < newG) {
    oldG += 1;
    to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
    await sleep(0.05);
  }
  while (oldR < newR) {
    oldR += 1;
    to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
    await sleep(0.05);
  }
  while (oldB > newB) {
    oldB -= 1;
    to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
    await sleep(0.05);
  }
}

function backList(pageCount) {
  console.log('back to listpage');
  console.log('-----------------');
  let from = '';
  if (pageCount == 4) {
    document.getElementsByClassName("sumpage")[0].style = 'none';
    from = document.getElementsByClassName("battlepage")[0].style;
  } else {
    from = document.getElementsByClassName("page")[pageCount].style;
  }
  let to = document.getElementsByClassName("listpage")[0].style;
  /*
  0:配對搜尋
  1:我的戰旗
  2:隊伍配置
  3:戰棋資訊
  4:戰鬥畫面
  */
  refreshPageTeam();
  fadeOutPagesColor(from, to);
}

async function fadeOutPagesColor(from, to) { //進入listpage

  from.display = 'none';

  //new: rgb(153, 164, 252)
  //old: rgb(230, 178, 136)
  let oldR = 230;
  let oldG = 178;
  let oldB = 136;
  let newR = 153;
  let newG = 164;
  let newB = 252;
  to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
  to.display = 'block';
  while (oldG > newG) {
    oldG -= 1;
    to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
    await sleep(0.05);
  }
  while (oldR > newR) {
    oldR -= 1;
    to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
    await sleep(0.05);
  }
  while (oldB < newB) {
    oldB += 1;
    to.backgroundColor = 'rgb(' + [oldR, oldG, oldB].join(',') + ')';
    await sleep(0.05);
  }
}

function refreshPageTeam() {
  console.log(myTeam);
  let hometeam = document.getElementsByClassName('hometeam');
  for (let i = 0; i < 3; i++) {
    if (myTeam[i].img == undefined) {
      hometeam[i].src = 'assets/img/empty.png';
    } else {
      hometeam[i].src = myTeam[i].img;
    }
  }
}
async function dropBedforeLoginPage() {
  let beforeLogin = document.getElementsByClassName('beforelogin')[0];
  let display = window.getComputedStyle(beforeLogin).display;
  if (display === 'block') {
    beforeLogin.classList.add('afterlogin');
    await sleep(1000);
    beforeLogin.style.display = 'none';
  }
}

function popGuide(count) {
  let guideChess = document.getElementsByClassName('guidechesswrapper')[0];
  let guideDetail = document.getElementsByClassName('guidedetailwrapper');
  let guidebtn = document.getElementsByClassName('guidebtn')[0];
  let basicguide = document.getElementsByClassName('basicguide')[0];

  if (count === 0) {
    guidebtn.onclick = function() {
      closeGuide(0);
    }
  } else if (count === 1) {
    guidebtn.onclick = function() {
      closeGuide(1);
    }
  } else if (count === 2) {
    guidebtn.onclick = function() {
      closeGuide(2);
    }
  } else if (count === 3) {
    guidebtn.onclick = function() {
      closeGuide(3);
    }
  } else if (count === 4) {
    guidebtn.onclick = function() {
      closeGuide(4);
    }
  }
  basicguide.style.display = 'none';
  guideChess.style.display = 'none';
  guideDetail[count].style.display = 'block';
}

function closeGuide(count) {
  let guideChess = document.getElementsByClassName('guidechesswrapper')[0];
  let guideDetail = document.getElementsByClassName('guidedetailwrapper');
  let basicguide = document.getElementsByClassName('basicguide')[0];
  let guidebtn = document.getElementsByClassName('guidebtn')[0];
  guidebtn.onclick = function() {
    backList(1);
  }
  guideDetail[count].style.display = 'none';
  basicguide.style.display = 'block';
  guideChess.style.display = 'grid';
}