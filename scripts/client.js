const socket = io('https://dummy-chat-app-server-247bp61yg-md-khalid-hossens-projects.vercel.app/');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

var audio = new Audio('./public/message_tone.mp3');

const append = (message) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message', 'right', 'bg-gray-200', 'py-3', 'w-4/12', 'pl-2', 'mt-28', 'mr-4', 'rounded', 'float-right');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);
    audio.play();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = '';
})

const name = prompt('enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {  
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {  
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {  
    append(`${name} left the chat`, 'left');
});

