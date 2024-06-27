const getApiUrl = (idInstance) => {
    const id = (idInstance.length > 3) ? idInstance.slice(0, 4) : idInstance;
    return `https://${id}.api.green-api.com`;
}

const getMediaUrl = (idInstance) => {
    const id = (idInstance.length > 3) ? idInstance.slice(0, 4) : idInstance;
    return `https://${id}.media.green-api.com`;
}

const getIdAndApi = () => {
    const idInstanceInput = document.querySelector('#idInstanceInput');
    const apiTokenInstanceInput = document.querySelector('#apiTokenInstanceInput');
    return [idInstanceInput.value, apiTokenInstanceInput.value]
}

const getSettingsButton = document.querySelector('#getSettingsButton');
getSettingsButton.addEventListener("click", function() {
    const params = getIdAndApi();
    const idInstance = params[0];
    const apiTokenInstance = params[1];
    console.log(idInstance, apiTokenInstance)
    if (idInstance.length > 0 && apiTokenInstance.length > 0) {
        const req = fetch(`${getApiUrl(idInstance)}/waInstance${idInstance}/getSettings/${apiTokenInstance}`);
        console.log(req);
    } else {
        // 
    }
})

const apiStateInstanceButton = document.querySelector('#apiStateInstanceButton');
apiStateInstanceButton.addEventListener("click", function() {
    console.log("apiStateInstanceButton clicked!");
})

const sendMessageButton = document.querySelector('#sendMessageButton');
sendMessageButton.addEventListener("click", function() {
    console.log("sendMessageButton clicked!");
})

const sendFileButton = document.querySelector('#sendFileButton');
sendFileButton.addEventListener("click", function() {
    console.log("sendFileButton clicked!");
})
