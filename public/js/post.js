const image_input = document.querySelector('#image_input');
var image_upload = "";

image_input.addEventListener('change', function () {
    // console.log(image_input.value);
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        image_upload = reader.result;
        document.querySelector('#display_image').style.backgroundImage = `url(${image_upload})`;
    });
    reader.readAsDataURL(this.files[0]);
});