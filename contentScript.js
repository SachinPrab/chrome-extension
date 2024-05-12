// contentScript.js
// Inject CSS to style WhatsApp Web
let style = document.createElement('style');
style.innerHTML = `
  .chat {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .chat-name {
    font-weight: bold;
  }

  .chat-number {
    font-size: 0.8em;
    color: #666;
  }

  .chat-unread-count {
    background-color: red;
    color: #fff;
    padding: 2px 5px;
    border-radius: 10px;
    font-size: 0.8em;
    margin-left: 5px;
  }

  .chat-last-message {
    font-size: 0.8em;
    color: #666;
    margin-top: 5px;
  }
`;
document.head.appendChild(style);

// Extract chat information from WhatsApp Web
let chats = document.querySelectorAll('.chat');
chats.forEach(function(chat) {
  let chatName = chat.querySelector('.chat-name').textContent;
  let chatNumber = chat.querySelector('.chat-number').textContent;
  let chatUnreadCount = chat.querySelector('.chat-unread-count');
  let chatLastMessage = chat.querySelector('.chat-last-message').textContent;

  // Add custom attributes to chat elements
  chat.setAttribute('data-name', chatName);
  chat.setAttribute('data-number', chatNumber);
  chat.setAttribute('data-unread-count', chatUnreadCount.textContent);
  chat.setAttribute('data-last-message', chatLastMessage);
});