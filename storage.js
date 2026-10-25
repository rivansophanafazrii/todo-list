const STORAGE_KEY = 'todolist-app-todos';

/**
 * Menyimpan array todos ke localStorage.
 * @param {TodoItem[]} todos
 * @returns {boolean} true jika berhasil, false jika gagal
 */
function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Membaca todos dari localStorage.
 * Mengembalikan array kosong jika tidak ada data atau data rusak.
 * @returns {TodoItem[]}
 */
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (e) {
    return [];
  }
}
