# Content Management API — CSE470 Lab 04

A small Express.js CRUD API for a content management system (posts/articles),
for practising Postman. Based on AsifHasanChowdhury/Express-JS, reworked so it
runs **without MySQL/XAMPP**.

## Run in GitHub Codespaces (nothing to install on the lab PC)
1. Open the repo in a Codespace. In the terminal: `npm install` then `npm start`
2. Ports tab → port 8000 → Port Visibility → **Public**. Copy the address.
3. Postman web (web.postman.co) or hoppscotch.io → Import
   `CMS-API.postman_collection.json` → set the collection variable `baseUrl`
   to the public address → Run.

## Run locally
    npm install
    npm start          # http://localhost:8000

## Files
- `bll.js` — routes (the API)
- `db.js` — in-memory data layer (default)
- `index.js` + `schema.sql` — MySQL data layer; switch the import in bll.js
  to './index.js' and run `npm i mysql2`

## Content fields
`id`, `title` (required), `body`, `author`, `status` (draft | published | archived), `createdAt`, `updatedAt`

## Endpoints (CRUD)
| Operation | Method | Path | Body |
|---|---|---|---|
| Create | POST | /contents | `{"title","body","author","status"}` |
| Read all | GET | /contents?status=&author= | |
| Read one | GET | /contents/:id | |
| Update | PUT | /contents/:id | any of title/body/author/status |
| Delete | DELETE | /contents/:id | |
