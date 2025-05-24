const validateEmail = email => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

const validatePassword = password => {
    return /(?=.*[a-zA-Z])(?=.*\d)/.test(password)
}

const validatePhoneNumber = phoneNumber => {
    return /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(phoneNumber)
}

const validateNickname = nickname => {
    return /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/.test(nickname)
}

const validateHeight = height => {
    return !isNaN(height) && height > 0 && height < 500
}

const validateWeight = weight => {
    return !isNaN(weight) && weight > 0 && weight < 500
}

export {
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    validateNickname,
    validateHeight,
    validateWeight
}