function Modal(els) {
  this.initialize(els)
}

Modal.prototype.initialize = function(els) {
  this.$els = els
  this.$container = document.getElementById('modal')
  this.$contents = document.getElementById('modal-contents')
  this.$close = document.getElementById('modal-close')
  this.$next = document.getElementById('modal-next')
  this.$prev = document.getElementById('modal-prev')
  this.$overlay = document.getElementById('modal-overlay')
  this.$parents = this.$els[0].parentNode.parentNode
  this.handleEvents()
}

Modal.prototype.handleEvents = function() {
  var self = this

  this.$parents.addEventListener('click', e => {
    self.show(e)
  })

  this.$close.addEventListener('click', e => {
    self.hide(e)
  })
  
  this.$overlay.addEventListener('click', e => {
    self.hide(e)
  })
  
  this.$next.addEventListener('click', e => {
    self.next(e)
  })
  
  this.$prev.addEventListener('click', e => {
    self.prev(e)
  })
  
  window.addEventListener('resize', () => {
    self.resize()
  })
  
  window.addEventListener('load', () => {
    self.resize()
  })
}
// モーダル表示を行う
Modal.prototype.show = function(e) {
  // targetは実際にイベントが起きているDOM
  // currentTargetはイベントが登録されているDOM(今でいうとul#modal-thumb)
  if (e.target === e.currentTarget) return

  var $target = e.target
  var src = $target.getAttribute('src')
  this.$contents.innerHTML = "<img src=\" "+ src +" \"/>"
  this.$container.style.display = 'block'
  this.$overlay.style.display = 'block'
  var index = $target.getAttribute('data-index')
  this.countChange = this.createCounter(index, this.$els.length)
}
// モーダルを閉じる
Modal.prototype.hide = function(e) {
  this.$container.style.display = 'none'
  this.$overlay.style.display = 'none'
}
// 選択されているモーダル画像番号を取得する
Modal.prototype.createCounter = function(index, len) {
  return function(num) {
    return index = (index + num + len) % len
  }
}
// モーダル画像に切り替え
Modal.prototype.slide = function(index) {
  var modalTargetImage
  for (var $el of this.$els) {
    if (parseInt($el.getAttribute('data-index')) === index) {
      modalTargetImage = $el
    }
  }
  var src = modalTargetImage.children[0].getAttribute('src')
  this.$contents.innerHTML = "<img src=\" "+ src +" \"/>"
}
// 次の画像に切り替え
Modal.prototype.next = function() {
  this.slide(this.countChange(1))
}
// 前の画像に切り替え
Modal.prototype.prev = function() {
  this.slide(this.countChange(-1))
}
// ウィンドウサイズ変更時にモーダル領域を調整する
Modal.prototype.resize = function() {
  var w = window.innerWidth
  if (w < 640) {
    this.$container.style.width = '320px'
    this.$container.style.height = '213px'
  } else {
    this.$container.style.width = '750px'
    this.$container.style.height = '500px'
  }
}

var $modalTargetImgLink = document.getElementById('modal-thumb').getElementsByTagName('a')

var modal = new Modal($modalTargetImgLink)

var $moreButton = document.getElementById('more-btn')
// もっと見るボタン押下時の処理（画像の追加）
$moreButton.addEventListener('click', e => {
  // 追加分の画像の要素を生成
  var a = document.createElement('a')
  a.setAttribute('href', 'javascript:void(0)')
  a.setAttribute('data-index', '3')
  var img = document.createElement('img')
  img.setAttribute('alt', '')
  img.setAttribute('src', 'images/photo-04.JPG')
  img.setAttribute('width', '160')
  img.setAttribute('class', 'img-thumbnail')
  a.appendChild(img)
  var li = document.createElement('li')
  li.appendChild(a)
  
  var $imageList = document.getElementById('modal-thumb')
  // 画像リストに追加
  $imageList.appendChild(li)
  // モーダル表示対象画像の更新
  modal.$els = $imageList.getElementsByTagName('a')
  // もっと見るボタンを非表示 
  e.currentTarget.style.display = 'none'
})