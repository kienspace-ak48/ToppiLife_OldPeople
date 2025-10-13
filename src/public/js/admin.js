// const { default: tinymce } = require("tinymce");

document.addEventListener('DOMContentLoaded', () => {
    //global

    //
    const menuTap = document.querySelectorAll('.wrap-button button');

    function actionHandle(key) {
        console.log(key);
        switch (key) {
            case 'hero':
                console.log('action hello');
                break;
            case 'about':
                console.log('action about');
                break;
            default:
                console.log('overflow');
                break;
        }
    }
    menuTap.forEach((b, i) => {
        b.addEventListener('click', (ev) => {
            const value = ev.target.textContent;
            // console.log(value);
            const val = ev.target.value;
            console.log(val);
            // alert(value);
            actionHandle(val);
        });
    });
    // ------------------------
    // TINYMCE trong MODAL
    // ------------------------
    var currentInput = null;
    tinymce.init({
        selector: '#modalEditor',
        menubar: 'file edit view insert format tools table help', // có menu trên cùng
        plugins: `
        code preview link lists table image media
        fullscreen searchreplace charmap anchor
        visualblocks visualchars wordcount
    `,
        toolbar: `
        undo redo | bold italic underline forecolor backcolor |
    bullist numlist | alignleft aligncenter alignright |
    link image media | code preview fullscreen
    `,
        license_key: 'gpl',
        branding: false,
        setup: (editor) => {
            editor.on('init', () => console.log('TinyMCE sẵn sàng'));
        },
    });
    document.querySelectorAll('input, textarea').forEach((el) => {
        el.addEventListener('focus', () => {
            currentInput = el;
            const modalEl = document.getElementById('editModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
            //set content vao editor
            // Đợi 100ms để TinyMCE load xong
            setTimeout(() => {
                const editor = tinymce.get('modalEditor');
                if (editor) editor.setContent(el.value || '');
            }, 200);
        });
    });
    //
    document.getElementById('saveEditor').addEventListener('click', function (ev) {
        if (currentInput) {
            const content = tinymce.get('modalEditor').getContent();
            currentInput.value = content;
        }
        const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal.hide();
    });
    // end
});
