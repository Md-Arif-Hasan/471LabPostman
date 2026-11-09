# Content Management API — CSE470 Lab 04

A small CRUD API built with Express.js, tested with Postman.

## Run
```bash
npm install
npm start          # http://localhost:8000
```
In Codespaces: Ports tab → port 8000 → Port Visibility → **Public**.

## Files
| File | What it does |
|---|---|
| `server.js` | The API routes (Create, Read, Update, Delete) |
| `db.js` | The data, kept in memory (no database needed) |
| `CMS-API.postman_collection.json` | Ready-made Postman requests. Import it, set `baseUrl` to your server address |

## Endpoints
| CRUD | Method | URL | Body |
|---|---|---|---|
| Create | POST | `/contents` | `{"title": "...", "body": "...", "author": "..."}` |
| Read all | GET | `/contents` (or `/contents?status=published`) | — |
| Read one | GET | `/contents/:id` | — |
| Update | PUT | `/contents/:id` | e.g. `{"status": "published"}` |
| Delete | DELETE | `/contents/:id` | — |
