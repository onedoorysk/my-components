// script.jsをes6構文にリプレイスしたもの
class AppModel {  
  constructor(attrs) {
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
  
  on(event, func) {
    this.listeners[event].push(func)
  }
  
  trigger(event) {
    this.listeners[event].forEach(listener => listener())
  }
  
  set(val) {
    if (this.val === val) return
    this.val = val
    this.validate()
  }
  
  validate() {
    let val
    this.errors = []
    
    for (var key in this.attrs) {
      val = this.attrs[key]
      if(!this[key](val)) this.errors.push(key)
    }
    this.trigger(!this.errors.length ? 'valid' : 'invalid')
  }
  
  required() {
    return this.val !== ''
  }
  
  maxlength(num) {
    return num >= this.val.length
  }

  minlength(num) {
    return num <= this.val.length
  }
}


class AppView {
  constructor(el) {
    this.initialize(el)
    this.handleEvents()
  }
  
  initialize(el) {
    this.$el = el
    this.$errorMessageList = el.nextElementSibling.children
    this.model = new AppModel(this.$el)
  }
  
  handleEvents() {
    const self = this
    
    this.$el.addEventListener('keyup', e => {
      this.onKeyUp(e)
    })
    this.model.on('valid', () => {
      self.onValid()
    })
    this.model.on('invalid', () => {
      self.onInvalid()
    })
  }
  
  onKeyUp(e) {
    this.model.set(e.currentTarget.value)
  }
  
  onValid() {
    for (let errorMessage of this.$errorMessageList) {
      errorMessage.style = 'display: none;'
    }
  }
  
  onInvalid() {
    for (let errorMessage of this.$errorMessageList) {
      errorMessage.style = 'display: none;'
    }
    
    this.model.errors.forEach(errorType => {
      for (let errorMessage of this.$errorMessageList) {
        if (errorMessage.getAttribute('data-error') === errorType) {
          errorMessage.style = 'display: block;'
        }
      }
    })
  }
}

window.addEventListener('load', () => {
  const $validateTargetInputTag = document.getElementsByClassName('require-text')
  for (let el of $validateTargetInputTag) {
    new AppView(el)
  }
})