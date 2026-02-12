import { data } from './data.js'

const list = document.getElementById('list')
const searchInput = document.getElementById('search')
const cardsContainer = document.getElementById('cards')

let history = []
let current = { type: 'list', items: data }

// -------------------------
// Основной рендер
// -------------------------
function render() {
  list.innerHTML = ''
  cardsContainer.innerHTML = ''

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
        ${product.image ? `<img src="${product.image}" class="card-img-top" alt="${product.title}">` : ''}
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.short || ''}</p>
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
        ${current.item.content || ''}
      </div>
    `
    list.append(page)
  }
}

// -------------------------
// Поиск
// -------------------------
function flattenData(items) {
  let result = []

  items.forEach(item => {
    // добавляем только страницы/продукты с контентом
    if (item.content || item.id) {
      result.push(item)
    }

    if (item.children) {
      result = result.concat(flattenData(item.children))
    }
  })

  return result
}

// Все страницы/продукты с контентом для поиска
const allPages = flattenData(data)

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim()

  if (!query) {
    // если строка поиска пустая, просто рендерим текущий список
    render()
    return
  }

  const filtered = allPages.filter(item =>
    item.title.toLowerCase().includes(query)
  )

  renderResults(filtered)
})

function renderResults(items) {
  cardsContainer.innerHTML = ''

  if (items.length === 0) {
    cardsContainer.innerHTML = '<p>Ничего не найдено</p>'
    return
  }

  items.forEach(item => {
    const div = document.createElement('div')
    div.classList.add('card', 'p-2', 'mb-2')
    div.style.cursor = 'pointer'
    div.textContent = item.title

    div.addEventListener('click', () => {
      openPage(item)
    })

    cardsContainer.appendChild(div)
  })
}

function openPage(item) {
  cardsContainer.innerHTML = `
    <div class="card p-3">
      <h4>${item.title}</h4>
      ${item.content || ''}
      <button id="backFromSearch" class="btn btn-secondary mt-3">← Назад</button>
    </div>
  `

  document.getElementById('backFromSearch').onclick = () => {
    renderResults([])
    searchInput.value = ''
    render()
  }
}

// -------------------------
// Стартовый рендер
// -------------------------
render()
