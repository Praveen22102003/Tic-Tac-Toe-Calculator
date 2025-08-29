// Wire up the button click using an event listener (cleaner than inline onclick)
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('add').addEventListener('click', addTask);

  // Press Enter inside input to add
  document.getElementById('input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });
});

function addTask() {
  const input = document.getElementById('input');
  const taskName = input.value.trim();
  const priority = document.getElementById('priority').value;
  const status = 'Pending';

  if (!taskName) {
    alert('Please enter a task');
    return;
  }

  const tasks = document.getElementById('tasks');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${escapeHtml(taskName)}</td>
    <td>${escapeHtml(priority)}</td>
    <td>${status}</td>
    <td>
      <button class="btn btn-success complete">Complete</button>
      <button class="btn btn-danger delete">Delete</button>
    </td>
  `;
  tasks.appendChild(tr);

  tr.querySelector('.complete').addEventListener('click', () => completeTask(tr));
  tr.querySelector('.delete').addEventListener('click', () => deleteTask(tr));

  showMessage('Task added successfully');
  input.value = '';
}

function completeTask(row) {
  const statusCell = row.cells[2];
  if (statusCell.textContent === 'Completed') {
    alert('Task already completed');
    return;
  }
  statusCell.textContent = 'Completed';
  showMessage('Task completed successfully');
}

function deleteTask(row) {
  row.remove();
  showMessage('Task deleted successfully');
}

function showMessage(text) {
  const msg = document.getElementById('message');
  msg.textContent = text;
  setTimeout(() => { msg.textContent = ''; }, 1000);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
