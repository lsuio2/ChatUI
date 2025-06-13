const messagesDiv = document.getElementById('messages');
const input = document.getElementById('message-input');
const sendBtn = document.getElementById('send');
const addImageBtn = document.getElementById('add-image');

// hidden file input for images
const imageInput = document.createElement('input');
imageInput.type = 'file';
imageInput.accept = 'image/*';
imageInput.style.display = 'none';
document.body.appendChild(imageInput);

function addMessage(content, type) {
    const msg = document.createElement('div');
    msg.className = 'message ' + type;
    if (content instanceof HTMLElement) {
        msg.appendChild(content);
    } else {
        msg.textContent = content;
    }
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendMessage() {
    const text = input.value.trim();
    if (text) {
        addMessage(text, 'user');
        input.value = '';
        setTimeout(() => addMessage('Antwort des Chatbots', 'bot'), 500);
    }
}

sendBtn.addEventListener('click', sendMessage);

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

addImageBtn.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '100%';
        addMessage(img, 'user');
    }
    imageInput.value = '';
});
