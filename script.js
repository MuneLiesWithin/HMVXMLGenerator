function unlockUser() {
    let usernameUnlock = document.getElementById("usernameUnlock").value
    if(usernameUnlock.trim() == ""){
        flashMessage("neutral", "Por favor insira um usuário")
    } else {
        fetch('http://hoh2k1300/OnBasePowerAPI/api/UnlockUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: usernameUnlock.trim() }),
        })
        .then(res =>   res.json())
        .then(data => {
            if(data === "Usuário desbloqueado") 
            {
                flashMessage("success", data)
            }
            else 
            {
                flashMessage("warning", data)
            }
            
        })
        .catch(error => {
            flashMessage("error", "Ocorreu algum erro")
            console.error(error)
        })
    }
}

function flashMessage(type, message) {
    const messageElement = document.getElementById("message");
    messageElement.classList.add(type);
    messageElement.innerHTML = message;
    setTimeout(() => {
        messageElement.innerHTML = "";
        messageElement.classList.remove(type);
    }, 3000);
}

function handleKeyPress(event, buttonId) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        document.getElementById(buttonId).click(); 
    }
}