// index.js — MySQL version (use this when MySQL/XAMPP is available)
// To switch: in bll.js change  './db.js'  to  './index.js'  and run  npm i mysql2
// Create the table first with schema.sql

import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'cms_app',
}).promise()

export async function getAllContents(filters = {}) {
  let sql = 'SELECT * FROM contents WHERE 1=1'
  const params = []
  if (filters.status) { sql += ' AND status = ?'; params.push(filters.status) }
  if (filters.author) { sql += ' AND author = ?'; params.push(filters.author) }
  const [rows] = await connection.query(sql, params)
  return rows
}

export async function getContentById(id) {
  const [rows] = await connection.query('SELECT * FROM contents WHERE id = ?', [id])
  return rows[0]
}

export async function createContent({ title, body = '', author = 'Anonymous', status = 'draft' }) {
  const [result] = await connection.query(
    'INSERT INTO contents (title, body, author, status) VALUES (?, ?, ?, ?)',
    [title, body, author, status])
  return getContentById(result.insertId)
}

export async function updateContent(id, changes) {
  const fields = ['title', 'body', 'author', 'status'].filter(k => changes[k] !== undefined)
  if (fields.length) {
    await connection.query(
      `UPDATE contents SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = ?`,
      [...fields.map(f => changes[f]), id])
  }
  return getContentById(id)
}

export async function deleteContent(id) {
  const content = await getContentById(id)
  if (!content) return undefined
  await connection.query('DELETE FROM contents WHERE id = ?', [id])
  return content
}
