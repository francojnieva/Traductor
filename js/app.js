const translateFrom = document.getElementById('translateFrom')
const translateTo = document.getElementById('translateTo')
const btnTranslate = document.getElementById('btnTranslate')

const urlGet = 'https://text-translator2.p.rapidapi.com/getLanguages'

const optionsGet = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '', // KEY BORRADA POR SEGURIDAD
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
}

let tranlateFromCode = 'es'
let tranlateToCode = 'en'

async function getLanguages (url, options) {
    try {
        const response = await fetch(url, options)
        const data = await response.json() 
        const dataArray = data.data.languages
        dataArray.forEach(element => {
          translateFrom.innerHTML += `<option value="${element.code}">${element.name}</option>`  
          translateTo.innerHTML += `<option value="${element.code}">${element.name}</option>`  
        })

        translateFrom.addEventListener('click', () => {
            tranlateFromCode = translateFrom.value
        })

        translateTo.addEventListener('click', () => {
           tranlateToCode = translateTo.value
        })

    } catch (error) {
        showError('Error en la solicitud')
    }
}

getLanguages(urlGet, optionsGet)

btnTranslate.addEventListener('click', () => {
    
    const translateTex = document.getElementById('translateTex')
    const textToTranslate = translateTex.value.trim()

    if (!textToTranslate) {
       return alert('El campo no puede estar vacio')
    } 

    const urlPost = 'https://text-translator2.p.rapidapi.com/translate'

    const optionsPost = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '', // KEY BORRADA POR SEGURIDAD
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: tranlateFromCode,
            target_language: tranlateToCode,
            text: textToTranslate
        })
    }

    postTranslateLanguages(urlPost, optionsPost)
})

async function postTranslateLanguages(url, options) {
    try {
        const response = await fetch(url, options)
        const result = await response.json()
        const translatedTex = document.getElementById('translatedTex')
        translatedTex.textContent = result.data.translatedText
    
    } catch (error) {
       showError('Error en la solicitud de traducción')
    }
}

function showError(message) {
    const mainContainer = document.getElementById('main-container')
    mainContainer.innerHTML = ' '
    const fail = document.createElement('p')
    fail.classList.add('text-center', 'text-white', 'fs-1')
    fail.innerText = message

    const reload = document.createElement('div')
    reload.classList.add('d-flex', 'justify-content-center')
    reload.innerHTML = `<button class='btnReload' id='btnReload'>Volver a intentar</button>`

    mainContainer.appendChild(fail)
    mainContainer.appendChild(reload)

    const btnReload = document.getElementById('btnReload')
    btnReload.addEventListener('click', () => {
        location.reload()
    })
}

