;(function (global) {
  // Tạo "namespace" riêng tránh đụng global
  const TinyApp = {
    init(selector = '#modalEditor', options = {}) {
      if (!global.tinymce) {
        console.error('TinyMCE chưa được load!');
        return;
      }

      const defaultConfig = {
        selector,
        menubar: 'file edit view insert format tools table help',
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
        font_size_formats: '8px 10px 12px 14px 16px 18px 24px 32px 36px 48px 56px 64px 72px 96px',
        // ✅ Danh sách font đầy đủ + thêm SVN-Gilroy
        font_family_formats:
            'SVN-Gilroy=SVN-Gilroy, sans-serif;' +
            'Andale Mono=andale mono,times;' +
            'Arial=arial,helvetica,sans-serif;' +
            'Arial Black=arial black,avant garde;' +
            'Book Antiqua=book antiqua,palatino;' +
            'Comic Sans MS=comic sans ms,sans-serif;' +
            'Courier New=courier new,courier,monospace;' +
            'Georgia=georgia,palatino;' +
            'Helvetica=helvetica;' +
            'Impact=impact,chicago;' +
            'Symbol=symbol;' +
            'Tahoma=tahoma,arial,helvetica,sans-serif;' +
            'Terminal=terminal,monaco;' +
            'Times New Roman=times new roman,times;' +
            'Trebuchet MS=trebuchet ms,geneva;' +
            'Verdana=verdana,geneva;' +
            'Webdings=webdings;' +
            'Wingdings=wingdings,zapf dingbats;',
        color_picker: true,
        license_key: 'gpl',
        branding: false,
        setup: (editor) => {
          editor.on('init', () => {
            console.log('TinyMCE ready on', selector);
          });
        },
      };

      global.tinymce.init({ ...defaultConfig, ...options });
    },

    destroy(selector = null) {
      if (!global.tinymce) return;
      if (selector) global.tinymce.remove(selector);
      else global.tinymce.remove();
    },
  };

  // Gắn 1 object duy nhất vào global (giống cách thư viện làm)
  global.TinyApp = TinyApp;
})(window);
