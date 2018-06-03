(() => {
  const $navLink = document.getElementsByClassName('nav-link')
  const $navCursol = document.querySelector('.nav-cursol')
  // 画面表示後のカーソル初期位置を設定
  const initFirstPosition = () => {
    $navCursol.style.width = $navLink[0].getBoundingClientRect().width + 'px'
  }
  // ホバー時のカーソル位置とサイズ調整
  const changeCursolPosition = ($navLink, cursolLeftValue) => {
    $navCursol.style.width = $navLink.getBoundingClientRect().width + 'px'
    $navCursol.style.left = cursolLeftValue + 'px'
  }

  initFirstPosition()

  for (let i=0; i<$navLink.length; i++) {
    const cursolLeftValue = $navLink[i].getBoundingClientRect().left - $navCursol.getBoundingClientRect().left 
    $navLink[i].addEventListener('mouseover', () => changeCursolPosition($navLink[i], cursolLeftValue))
  }
})()

