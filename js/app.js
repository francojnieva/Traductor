const translateFrom = document.getElementById('translateFrom')
const translateTo = document.getElementById('translateTo')
const btnTranslate = document.getElementById('btnTranslate')

const urlGet = 'https://text-translator2.p.rapidapi.com/getLanguages'

const optionsGet = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7eb18955c9msh50aedbc60322b48p1e54d0jsn7013dc1d83f3',
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
        console.log(error)
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
            'X-RapidAPI-Key': '7eb18955c9msh50aedbc60322b48p1e54d0jsn7013dc1d83f3',
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
        console.log(error)
    }
}

