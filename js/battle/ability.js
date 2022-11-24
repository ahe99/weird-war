function useAbility(chess) {
  //disable in preview version
  return 

  // if (chess.ability == true) {
  //   for (let i = 0; i < 52; i++) { //flush all click event
  //     realhex[i].onclick = undefined;
  //   }
  //   resetAllCellsColor();
  //   document.getElementsByClassName('ability')[0].style.display = 'none';
  //   document.getElementsByClassName('cancelability')[0].style.display = 'block';
  //   if (chess.type === 'water') {
  //     waterAbility();
  //   } else if (chess.type === 'fire') {
  //     fireAbility();
  //   } else if (chess.type === 'grass') {
  //     grassAbility();
  //   } else if (chess.type === 'light') {
  //     lightAbility();
  //   } else if (chess.type === 'dark') {
  //     darkAbility();
  //   }
  // }
}

function cancelAbility() {
  document.getElementsByClassName('ability')[0].style.display = 'block';
  document.getElementsByClassName('cancelability')[0].style.display = 'none';
  resetCells();
  refreshDashboard();
}

function waterAbility() {
  console.log('water ability:');
  console.log('used SPLASH!');
  console.log('but nothing happened');
  console.log('-----------------');
  disableAbility();
  resetCells(); //不消耗回合
  refreshDashboard();
  refreshGravyargd();

}

function fireAbility() { //重置在bured()
  let canBeBurned = [];
  for (let cell of realhex) {
    if (cell.classList.contains('mychesshex')) {
      continue;
    } else if (cell.classList.contains('enemychesshex')) {
      continue;
    } else if (cell.classList.contains('burnedhex')) {
      continue;
    }
    cell.onclick = function() { burned(this); }
    canBeBurned.push(Number(cell.textContent));
  }
  changeOptCellsColor(canBeBurned);
}

function burned(cell) {
  burnedCells.push(Number(cell.textContent));
  cell.classList.add('burnedhex'); //reset也會做
  console.log('fire ability:');
  console.log('cell:' + cell.textContent + 'got burned!');
  console.log('-----------------');
  disableAbility();
  // endMyTurn();
}

function grassAbility() {
  console.log('grass ability:');
  console.log('pass one turn!');
  console.log('-----------------');
  disableAbility();
  // endMyTurn();
  //pass
}

let chosenChess = []; //for light and Dark ability
let chosenChessNext = [];

function lightAbility() {
  //友方兩隻交換
  console.log('light ability:');
  console.log('first pick:');
  chosenChess = [];
  chosenChessNext = [];
  let optChess = [];
  for (let chess of myTeam) {
    if (chess.dead === false) {
      let cellNum = chess.at;
      optChess.push(cellNum);
      realhex[cellNum].onclick = function() { lightChooseFirstChess(this); };
    }
  }
  changeOptCellsColor(optChess);
}

function lightChooseFirstChess(chess) {
  console.log(chess.textContent);
  console.log('second pick:');
  chess.classList.add('chosenhex');
  chess.onclick = undefined;
  resetAllCellsColor();
  let optChess = [];
  chosenChess.push(Number(chess.textContent));
  chosenChessNext = myTeam.find(data => data.at === chosenChess[0]).next;

  for (let chess of myTeam) {
    if (chess.dead === false) {
      let cellNum = chess.at;
      if (cellNum !== chosenChess[0]) {
        optChess.push(cellNum);
        realhex[cellNum].onclick = function() { lightChooseSecondChess(this); }
      }
    }
  }
  changeOptCellsColor(optChess);
}

function lightChooseSecondChess(chess) {
  console.log(chess.textContent);
  console.log('swap!');
  console.log('-----------------');
  chosenChess.push(Number(chess.textContent));
  chosenChessNext.push(myTeam.find(data => data.at === chosenChess[1]).next);
  myTeam.map(chess => {
    if (chess.at === chosenChess[0]) {
      chess.at = chosenChess[1];
      chess.next = chosenChessNext[1];
    } else if (chess.at === chosenChess[1]) {
      chess.at = chosenChess[0]
      chess.next = chosenChessNext[0]
    }
    return chess;
  });
  disableAbility();
  // endMyTurn();
}

function darkAbility() {
  //敵方兩隻交換
  console.log('dark ability:');
  console.log('first pick:');
  chosenChess = [];
  chosenChessNext = [];
  let optChess = [];
  for (let chess of enemyTeam) {
    if (chess.dead === false) {
      let cellNum = chess.at;
      optChess.push(cellNum);
      realhex[cellNum].onclick = function() { darkChooseFirstChess(this); };
    }
  }
  changeOptCellsColor(optChess);
}

function darkChooseFirstChess(chess) {
  console.log(chess.textContent);
  console.log('second pick:');
  chess.classList.add('chosenhex');
  chosenChess.push(Number(chess.textContent));
  chosenChessNext.push(enemyTeam.find(data => data.at === chosenChess[0]).next);
  chess.onclick = undefined;
  resetAllCellsColor();
  let optChess = [];
  for (let chess of enemyTeam) {
    if (chess.dead === false) {
      let cellNum = chess.at;
      if (cellNum !== chosenChess[0]) {
        optChess.push(cellNum);
        realhex[cellNum].onclick = function() { darkChooseSecondChess(this); }
      }
    }
  }
  changeOptCellsColor(optChess);
}

function darkChooseSecondChess(chess) {
  console.log(chess.textContent);
  console.log('swap!');
  console.log('-----------------');
  chosenChess.push(Number(chess.textContent));
  chosenChessNext.push(enemyTeam.find(data => data.at === chosenChess[1]).next);
  console.log(chosenChess);
  console.log(chosenChessNext);
  enemyTeam.map(chess => {
    if (chess.at === chosenChess[0]) {
      chess.at = chosenChess[1];
      chess.next = chosenChessNext[1];
      chosenChessNext.push(chess.Next);
    } else if (chess.at === chosenChess[1]) {
      chess.at = chosenChess[0];
      chess.next = chosenChessNext[0];
    }
    return chess;
  });
  console.log(enemyTeam);
  disableAbility();
  // endMyTurn();
}

function disableAbility() { //用過能力
  document.getElementsByClassName('ability')[0].style.display = 'block';
  document.getElementsByClassName('cancelability')[0].style.display = 'none';
  myTeam.map(data => {
    if (data.at === currentSelect.at) {
      data.ability = false;
    }
    return data;
  });
  // console.log(myTeam);
  // console.log(enemyTeam);
}