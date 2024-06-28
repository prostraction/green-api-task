const getApiUrl = (idInstance) => {
    const id = (idInstance.length > 3) ? idInstance.slice(0, 4) : idInstance;
    return `https://${id}.api.green-api.com`;
};

const getMediaUrl = (idInstance) => {
    const id = (idInstance.length > 3) ? idInstance.slice(0, 4) : idInstance;
    return `https://${id}.media.green-api.com`;
};

const idInstanceInput = document.querySelector('#idInstanceInput');
const apiTokenInstanceInput = document.querySelector('#apiTokenInstanceInput');
const getIdAndApi = () => {
    return [idInstanceInput.value, apiTokenInstanceInput.value];
};

const answerText = document.querySelector('#answerText');
const makeRequest = (uri, request) => {
    fetch(uri, request)
    .then(res => {return (res.ok) ? res.json() : Promise.reject(res);})
    .then(data => {
        let result = ``;
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                let value = (data[key].length === 0) ? `""` : data[key];
                result += `${key}: ${value}\n`;
            }
        }
        answerText.value = result;
    })
    .catch(res => {
        if (res.status !== undefined) {
            answerText.value = `Не удалось выполнить запрос.\nКод ошибки: ${res.status} ${res.statusText}`;
        } else {
            answerText.value = `Запрос не отправлен.\napiUrl некорректен.`;
        }
    });
};

const inputDataIsOk = (idInstance, apiTokenInstance) => {
    answerText.value = ``;
    if (idInstance.length > 0 && apiTokenInstance.length > 0) {
        return true;
    } else {
        answerText.value = `Введите idInstance и apiStateInstance для начала работы.`;
        return false;
    }
}

const getSettingsButton = document.querySelector('#getSettingsButton');
getSettingsButton.addEventListener("click", function() {
    const [idInstance, apiTokenInstance] = getIdAndApi();
    if (inputDataIsOk(idInstance, apiTokenInstance)) {
        const uri = `${getApiUrl(idInstance)}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
        makeRequest(uri, {method: 'GET'});
    }
});

const apiStateInstanceButton = document.querySelector('#apiStateInstanceButton');
apiStateInstanceButton.addEventListener("click", function() {
    const [idInstance, apiTokenInstance] = getIdAndApi();
    if (inputDataIsOk(idInstance, apiTokenInstance)) {
        const uri = `${getApiUrl(idInstance)}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
        makeRequest(uri, {method: 'GET'});
    }
});

const phoneMessageInput = document.querySelector('#phoneMessageInput');
const messageInput = document.querySelector('#messageInput')
const sendMessageButton = document.querySelector('#sendMessageButton');
sendMessageButton.addEventListener("click", function() {
    const [idInstance, apiTokenInstance] = getIdAndApi();
    const phoneMessage = phoneMessageInput.value.replace(/\D/g, '');
    const message = messageInput.value;

    if (inputDataIsOk(idInstance, apiTokenInstance)) {
        if (phoneMessage.length > 0 && message.length > 0) {
            const reqParams = {
                chatId: `${phoneMessage}@c.us`,
                message: message,
            };
            const uri = `${getApiUrl(idInstance)}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
            makeRequest(uri, {
                method: 'POST',
                body: JSON.stringify(reqParams),
            });
        } else {
            answerText.value = `Введите номер телефона и текст сообщения для его отправки.`;
        }
    }
});

const phoneFileInput = document.querySelector('#phoneFileInput');
const messageFileInput = document.querySelector('#messageFileInput')
const sendFileButton = document.querySelector('#sendFileButton');
sendFileButton.addEventListener("click", function() {
    const [idInstance, apiTokenInstance] = getIdAndApi();
    const phoneMessage = phoneFileInput.value.replace(/\D/g, '');
    const message = messageFileInput.value;
    const messageFiltered = message.replace(/[^a-zA-Z0-9-_()%:./]+/g, '');
    answerText.value = ``;
    if (message !== messageFiltered) {
        answerText.value =  `В ссылке могут быть использованы символы a-z, A-Z, 0-9, - (дефис), _ (нижнее подчеркивание). В ссылке должны отсутствовать спец символы ~$€%#£?! и пробелы.`;
        return;
    }

    if (inputDataIsOk(idInstance, apiTokenInstance)) {
        if (phoneMessage.length > 0 && message.length > 0) {
            const reqParams = {
                chatId: `${phoneMessage}@c.us`,
                urlFile: messageFiltered,
                fileName: messageFiltered.split("/").pop(),
            };
            const uri = `${getApiUrl(idInstance)}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;
            makeRequest(uri, {
                method: 'POST',
                body: JSON.stringify(reqParams),
            });
        } else {
            answerText.value = `Введите номер телефона и Url для отправки сообщения.`;
        }
    }    
});
