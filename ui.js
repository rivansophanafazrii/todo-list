// --- DOM References ---
const todoInput     = document.getElementById('todo-input');
const addBtn        = document.getElementById('add-btn');
const todoList      = document.getElementById('todo-list');
const emptyState    = document.getElementById('empty-state');
const validationMsg = document.getElementById('validation-msg');
const todoCounter   = document.getElementById('todo-counter');

// --- Render ---

/**
 * Merender ulang seluruh todo list ke DOM.
 * Menampilkan empty state jika list kosong.
 */
function renderTodos() {
  const todos = getTodos();
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.classList.add('visible');
    todoCounter.textContent = '';
  } else {
    emptyState.classList.remove('visible');
    todos.forEach(todo => {
      todoList.appendChild(createTodoElement(todo));
    });
    updateCounter(todos);
  }
}

/**
 * Memperbarui teks counter di header.
 * @param {TodoItem[]} todos
 */
function updateCounter(todos) {
  const total = todos.length;
  const done  = todos.filter(t => t.completed).length;
  todoCounter.textContent = done === total
    ? `✅ ${total} selesai`
    : `${done}/${total} selesai`;
}

/**
 * Membuat elemen <li> untuk satu todo item.
 * @param {TodoItem} todo
 * @returns {HTMLLIElement}
 */
function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item' + (todo.completed ? ' completed' : '');
  li.dataset.id = todo.id;

  // Tombol toggle status selesai — lingkaran dengan centang/lingkaran kosong
  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.setAttribute('aria-label', todo.completed ? 'Tandai belum selesai' : 'Tandai selesai');
  completeBtn.setAttribute('aria-pressed', String(todo.completed));
  completeBtn.innerHTML = todo.completed
    ? '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5L6.5 12L13 5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5" stroke="currentColor" stroke-width="1.8"/></svg>';

  // Label teks tugas
  const label = document.createElement('span');
  label.className = 'todo-text';
  label.textContent = todo.text;

  // Tombol hapus — ikon X
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.setAttribute('aria-label', 'Hapus tugas');
  deleteBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 2L12 12M12 2L2 12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>';

  li.appendChild(completeBtn);
  li.appendChild(label);
  li.appendChild(deleteBtn);

  return li;
}

// --- Event Handlers ---

/**
 * Menangani aksi penambahan todo dari input field.
 */
function handleAdd() {
  const result = addTodo(todoInput.value);
  if (!result.success) {
    showValidation(result.error);
    return;
  }
  todoInput.value = '';
  clearValidation();
  renderTodos();
}

/**
 * Menangani klik pada todo list menggunakan event delegation.
 * @param {MouseEvent} e
 */
function handleListClick(e) {
  const li = e.target.closest('.todo-item');
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.closest('.complete-btn')) {
    const result = toggleTodo(id);
    if (!result.success) {
      showValidation(result.error);
    } else {
      renderTodos();
    }
  }

  if (e.target.closest('.delete-btn')) {
    const result = deleteTodo(id);
    if (!result.success) {
      showValidation(result.error);
    } else {
      renderTodos();
    }
  }
}

/**
 * Menampilkan pesan validasi/error kepada pengguna.
 * @param {string} msg
 */
function showValidation(msg) {
  validationMsg.textContent = msg;
}

/**
 * Menghapus pesan validasi dari tampilan.
 */
function clearValidation() {
  validationMsg.textContent = '';
}

// --- Event Listeners & Init ---

addBtn.addEventListener('click', handleAdd);

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleAdd();
});

todoList.addEventListener('click', handleListClick);

// Inisialisasi aplikasi saat halaman dimuat
initTodos();
renderTodos();
