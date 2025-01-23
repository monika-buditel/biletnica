document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.parentElement.querySelector('h3').innerText;
        alert(`Добавихте "${productName}" в количката!`);
    });
});


function startQuiz() {
    const questions = [
        "Предпочитате ли флорални или цитрусови аромати? (флорални/цитрусови)",
        "Търсите ли дневен или вечерен аромат? (дневен/вечерен)",
        "Желаете ли унисекс аромат? (да/не)",
    ];

    let answers = [];
    
    for (let i = 0; i < questions.length; i++) {
        let answer = prompt(questions[i]);
        if (answer === null) return; 
        answers.push(answer.toLowerCase());
    }

    let recommendations = getRecommendations(answers);
    displayRecommendations(recommendations);
}

function getRecommendations(answers) {
    const perfumes = [
        { name: "Dior J'adore", type: "флорални", time: "дневен", unisex: "не" },
        { name: "Chanel Chance", type: "цитрусови", time: "дневен", unisex: "не" },
        { name: "Versace Eros", type: "цитрусови", time: "вечерен", unisex: "не" },
        { name: "Tom Ford Black Orchid", type: "флорални", time: "вечерен", unisex: "да" },
        { name: "Acqua di Gio", type: "цитрусови", time: "дневен", unisex: "да" },
        { name: "YSL Libre", type: "флорални", time: "дневен", unisex: "не" },
        { name: "Creed Aventus", type: "цитрусови", time: "вечерен", unisex: "не" },
    ];

    return perfumes.filter(perfume =>
        perfume.type === answers[0] &&
        perfume.time === answers[1] &&
        (answers[2] === "да" ? perfume.unisex === "да" : true)
    );
}

function displayRecommendations(recommendations) {
    let message = "Препоръчани парфюми въз основа на вашите отговори:\n";
    
    if (recommendations.length > 0) {
        recommendations.forEach(perfume => {
            message += `- ${perfume.name}\n`;
        });
    } else {
        message += "Няма налични препоръки, моля опитайте с други критерии.";
    }

    const resultDiv = document.getElementById('recommendations');
resultDiv.innerHTML = ""; 

if (recommendations.length > 0) {
    recommendations.forEach(perfume => {
        const perfumeElement = document.createElement('p');
        perfumeElement.textContent = perfume.name;
        resultDiv.appendChild(perfumeElement);
    });
} else {
    resultDiv.innerHTML = "<p>Няма налични препоръки, моля опитайте с други критерии.</p>";
}

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

document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

   
    const updateCartCount = () => {
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    };

    
    const addToCart = (name, price, image) => {
        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart)); 
        updateCartCount();
    };

  
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product-card");
            const name = productElement.querySelector("h3").textContent;
            const price = parseFloat(productElement.querySelector(".price").textContent.match(/\d+/)[0]);
            const image = productElement.querySelector("img").src;

            addToCart(name, price, image);
            alert(`${name} е добавен в количката!`);
        });
    });

  
    const updateCart = () => {
        const cartItemsContainer = document.getElementById("cart-items-container");
        const cartSubtotal = document.getElementById("cart-subtotal");
        const cartDelivery = document.getElementById("delivery-cost");
        const cartTotal = document.getElementById("cart-total");

        if (!cartItemsContainer) return; 

        cartItemsContainer.innerHTML = ""; 
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Вашата количка е празна.</p>";
            cartSubtotal.textContent = "0.00 лв.";
            cartDelivery.textContent = "0.00 лв.";
            cartTotal.textContent = "0.00 лв.";
            return;
        }

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price.toFixed(2)} лв. / бр.</p>
                        <p>Количество: ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                        <button onclick="removeFromCart(${index})">Премахни</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
        });

        const deliveryFee = 10.00; 
        cartSubtotal.textContent = `${subtotal.toFixed(2)} лв.`;
        cartDelivery.textContent = `${deliveryFee.toFixed(2)} лв.`;
        cartTotal.textContent = `${(subtotal + deliveryFee).toFixed(2)} лв.`;

        localStorage.setItem("cart", JSON.stringify(cart)); 
    };


    window.updateQuantity = (index, change) => {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); 
        }
        updateCart();
        updateCartCount();
    };


    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
        updateCartCount();
    };


    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const paymentMethod = document.getElementById("payment-method").value;
            const delivery = document.getElementById("delivery").value;
            const address = document.getElementById("address").value;

            if (!address) {
                alert("Моля, въведете адрес за доставка!");
                return;
            }

            alert(`Поръчката е направена успешно!
            Метод на плащане: ${paymentMethod}
            Доставка: ${delivery}
            Адрес: ${address}`);

            localStorage.removeItem("cart"); 
            window.location.href = "home.html"; 
        });
    }

    updateCart(); 
    updateCartCount(); 
});
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    
    const updateCartCount = () => {
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    };

   
    const addSectionProductsToCart = (sectionElement) => {
        const productCards = sectionElement.querySelectorAll(".product-card");

        productCards.forEach(card => {
            const name = card.querySelector("h3").textContent.trim();
            const price = parseFloat(card.querySelector(".current-price").textContent.match(/\d+\.?\d*/)[0]);
            const image = card.querySelector("img").src;

            const existingProduct = cart.find(item => item.name === name);

            if (existingProduct) {
                existingProduct.quantity += 1; 
            } else {
                cart.push({ name, price, image, quantity: 1 }); 
            }
        });

        try {
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert("Продуктите от тази оферта са добавени в количката!");
        } catch (error) {
            console.error("Грешка при запазване в localStorage:", error);
        }
    };

  
    document.querySelectorAll(".promotion").forEach(section => {
        const addButton = section.querySelector(".promotion-footer button");
        if (addButton) {
            addButton.addEventListener("click", () => {
                addSectionProductsToCart(section);
            });
        }
    });

    updateCartCount();
});
