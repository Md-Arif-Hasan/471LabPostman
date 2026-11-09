// ============================================================
//  db.js — the "database" (data layer)
//  Data is kept in an array in memory, so no MySQL is needed.
//  Restarting the server resets the data to these 2 posts.
// ============================================================

let contents = [
  { id: 1, title: 'Welcome to our blog', body: 'First post on the new CMS.', author: 'Admin', status: 'published' },
  { id: 2, title: 'Lab 04: Express + Postman', body: 'Build two APIs and test them in Postman.', author: 'CSE470', status: 'draft' },
]

let nextId = 3   // id for the next new post

// READ all (optionally only one status, e.g. 'published')
export function getAll(status) {
  if (status) return contents.filter(c => c.status === status)
  return contents
}

// READ one by id (returns undefined if not found)
export function getById(id) {
  return contents.find(c => c.id === Number(id))
}

// CREATE a new post
export function create(title, body, author) {
  const content = { id: nextId++, title, body, author, status: 'draft' }
  contents.push(content)
  return content
}

// UPDATE only the fields that were sent
export function update(id, changes) {
  const content = getById(id)
  if (!content) return undefined
  Object.assign(content, changes)   // e.g. { status: 'published' }
  content.id = Number(id)           // never let the id change
  return content
}

// DELETE by id (returns the deleted post, or undefined if not found)
export function remove(id) {
  const index = contents.findIndex(c => c.id === Number(id))
  if (index === -1) return undefined
  return contents.splice(index, 1)[0]
}
