function generateXML() {
    const cnpj = document.getElementById("cnpj").value
    const dataEmissao = document.getElementById("dataemissao").value
    const valor = document.getElementById("valor").value
    const numDoc = document.getElementById("numdoc").value
    const uf = document.getElementById("uf").value
    if(cnpj.trim() == "" || dataEmissao.trim() == "" || valor.trim() == "" || numDoc.trim() == "" || uf.trim() == "") {
        flashMessage("warning", "Por favor preencha todos os campos")
    } else {
        flashMessage("success", "Gerando arquivo XML...");

        fetch('layout.xml')
            .then(response => response.text())
            .then(xmlContent => {
                const parser = new DOMParser()
                const xmlDoc = parser.parseFromString(xmlContent, 'text/xml')

                //CNPJ
                const cnpjTag = xmlDoc.querySelector('IdentificacaoPrestador > Cnpj')
                cnpjTag.textContent = cnpj

                //Data Emissão
                const competenciaTag = xmlDoc.querySelector('Competencia')
                competenciaTag.textContent = dataEmissao + "T00:00:00"
                const dataEmissaoTag = xmlDoc.querySelector('DataEmissao')
                dataEmissaoTag.textContent = dataEmissao + "T00:00:00"

                //Valor
                const valorServicoTag = xmlDoc.querySelector('Valores > ValorServicos')
                valorServicoTag.textContent = valor
                const valorLiquidoTag = xmlDoc.querySelector('Valores > ValorLiquidoNfse')
                valorLiquidoTag.textContent = valor

                //Número Documento
                const numeroTag = xmlDoc.querySelector('Numero')
                numeroTag.textContent = numDoc

                //UF
                const ufTag = xmlDoc.querySelector('OrgaoGerador > Uf')
                ufTag.textContent = uf
            
                const updatedXmlContent = new XMLSerializer().serializeToString(xmlDoc)
                const blob = new Blob([updatedXmlContent], { type: 'text/xml' })

                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob);
                link.download = numDoc + '.xml'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
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

