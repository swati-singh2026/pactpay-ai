# PactPay AI 🚀

## AI-Powered Smart Contracts & Secure PayPal Milestone Payments

PactPay AI is an AI-powered contract and milestone payment platform built for freelancers, clients, and remote teams. The platform enables users to generate professional contracts using AI, manage project milestones, and securely process milestone-based PayPal payments through a modern SaaS dashboard.

This project is being developed as a hackathon submission focused on solving trust, transparency, and payment challenges in freelance collaborations.

---

## 🎯 Problem Statement

Freelancers and clients frequently face:

- Unclear project agreements
- Payment disputes
- Delayed milestone payments
- Manual contract creation
- Lack of project transparency

PactPay AI solves these problems through AI-assisted contract generation, milestone-based project management, and secure PayPal payment workflows.

---

# ✨ Features

## ✅ Completed

- Next.js + Express Full Stack Project Setup
- TypeScript Configuration
- Tailwind CSS v4 Setup
- shadcn/ui Setup
- Prisma ORM Integration
- Supabase PostgreSQL Integration
- Database Schema Design
- Initial Prisma Migration
- JWT Authentication
- Password Hashing with bcrypt
- User Signup API
- User Login API
- Protected Authentication Middleware
- Current User (`/api/auth/me`) API
- Environment Variable Configuration
- REST API Structure
- GitHub Version Control

---

## ✨ Features

### Authentication

- ✅ User Signup
- ✅ User Login
- ✅ Password Hashing (bcrypt)
- ✅ JWT Authentication
- ✅ Role Selection (Client / Freelancer)
- ✅ Protected API (/me)

### Frontend

- ✅ Next.js 16 App Router
- ✅ Login Page
- ✅ Signup Page
- ✅ API Integration with Backend
- ✅ Responsive Authentication UI

### Backend

- ✅ Express.js REST API
- ✅ Prisma ORM
- ✅ Supabase PostgreSQL

## 🚧 In Progress

- Authentication Frontend
- Landing Page
- Dashboard Layout
- Client & Freelancer Dashboard

---

## ⏳ Upcoming

- 🤖 AI Contract Generator
- 📄 Smart Contract Management
- 📌 Milestone Management
- 💳 PayPal Milestone Payments
- 📊 Analytics Dashboard
- 📜 Contract History
- 📱 Responsive SaaS UI
- 🔔 Notifications
- 📂 Project Management
- 🚀 Deployment

---

# 🛠 Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Axios
- React Hook Form
- Zod
- Sonner
- Lucide React
- AG Grid (Planned)

---

## Backend

- Express.js
- TypeScript
- Prisma ORM v6
- JWT
- bcrypt
- dotenv
- CORS

---

## Database

- PostgreSQL (Supabase)

---

## Authentication

- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Authentication Middleware

---

## Payments

- PayPal REST API (Upcoming)

---

## AI

- OpenAI API (Upcoming)

---

# 📁 Project Structure

```text
PactPay-AI
│
├── client/                     # Next.js Frontend
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   ├── public/
│   ├── components.json
│   └── package.json
│
├── server/                     # Express Backend
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── ai/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── paypal/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── lib/
│   │   ├── types/
│   │   ├── utils/
│   │   └── app.ts
│   │
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
├── PROJECT_NOTES.md
└── .gitignore
```

---

# 🗄 Database

### Database Provider

- Supabase PostgreSQL

### ORM

- Prisma ORM

### Current Models

- ✅ User
- ✅ Contract
- ✅ Milestone
- ✅ Payment

### Current Status

- ✅ Prisma Initialized
- ✅ Prisma Client Generated
- ✅ Supabase Connected
- ✅ Database Schema Created
- ✅ Initial Migration Applied
- ✅ Relationships Configured

---

# 🔐 Authentication

### Completed APIs

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/auth/signup` |
| POST   | `/api/auth/login`  |
| GET    | `/api/auth/me`     |

### Features

- JWT Token Generation
- Password Hashing
- Login Authentication
- Duplicate Email Validation
- Protected Middleware
- Current User API

---

# 🚀 Development Status

## ✅ Completed

- GitHub Repository Setup
- Next.js Frontend Setup
- Express Backend Setup
- TypeScript Configuration
- Tailwind CSS Setup
- shadcn/ui Setup
- Project Folder Structure
- Prisma ORM Setup
- Supabase PostgreSQL Integration
- Prisma Client Generation
- Database Schema Design
- Initial Database Migration
- JWT Authentication
- Signup API
- Login API
- Protected Routes
- Authentication Middleware
- `/api/auth/me` Endpoint
- Postman API Testing

---

## 🚀 Development Progress

### ✅ Completed

- Project Setup
- Next.js Frontend
- Express Backend
- Prisma Configuration
- Supabase Database
- Authentication APIs
- Login UI
- Signup UI
- Frontend ↔ Backend API Integration
- JWT Authentication
- Password Hashing

### 🚧 In Progress

- Dashboard
- Protected Routes
- Logout

## 🚧 Currently Working On

- Authentication Frontend
- Landing Page
- Dashboard UI

---

## ⏳ Planned

- AI Contract Generator
- Smart Contracts
- Milestone Management
- PayPal Integration
- Analytics Dashboard
- Client Dashboard
- Freelancer Dashboard
- Deployment

---

# 🗓 Roadmap

- ✅ Phase 1 — Project Foundation
- ✅ Phase 2 — Development Environment
- ✅ Phase 3 — Database Infrastructure
- ✅ Phase 4 — Database Models
- ✅ Phase 5 — Authentication Backend
- ⏳ Phase 6 — Authentication Frontend
- ⏳ Phase 7 — Landing Page
- ⏳ Phase 8 — Dashboard
- ⏳ Phase 9 — AI Contract Generation
- ⏳ Phase 10 — PayPal Integration
- ⏳ Phase 11 — Testing
- ⏳ Phase 12 — Deployment

---

## 📌 Roadmap

- [x] Project Setup
- [x] Database Design
- [x] Prisma Setup
- [x] Authentication Backend
- [x] Login API
- [x] Signup API
- [x] Login Page
- [x] Signup Page
- [x] Connect Frontend with Backend
- [ ] Dashboard
- [ ] User Profile
- [ ] Contract Management
- [ ] Milestones
- [ ] AI Contract Generator
- [ ] PayPal Integration
- [ ] Escrow Payments
- [ ] Notifications
- [ ] Deployment

# 📈 Current Progress

| Phase                   | Status         |
| ----------------------- | -------------- |
| Planning                | ✅ Complete    |
| Project Setup           | ✅ Complete    |
| Dependencies            | ✅ Complete    |
| Database Infrastructure | ✅ Complete    |
| Database Models         | ✅ Complete    |
| Authentication Backend  | ✅ Complete    |
| Authentication Frontend | ⏳ In Progress |
| Dashboard               | ⏳ Pending     |
| AI Module               | ⏳ Pending     |
| PayPal Integration      | ⏳ Pending     |
| Deployment              | ⏳ Pending     |

## Overall Progress

🟩🟩🟩🟩🟩🟩🟨⬜⬜⬜⬜⬜

**≈ 55% Complete**

---

# 👩‍💻 Developer

**Swati Singh**

GitHub: https://github.com/swati-singh2026

LinkedIn: https://linkedin.com/in/swatisingh-bca-eco

---

⭐ PactPay AI is under active development as a hackathon project. The backend foundation, database, and authentication system are now complete. The next phase focuses on building the frontend authentication, SaaS dashboard, AI-powered contract generation, and PayPal milestone payment workflow.
