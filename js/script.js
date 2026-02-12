// const products = [
//   {
//     id: 'epoxy-2k',
//     title: 'ЭПОКСИ 2К',
//     description: 'Двухкомпонентный эпоксидный гидроизоляционный состав.',
//     tags: ['эпокси', '2к', 'эпоксидный', 'гидроизоляция']
//   },
//   {
//     id: 'flex',
//     title: 'ФЛЕКС 2К',
//     description: 'Эластичный двухкомпонентный состав для сложных поверхностей.',
//     tags: ['флекс', '2к', 'эластичный']
//   },
//   {
//     id: 'penetrat',
//     title: 'ПЕНЕТРАТ',
//     description: 'Глубокопроникающий гидроизоляционный материал.',
//     tags: ['пенетрат', 'проникающий']
//   }
// ]

// const cardsContainer = document.getElementById('cards')

// function openProduct(product) {
//   document.body.innerHTML = `
//     <div class="container">
//       <button id="back">← Назад</button>

//       <h1>${product.title}</h1>
//       <p>${product.description}</p>

//       <p>
//         Здесь будет подробное описание, инструкции,
//         схемы, материалы и т.д.
//       </p>
//     </div>
//   `

//   document.getElementById('back').addEventListener('click', () => {
//     location.reload()
//   })
// }


// function renderCards(items) {
//   cardsContainer.innerHTML = ''

//   if (items.length === 0) {
//     cardsContainer.innerHTML = '<p>Ничего не найдено</p>'
//     return
//   }

//   items.forEach(item => {
//     const card = document.createElement('div')
//     card.className = 'card'

//     card.innerHTML = `
//       <h3>${item.title}</h3>
//       <p>${item.description}</p>
//     `

//     card.addEventListener('click', () => {
//         openProduct(item)
//     })

//     cardsContainer.append(card)
//   })
// }

// const searchInput = document.getElementById('search')

// searchInput.addEventListener('input', event => {
//   const query = event.target.value.toLowerCase()

//   const filteredProducts = products.filter(product => {
//     return (
//       product.title.toLowerCase().includes(query) ||
//       product.description.toLowerCase().includes(query) ||
//       product.tags.some(tag => tag.includes(query))
//     )
//   })

//   renderCards(filteredProducts)
// })

// // renderCards(products)