document.addEventListener('DOMContentLoaded', function() {
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotSend = document.getElementById('chatbot-send');
  const userInput = document.getElementById('chatbot-user-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  
  chatbotButton.addEventListener('click', function() {
   chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
  });
  
  chatbotClose.addEventListener('click', function() {
    chatbotContainer.style.display = 'none';
  });
  
  // Send message function
  function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
      // Add user message
      addMessage(message, 'user');
      userInput.value = '';
      
      // Simulate bot thinking
      setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, 'bot');
      }, 500);
    }
  }
  
  // Send message on button click or Enter key
  chatbotSend.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Add message to chat
  function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender + '-message');
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Bot responses
  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello there! How can I assist you with your diet and nutrition today?";
    }
    
    // Weight loss
    if (lowerMessage.includes('lose weight') || lowerMessage.includes('weight loss')) {
      return "For healthy weight loss, focus on a balanced diet with plenty of vegetables, lean proteins, and whole grains. Aim for a calorie deficit of 300-500 calories per day and combine with regular exercise.";
    }
    
    // Healthy foods
    if (lowerMessage.includes('healthy food') || lowerMessage.includes('what should i eat')) {
      return "Great question! Some of the healthiest foods include leafy greens, berries, fatty fish, nuts, whole grains, and legumes. Would you like recommendations for a specific meal?";
    }

   //weight gain
     if (lowerMessage.includes('gain weight') || lowerMessage.includes('weight gain')) {
      return "For healthy weight gain, focus on a nutrient-dense diet with plenty of whole foods such as lean proteins, healthy fats, whole grains, and starchy vegetables. Aim for a calorie surplus of 300–500 calories per day and support it with regular strength training to build muscle rather than just fat.";
    }
    
    // Calories
    if (lowerMessage.includes('calorie') || lowerMessage.includes('calories')) {
      return "Calorie needs vary by age, gender, and activity level. On average: women need 1,600-2,400 calories/day, men need 2,000-3,000. For personalized advice, I'd need more details about your goals.";
    }
    
    // Recipes
    if (lowerMessage.includes('recipe') || lowerMessage.includes('meal idea')) {
      return "Here's a healthy recipe idea: Quinoa salad with chickpeas, cucumber, cherry tomatoes, and lemon-tahini dressing. High in protein and fiber! Would you like more details?";
    }
    
    // Default response
    return "I'm here to help with diet and nutrition advice. Could you tell me more about your specific question or goals?";
  }
});