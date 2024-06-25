const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const form = document.getElementById('chat-form');
const loader = document.getElementById('loader');

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  userInput.value = ''; // Clear input field

  try {
    loader.style.display = 'block'; // Show loader

    const response = await fetch('/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput: userMessage }),
    });

    const data = await response.json();

    // Append user and bot messages to chat history
    appendMessage(userMessage, 'user-message');
    appendMessage(data.response, 'bot-message');

    // Scroll to bottom of chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;
  } catch (error) {
    console.error('Error:', error);
    // Handle errors gracefully
  } finally {
    loader.style.display = 'none'; // Hide loader
  }
}

function appendMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.classList.add(className);
  messageElement.textContent = message;
  chatHistory.appendChild(messageElement);
}

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  sendMessage();
});

// Optional: Handle window resize for mobile-friendly adjustments
window.addEventListener('resize', function() {
  // Adjust chat container size or layout if needed
});
