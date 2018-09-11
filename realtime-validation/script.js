// モデル
function AppModel(attrs) {
  this.val = ""
  this.attrs = {
    required: '',
    maxlength: 8,
    minlength: 4
  }
  this.listeners = {
    valid: [],
    invalid: []
  }
}
// リスナーの登録
AppModel.prototype.on = function(event, func) {
  this.listeners[event].push(func)
}
// イベント名に紐づく各リスナーを実行
AppModel.prototype.trigger = function(event) {
  this.listeners[event].forEach(function(listener) {
    listener()
  })
}
// 監視対象の値（クライアントからの入力）のセット
AppModel.prototype.set = function(val) {
  if (this.val === val) return
  this.val = val
  this.validate()
}
// 監視対象の値をもとに各バリデーションチェックを実行
AppModel.prototype.validate = function() {
  var val
  this.errors = []
  
  for (var key in this.attrs) {
    val = this.attrs[key]
    if (!this[key](val)) this.errors.push(key)
  }
  this.trigger(!this.errors.length ? 'valid' : 'invalid')
}
// 監視対象の値が１文字以上ある場合はtrue
AppModel.prototype.required = function() {
  return this.val !== ''
}
// 監視対象の値が8文字以内の場合はtrue
AppModel.prototype.maxlength = function(num) {
  return num >= this.val.length
}
// 監視対象の値が４文字以上の場合はtrue
AppModel.prototype.minlength = function(num) {
  return num <= this.val.length
}



// ビュー
function AppView(el) {
  this.initialize(el)
  this.handleEvents()
}
// DOMとモデルを定義
AppView.prototype.initialize = function(el) {
  this.$el = el
  this.$errorMessageList = el.nextElementSibling.children
  this.model = new AppModel(this.$el)
}
// 対象のDOM（今の場合はinput[text]）にkeyupイベントハンドラを設定
// リスナーの登録
AppView.prototype.handleEvents = function() {

  var self = this
  
  self.$el.addEventListener('keyup', e => {
    self.onKeyUp(e)
  })
  
  this.model.on('valid', () => {
    self.onValid()
  })
  
  this.model.on('invalid', () => {
    self.onInvalid()
  })
}
// keyupが行われたら監視対象の値をセット
AppView.prototype.onKeyUp = function(e) {
  this.model.set(e.currentTarget.value)
}
// バリデーションチェックが通った場合のスタイル変更
AppView.prototype.onValid = function() {
  for(var errorMessage of this.$errorMessageList) {
    errorMessage.style = 'display: none;'
  }
}
// バリデーションチェックが通らなかった場合のスタイル変更
AppView.prototype.onInvalid = function() {
  for(var errorMessage of this.$errorMessageList) {
    errorMessage.style = 'display: none;'
  }
  this.model.errors.forEach(errorType => {
    for(var errorMessage of this.$errorMessageList) {
      if (errorMessage.getAttribute('data-error') === errorType) {
        errorMessage.style = 'display: block;'
      }
    }
  })
}
// ページ読み込み後、各inputタグのDOMを引数にビューコンストラクタを生成
addEventListener('load', () => {
  var $inputTags = document.getElementsByClassName('require-text')
  for(var el of $inputTags) {
    new AppView(el)
  }
})



