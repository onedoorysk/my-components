(() => {
  const $navLink = document.getElementsByClassName('nav-link')
  const $navCursol = document.querySelector('.nav-cursol')
  let animation

  const initFirstPosition = () => {
    $navCursol.style.width = $navLink[0].getBoundingClientRect().width + 'px'
    $navCursol.style.left = '0px'
  }
  const registChangeCursolEvent = () => {
    for (let i=0; i<$navLink.length; i++) {
      // 各メニューの位置とカーソルの初期位置の差分を計算。
      const cursolPositionValue = $navLink[i].getBoundingClientRect().left - $navCursol.getBoundingClientRect().left
      
      let cursolProperty = {
        targetWidth: $navLink[i].getBoundingClientRect().width + 'px',
        targetPosition: cursolPositionValue
      }

      $navLink[i].addEventListener('mouseover', () => {
        clearTimeout(animation)

        const beforeCursolPosition = parseFloat($navCursol.style.left)
        if (beforeCursolPosition < cursolProperty.targetPosition) {
          $navCursol.style.left = 15 + cursolProperty.targetPosition + 'px'
        } else {
          $navCursol.style.left = -15 + cursolProperty.targetPosition + 'px'
        }
        animation = setTimeout(() => {
          $navCursol.style.left = cursolProperty.targetPosition + 'px'
        }, 500)

        $navCursol.style.width = cursolProperty.targetWidth
        animation()
      })
    }
  }

  // 画面表示後のカーソル初期位置を設定
  initFirstPosition()
  // カーソルの状態変更イベント設定
  registChangeCursolEvent()
})()

