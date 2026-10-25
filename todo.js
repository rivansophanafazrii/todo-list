/** @type {TodoItem[]} */
let todos = [];

/**
 * Memuat todos dari storage ke state in-memory.
 * Dipanggil saat aplikasi pertama kali dimuat.
 */
function initTodos() {
  todos = loadTodos();
}

/**
 * Mengembalikan salinan array todos untuk mencegah mutasi eksternal.
 * @returns {TodoItem[]}
 */
function getTodos() {
  return [...todos];
}

/**
 * Menambahkan todo baru ke awal list.
 * @param {string} text
 * @returns {{ success: boolean, error?: string }}
 */
function addTodo(text) {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return { success: false, error: 'Tugas tidak boleh kosong.' };
  }
  if (trimmed.length < 3) {
    return { success: false, error: 'Tugas minimal 3 karakter.' };
  }
  if (trimmed.length > 50) {
    return { success: false, error: 'Tugas tidak boleh melebihi 50 karakter.' };
  }

  const newTodo = {
    id: Date.now().toString(),
    text: trimmed,
    completed: false,
    createdAt: Date.now(),
  };

  todos.unshift(newTodo); // item terbaru di atas
  const saved = saveTodos(todos);
  if (!saved) {
    todos.shift(); // rollback
    return { success: false, error: 'Gagal menyimpan tugas.' };
  }
  return { success: true };
}

/**
 * Toggle status selesai/belum selesai pada todo berdasarkan id.
 * Menggunakan pola optimistic update + rollback jika penyimpanan gagal.
 * @param {string} id
 * @returns {{ success: boolean, error?: string }}
 */
function toggleTodo(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return { success: false, error: 'Tugas tidak ditemukan.' };

  const previousState = todos[index].completed;
  todos[index] = { ...todos[index], completed: !previousState };

  const saved = saveTodos(todos);
  if (!saved) {
    todos[index] = { ...todos[index], completed: previousState }; // rollback
    return { success: false, error: 'Gagal menyimpan perubahan status.' };
  }
  return { success: true };
}

/**
 * Menghapus todo berdasarkan id.
 * Menggunakan pola optimistic update + rollback jika penyimpanan gagal.
 * @param {string} id
 * @returns {{ success: boolean, error?: string }}
 */
function deleteTodo(id) {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return { success: false, error: 'Tugas tidak ditemukan.' };

  const removed = todos.splice(index, 1);
  const saved = saveTodos(todos);
  if (!saved) {
    todos.splice(index, 0, removed[0]); // rollback
    return { success: false, error: 'Gagal menghapus tugas.' };
  }
  return { success: true };
}
