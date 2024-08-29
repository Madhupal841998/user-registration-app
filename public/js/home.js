document.addEventListener('DOMContentLoaded', async () => {
  const res = await fetch('/api/users', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  const users = await res.json();
  const userList = document.getElementById('userList');
  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.profession}</td>
    `;
    userList.appendChild(tr);
  });
});