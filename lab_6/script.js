function createMasonryItem() {
    var input = document.getElementById('URL');
    var imageUrl = input.value.trim();
        if (imageUrl) {
            addImageToRightPanel(imageUrl);
            input.value = '';
        }
}

function addImageToRightPanel(src) {
    var masonry = document.getElementById('masonryContainer');
    var imageContainer = document.createElement('div');
    imageContainer.classList.add('box');

    var image = document.createElement('img');
    image.src = src;

    imageContainer.appendChild(image);

    masonry.appendChild(imageContainer);

    // Зберігаємо дані в localStorage
    //saveImagesToLocalStorage();
}
