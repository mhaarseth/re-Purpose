export function addImageField() {
    const addImageFieldButton = document.getElementById("add-image-field-button");
    const imageFieldContainer = document.getElementById("image-field-container");
    const addImageField = document. getElementById("imageUrl");
    
    addImageFieldButton.addEventListener("click", () => {
        const newAddImageField = addImageField.cloneNode(true)
        imageFieldContainer.appendChild(newAddImageField);
    });
}

