# 🚀 PactPay AI

### AI-Powered Contract Intelligence & Milestone-Based Payments for Freelancers

**Build Trust. Reduce Disputes. Get Paid with Confidence.**

PactPay AI is an AI-powered freelance contract management platform designed to make collaboration between freelancers and clients more transparent, structured, and secure.

The platform combines AI-assisted contract generation, milestone-based project management, contract risk analysis, and PayPal-powered payment workflows to improve trust and accountability in freelance projects.

Built for the **PayPal AI Hackathon**, PactPay AI aims to solve one of the biggest challenges in the freelance economy: ensuring clear agreements, transparent project milestones, and reliable payments.

---

# 🎯 Problem Statement

Freelancers and clients frequently face challenges such as:

- Unclear project agreements and expectations.
- Payment disputes between clients and freelancers.
- Delayed milestone-based payments.
- Time-consuming manual contract drafting.
- Lack of transparency in project progress.
- Difficulty identifying potential contractual risks.

These challenges create uncertainty, reduce trust, and make freelance collaboration difficult.

# 💡 Our Solution

PactPay AI introduces an intelligent contract management workflow that helps clients and freelancers manage agreements from creation to payment.

Our platform aims to:

1. Generate professional freelance contracts using AI.
2. Identify potential contractual risks.
3. Break projects into manageable milestones.
4. Connect milestone completion with payment workflows.
5. Provide a centralized dashboard for contract management.

Our goal is to make freelance agreements easier to create, understand, manage, and execute.

---

# ✨ Key Features

## ✅ Implemented Features

### 1. Authentication & Security

- User registration and login.
- JWT-based authentication.
- Password hashing using bcrypt.
- Protected backend routes.
- Session management.
- Secure logout functionality.

### 2. Professional SaaS Dashboard

- Responsive dashboard layout.
- Professional sidebar navigation.
- Reusable dashboard components.
- User profile section.
- Dashboard statistics cards.
- Recent activity interface.
- AG Grid integration.

### 3. Contract Creation

- Contract creation interface.
- Contract title and type.
- Contract amount.
- Client information.
- Freelancer identification.
- Project timeline.
- Payment terms.
- Contract description.
- Form validation.

### 4. Contract Database Integration

- Express REST API.
- Prisma ORM integration.
- PostgreSQL database.
- JWT-protected contract creation.
- Backend request validation.
- Contract persistence.

### 5. Groq AI Integration

- Groq SDK integration.
- Secure backend API key configuration.
- Groq client initialization.
- Successful API connectivity test.

### 6. AI Contract Generator

- AI-powered contract generation endpoint.
- Structured contract generation prompts.
- Input validation.
- Professional contract drafting.
- Generated contract response.
- Error handling.
- Successfully tested using Postman.

### 7. AI-Powered Milestone Generation

- Generate project milestones using Groq AI.
- Automatically create 3–6 milestones based on contract details.
- Distribute milestone amounts according to the total contract value.
- Validate generated milestone amounts.
- Save generated milestones in the PostgreSQL database using Prisma.
- Associate each milestone with its respective contract.
- Verify contract ownership before generating milestones.

**API Endpoint:**
`POST /api/contracts/generate-milestones`

**Authentication:** JWT Bearer Token required.

## 🚧 Upcoming Features

- AI Contract Risk Analysis.
- AI Contract Summary.
- AI Milestone Generation.
- Editable AI-generated contracts.
- AI-generated contract persistence.
- PayPal order creation.
- PayPal payment capture.
- Milestone-based payment workflows.
- Notifications.
- Analytics and reporting.
- Production deployment.

---

# 🧠 What Makes PactPay AI Different?

PactPay AI focuses on the complete freelance agreement lifecycle rather than treating contract creation and payments as separate activities.

| Challenge                      | PactPay AI Approach                          |
| ------------------------------ | -------------------------------------------- |
| Manual contract drafting       | AI-assisted contract generation              |
| Unclear project expectations   | Structured contract details                  |
| Contractual risks              | AI-powered risk analysis (planned)           |
| Unstructured project delivery  | AI milestone generation (planned)            |
| Payment uncertainty            | PayPal milestone payment workflows (planned) |
| Fragmented project information | Centralized dashboard                        |

**Our Vision:** Turn freelance agreements into structured, transparent, and manageable project workflows.

---

# 🛠️ Technology Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios

## Backend

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- bcrypt
- Groq SDK

## Database & ORM

- PostgreSQL
- Supabase
- Prisma ORM

## Artificial Intelligence

- Groq AI API
- Model: `openai/gpt-oss-120b`

## Payments

- PayPal REST API (planned integration)

## Development & Testing

- Visual Studio Code
- Postman
- Git
- GitHub

---

# 🏗️ System Architecture

```text
                 ┌──────────────────────┐
                 │    Next.js Frontend  │
                 │                      │
                 │  Dashboard & Forms   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │    Express REST API  │
                 │                      │
                 │  JWT Authentication  │
                 │  Request Validation  │
                 └───────┬──────────────┘
                         │
              ┌──────────┴───────────┐
              │                      │
              ▼                      ▼
    ┌──────────────────┐   ┌──────────────────┐
    │   Prisma ORM     │   │     Groq AI      │
    │                  │   │                  │
    │  PostgreSQL      │   │ Contract         │
    │  Database        │   │ Generation       │
    └──────────────────┘   └──────────────────┘
              │
              ▼
    ┌──────────────────┐
    │    PayPal API    │
    │                  │
    │ Planned Payment  │
    │ Integration      │
    └──────────────────┘
```

---

# 📁 Project Structure

```text
PactPay-AI/
│
├── client/
│   ├── app/
│   │   ├── dashboard/
│   │   └── ...
│   ├── components/
│   ├── services/
│   ├── lib/
│   ├── types/
│   └── ...
│
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── contract.controller.ts
│   │   │   └── ai.controller.ts
│   │   │
│   │   ├── middleware/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── contract.routes.ts
│   │   │   └── ...
│   │   │
│   │   ├── services/
│   │   ├── lib/
│   │   │   ├── prisma.ts
│   │   │   └── groq.ts
│   │   │
│   │   └── app.ts
│   │
│   └── package.json
│
├── README.md
└── Projectnotes.md
```

---

# 🗄️ Database Models

Current Prisma database models include:

- User
- Contract
- Milestone
- Payment

## Database Relationship

```text
User
 └── Contracts
       └── Milestones
              └── Payments
```

---

# 📡 REST API Documentation

## Authentication APIs

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | `/api/auth/signup` | Register a new user    |
| POST   | `/api/auth/login`  | Authenticate user      |
| GET    | `/api/auth/me`     | Get authenticated user |

## Dashboard API

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/dashboard` | Retrieve dashboard data |

## Contract APIs

| Method | Endpoint                  | Description                     | Status      |
| ------ | ------------------------- | ------------------------------- | ----------- |
| POST   | `/api/contracts`          | Create and save a contract      | Implemented |
| POST   | `/api/contracts/generate` | Generate contract using Groq AI | Implemented |

**Authentication:** Contract creation and AI generation endpoints require a valid JWT Bearer Token.

## AI Contract Generation Example

### Request

```http
POST /api/contracts/generate
```

### Request Body

```json
{
  "title": "Website Development Agreement",
  "contractType": "Freelance Development",
  "amount": 50000,
  "clientName": "ABC Company",
  "freelancerName": "John Developer",
  "startDate": "2026-11-10",
  "endDate": "2026-12-10",
  "paymentTerms": "50% advance and 50% after completion",
  "description": "Develop a responsive business website with five pages.",
  "additionalRequirements": "Mobile responsive design and basic SEO."
}
```

### Successful Response

```json
{
  "success": true,
  "message": "Contract generated successfully!",
  "data": {
    "generatedContract": "Generated contract content..."
  }
}
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL / Supabase account
- Git

## 1. Clone the Repository

```bash
git clone https://github.com/swati-singh2026/pactpay-ai.git
```

```bash
cd PactPay-AI
```

## 2. Setup Backend

```bash
cd server
npm install
```

Configure your environment variables in `server/.env`.

At minimum, AI integration requires:

```env
GROQ_API_KEY=your_groq_api_key
```

Also configure the database and authentication environment variables required by the backend.

Start the backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

## 3. Setup Frontend

Open a separate terminal:

```bash
cd client
npm install
npm run dev
```

Open the frontend:

```text
http://localhost:3000
```

---

# 🔐 Security

Security is an important part of PactPay AI.

- Passwords are hashed using bcrypt.
- Protected APIs use JWT authentication.
- Backend endpoints validate incoming requests.
- Groq API credentials are stored in backend environment variables.
- Secret keys must never be exposed in frontend code.
- Environment files must never be committed to GitHub.

**Important:** AI-generated contracts are drafts and should be reviewed by qualified legal professionals before signing.

---

# 📈 Development Progress

## Day 1 – Foundation & Dashboard

- [x] Project setup
- [x] Frontend and backend architecture
- [x] Database setup
- [x] Authentication backend
- [x] Authentication frontend
- [x] Landing page
- [x] Professional dashboard
- [x] Sidebar navigation
- [x] Dashboard components
- [x] AG Grid integration

## Day 2 – Contract Management & AI

- [x] Hour 1 – Create Contract UI
- [x] Hour 2 – Form Validation
- [x] Hour 3 – Contract Creation API
- [x] Hour 4 – Database Integration
- [x] Hour 5 – Groq AI Setup
- [x] Hour 6 – AI Contract Generator API
- [ ] Hour 7 – AI Milestone Generation
- [ ] Hour 8 – AI Risk Analysis
- [ ] Hour 9 – AI Contract Summary
- [ ] Hour 10 – Editable AI Contract
- [ ] Hour 11 – Save AI Contract
- [ ] Hour 12 – Testing

## Future Development

- [ ] PayPal payment integration
- [ ] Milestone-based payment automation
- [ ] Notifications
- [ ] Analytics
- [ ] Production deployment

---

# 👩‍💻 Developer

**Swati Singh**

- GitHub: [swati-singh2026](https://github.com/swati-singh2026)
- LinkedIn: [Swati Singh](https://linkedin.com/in/swatisingh-bca-eco)

---

# 🏆 Hackathon Project

PactPay AI is being developed for the **PayPal AI Hackathon**.

We aim to create a smarter freelance ecosystem where contracts, project milestones, and payments work together to establish transparency, accountability, and trust.

**PactPay AI — Build Trust. Deliver Work. Get Paid.**

---

⭐ If you find this project interesting, consider giving it a star!
