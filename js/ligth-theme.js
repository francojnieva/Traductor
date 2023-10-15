const btnLightTheme = document.getElementById("btn-lightTheme")
const textarea1 = document.querySelector(".textarea1")
const textarea2 = document.querySelector(".textarea2")
const body = document.body
let isLightTheme = localStorage.getItem('light-theme') === ('enabled')

if (isLightTheme) {
    body.classList.add('lightTheme')
    textarea1.classList.add("first-textarea")
    textarea2.classList.add("second-textarea")
    btnLightTheme.checked = true
}

btnLightTheme.addEventListener("change", () => {
    if (btnLightTheme.checked) {
        body.classList.add("lightTheme")
        textarea1.classList.add("first-textarea")
        textarea2.classList.add("second-textarea")
        localStorage.setItem("light-theme", "enabled")
    } else {
        body.classList.remove("lightTheme")
        textarea1.classList.remove("first-textarea")
        textarea2.classList.remove("second-textarea")
        localStorage.setItem("light-theme", "disabled")
    }
})