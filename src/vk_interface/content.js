import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import VTelegramAuthForm from './VTelegramAuthForm';
import ExportButton from './ExportButton';

const Constants = require('../constants');

function createExportButton() {
    if (location.host + location.pathname === Constants.VK_MSG_PATH) {
        if (document.getElementById('ui_rmenu_export_vt') === null) {
            let b = document.createElement('div');
            b.setAttribute('id', 'ui_rmenu_export_vt');
            document.getElementsByClassName('im-right-menu')[0].appendChild(b);
            ReactDOM.render(<ExportButton />, document.getElementById('ui_rmenu_export_vt'));
        }

        const urlParams = new URLSearchParams(location.search);
        if (urlParams.get(Constants.VK_MSG_ID_PARAM)) {
            document.getElementById('ui_rmenu_export_vt').style.display = 'block';
        } else {
            document.getElementById('ui_rmenu_export_vt').style.display = 'none';
        }
    }
};

window.chrome.runtime.onMessage.addListener(
    function (message) {
        if (message.type === Constants.UPDATE_TABS_MSG) {
            createExportButton();
        }
    }
);

createExportButton();
