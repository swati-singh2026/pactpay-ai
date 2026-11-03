# 🚀 PactPay AI

## AI-Powered Smart Contracts & Secure PayPal Milestone Payments

PactPay AI is a full-stack SaaS platform that helps freelancers and clients collaborate with confidence using AI-assisted contract generation, milestone-based project management, and secure PayPal payments.

Built for the PayPal AI Hackathon, the platform combines AI, automation, and digital payments to reduce disputes and improve trust in freelance projects.

---

# 🎯 Problem Statement

Freelancers and clients often struggle with:

- Unclear agreements
- Payment disputes
- Delayed milestone payments
- Manual contract drafting
- Lack of transparency

PactPay AI solves these challenges through AI-powered contract creation, milestone tracking, secure PayPal payments, and a centralized dashboard.

---

# ✨ Features

## ✅ Implemented

### Authentication

- User Signup
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Session Management
- Logout Functionality

### Landing Page

- Responsive Navigation
- Hero Section
- Features Section
- How It Works
- Call-to-Action
- Professional Footer

### Backend

- Express REST API
- Prisma ORM
- PostgreSQL Database
- Authentication Middleware
- Current User Endpoint

### ✅ Dashboard Module

- Protected Dashboard
- Professional SaaS Sidebar
- Responsive Top Navbar
- Dashboard Layout Component
- Reusable Dashboard Cards
- User Profile Section
- Trust & Security Indicator
- Recent Activity Timeline
- Secure Logout
- Backend Ready Structure

Status: ✅ Completed

## 🖥 Professional SaaS Dashboard

The dashboard has been redesigned with a modern SaaS architecture focused on usability, scalability, and secure navigation.

### Features

- Protected dashboard with JWT authentication
- Professional sidebar navigation
- Responsive top navigation bar
- AI trust indicator
- Secure logout functionality
- User profile overview
- Dashboard statistics cards
- Recent platform activity
- Reusable layout components
- Backend-ready architecture

---

# 🚧 Upcoming Features

- AI Contract Generator
- AI Risk Analysis
- Smart Contract Management
- Milestone Management
- PayPal Order Creation
- PayPal Capture Payments
- Analytics Dashboard
- Notifications
- Deployment

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

## Backend

- Express.js
- TypeScript
- Prisma ORM
- JWT
- bcrypt
- CORS

## Database

- PostgreSQL (Supabase)

## Payments

- PayPal REST API

## AI

- OpenAI API _(Planned)_

---

# 🏗 System Architecture

```text
Next.js Frontend
        │
     Axios API
        │
        ▼
 Express REST API
        │
 JWT Authentication
        │
        ▼
   Prisma ORM
        │
        ▼
Supabase PostgreSQL
      │        │
      ▼        ▼
 OpenAI API  PayPal API
```

---

# 📁 Project Structure

```text
PactPay-AI
│
├── client
│   ├── app
│   ├── components
│   ├── services
│   ├── lib
│   ├── types
│   └── ...
│
├── server
│   ├── prisma
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   └── ...
│
├── README.md
└── PROJECT_NOTES.md
```

---

# 🗄 Database Models

- User
- Contract
- Milestone
- Payment

Relationships

```text
User
 ├── Contracts
 │      └── Milestones
 │               └── Payments
```

---

# 📡 REST API

## Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | /api/auth/signup |
| POST   | /api/auth/login  |
| GET    | /api/auth/me     |

## Contracts _(Upcoming)_

- GET /api/contracts
- POST /api/contracts
- PUT /api/contracts/:id

## Milestones _(Upcoming)_

- GET /api/milestones
- POST /api/milestones

## Payments _(Upcoming)_

- POST /api/paypal/create-order
- POST /api/paypal/capture-order

## AI _(Upcoming)_

- POST /api/ai/generate-contract

---

# 📈 Development Progress

| Module                  | Status |
| ----------------------- | ------ |
| Project Setup           | ✅     |
| Dependencies            | ✅     |
| Database                | ✅     |
| Prisma ORM              | ✅     |
| Authentication Backend  | ✅     |
| Authentication Frontend | ✅     |
| Landing Page            | ✅     |
| Dashboard UI            | ✅     |
| AI Module               | 🚧     |
| PayPal Integration      | 🚧     |
| Deployment              | ⏳     |

**Overall Progress:** **≈ 70%**

---

## 📌 Roadmap

- [x] Project Setup
- [x] Database Design
- [x] Authentication Backend
- [x] Authentication Frontend
- [x] Landing Page
- [x] Professional Dashboard
- [x] SaaS Sidebar
- [x] Top Navigation
- [ ] AI Contract Generator
- [ ] Contract Management
- [ ] Milestone Management
- [ ] PayPal Integration
- [ ] Notifications
- [ ] Deployment

# 👩‍💻 Developer

**Swati Singh**

GitHub: https://github.com/swati-singh2026

LinkedIn: https://linkedin.com/in/swatisingh-bca-eco

---

⭐ PactPay AI is actively being developed for the **PayPal AI Hackathon**. The current MVP includes authentication, a responsive landing page, a protected dashboard, and a scalable backend architecture, with AI-powered contract generation and PayPal milestone payments planned in the next development phase.

## Hour 10 — AG Grid Smart Contracts Dashboard ✅

- Integrated AG Grid React
- Created Recent Smart Contracts table
- Added AI Risk, Payment and Status columns
- Enabled sorting, filtering and pagination
- Added color-coded badges
- Responsive SaaS table layout
- Integrated with dashboard
