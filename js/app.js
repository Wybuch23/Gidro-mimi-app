import { data } from './data.js'

const list = document.getElementById('list')

let history = []
let current = { type: 'list', items: data }

function render() {
  list.innerHTML = ''

  // Кнопка "Назад"
  if (history.length) {
    const back = document.createElement('button')
    back.className = 'list-group-item list-group-item-secondary mb-3'
    back.textContent = '← Назад'
    back.onclick = () => {
      current = history.pop()
      render()
    }
    list.append(back)
  }

  // Список категорий
  if (current.type === 'list') {
    current.items.forEach(item => {
      const btn = document.createElement('button')
      btn.className = 'list-group-item list-group-item-action'
      btn.textContent = item.title

      btn.onclick = () => {
        history.push(current)

        if (item.type === 'products') {
          current = { type: 'products', items: item.children }
        } else if (item.children) {
          current = { type: 'list', items: item.children }
        } else if (item.content) {
          current = { type: 'page', item }
        }

        render()
      }

      list.append(btn)
    })
  }

  // Каталог продукции (карточки)
  if (current.type === 'products') {
    current.items.forEach(product => {
      const card = document.createElement('div')
      card.className = 'card mb-3'
      card.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.short}</p>
          <button class="btn btn-primary">Подробнее</button>
        </div>
      `

      card.querySelector('button').onclick = () => {
        history.push(current)
        current = { type: 'page', item: product }
        render()
      }

      list.append(card)
    })
  }

  // Страница продукта / инструкции
  if (current.type === 'page') {
    const page = document.createElement('div')
    page.className = 'card'
    page.innerHTML = `
      <div class="card-body">
        <h4 class="card-title mb-3">${current.item.title}</h4>
        ${current.item.content}
      </div>
    `
    list.append(page)
  }
}

render()
