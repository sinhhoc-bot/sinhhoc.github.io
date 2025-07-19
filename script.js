const chatList = document.getElementById('chat-list');
const input = document.getElementById('input');
const sendBtn = document.getElementById('send');

async function queryAI(prompt) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Bạn là trợ giảng Sinh học, trả lời rõ ràng, ngắn gọn.' },
        { role: 'user', content: prompt }
      ]
    })
  });
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

function addMessage(text, cls) {
  const li = document.createElement('li');
  li.textContent = text;
  li.className = cls;
  chatList.appendChild(li);
  chatList.scrollTop = chatList.scrollHeight;
}

sendBtn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  input.value = '';
  addMessage('...', 'ai');
  const aiResponse = await queryAI(text);
  chatList.lastChild.textContent = aiResponse;
};
