function generateXML() {
    // TO DO
    const cnpj = document.getElementById("cnpj").value
    const dataEmissao = document.getElementById("dataemissao").value
    const valor = document.getElementById("valor").value
    const numDoc = document.getElementById("numdoc").value
    const vencimento = document.getElementById("vencimento").value
    if(cnpj.trim() == "" || dataEmissao.trim() == "" || valor.trim() == "" || numDoc.trim() == "" || vencimento.trim() == "") {
        flashMessage("warning", "Por favor preencha todos os campos")
    } else {
        flashMessage("success", "Gerando arquivo XML...");

        fetch('layout.xml')
            .then(response => response.text())
            .then(xmlContent => {
                const blob = new Blob([xmlContent], { type: 'text/xml' });
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = numDoc + "-" + dataEmissao +'.xml';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.log(error)
                flashMessage("error", "Erro gerando arquivo XML. Por favor tente novamente mais tarde!");
            });
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