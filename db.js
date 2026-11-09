// db.js — in-memory "database" for a Content Management System (no MySQL / XAMPP needed)
// Same function names as index.js, so bll.js works with either one.

let contents = [
  { id: 1, title: 'Welcome to our blog', body: 'First post on the new CMS.', author: 'Admin', status: 'published', createdAt: '2026-11-01T10:00:00.000Z', updatedAt: '2026-11-01T10:00:00.000Z' },
  { id: 2, title: 'Lab 04: Express + Postman', body: 'Build two APIs and test them in Postman.', author: 'CSE470', status: 'draft', createdAt: '2026-11-05T09:30:00.000Z', updatedAt: '2026-11-05T09:30:00.000Z' },
]
let nextId = 3

// SELECT * FROM contents [WHERE status = ? AND author = ?]
export async function getAllContents(filters = {}) {
  return contents.filter(c =>
    (!filters.status || c.status === filters.status) &&
    (!filters.author || c.author.toLowerCase() === filters.author.toLowerCase()))
}

// SELECT * FROM contents WHERE id = ?
export async function getContentById(id) {
  return contents.find(c => c.id === Number(id))
}

// INSERT INTO contents (title, body, author, status) VALUES (?, ?, ?, ?)
export async function createContent({ title, body = '', author = 'Anonymous', status = 'draft' }) {
  const now = new Date().toISOString()
  const content = { id: nextId++, title, body, author, status, createdAt: now, updatedAt: now }
  contents.push(content)
  return content
}

// UPDATE contents SET ... WHERE id = ?
export async function updateContent(id, changes) {
  const content = contents.find(c => c.id === Number(id))
  if (!content) return undefined
  for (const key of ['title', 'body', 'author', 'status']) {
    if (changes[key] !== undefined) content[key] = changes[key]
  }
  content.updatedAt = new Date().toISOString()
  return content
}

// DELETE FROM contents WHERE id = ?
export async function deleteContent(id) {
  const index = contents.findIndex(c => c.id === Number(id))
  if (index === -1) return undefined
  return contents.splice(index, 1)[0]
}
