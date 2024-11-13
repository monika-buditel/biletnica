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


document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Моля, попълнете всички полета!');
    } else {
        alert('Вашето съобщение беше изпратено успешно!');
        document.getElementById('contact-form').reset();
    }
});
