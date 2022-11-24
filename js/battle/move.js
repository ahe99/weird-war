/**/

function findMove(chess) { //返回可選步伐
  let cellNum = Number(chess.at);
  let possibleMoves = [];
  if (chess.type === 'water') {
    possibleMoves = findWaterMove(cellNum);
  } else if (chess.type === 'fire') {
    possibleMoves = findFireMove(cellNum);
  } else if (chess.type === 'grass') {
    possibleMoves = findGrassMove(cellNum);
  } else if (chess.type === 'light') {
    possibleMoves = findLightMove(cellNum);
  } else if (chess.type === 'dark') {
    possibleMoves = findDarkMove(cellNum);
  }
  for (let member of myTeam) { //扣掉友軍
    possibleMoves = possibleMoves.filter(data => data !== member.at);
  }
  for (let cell of burnedCells) { //扣掉燒掉
    possibleMoves = possibleMoves.filter(data => data !== cell);
  }
  return possibleMoves;
}

function findRow(row = 0, cellNum) {
  while (cellNum >= 7) { //計算行數
    cellNum -= 7;
    row += 1;
    if (cellNum >= 8) {
      cellNum -= 8;
      row += 1;
    }
  }
  return row;
}

function findWaterMove(cellNum) { //返回w可選步伐
  let row = findRow(0, cellNum); //計算行數

  let possibleMoves = new Array(); //計算步伐
  // if (row == 0) {
  //   if (cellNum == 0) { //left side
  //     possibleMoves = [1, 7, 8];
  //   } else if (cellNum == 6) { //right side
  //     possibleMoves = [5, 13, 14];
  //   } else {
  //     possibleMoves = normalWaterCellsMove(cellNum);
  //   }
  // } else 
  if (row == 1) {
    if (cellNum == 7) {
      possibleMoves = [];
    } else if (cellNum == 14) {
      possibleMoves = [];
    } else {
      possibleMoves = normalWaterCellsMove(cellNum);
      possibleMoves = possibleMoves.filter(data => { data >= 0; })
    }
  } else if (row == 2) {
    if (cellNum == 15) {
      possibleMoves = [1];
    } else if (cellNum == 21) {
      possibleMoves = [5];
    } else {
      possibleMoves = normalWaterCellsMove(cellNum);
    }

  } else if (row == 3) {
    if (cellNum == 22) {
      possibleMoves = [8];
    } else if (cellNum == 29) {
      possibleMoves = [13];
    } else {
      possibleMoves = normalWaterCellsMove(cellNum);
    }

  } else if (row == 4) {
    if (cellNum == 30) {
      possibleMoves = [16];
    } else if (cellNum == 36) {
      possibleMoves = [20];
    } else {
      possibleMoves = normalWaterCellsMove(cellNum);
    }

  } else if (row == 5) {
    if (cellNum == 37) {
      possibleMoves = [23];
    } else if (cellNum == 44) {
      possibleMoves = [28];
    } else {
      possibleMoves = normalWaterCellsMove(cellNum);
    }

  } else if (row == 6) {
    if (cellNum == 45) {
      possibleMoves = [31];
    } else if (cellNum == 51) {
      possibleMoves = [35];
    } else {
      possibleMoves = normalWaterCellsMove(cellNum);
    }
  }
  //扣除已有我方棋子

  return possibleMoves;
}

function normalWaterCellsMove(cellNum) {
  return [cellNum - 16, cellNum - 14];
}

function findFireMove(cellNum) { //返回f可選步伐
  let row = findRow(0, cellNum); //計算行數

  let possibleMoves = new Array(); //計算步伐
  // if (row == 0) {
  //   if (cellNum == 0) { //left side
  //     possibleMoves = [1, 7, 8];
  //   } else if (cellNum == 6) { //right side
  //     possibleMoves = [5, 13, 14];
  //   } else {
  //     possibleMoves = normalFireCellsMove(cellNum);
  //   }
  // } else 
  if (row == 1) {
    if (cellNum == 7) {
      possibleMoves = [0, 8];
    } else if (cellNum == 14) {
      possibleMoves = [6, 13];
    } else {
      possibleMoves = normalFireCellsMove(cellNum);
    }
  } else if (row == 2) {
    if (cellNum == 15) {
      possibleMoves = [7, 8, 16];
    } else if (cellNum == 21) {
      possibleMoves = [13, 5, 20];
    } else {
      possibleMoves = normalFireCellsMove(cellNum);
    }

  } else if (row == 3) {
    if (cellNum == 22) {
      possibleMoves = [15, 23];
    } else if (cellNum == 29) {
      possibleMoves = [28, 21];
    } else {
      possibleMoves = normalFireCellsMove(cellNum);
    }

  } else if (row == 4) {
    if (cellNum == 30) {
      possibleMoves = [22, 23, 31];
    } else if (cellNum == 36) {
      possibleMoves = [35, 28, 29];
    } else {
      possibleMoves = normalFireCellsMove(cellNum);
    }

  } else if (row == 5) {
    if (cellNum == 37) {
      possibleMoves = [30, 38];
    } else if (cellNum == 44) {
      possibleMoves = [36, 43];
    } else {
      possibleMoves = normalFireCellsMove(cellNum);
    }

  } else if (row == 6) {
    if (cellNum == 45) {
      possibleMoves = [37, 38, 46];
    } else if (cellNum == 51) {
      possibleMoves = [50, 43, 44];
    } else {
      possibleMoves = normalFireCellsMove(cellNum);
    }
  }
  //扣除已有我方棋子

  return possibleMoves;
}

function normalFireCellsMove(cellNum) {
  return [cellNum - 1, cellNum - 8, cellNum - 7, cellNum + 1];
}

function findGrassMove(cellNum) {
  let row = findRow(0, cellNum);

  let possibleMoves = new Array(); //計算步伐
  // if (row == 0) {
  //   if (cellNum == 0) { //left side
  //     possibleMoves = [1, 7, 8];
  //   } else if (cellNum == 6) { //right side
  //     possibleMoves = [5, 13, 14];
  //   } else {
  //     possibleMoves = normalGrassCellsMove(cellNum);
  //   }
  // } else 
  if (row == 1) {
    if (cellNum == 7) {
      possibleMoves = [];
    } else if (cellNum == 14) {
      possibleMoves = [];
    } else {
      possibleMoves = normalGrassCellsMove(cellNum);
      possibleMoves = possibleMoves.filter(data => { data >= 0; })
    }
  } else if (row == 2) {
    if (cellNum == 15) {
      possibleMoves = [0];
    } else if (cellNum == 21) {
      possibleMoves = [6];
    } else {
      possibleMoves = normalGrassCellsMove(cellNum);
    }

  } else if (row == 3) {
    if (cellNum == 22) {
      possibleMoves = [7];
    } else if (cellNum == 29) {
      possibleMoves = [14];
    } else {
      possibleMoves = normalGrassCellsMove(cellNum);
    }

  } else if (row == 4) {
    if (cellNum == 30) {
      possibleMoves = [15];
    } else if (cellNum == 36) {
      possibleMoves = [21];
    } else {
      possibleMoves = normalGrassCellsMove(cellNum);
    }

  } else if (row == 5) {
    if (cellNum == 37) {
      possibleMoves = [22];
    } else if (cellNum == 44) {
      possibleMoves = [29];
    } else {
      possibleMoves = normalGrassCellsMove(cellNum);
    }

  } else if (row == 6) {
    if (cellNum == 45) {
      possibleMoves = [30];
    } else if (cellNum == 51) {
      possibleMoves = [36];
    } else {
      possibleMoves = normalGrassCellsMove(cellNum);
    }
  }
  //扣除已有我方棋子

  return possibleMoves;
}

function normalGrassCellsMove(cellNum) {
  return [cellNum - 15];
}

function findLightMove(cellNum) {
  let row = findRow(0, cellNum);
  let possibleMoves = new Array(); //計算步伐
  // if (row == 0) {
  //   if (cellNum == 0) { //left side
  //     possibleMoves = [1, 7, 8];
  //   } else if (cellNum == 6) { //right side
  //     possibleMoves = [5, 13, 14];
  //   } else {
  //     possibleMoves = normalLightCellsMove(cellNum);
  //   }
  // } else 
  if (row == 1) {
    if (cellNum == 7) {
      possibleMoves = [1];
    } else if (cellNum == 8) {
      possibleMoves = [2];
    } else if (cellNum == 13) {
      possibleMoves = [4];
    } else if (cellNum == 14) {
      possibleMoves = [5];
    } else {
      possibleMoves = normalLightCellsMove(cellNum);
      console.log(possibleMoves);
      //possibleMoves = possibleMoves.filter(data => { data >= 0; })
    }
  } else if (row == 2) {
    if (cellNum == 15) {
      possibleMoves = [9];
    } else if (cellNum == 21) {
      possibleMoves = [12];
    } else {
      possibleMoves = normalLightCellsMove(cellNum);
    }

  } else if (row == 3) {
    if (cellNum == 22) {
      possibleMoves = [16];
    } else if (cellNum == 23) {
      possibleMoves = [17];
    } else if (cellNum == 28) {
      possibleMoves = [19];
    } else if (cellNum == 29) {
      possibleMoves = [20];
    } else {
      possibleMoves = normalLightCellsMove(cellNum);
    }

  } else if (row == 4) {
    if (cellNum == 30) {
      possibleMoves = [24];
    } else if (cellNum == 36) {
      possibleMoves = [27];
    } else {
      possibleMoves = normalLightCellsMove(cellNum);
    }

  } else if (row == 5) {
    if (cellNum == 37) {
      possibleMoves = [31];
    } else if (cellNum == 38) {
      possibleMoves = [32];
    } else if (cellNum == 43) {
      possibleMoves = [34];
    } else if (cellNum == 44) {
      possibleMoves = [35];
    } else {
      possibleMoves = normalLightCellsMove(cellNum);
    }

  } else if (row == 6) {
    if (cellNum == 45) {
      possibleMoves = [39];
    } else if (cellNum == 51) {
      possibleMoves = [42];
    } else {
      possibleMoves = normalLightCellsMove(cellNum);
    }
  }
  //扣除已有我方棋子

  return possibleMoves;
}

function normalLightCellsMove(cellNum) {
  return [cellNum - 9, cellNum - 6];
}

function findDarkMove(cellNum) {
  let row = findRow(0, cellNum);

  let possibleMoves = new Array(); //計算步伐
  // if (row == 0) {
  //   if (cellNum == 0) { //left side
  //     possibleMoves = [1, 7, 8];
  //   } else if (cellNum == 6) { //right side
  //     possibleMoves = [5, 13, 14];
  //   } else {
  //     possibleMoves = normalDarkCellsMove(cellNum);
  //   }
  // } else 
  if (row == 1) {
    if (cellNum == 7) {
      possibleMoves = [0];
    } else if (cellNum == 14) {
      possibleMoves = [6];
    } else {
      possibleMoves = normalDarkCellsMove(cellNum);
      possibleMoves = possibleMoves.filter(data => { data >= 0; })
    }
  } else if (row == 2) {
    if (cellNum == 15) {
      possibleMoves = [7, 8];
    } else if (cellNum == 21) {
      possibleMoves = [13, 14];
    } else {
      possibleMoves = normalDarkCellsMove(cellNum);
    }

  } else if (row == 3) {
    if (cellNum == 22) {
      possibleMoves = [15];
    } else if (cellNum == 29) {
      possibleMoves = [21];
    } else {
      possibleMoves = normalDarkCellsMove(cellNum);
    }

  } else if (row == 4) {
    if (cellNum == 30) {
      possibleMoves = [22, 23];
    } else if (cellNum == 36) {
      possibleMoves = [28, 29];
    } else {
      possibleMoves = normalDarkCellsMove(cellNum);
    }

  } else if (row == 5) {
    if (cellNum == 37) {
      possibleMoves = [30];
    } else if (cellNum == 44) {
      possibleMoves = [36];
    } else {
      possibleMoves = normalDarkCellsMove(cellNum);
    }

  } else if (row == 6) {
    if (cellNum == 45) {
      possibleMoves = [37, 38];
    } else if (cellNum == 51) {
      possibleMoves = [43, 44];
    } else {
      possibleMoves = normalDarkCellsMove(cellNum);
    }
  }
  //扣除已有我方棋子

  return possibleMoves;
}

function normalDarkCellsMove(cellNum) {
  return [cellNum - 8, cellNum - 7];
}

function showPossibleMoves(from) { //顯示可選步
  if (myturn === false) {
    return false;
  }
  currentSelect = myTeam.find(data => { return data.at === Number(from.textContent) });
  let possibleMoves = currentSelect.next;

  refreshDashboard();
  renderChosen(from);
  console.log('you choose:');
  console.log(from.textContent);
  console.log('you can move to:');
  console.log(possibleMoves);
  console.log(currentSelect.type + ' ability:' + currentSelect.ability);
  console.log('-----------------');
  resetAllCellsColor();
  changeOptCellsColor(possibleMoves); //改變顏色

  for (let i = 0; i < 52; i++) { //給上錯誤選擇操作邏輯
    realhex[i].onclick = function() {
      console.log('invalid choosing------');
      resetCells();
      refreshDashboard();
    }
  }
  for (move of possibleMoves) { //可移動:覆蓋上正確選擇操作邏輯
    realhex[move].onclick = function() { moveChess(from, this); }
  }
}

function peekMinePossibleMoves(from) { //沒有操作邏輯,純看
  let chess = myTeam.find(data => { return data.at === Number(from.textContent) });
  let possibleMoves = chess.next;
  for (let i of possibleMoves) {
    realhex[i].style.opacity = '0.5';
  }
}

function stopPeekMinePossibleMoves(from) { //沒有操作邏輯,純看
  let chess = myTeam.find(data => { return data.at === Number(from.textContent) });
  let possibleMoves = chess.next;
  for (let i of possibleMoves) {
    realhex[i].style.opacity = '1';
  }
}

function peekEnemyPossibleMoves(from) { //沒有操作邏輯,純看
  let chess = enemyTeam.find(data => { return data.at === Number(from.textContent) });
  let possibleMoves = chess.next;
  for (let i of possibleMoves) {
    realhex[i].classList.add('enemyoptionhex');
  }
}

function stopPeekEnemyPossibleMoves(from) { //沒有操作邏輯,純看
  let chess = enemyTeam.find(data => { return data.at === Number(from.textContent) });
  let possibleMoves = chess.next;
  for (let i of possibleMoves) {
    realhex[i].classList.remove('enemyoptionhex');
  }
}

function moveChess(from /*realhex*/ , to /*realhex*/ ) { //移動棋子
  console.log('from:');
  console.log(from.textContent);
  console.log('move to:');
  console.log(to.textContent);
  console.log('-----------------');
  renderChosen(to);
  myTeam = myTeam.map(data => {
    if (data.at === Number(from.textContent)) {
      data.at = Number(to.textContent);
      return data;
    } else {
      return data;
    }
  })
  if (to.classList.contains('enemychesshex')) { //判斷敵友相遇
    attackChess(from, to);
    console.log(enemyTeam);
  }
  // let fromCoverhex = document.getElementsByClassName('coverhex')[from.textContent];
  // let toCoverhex = document.getElementsByClassName('coverhex')[to.textContent];
  // let chess = fromCoverhex.firstChild.cloneNode();
  // //myturn = false;
  // fromCoverhex.removeChild(fromCoverhex.firstChild);
  // toCoverhex.appendChild(chess);
  resetCells(); //重置
  refreshGravyargd();
  refreshDashboard();
  // endMyTurn();
  checkOver();
}

function resetCells() { //重置所有棋盤
  console.log('all cells reset...');
  console.log('-----------------');

  currentSelect = {};
  refreshPossibleMoves();
  resetAllCellsColor();

  for (let i = 0; i < 52; i++) {
    realhex[i].onclick = undefined;
    realhex[i].onmouseover = undefined;
    realhex[i].onmouseout = undefined;
    realhex[i].setAttribute('class', 'realhex'); //重置class
    if (coverhex[i].firstChild) {
      coverhex[i].removeChild(coverhex[i].firstChild);
    }
  }
  let optChess = [];
  for (let chess of myTeam) {
    if (chess.dead === false) {
      let cellNum = chess.at;
      optChess.push(cellNum);

      let newChess = document.createElement('img');
      coverhex[cellNum].appendChild(newChess);
      newChess.src = chess.img;

      realhex[cellNum].classList.add('mychesshex');
      realhex[cellNum].onclick = function() { showPossibleMoves(this); }
      realhex[cellNum].onmouseover = function() { peekMinePossibleMoves(this) };
      realhex[cellNum].onmouseout = function() { stopPeekMinePossibleMoves(this) };
    }
  }
  if (myturn === true) {
    changeOptCellsColor(optChess);
  } //可操作的棋子

  for (let chess of enemyTeam) {
    if (chess.dead === false) {
      let cellNum = chess.at;

      let newChess = document.createElement('img');
      newChess.src = chess.img;
      coverhex[cellNum].appendChild(newChess);

      realhex[cellNum].classList.add('enemychesshex');
      realhex[cellNum].onmouseover = function() { peekEnemyPossibleMoves(this) };
      realhex[cellNum].onmouseout = function() { stopPeekEnemyPossibleMoves(this) };
    }
  }
  for (let cellNum of burnedCells) {
    realhex[cellNum].classList.add('burnedhex');
  }
  console.log('your team:');
  console.log(myTeam);
  console.log('enemy team:')
  console.log(enemyTeam);
  //console.log(myturn);
  console.log('-----------------');
}

function changeOptCellsColor(possibleMoves) {
  for (cell of possibleMoves) {
    realhex[cell].classList.add('optionhex');
  }
}

function resetAllCellsColor() {
  let optionhex = document.getElementsByClassName('optionhex');
  while (optionhex.length) { //excellent advice from stackoverflow
    optionhex[0].classList.remove('optionhex');
  }
}

function resetCertainOptCellsColor(possibleMoves) {
  for (cell of possibleMoves) {
    realhex[cell].classList.remove('optionhex');
  }
}

function attackChess(from, to) { //攻擊敵方棋子時
  //let toCoverhex = document.getElementsByClassName('coverhex')[to.textContent];
  //let deadchess = toCoverhex.firstChild.cloneNode();
  console.log(Number(from.textContent) + Number(to.textContent));
  enemyTeam.map(chess => {
    if (chess.at === Number(to.textContent)) {
      chess.at = undefined;
      chess.next = undefined;
      chess.dead = true;
    }
    return chess;
  });
  //toCoverhex.removeChild(toCoverhex.firstChild);
}

function refreshGravyargd() {
  let deadmine = document.getElementsByClassName('deadmine')[0];
  let deadenemy = document.getElementsByClassName('deadenemy')[0];
  while (deadmine.firstChild) {
    deadmine.removeChild(deadmine.firstChild);
  }
  for (let chess of myTeam) {
    if (chess.dead === true) {
      let deadchess = document.createElement('img');
      deadchess.src = chess.img;
      deadchess.style.display = "block";
      deadmine.appendChild(deadchess);
    }
  }
  while (deadenemy.firstChild) {
    deadenemy.removeChild(deadenemy.firstChild);
  }
  for (let chess of enemyTeam) {
    if (chess.dead === true) {
      let deadchess = document.createElement('img');
      deadchess.src = chess.img;
      deadchess.style.display = "block";
      deadenemy.appendChild(deadchess);
    }
  }
}

function refreshPossibleMoves() {
  for (let i = 0; i < 3; i++) {
    myTeam[i].next = findMove(myTeam[i]);
  }
}