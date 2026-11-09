// ============================================================
//  server.js — Content Management API (CRUD) with Express
//  Run:  npm start      →  http://localhost:8000
// ============================================================

import express from 'express'
import * as db from './db.js'

const app = express()
const PORT = 8000

// Read JSON from the request body into req.body
// (without this line, req.body is undefined)
app.use(express.json())


// ---------- CREATE ----------
// POST /contents      body: { "title": "...", "body": "...", "author": "..." }
app.post('/contents', (req, res) => {
  const { title, body, author } = req.body

  if (!title) {
    return res.status(400).json({ message: 'title is required' })   // 400 = bad request
  }

  const content = db.create(title, body, author)
  res.status(201).json(content)                                      // 201 = created
})


// ---------- READ (all) ----------
// GET /contents                      → every post
// GET /contents?status=published     → only published posts (query param)
app.get('/contents', (req, res) => {
  const contents = db.getAll(req.query.status)
  res.json(contents)                                                 // 200 = OK (default)
})


// ---------- READ (one) ----------
// GET /contents/2      (:id is a path param → req.params.id)
app.get('/contents/:id', (req, res) => {
  const content = db.getById(req.params.id)

  if (!content) {
    return res.status(404).json({ message: 'Content not found' })    // 404 = not found
  }

  res.json(content)
})


// ---------- UPDATE ----------
// PUT /contents/2      body: only the fields to change, e.g. { "status": "published" }
app.put('/contents/:id', (req, res) => {
  const content = db.update(req.params.id, req.body)

  if (!content) {
    return res.status(404).json({ message: 'Content not found' })
  }

  res.json(content)
})


// ---------- DELETE ----------
// DELETE /contents/2
app.delete('/contents/:id', (req, res) => {
  const content = db.remove(req.params.id)

  if (!content) {
    return res.status(404).json({ message: 'Content not found' })
  }

  res.json({ message: 'Content deleted', content })
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
