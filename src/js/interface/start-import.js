const Emitter = require('./event-emitter').default;

const startImport = new StartImport();
export default startImport;

class StartImport {

    _formInsertionPromise = undefined;

    constructor() {
        this._formInsertionPromise = fetch(chrome.runtime.getURL('./src/html/start-import-form.html'))
            .then(response => {
                return response.text();
            })
            .then(data => {
                const formDom = new DOMParser().parseFromString(data, 'text/html');

                formDom.getElementById('vtelegram_start_import_button').addEventListener('click',
                    (event) => Emitter.emit('event:start-import', {}));

                formDom.getElementById('vtelegram_start_import_back_button').addEventListener('click',
                    (event) => Emitter.emit('event:start-import-back', {}));
                
                formDom.getElementById('vtelegram_start_import_exit_telegram_button').addEventListener('click', 
                    (event) => {
                        Emitter.emit('event:telegram-exit', {});
                    });
                document.getElementsByClassName('vtelegram_popup_box_container')[0].appendChild(formDom.body.firstElementChild);
            })
    }

    show() {
        this._formInsertionPromise
            .then(() => document.getElementById('vtelegram_import_start_form').classList.remove('vtelegram_hidden'));
    }

    hide() {
        this._formInsertionPromise
            .then(() => document.getElementById('vtelegram_import_start_form').classList.add('vtelegram_hidden'));
    }

    clean() {
    }
}
