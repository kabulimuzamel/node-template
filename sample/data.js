function hideInitialElements() {
    $('#login-display-info').hide()
    $('#clear-login-display').hide()
    $('#video-games-comment').hide()
}

function getLoginInfo() {
    return `Your username is ${this.username} and your password is ${this.password}`
}

export {hideInitialElements, getLoginInfo}