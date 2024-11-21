document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('h3').innerText;
        alert(`Добавихте "${productName}" в количката!`);
    });
});


function startQuiz() {
    const questions = [
        "Предпочитате ли флорални или цитрусови аромати?",
        "Търсите ли дневен или вечерен аромат?",
        "Желаете ли унисекс аромат?",
    ];
    let result = "";
    questions.forEach((question, index) => {
        const answer = prompt(question);
        result += `Въпрос ${index + 1}: ${answer}\n`;
    });
    alert(`Препоръчан аромат въз основа на вашите отговори:\n${result}`);
}


document.addEventListener('DOMContentLoaded', () => {
    const quizButton = document.createElement('button');
    quizButton.innerText = "Започни тест за аромат";
    quizButton.style.margin = "20px";
    quizButton.style.padding = "10px 20px";
    quizButton.style.backgroundColor = "#d9a600";
    quizButton.style.color = "#fff";
    quizButton.style.border = "none";
    quizButton.style.cursor = "pointer";
    quizButton.onclick = startQuiz;
    document.body.appendChild(quizButton);
});

function applyFilters() {
    const category = document.getElementById('category-filter').value;
    const scent = document.getElementById('scent-filter').value;
    const maxPrice = document.getElementById('price-filter').value;

    document.getElementById('price-value').innerText = `Максимум: ${maxPrice} лв.`;

    alert(`Филтри: Категория - ${category}, Аромат - ${scent}, Цена - ${maxPrice} лв.`);
}


document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                alert('Моля, попълнете всички полета!');
            } else {
                alert('Вашето съобщение беше изпратено успешно!');
                contactForm.reset();
            }
        });
    }
});


let cart = []; 

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartDropdown = document.querySelector(".cart-dropdown");


function addToCart(productName, productPrice) {
  
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
    }
    updateCart();
}


function updateCart() {
    cartCount.textContent = cart.length; 
    cartItems.innerHTML = ""; 
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<li>Няма добавени продукти.</li>";
    } else {
        cart.forEach((product, index) => {
            total += product.price * product.quantity;
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${product.name} x${product.quantity}</span>
                <span>${(product.price * product.quantity).toFixed(2)} лв.</span>
                <button onclick="removeFromCart(${index})">✖</button>
            `;
            cartItems.appendChild(li);
        });
    }

    // Обща сума
    cartTotalPrice.textContent = `${total.toFixed(2)} лв.`;
}

// Премахване на продукт
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Показване/скриване на падащото меню
document.querySelector(".cart-icon").addEventListener("click", () => {
    cartDropdown.style.display =
        cartDropdown.style.display === "block" ? "none" : "block";
});

// Пример за добавяне на продукт от други елементи
document.querySelectorAll(".product button").forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.parentElement;
        const productName = product.querySelector("h3").textContent;
        const productPrice = product.querySelector("p").textContent.match(/\d+/)[0];
        addToCart(productName, productPrice);
    });
});
