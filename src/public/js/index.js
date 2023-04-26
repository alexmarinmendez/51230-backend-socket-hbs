let socket
let user = ''
let chatBox = document.getElementById('chatBox')

Swal.fire({
    title: 'Authentication para el Chat',
    input: 'text',
    text: 'Set a username for the Coder\'s Chat',
    inputValidator: value => !value.trim() && 'Please, write a username!',
    allowOutsideClick: false
}).then(result => {
    user = result.value
    console.log('user: ', user)
    socket = io()
    document.getElementById('username').innerHTML = user

    // ----------------------------
    chatBox.addEventListener('keyup', event => {
        if (event.key === "Enter") {
            if(chatBox.value.trim().length > 0) {
                socket.emit('message', {
                    user,
                    message: chatBox.value
                })
                chatBox.value = ''
            }
        }
    })
    
    socket.on('logs', data => {
        const messagesLog = document.getElementById('messagesLog')
        let messages = ''
        data.reverse().forEach(message => {
            messages += `<p>[<i>${message.user}</i>]: ${message.message}</p>`
        })
        // console.log(messages)
        messagesLog.innerHTML = messages
    })
})


