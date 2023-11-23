// 1) ------------------------------------------------------------------------------------------------------------------------------------------------
function change_content(){
    var titleElement = document.getElementById('title');
    var sloganElement = document.getElementById('slogan');

    var tempContent = titleElement.innerHTML;
    titleElement.innerHTML = sloganElement.innerHTML;
    sloganElement.innerHTML = tempContent;
}

// 2) ------------------------------------------------------------------------------------------------------------------------------------------------
function calculateArea() {
    var base1 = parseFloat(document.getElementById('base1').value);
    var base2 = parseFloat(document.getElementById('base2').value);
    var height = parseFloat(document.getElementById('height').value);

    var area = 0.5 * (base1 + base2) * height;

    document.getElementById('area_result').innerHTML = 'Площа трапеції: ' + area;
}


// 3) ------------------------------------------------------------------------------------------------------------------------------------------------
function calculateDivisors() {
    // Отримуємо значення з поля вводу
    var number = parseInt(document.getElementById('number').value);

    // Знаходимо дільники числа
    var divisors = findDivisors(number);

    // Зберігаємо результат у cookies
    setCookie("divisors", divisors.join(","), 100);

    // Виводимо результат за допомогою діалогового вікна
    alert("Дільники числа " + number + ": " + divisors.join(","));
}

function findDivisors(number) {
    var divisors = [];
    for (var i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

// Перевіряємо, чи є cookies збережені
var savedDivisors = getCookie("divisors");
var usedSavedData = getCookie("usedSavedData");

if (savedDivisors) {
    var useSavedData = confirm("Є збережені дільники. Використати їх?");

    if (useSavedData) {
        alert("Дільники збережені в cookies: " + savedDivisors);
        // Позначаємо, що збережені дані вже використані
    } else {
        document.cookie = "divisors=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}
// 4) ------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    // Перевіряємо localStorage на наявність попереднього вибору користувача
    var storedCaseType = localStorage.getItem('caseType');

    // Якщо вибір користувача збережено, встановлюємо його
    if (storedCaseType) {
        applyCase(storedCaseType);
    }

    // Додаємо обробник події change на форму
    document.querySelector('form').addEventListener('change', function (event) {
        // Отримуємо значення вибраної радіокнопки
        var selectedCaseType = event.target.value;

        // Зберігаємо вибір користувача в localStorage
        localStorage.setItem('caseType', selectedCaseType);

        // Застосовуємо верхній регістр до тексту в правому панелі
        applyCase(selectedCaseType);
    });

    function applyCase(caseType) {
        var textElement = document.getElementById('right_panel').querySelector('p');
        var words = textElement.innerText.split(' ');

        switch (caseType) {
            case 'uppercase':
                words = words.map(function (word) {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                });
                break;
            case 'lowercase':
                words = words.map(function (word) {
                    return word.toLowerCase();
                });
                break;
        }

        textElement.innerText = words.join(' ');
    }
});

// 5) ------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    var content = document.getElementById('content');
    var rightPanel = document.getElementById('right_panel');
    var inputsAdded = false; // Прапорець для відстеження додавання елементів

    document.getElementById('top_label').addEventListener('click', function () {
        // Перевірка, чи елементи вже додані
        if (!inputsAdded) {
            // Додаємо елементи форми у блок "content" після кліку на "top_label"
            var line = document.createElement('hr');
            var heading = document.createElement('h3');
            heading.innerText = 'Завдання 5';
            content.appendChild(heading);
            var input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Enter image URL';

            var addButton = document.createElement('button');
            addButton.innerText = 'Add Image';
            addButton.addEventListener('click', function () {
                var imageUrl = input.value.trim();
                if (imageUrl) {
                    addImageToRightPanel(imageUrl);
                    input.value = '';
                }
            });
            
            content.appendChild(line);
            content.appendChild(heading);
            content.appendChild(input);
            content.appendChild(addButton);

            inputsAdded = true; // Встановлюємо прапорець, що елементи додані
        }
    });

    function addImageToRightPanel(src) {
        var imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        var image = document.createElement('img');
        image.src = src;

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            deleteImage(imageContainer, src);
        });

        imageContainer.appendChild(image);
        imageContainer.appendChild(deleteButton);

        rightPanel.appendChild(imageContainer);

        // Зберігаємо дані в localStorage
        saveImagesToLocalStorage();
    }

    function deleteImage(container, src) {
        container.remove();

        // Видаляємо дані з localStorage
        removeImageFromLocalStorage(src);
    }

    function saveImagesToLocalStorage() {
        var images = [];
        var imageContainers = document.querySelectorAll('.image-container img');
        imageContainers.forEach(function (image) {
            images.push(image.src);
        });

        localStorage.setItem('images', JSON.stringify(images));
    }

    function removeImageFromLocalStorage(src) {
        var images = JSON.parse(localStorage.getItem('images')) || [];
        var updatedImages = images.filter(function (imageSrc) {
            return imageSrc !== src;
        });

        localStorage.setItem('images', JSON.stringify(updatedImages));
    }

    // Перевіряємо localStorage на наявність зображень при завантаженні сторінки
    var storedImages = JSON.parse(localStorage.getItem('images')) || [];
    storedImages.forEach(function (imageSrc) {
        addImageToRightPanel(imageSrc);
    });
});