document.addEventListener('DOMContentLoaded', () => {
  const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 80.00 },
    ];
       
    let Carts = JSON.parse(localStorage.getItem('carts'))||[];
    const productItems = document.getElementById("product-items");
    const cartItems = document.getElementById("carts-items");
    const emptyTextDisplay = document.getElementById("empty-text");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("check-out");
    renderCart();
    products.forEach(product => {
        const div = document.createElement('div')
        div.classList.add('product-item')
        div.innerHTML = `<p>${product.name} - <span>${product.price.toFixed(2)}rs</span></p>
         <button data-id ="${product.id}">Add to Cart</button>`
        productItems.appendChild(div);
    })
     productItems.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = e.target.getAttribute('data-id');
            const product = products.find(product => product.id === parseInt(productId));
            addCarts(product);
        }
    })


    function addCarts(product) {
        Carts.push(product);
         saveCartsInLocalStorage()
        renderCart();
    }
      function renderCart() {
        cartItems.innerHTML = '';
        let totalPrice = 0;
        if (Carts.length > 0) {
            emptyTextDisplay.classList.add('hidden');
            cartItems.classList.remove('hidden');
            Carts.forEach((product) => {
                totalPrice += product.price
                const cartDiv = document.createElement('div');
                cartDiv.classList.add("cart-item");
                cartDiv.innerHTML = `
                 <p>${product.name} - <span>${product.price.toFixed(2)}rs</span></p>
                 <button class="remove" data-id = "${product.id}">Remove</button>`
                cartItems.appendChild(cartDiv);
                totalPriceDisplay.innerText = `${totalPrice.toFixed(2)}rs`
            })

        } else {
            emptyTextDisplay.classList.remove('hidden');
            cartItems.classList.add('hidden');
            totalPriceDisplay.innerText = `00.00rs`
        }
    };
    cartItems.addEventListener('click', (e)=> {
        if(e.target.tagName === "BUTTON"){
             const productId = e.target.getAttribute('data-id');
            Carts = Carts.filter(product => product.id !== parseInt(productId))
             saveCartsInLocalStorage();
            renderCart();
        }
    })
    checkOutBtn.addEventListener('click', () => {
        Carts.length = 0;
        alert("Succesfully checkout")
        saveCartsInLocalStorage()
        renderCart();
    })
    function saveCartsInLocalStorage(){
        localStorage.setItem('carts', JSON.stringify(Carts));
    }

})