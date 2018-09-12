document.addEventListener('DOMContentLoaded', () => {
  // 初期表示時は"0%"
  document.getElementById('percent-number').textContent = 0
})

document.getElementById('percent-button').addEventListener('click', () => {
  // 入力値を数値として扱うためパースする
  var inputNumber = parseInt(document.getElementById('percent-textbox').value, 10)
  
  if (!validateCheck(inputNumber)) return
  // ゲージのwidthを変更
  document.getElementById('progress-gage').style.width = inputNumber + '%'
  // ゲージのパーセンテージ数値を変更
  changePercentageNumber(inputNumber)
})

var validateCheck = inputNumber => {
  if (isNaN(inputNumber)) {
    alert('数値を入力してください。')
    return false
  }
  if (inputNumber < 0 || inputNumber > 100) {
    alert('0から100までの数値を入力してください。')
    return false
  }
  return true
}

var changePercentageNumber = inputNumber => {
  var percentNumberBeforeChange = parseInt(document.getElementById('percent-number').textContent, 10)
  var incrementOrDecrementCount = percentNumberBeforeChange
  
  setTimeout(function callBack() {
    if (inputNumber === incrementOrDecrementCount) return
    
    if (inputNumber >= percentNumberBeforeChange) {
      incrementOrDecrementCount += 1
      document.getElementById('percent-number').textContent = incrementOrDecrementCount
      setTimeout(callBack, 1000 / (inputNumber - percentNumberBeforeChange))
    } else {
      incrementOrDecrementCount -= 1
      document.getElementById('percent-number').textContent = incrementOrDecrementCount
      setTimeout(callBack, 1000 / (percentNumberBeforeChange - inputNumber))
    }
  }, 100)
}