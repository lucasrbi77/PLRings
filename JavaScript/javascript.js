const listaDeProductos = [
    {
        id: 1,
        nombre: "Cruz de Nacar",
        precio: 1000,
        stock: 20,
        
    },
    {
        id: 2,
        nombre: "Brillos",
        precio: 2500,
        stock: 20
    },
    {
        id: 3,
        nombre: "Tri Flower",
        precio: 990,
        stock: 20
    },
    {
        id: 4,
        nombre: "Black",
        precio: 1250,
        stock: 20
    },
    {
        id: 5,
        nombre: "PinkGold",
        precio: 4500,
        stock: 20
    },
    {
        id: 6,
        nombre: "Purple mode",
        precio: 5500,
        stock: 20
    },
    {
        id: 7,
        nombre: "Shine",
        precio: 1200,
        stock: 20
    },
    {
        id: 8,
        nombre: "Star",
        precio: 3200,
        stock: 20
    },
    {
        id: 9,
        nombre: "Unique",
        precio: 2000,
        stock: 20
    },
    {
        id: 10,
        nombre: "Queen",
        precio: 1500,
        stock: 12
    },
    {
        id: 11,
        nombre: "Perlado",
        precio: 2500,
        stock: 12
    },
    {
        id: 12,
        nombre: "FlordeLoto",
        precio: 1500,
        stock: 20
    }
]

let catalog = document.getElementById('items')
let cartList = document.getElementById('carrito')
let buttonEmpty = document.getElementById('boton-vaciar')
let totalValue = document.getElementById('total')
let cart = []

buttonEmpty.addEventListener('click', emptyButtonHandler)

loadCartFromStorage()
renderCart()


listaDeProductos.forEach((prod) => {
    let container = document.createElement('div')
    container.classList.add('card')
    //Body
    let cardBody = document.createElement("div")
    cardBody.classList.add('card-body')
    //Title
    let cardTitle = document.createElement("h5")
    cardTitle.classList.add('card-title')
    cardTitle.innerText = prod.nombre
    //Precio
    let cardPrice = document.createElement("p")
    cardPrice.classList.add('card-text')
    cardPrice.innerText = `$${prod.precio}`
    //Stock
    let cardStock = document.createElement("p")
    cardStock.classList.add('card-text')
    cardStock.innerText = `Stock: ${prod.stock}`
    //Button
    let cardButton = document.createElement("button")
    cardButton.classList.add('btn', 'btn-primary')
    cardButton.innerText = `Comprar`
    cardButton.setAttribute('mark', prod.id)
    cardButton.addEventListener('click', addProdToCart)

    cardBody.append(cardTitle)
    cardBody.append(cardPrice)
    cardBody.append(cardStock)
    cardBody.append(cardButton)
    container.append(cardBody)
    catalog.append(container)
})

function addProdToCart(event){
    let id = event.target.getAttribute('mark')
    cart.push(id)
    renderCart()

    Toastify({
        text: `Agregaste correctamente el producto id: ${id} al carrito`,
        className: "info",
        duration: 3000,
        gravity: 'bottom'
      }).showToast();
}

function renderCart(){

    saveCartToStorage()

    cartList.innerHTML = ''

    let cartWithoutRepeatedElements = [...new Set(cart)]

    cartWithoutRepeatedElements.forEach((itemId) => {
        let item = listaDeProductos.filter((producto) => {
            return producto.id === parseInt(itemId)
        })
        let quantity = cart.reduce((total, id) => {
            return id === itemId ? total += 1 : total
        }, 0)
    

    let linea = document.createElement('li')
    linea.classList.add('list-group-item', 'text-right', 'mx-2')
    linea.innerText = `${quantity} x ${item[0].nombre} - $${item[0].precio}`

    let buttonDelete = document.createElement('button')
    buttonDelete.classList.add('btn', 'btn-danger', 'mx-5')
    buttonDelete.innerText = 'X'
    buttonDelete.dataset.item = itemId
    buttonDelete.addEventListener('click', deleteProduct)

    linea.append(buttonDelete)
    cartList.append(linea)
    })

    totalValue.innerText = calculateTotalPrice()
}

function deleteProduct(event){
 let id = event.target.dataset.item
 cart = cart.filter((cartId) => {
    return cartId != id
 })
 renderCart()
 Swal.fire({
    title: "Eliminaste correctamente el producto!",
    icon: 'success'
 })
 
}

function emptyButtonHandler(){
    cart = []
    cartList.innerHTML = ''
    totalValue.innerText = 0
}

function calculateTotalPrice(){
    return cart.reduce((total, itemId) => {
        let item = listaDeProductos.filter((producto) => {
            return producto.id === parseInt(itemId)
        })

        return total + item[0].precio
    }, 0)
}

function saveCartToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

function loadCartFromStorage(){
    if(localStorage.getItem('cart') !== null){
        cart = JSON.parse(localStorage.getItem('cart'))
    }
}