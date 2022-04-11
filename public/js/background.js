const Constants = require("./constants");
const Lib = require('./lib');

const TgLib = require('./tg-lib');
const Drive = require("./drive");
const ExportLib = require('./export/export-lib');

chrome.tabs.onUpdated.addListener(
    function (tabId, changeInfo, tab) {
        if (changeInfo.url) {
            chrome.tabs.sendMessage(tabId, {
                type: Constants.UPDATE_TABS_MSG
            });
        }
    }
);

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request);
    if (request.type === Constants.msgBackgroundType.START_FETCH_IMPORT) {
        ExportLib.exportHistory(request.vkPeer)
        .then(response => TgLib.startImport(request.tgChat, response.text))
        .then(sendResponse({status: 'ok'}));
    }
    return true;
});

// Пример отправки данных ИЗ content.js В background.js
// chrome.runtime.sendMessage({
//     type: Constants.msgBackgroundType.DEFAULT,
//     text: 'text'
// });

// Пример отправки данных ИЗ background.js В content.js
// chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {
//         type: Constants.msgContentType.DEFAULT,
//         text: message.text
//     });
// });

// Пример ОБРАБОТЧИКА пришедших сообщений ИЗ background.js В content.js
// chrome.runtime.onMessage.addListener(
//     function (message) {
//         if (message.type === Constants.msgContentType.DEFAULT) {
//             console.log(message.text);
//         }
//         return true;
//     }
// );
