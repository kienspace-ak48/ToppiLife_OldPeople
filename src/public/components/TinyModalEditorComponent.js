// /public/js/tinymce-modal.js
class TinyMCEModalEditor extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.editorId = 'tinyEditor_' + Math.random().toString(36).substring(2, 8);
    }

    connectedCallback() {
        // Tạo modal HTML bên trong Shadow DOM
        this.shadowRoot.innerHTML = `
            
            <div class="modal fade" id="editorModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">${this.getAttribute('title') || 'TinyMCE Editor'}</h1>
                            <button class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <textarea id="${this.editorId}"></textarea>
                        </div>
                        <div class="modal-footer">
                            <button id="saveBtn" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Lấy input/textarea target
        const targetSelector = this.getAttribute('target');
        this.targetEl = document.querySelector(targetSelector);

        if (!this.targetEl) {
            console.error(`Không tìm thấy phần tử target: ${targetSelector}`);
            return;
        }

        // Bootstrap Modal
        this.modalEl = this.shadowRoot.querySelector('#editorModal');
        this.modal = new bootstrap.Modal(this.modalEl);

        // Gắn event
        this.targetEl.addEventListener('focus', () => this.openEditor());
        this.shadowRoot.querySelector('#saveBtn').addEventListener('click', () => this.saveContent());

        // Init TinyMCE
        this.initTinyMCE();
    }

    initTinyMCE() {
        // if (typeof tinymce === 'undefined') {
        //     console.error('TinyMCE chưa load! Hãy chắc chắn script TinyMCE được import trước.');
        //     return;
        // }

        tinymce.init({
            target: this.shadowRoot.querySelector(`#${this.editorId}`),
            menubar: false,
            plugins: this.getAttribute('plugins') || 'link image code lists preview',
            toolbar: this.getAttribute('toolbar') || 'undo redo | bold italic underline | bullist numlist | link image | code preview',
            branding: false,
            license_key: 'gpl',
        });
    }

    openEditor() {
        this.modal.show();
        setTimeout(() => {
            const editor = tinymce.get(this.editorId);
            if (editor) editor.setContent(this.targetEl.value || '');
        }, 200);
    }

    saveContent() {
        const editor = tinymce.get(this.editorId);
        if (editor) {
            this.targetEl.value = editor.getContent();
            this.dispatchEvent(new CustomEvent('saved', { detail: editor.getContent() }));
        }
        this.modal.hide();
    }
}

// Đăng ký custom element
customElements.define('tinymce-modal-editor', TinyMCEModalEditor);
