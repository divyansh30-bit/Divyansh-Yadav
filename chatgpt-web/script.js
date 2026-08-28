const chatEl = document.getElementById('chat');
const form = document.getElementById('form');
const input = document.getElementById('input');

let messages = [
  { role: 'system', content: 'You are a helpful assistant.' }
];

function appendMessage(text, role){
  const div = document.createElement('div');
  div.className = 'message ' + (role === 'user' ? 'user' : 'assistant');
  div.textContent = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if(!value) return;
  appendMessage(value, 'user');
  messages.push({ role: 'user', content: value });
  input.value = '';

  // show placeholder
  appendMessage('Thinking...', 'assistant');
  const placeholders = document.getElementsByClassName('assistant');
  const lastPlaceholder = placeholders[placeholders.length - 1];

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    if(!res.ok) {
      const err = await res.json().catch(()=>({message:res.statusText}));
      lastPlaceholder.textContent = 'Error: ' + (err.error?.message || err.message || JSON.stringify(err));
      return;
    }
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || JSON.stringify(data);
    // replace placeholder
    lastPlaceholder.textContent = reply;
    messages.push({ role: 'assistant', content: reply });
  } catch (err) {
    lastPlaceholder.textContent = 'Network error: ' + err.message;
  }
});
