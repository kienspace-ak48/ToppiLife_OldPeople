// // const { default: tinymce } = require("tinymce");

// document.addEventListener('DOMContentLoaded', () => {
//     //global

//     //
//     const menuTap = document.querySelectorAll('.wrap-button button');

//     function actionHandle(key) {
//         console.log(key);
//         switch (key) {
//             case 'hero':
//                 console.log('action hello');
//                 break;
//             case 'about':
//                 console.log('action about');
//                 break;
//             default:
//                 console.log('overflow');
//                 break;
//         }
//     }
//     menuTap.forEach((b, i) => {
//         b.addEventListener('click', (ev) => {
//             const value = ev.target.textContent;
//             // console.log(value);
//             const val = ev.target.value;
//             console.log(val);
//             // alert(value);
//             actionHandle(val);
//         });
//     });
//     // ------------------------
//     // TINYMCE trong MODAL
//     // ------------------------
//     var currentInput = null;
//     tinymce.init({
//         selector: '#modalEditor',
//         menubar: 'file edit view insert format tools table help', // có menu trên cùng
//         plugins: `
//         code preview link lists table image media
//         fullscreen searchreplace charmap anchor
//         visualblocks visualchars wordcount
//     `,
//         toolbar: `
//         undo redo | bold italic underline forecolor backcolor |
//     bullist numlist | alignleft aligncenter alignright |
//     link image media | code preview fullscreen
//     `,
//         color_picker: true, // ✅ Hiển thị input mã màu HEX
//         font_size_formats: '8px 10px 12px 14px 16px 18px 24px 32px 36px 48px 56px 64px 72px 96px',
//         // ✅ Danh sách font đầy đủ + thêm SVN-Gilroy
//         font_family_formats:
//             'SVN-Gilroy=SVN-Gilroy, sans-serif;' +
//             'Andale Mono=andale mono,times;' +
//             'Arial=arial,helvetica,sans-serif;' +
//             'Arial Black=arial black,avant garde;' +
//             'Book Antiqua=book antiqua,palatino;' +
//             'Comic Sans MS=comic sans ms,sans-serif;' +
//             'Courier New=courier new,courier,monospace;' +
//             'Georgia=georgia,palatino;' +
//             'Helvetica=helvetica;' +
//             'Impact=impact,chicago;' +
//             'Symbol=symbol;' +
//             'Tahoma=tahoma,arial,helvetica,sans-serif;' +
//             'Terminal=terminal,monaco;' +
//             'Times New Roman=times new roman,times;' +
//             'Trebuchet MS=trebuchet ms,geneva;' +
//             'Verdana=verdana,geneva;' +
//             'Webdings=webdings;' +
//             'Wingdings=wingdings,zapf dingbats;',
//         license_key: 'gpl',
//         branding: false,
//         setup: (editor) => {
//             editor.on('init', () => {
//                 console.log('TinyMCE sẵn sàng');
//             });
//         },
//     });
//     document.querySelectorAll('input, textarea').forEach((el) => {
//         el.addEventListener('focus', () => {
//             console.log(el);
//             currentInput = el;
//             if (el.hasAttribute('pass')) {
//                 // alert("it corect")
//                 return;
//             }
//             const modalEl = document.getElementById('editModal');
//             const modal = new bootstrap.Modal(modalEl);
//             modal.show();
//             //set content vao editor
//             // Đợi 100ms để TinyMCE load xong
//             setTimeout(() => {
//                 const editor = tinymce.get('modalEditor');
//                 if (editor) editor.setContent(el.value || '');
//             }, 200);
//         });
//     });
//     //
//     document.getElementById('saveEditor').addEventListener('click', function (ev) {
//         if (currentInput) {
//             const content = tinymce.get('modalEditor').getContent();
//             currentInput.value = content;
//         }
//         const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
//         modal.hide();
//     });
//     document.getElementById('btn-hero-submit').addEventListener('click', function (ev) {
//         //get value input
//         const titleHighline = document.querySelector('[name="title_highline"]').value;
//         const title = document.querySelector('[name="title"]').value;
//         const desc = document.querySelector('[name="desc"]').value;
//         const imgUrl = document.querySelector('[name="img_url"]').value;
//         const data = {
//             titleHighline,
//             title,
//             desc,
//             imgUrl,
//         };
//         console.log(data);
//         $.ajax({
//             url: `/page-config/hero-section`,
//             method: 'POST',
//             contentType: 'application/json',
//             data: JSON.stringify(data),
//             success: (res) => {
//                 if (res.success) {
//                     MyNotification('save success', 'success');
//                 }
//             },
//             error: (xhr, status, err) => {
//                 MyNotification('err', 'error');
//             },
//         });
//     });
//     //

//     // end
// });
function MyNotification(mess, status, position = 'center', time = 2000) {
    Swal.fire({
        title: mess,
        icon: status,
        position: position,
        showConfirmButton: false,
        timer: time,
    });
}
