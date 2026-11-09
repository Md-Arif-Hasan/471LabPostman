import express from 'express'
import * as db from './db.js'   // switch to './index.js' for MySQL

const app = express()
const port = 8000
const STATUSES = ['draft', 'published', 'archived']

app.use(express.json())   // without this, req.body is undefined

// Health check
app.get('/', (req, res) => {
  res.send('Content Management API is running')
})

// READ all — optional filters: /contents?status=published&author=Admin
app.get('/contents', async (req, res) => {
  const { status, author } = req.query
  const contents = await db.getAllContents({ status, author })
  res.json(contents)
})

// READ one — path param: /contents/2
app.get('/contents/:id', async (req, res) => {
  const content = await db.getContentById(req.params.id)
  if (!content) return res.status(404).json({ message: 'Content not found' })
  res.json(content)
})

// CREATE — JSON body: { "title", "body", "author", "status" }
app.post('/contents', async (req, res) => {
  const { title, body, author, status } = req.body
  if (!title) return res.status(400).json({ message: 'title is required' })
  if (status && !STATUSES.includes(status))
    return res.status(400).json({ message: `status must be one of: ${STATUSES.join(', ')}` })
  const content = await db.createContent({ title, body, author, status })
  res.status(201).json(content)
})

// UPDATE — send only the fields you want to change
app.put('/contents/:id', async (req, res) => {
  const { status } = req.body
  if (status && !STATUSES.includes(status))
    return res.status(400).json({ message: `status must be one of: ${STATUSES.join(', ')}` })
  const content = await db.updateContent(req.params.id, req.body)
  if (!content) return res.status(404).json({ message: 'Content not found' })
  res.json(content)
})

// DELETE
app.delete('/contents/:id', async (req, res) => {
  const content = await db.deleteContent(req.params.id)
  if (!content) return res.status(404).json({ message: 'Content not found' })
  res.json({ message: 'Content deleted', content })
})

// Error handler — must come AFTER all routes
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something broke!' })
})

app.listen(port, () => {
  console.log(`Content Management API listening on port ${port}`)
})
