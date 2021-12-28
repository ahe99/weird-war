function popAlert(msg) { //彈出通知視窗

  let alertpage = document.getElementsByClassName('alertpage')[0];
  let alerttext = document.getElementsByClassName('alerttext')[0];
  if (alerttext === msg && alertpage.style.display === 'block') {
    return 0; //防彈跳alert
  }
  alerttext.textContent = msg;
  console.log(alerttext.textContent);
  console.log('-----------------');
  alerttext.style.color = 'rgba(0, 0, 0, 0.8)'
  alertpage.style.background = 'rgba(150, 150, 150, 0.2)';
  alertpage.style.display = 'block';
  fadeOutAlert(alertpage, alerttext);
}

async function fadeOutAlert(alertpage, alerttext) {
  await sleep(1000);
  let backOpacity = 20;
  let textOpacity = 80;
  while (backOpacity !== 0) {
    alertpage.style.backgroundColor = 'rgba(150, 150, 150,' + (backOpacity / 100) + ' )';
    alerttext.style.color = 'rgba(0, 0, 0,' + (textOpacity / 100) + ')';
    backOpacity -= 1;
    textOpacity -= 1;
    await sleep(10);
  }
  while (textOpacity !== 0) {
    alerttext.style.color = 'rgba(0, 0, 0,' + (textOpacity / 100) + ')';
    textOpacity -= 1;
    await sleep(5);
  }
  alertpage.style.display = 'none';
}