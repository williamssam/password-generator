// dom elements
const result = document.getElementById('generated-password')
const numbers = document.getElementById('number')
const letters = document.getElementById('letter')
const symbols = document.getElementById('symbol')
const generateBtn = document.getElementById('btn')
const lengthEl = document.getElementById('length')
const range = document.getElementById('range')
const copy = document.getElementById('copy')

function generateRandomLetters() {
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    return letters[Math.floor(Math.random() * letters.length)]
}

function generateRandomNumbers() {
    let numbers = '0123456789'
    return numbers[Math.floor(Math.random() * numbers.length)]
}

function generateRandomSymbols() {
    let symbols = '!@#$%^&*()+=/~?'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

// object to store the randomly generated letters, numbers or letters
const generateRandom = {
    letter: generateRandomLetters,
    number: generateRandomNumbers,
    symbol: generateRandomSymbols,
}

// render generated password in the dom based on what selected
const renderGeneratedPassword = () => {
    const passwordLength = +range.value

    const hasNumbers = numbers.checked
    const hasLetters = letters.checked
    const hasSymbols = symbols.checked

    result.textContent = generatePassword(
        hasLetters,
        hasNumbers,
        hasSymbols,
        passwordLength
    )
}

// generate password based on what seleced
const generatePassword = (letter, number, symbol, passwordLength) => {
    let generatedPassword = ''

    // count if any of include:letter, number or symbol is selected
    const typesCount = letter + number + symbol

    // check if any of include:letter, number or symbol is selected and return a boolean
    const typesArr = [{ letter }, { number }, { symbol }]

    const filteredArr = typesArr.filter((item) => Object.values(item)[0])

    if (typesCount === 0) return ''

    // loop through the length chosen and how many is selected
    for (let i = 0; i < passwordLength; i += typesCount) {
        filteredArr.forEach((type) => {
            const funcName = Object.keys(type)[0]

            generatedPassword += generateRandom[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, passwordLength)

    return finalPassword
}

const copyPassword = () => {
    const textarea = document.createElement('textarea')
    textarea.value = result.textContent

    if (result.textContent === '') return

    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)

    alert('password copied to clipboard')
}

// event listeners
generateBtn.addEventListener('click', renderGeneratedPassword)
copy.addEventListener('click', copyPassword)

// render the range value
range.addEventListener('input', () => {
    const passwordLength = range.value
    lengthEl.textContent = passwordLength
})

// default input[type='range'] to the minimum value (first value) - pls don't ask me
document.addEventListener('DOMContentLoaded', () => {
    const newValue = Number(
        ((range.value - range.min) * 100) / (range.max - range.min)
    )
    const newPosition = 10 - newValue * 0.2

    range.value = newPosition
})
