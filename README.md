# 🌙 بوابة كلارا وباسل — Clara & Bassel Portal

A private, mobile-first Arabic complaint management portal built with React, Node.js, Express, and MongoDB.

---

## 📁 Project Structure (Monorepo)

```
clara-Bassel-portal/
├── package.json          ← Root: runs both servers with concurrently
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js         ← Express entry point
│   ├── .env              ← Environment variables
│   ├── models/
│   │   └── Complaint.js  ← Mongoose schema
│   └── routes/
│       └── complaints.js ← REST API routes
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/
    │   └── index.html    ← iPhone-optimized viewport meta
    └── src/
        ├── index.js
        ├── index.css     ← Tailwind + global styles
        ├── App.js        ← Tab controller + layout
        └── components/
            ├── Header.jsx         ← Debt dashboard panel
            ├── ComplaintForm.jsx  ← Submit complaint form
            └── ComplaintsList.jsx ← Complaints grid
```

---

## ✅ Prerequisites

Make sure you have these installed:

| Tool | Version | Check |
|------|---------|-------|
| Node.js | ≥ 18.x | `node --version` |
| npm | ≥ 9.x  | `npm --version` |
| MongoDB | ≥ 6.x (local) | `mongod --version` |

> **MongoDB**: Either run a local instance (`brew install mongodb-community` on Mac) or use **MongoDB Atlas** (free cloud DB).

---

## 🚀 Quick Start (3 Steps)

### Step 1 — Clone & Install Everything

```bash
# Navigate to the project folder
cd clara-Bassel-portal

# Install root + backend + frontend dependencies in one shot
npm run install:all
```

### Step 2 — Configure Environment

Edit `backend/.env` if needed:

```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/clara-Bassel-portal
```

> For **MongoDB Atlas**, replace MONGO_URI with your connection string:
> `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/clara-Bassel-portal`

### Step 3 — Start Both Servers

```bash
# From the root folder — starts backend + frontend simultaneously
npm run dev
```

- **Frontend** → http://localhost:3000
- **Backend API** → http://localhost:5001

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/complaints` | Fetch all complaints |
| `POST` | `/api/complaints` | Create a new complaint |
| `PATCH` | `/api/complaints/:id` | Update status or compensation link |
| `GET` | `/api/health` | Health check |

### POST Body Example
```json
{
  "title": "تجاهل رسائلي",
  "details": "تجاهل باسل رسائلي لمدة ٣ ساعات",
  "impact": "أحسست بالإهمال والوحدة"
}
```

### PATCH Body Examples
```json
{ "status": "تم الحل" }
{ "compensationLink": "https://store.example.com/product" }
```

---

## 📱 Mobile Testing (iPhone)

To test on your iPhone:

1. Connect your phone and Mac to the **same Wi-Fi**
2. Find your Mac's local IP: `ipconfig getifaddr en0` (Mac) or `hostname -I` (Linux)
3. Open Safari on iPhone → `http://YOUR_MAC_IP:3000`

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `midnight` | `#0D0F14` | App background |
| `surface` | `#13161E` | Input backgrounds |
| `card` | `#1A1D27` | Card backgrounds |
| `rose.soft` | `#C8748A` | Primary accent |
| `rose.deep` | `#8F3F56` | Button gradients |
| `resolved` | `#4CAF7D` | Resolved status |
| `unresolved` | `#E07B54` | Unresolved status |
| Font | Cairo (900–300) | All Arabic text |

---

## 🛠 Individual Commands

```bash
# Backend only
cd backend && npm run dev

# Frontend only
cd frontend && npm start

# Build frontend for production
cd frontend && npm run build
```

---

Made with 🌹 for Clara & Bassel — *باسل بيسمع كل شكوى* 💕
