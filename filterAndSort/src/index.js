const axios = require('axios')
const URL = 'http://127.0.0.1:63334/filterAndSort/data.json'

window.addEventListener('DOMContentLoaded', () => {

  const $select = document.getElementsByTagName('select')
  const $dataDisplayArea = document.getElementById('data-Display-area').getElementsByTagName('tbody')[0]

  function App() {
    this.initialize()
  }

  App.prototype.initialize = function() {
    this.currentDataList = []
    this.currentSortType = ''
    this.loadData()
  }

  App.prototype.loadData = function() {
    axios.get(URL)
      .then(response => {
        this.data = response.data
        this.currentDataList = this.data.list
        this.displayDataList(this.currentDataList)
        this.registEvent()
      }).catch(error => {
        console.log(error)
      })
  }

  App.prototype.registEvent = function() {
    // 配列に変換
    const selectArray = Object.keys($select).map(key => $select[key])
    selectArray.forEach(select => {
      select.addEventListener('change', e => {
        // 変更したコンボボックスの値
        const selectedOptionValue = e.target.children[e.target.selectedIndex].value
        switch (select.getAttribute('name')) {
          case 'filter':
            this.filter(selectedOptionValue)
            break
          case 'sort':
            this.sort(selectedOptionValue)
            break
          default:
            break
        }
      })
    })
  }

  App.prototype.filter = function(value) {
    if (value.length === 0) this.currentDataList = this.data.list
    else this.currentDataList = this.data.list.filter(data => data.group === value)
    // 変更前にソートされていなければデータの表示処理を行う
    if (this.currentSortType.length === 0) {
      this.displayDataList(this.currentDataList)
      return
    }
    this.sort(this.currentSortType)
  }

  App.prototype.sort = function(value) {
    switch (value) {
      case 'id':
        this.currentDataList = this.currentDataList.sort((a, b) => {
          if (a.id < b.id) return -1
          else return 1
        })
        break
      case 'name':
        this.currentDataList = this.currentDataList.sort((a, b) => {
          const nameA = a.name.toUpperCase()
          const nameB = b.name.toUpperCase()
          if (nameA < nameB) return -1
          else return 1
        })
        break
      case 'age':
        this.currentDataList = this.currentDataList.sort((a, b) => {
          if (a.age < b.age) return -1
          else return 1
        })
        break
      case 'group':
        this.currentDataList = this.currentDataList.sort((a, b) => {
          if (a.group < b.group) return -1
          else return 1
        })
        break
      default:
        break
    }
    // 現在のソートタイプを持たせる
    this.currentSortType = value
    this.displayDataList(this.currentDataList)
  }

  App.prototype.displayDataList = function(dataList) {
    this.removeDOM()
    this.insertDOM(dataList)
  }
  
  App.prototype.removeDOM = function() {
    while ($dataDisplayArea.firstChild) $dataDisplayArea.removeChild($dataDisplayArea.firstChild)
  }

  App.prototype.insertDOM = function(dataList) {
    dataList.forEach(data => {
      const trElement = document.createElement('tr')
      trElement.className = 'insert-data'

      const idTdElement = document.createElement('td')
      idTdElement.textContent = data.id
      trElement.appendChild(idTdElement)

      const nameTdElement = document.createElement('td')
      nameTdElement.textContent = data.name
      trElement.appendChild(nameTdElement)

      const ageTdElement = document.createElement('td')
      ageTdElement.textContent = data.age
      trElement.appendChild(ageTdElement)

      const groupTdElement = document.createElement('td')
      groupTdElement.textContent = data.group
      trElement.appendChild(groupTdElement)

      $dataDisplayArea.appendChild(trElement)
    })
  }

  new App(URL)
})