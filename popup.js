// popup.js
let currentChatFilter = 'all';
let customFilters = {};
let contactDetails = {};

document.addEventListener('DOMContentLoaded', function() {
  // Add event listeners to filter buttons
  document.getElementById('all-chats-btn').addEventListener('click', function() {
    currentChatFilter = 'all';
    updateChatList();
  });
  document.getElementById('unread-chats-btn').addEventListener('click', function() {
    currentChatFilter = 'unread';
    updateChatList();
  });
  document.getElementById('awaiting-reply-btn').addEventListener('click', function() {
    currentChatFilter = 'awaiting-reply';
    updateChatList();
  });
  document.getElementById('needs-reply-btn').addEventListener('click', function() {
    currentChatFilter = 'needs-reply';
    updateChatList();
  });
  document.getElementById('custom-filters-btn').addEventListener('click', function() {
    document.getElementById('custom-filters-container').style.display = 'block';
  });

  // Add event listeners to custom filter inputs
  document.getElementById('lead-filter').addEventListener('input', function(){
    customFilters.lead = this.value;
    updateChatList();
  });
  document.getElementById('friends-filter').addEventListener('input', function() {
    customFilters.friends = this.value;
    updateChatList();
  });
  document.getElementById('business-filter').addEventListener('input', function() {
    customFilters.business = this.value;
    updateChatList();
  });

  // Add event listener to save contact details button
  document.getElementById('save-contact-details-btn').addEventListener('click', function() {
    saveContactDetails();
  });
});

function updateChatList() {
  // Get all chats
  let chats = document.querySelectorAll('.chat');

  // Hide all chats
  chats.forEach(function(chat) {
    chat.style.display = 'none';
  });

  // Show chats based on current filter
  if (currentChatFilter === 'all') {
    chats.forEach(function(chat) {
      chat.style.display = 'block';
    });
  } else {
    chats.forEach(function(chat) {
      let chatName = chat.querySelector('.chat-name').textContent;
      if (customFilters[currentChatFilter] && chatName.toLowerCase().indexOf(customFilters[currentChatFilter].toLowerCase()) === -1) {
        chat.style.display = 'none';
      } else {
        chat.style.display = 'block';
      }
    });
  }
}

function saveContactDetails() {
  // Save contact details to storage
  chrome.storage.local.set({ contactDetails });
}

// Content script to extract chat information
function extractChatInformation() {
  // Extract chat information from WhatsApp Web
  let chats = document.querySelectorAll('.chat');
  chats.forEach(function(chat) {
    let chatName = chat.querySelector('.chat-name').textContent;
    let chatNumber = chat.querySelector('.chat-number').textContent;
    let chatUnreadCount = chat.querySelector('.chat-unread-count').textContent;
    let chatLastMessage = chat.querySelector('.chat-last-message').textContent;

    // Add chat to chat list
    let chatListItem = document.createElement('li');
    chatListItem.classList.add('chat-list-item');
    chatListItem.textContent = `${chatName} (${chatNumber})`;
    document.getElementById('chat-list').appendChild(chatListItem);

    // Add event listener to chat list item
    chatListItem.addEventListener('click', function() {
      // Show contact details container
      document.getElementById('contact-details-container').style.display = 'block';

      // Save contact details
      contactDetails = {
        name: chatName,
        number: chatNumber,
        unreadCount: chatUnreadCount,
        lastMessage: chatLastMessage
      };

      // Populate contact details
      document.getElementById('contact-name').textContent = contactDetails.name;
      document.getElementById('contact-number').textContent = contactDetails.number;
      document.getElementById('contact-notes').value = contactDetails.notes || '';
    });
  });
}

// Call extractChatInformation function when content script is injected
extractChatInformation();