function generateXML() {

    const cnpj = document.getElementById("cnpj").value
    const dataEmissao = document.getElementById("dataemissao").value
    let valor = document.getElementById("valor").value
    const numDoc = document.getElementById("numdoc").value
    const uf = document.getElementById("uf").value

    /* IMPOSTOS */
    const pis = document.getElementById("pis").value
    const cofins = document.getElementById("cofins").value
    const ir = document.getElementById("ir").value
    const csll = document.getElementById("csll").value
    const iss = document.getElementById("iss").value

    if(cnpj.trim() == "") {
        flashMessage("warning", "Por favor informe um CNPJ")
    } else if(dataEmissao.trim() == "") {
        flashMessage("warning", "Por favor informe uma data de emissão")
    } else if(valor.trim() == "") {
        flashMessage("warning", "Por favor informe um valor")
    } else if(numDoc.trim() == "") {
        flashMessage("warning", "Por favor informe o número do documento")
    } else if(uf.trim() == "") {
        flashMessage("warning", "Por favor informe o UF")
    } else {
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
                const baseCalculoTag = xmlDoc.querySelector('Valores > BaseCalculo')
                baseCalculoTag.textContent = valor

                //Número Documento
                const numeroTag = xmlDoc.querySelector('Numero')
                numeroTag.textContent = numDoc

                //UF
                const ufTag = xmlDoc.querySelector('OrgaoGerador > Uf')
		        const ufTag2 = xmlDoc.querySelector('PrestadorServico > Endereco > Uf')
                ufTag.textContent = uf
		        ufTag2.textContent = uf

                valor = parseFloat(valor)

                // Impostos
                if(pis.trim() !== "") {
                    const pisTag = xmlDoc.querySelector('Valores > ValorPis')
                    pisTag.textContent = pis
                    valor -= parseFloat(pis)
                }

                if(cofins.trim() !== "") {
                    const cofinsTag = xmlDoc.querySelector('Valores > ValorCofins');
                    cofinsTag.textContent = cofins
                    valor -= parseFloat(cofins)
                }

                if(ir.trim() !== "") {
                    const irTag = xmlDoc.querySelector('Valores > ValorIr');
                    irTag.textContent = ir
                    valor -= parseFloat(ir)
                }

                if(csll.trim() !== "") {
                    const csllTag = xmlDoc.querySelector('Valores > ValorCsll')
                    csllTag.textContent = csll
                    valor -= parseFloat(csll)
                }

                if(iss.trim() !== "") {
                    const issTag = xmlDoc.querySelector('Valores > ValorIss')
                    issTag.textContent = iss
                    valor -= parseFloat(iss)
                }

                // VALOR LÍQUIDO
                const valorLiquidoTag = xmlDoc.querySelector('Valores > ValorLiquidoNfse')
                valorLiquidoTag.textContent = valor.toFixed(2)

                flashMessage("success", "Gerando arquivo XML")
            
                const updatedXmlContent = new XMLSerializer().serializeToString(xmlDoc)
                const blob = new Blob([updatedXmlContent], { type: 'text/xml' })

                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = numDoc + '.xml'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            })
            .catch(error => {
                flashMessage("error", "Erro gerando arquivo XML")
                console.log(error)
            });
    }
}

function flashMessage(type, message) {
    const messageElement = document.getElementById("message")
    messageElement.classList.add(type)
    messageElement.innerHTML = message
    setTimeout(() => {
        messageElement.innerHTML = ""
        messageElement.classList.remove(type)
    }, 3000)
}

function handleKeyPress(event, buttonId) {
    if (event.key === 'Enter') {
        event.preventDefault()
        document.getElementById(buttonId).click()
    }
}

