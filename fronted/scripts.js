// Establish connection to the server
const socket = io();

// Ensure DOM is fully loaded before running
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const input = document.getElementById("input");
  const messages = document.getElementById("messages");
  const toggleButton = document.getElementById("toggle-btn");
  const sendButton = document.getElementById("send-button");
  const usernameDisplay = document.getElementById("username");

  // Prompt the user for their name
  const username = prompt("Enter your username:").trim();
  if (username) {
    // Display the username in the header
    usernameDisplay.textContent = username;

    // Send the username to the server when connecting
    socket.emit("set username", username);
  } else {
    alert("A username is required to join the chat.");
    window.location.reload();
  }

  // Fetch and display chat history when received
  socket.on("chat history", (messagesArray) => {
    messagesArray.forEach((message) => {
      const item = document.createElement("li");
      item.classList.add(message.username === username ? "sent" : "received"); // Add appropriate class
      item.innerHTML = `<strong>${message.username}:</strong> ${message.text}`;
      messages.appendChild(item);
    });
    messages.scrollTop = messages.scrollHeight; // Scroll to bottom
  });

  // Handle send button click
  sendButton.addEventListener("click", () => {
    if (input.value.trim()) {
      socket.emit("chat message", { text: input.value, username }); // Send message with username
      input.value = ""; // Clear input field
    }
  });

  // Listen for new messages from the server
  socket.on("chat message", (msg) => {
    const item = document.createElement("li");
    item.classList.add(msg.username === username ? "sent" : "received"); // Add appropriate class
    item.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // Scroll to bottom
  });

  // Toggle connection status
  toggleButton.addEventListener("click", () => {
    if (socket.connected) {
      socket.disconnect();
      toggleButton.innerText = "Connect";
    } else {
      socket.connect();
      toggleButton.innerText = "Disconnect";
    }
  });
});
