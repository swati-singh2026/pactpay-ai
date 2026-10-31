# 📒 PROJECT_NOTES — PactPay AI

> Internal development notes for the PactPay AI hackathon project.

---

# 📌 Project Information

**Project Name:** PactPay AI

**Tagline:** AI-Powered Smart Contracts & Secure PayPal Payments

**Hackathon Goal:** Build an MVP that helps freelancers and clients create AI-generated contracts, manage milestones, and complete secure PayPal payments.

---

# 🎯 Problem Statement

Freelancers and clients frequently face:

- Payment disputes
- Unclear agreements
- Delayed milestone payments
- No centralized contract management
- Lack of transparency

PactPay AI aims to solve these problems using AI-generated contracts, milestone tracking, and secure PayPal payments.

---

# 🏗 Finalized Architecture

```text
Next.js (Frontend)
        │
        ▼
Express.js API
        │
        ▼
Prisma ORM
        │
        ▼
Supabase PostgreSQL
        │
        ▼
PayPal API
```

---

# 🛠 Final Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui (Planned)
- Axios (Planned)
- React Hook Form (Planned)

## Backend

- Express.js
- TypeScript
- Prisma ORM
- JWT (Planned)
- bcrypt (Planned)

## Database

- PostgreSQL (Supabase)

## Payments

- PayPal REST API

## AI

- OpenAI API (Planned)

---

# 📂 Folder Structure

```text
PactPay-AI
│
├── client/
│
├── server/
│   ├── prisma/
│   └── src/
│       ├── ai/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── paypal/
│       ├── routes/
│       ├── services/
│       ├── lib/
│       ├── types/
│       ├── utils/
│       └── app.ts
│
├── README.md
├── PROJECT_NOTES.md
└── .gitignore
```

---

# 🗄 Planned Database Tables

- User
- Contract
- Milestone
- Payment

---

# 📡 Planned API Endpoints

## Authentication

- POST /signup
- POST /login

## Contracts

- GET /contracts
- POST /contracts
- PUT /contracts/:id

## Milestones

- POST /milestones
- PUT /milestones/:id

## Payments

- POST /paypal/create-order
- POST /paypal/capture-order

---

# 📅 Development Progress

## ✅ Day 0 — Planning

Completed

- Feature Freeze
- Wireframes (Paper)
- Database Design
- API Planning
- Folder Structure Planning
- Tech Stack Finalized
- GitHub Repository Created
- README Created
- PROJECT_NOTES Created

Status

✅ 100% Complete

---

## 🟡 Day 1 — Foundation

### Hour 1

Completed

- GitHub Repository Initialized
- Next.js Frontend Created
- Express Backend Created
- TypeScript Configured
- Project Folder Structure Created
- Root .gitignore Configured
- README Added
- Initial Project Ready for Commit

Status

🟢 100% Complete

---

### Hour 2

Completed

- Express Installed
- Prisma Installed
- dotenv Installed
- CORS Installed
- TypeScript Backend Configured

Pending

- shadcn/ui
- Axios
- React Hook Form
- JWT
- bcrypt

Status

🟡 In Progress

---

### Hour 3

Completed

- Prisma Initialized

Pending

- Supabase Project
- PostgreSQL Connection
- Prisma Schema
- First Migration
- Database Models

Status

🔴 Not Completed

---

# 📌 Important Decisions

- Using PostgreSQL instead of MongoDB because payment systems require relational data.
- Using Supabase instead of Neon for managed PostgreSQL.
- Using Prisma ORM for database operations.
- Next.js + Express architecture selected for scalability.
- AI Contract Generation is the main differentiating feature.
- PayPal selected as the payment provider.
- Focus on completing a polished MVP instead of adding unnecessary features.

---

# 📝 Current Project Status

## Completed

- Project Planning
- Architecture Design
- Project Setup
- Backend Setup
- Frontend Setup
- Prisma Setup
- GitHub Setup

## In Progress

- Dependency Installation
- Database Setup

## Upcoming

- Authentication
- Landing Page
- Dashboard
- AI Contract Generation
- PayPal Integration
- Milestone Management
- Testing
- Deployment

---

# 🎯 Current Target

Complete Day 1 by:

- Configure Supabase
- Connect Prisma
- Create Database Schema
- Run First Migration
- Build Authentication
- Create Landing Page
- Build Dashboard Skeleton

---

# 💡 Hackathon Strategy

Priority Order

1. Complete Working MVP
2. AI Contract Generation
3. Secure PayPal Integration
4. Professional SaaS UI
5. Smooth User Experience
6. Clean Git History
7. Final Demo & Deployment
