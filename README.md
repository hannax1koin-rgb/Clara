# 🌙 بوابة كلارا وباسل — Clara & Bassel Portal

A private, mobile-first Arabic complaint management portal built with React, deployed on Netlify with Netlify Functions and Netlify Database (Postgres).

---

## 📁 Project Structure

```
clara-Bassel-portal/
├── netlify.toml              ← Build & redirect configuration
├── package.json               ← Root: function dependencies
├── db/
│   ├── schema.ts               ← Drizzle table definitions
│   └── index.ts                ← Drizzle client
├── drizzle.config.ts
├── netlify/
│   ├── functions/
│   │   ├── complaints.mts      ← GET / POST /api/complaints
│   │   └── complaints-id.mts   ← PATCH /api/complaints/:id
│   └── database/migrations/    ← Generated SQL migrations
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

## 🚀 Local Development

Run the site locally with the Netlify CLI, which builds the frontend, serves the Functions, and provisions a local Netlify Database branch automatically:

```bash
netlify dev
```

- **Site** → http://localhost:8888

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/complaints` | Fetch all complaints |
| `POST` | `/api/complaints` | Create a new complaint |
| `PATCH` | `/api/complaints/:id` | Update status or compensation link |

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
3. Open Safari on iPhone → `http://YOUR_MAC_IP:8888`

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
# Frontend only (proxies API calls via netlify dev)
netlify dev

# Build frontend for production
cd frontend && npm run build
```

---

Made with 🌹 for Clara & Bassel — *باسل بيسمع كل شكوى* 💕
