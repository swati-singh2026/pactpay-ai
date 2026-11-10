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

### 8.AI-Powered Contract Risk Analysis

- Analyze existing contracts using Groq AI.
- Identify potential contractual, financial, payment, and project-related risks.
- Classify risks into three severity levels:
  - LOW
  - MEDIUM
  - HIGH
- Generate descriptions for identified risks.
- Provide recommendations to reduce potential risks.
- Verify contract ownership before performing risk analysis.
- Return structured risk analysis results through the API.

### 9.AI-Powered Contract Summary

PactPay AI uses Groq-powered AI to generate clear and concise summaries of existing contracts.

**Key Capabilities:**

- Generates an easy-to-understand contract overview.
- Summarizes the scope of work.
- Highlights financial details and contract status.
- Identifies important contract points.
- Highlights missing information and terms that require review.
- Uses existing contract data from the database.
- Verifies contract ownership before generating summaries.

**API Endpoint:**
`POST /api/contracts/generate-summary`

**Authentication:** JWT Bearer Token Required

**Request Body:**

````json
{
  "contractId": "existing_contract_id"
}

### Editable AI-Generated Contract

PactPay AI allows users to review, edit, save, and update AI-generated contracts before finalizing them.

**Features:**
- Generate professional contracts using Groq AI.
- Display generated contract content in an editable text area.
- Allow users to modify AI-generated contract clauses.
- Save edited contracts to the database.
- Update existing contracts without creating duplicate records during the same editing session.
- Track saved contract IDs on the frontend.

**Workflow:**
1. User enters contract details.
2. Groq AI generates the contract.
3. User reviews and edits the generated content.
4. First save creates the contract in the database.
5. Further edits update the existing contract.

**Backend API:**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/contracts` | Create a new contract |
| PUT | `/api/contracts/:id` | Update an existing contract |

**Implementation:**
- Frontend: Next.js, React state management, TypeScript.
- Backend: Express.js, TypeScript.
- Database: PostgreSQL with Prisma ORM.
- AI Integration: Groq API.

**Status:** Completed and tested successfully.
### Saved AI Contract Retrieval

PactPay AI allows users to retrieve their previously saved AI-generated contracts.

**Features:**
- Saves the generated contract ID in browser localStorage.
- Retrieves the saved contract using a protected GET API.
- Automatically restores the saved contract after page refresh.
- Verifies contract ownership before returning saved data.

**API Endpoint:**
- `GET /api/contracts/:id`

**Workflow:**
1. User saves an AI-generated contract.
2. Contract ID is stored in localStorage.
3. On page refresh, the application retrieves the stored contract ID.
4. Frontend calls the protected GET API.
5. Retrieved contract content is displayed in the editable textarea.

**Testing:**
- Saved contract successfully.
- Retrieved contract using Postman.
- Verified automatic contract restoration after browser refresh.

## 💳 PayPal Payment Integration

PactPay AI integrates PayPal Sandbox to support secure payment processing between clients and freelancers.

### Implemented Features

- PayPal Sandbox account configuration.
- Dedicated PactPay AI Merchant application.
- Official PayPal TypeScript Server SDK integration.
- Secure PayPal credentials management using environment variables.
- PayPal order creation.
- Payment amount validation.
- PayPal payment capture.
- Protected payment API routes using JWT authentication.
- Error handling for payment operations.

### Backend API Endpoints

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/paypal/create-order` | Creates a PayPal payment order | Required |
| POST | `/api/paypal/capture-payment` | Captures an existing PayPal order | Required |

### PayPal Environment Configuration

Add the following environment variables to `server/.env`:

```env
PAYPAL_CLIENT_ID=your_sandbox_client_id
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret
PAYPAL_BASE_URL=https://api-m.sandbox.paypal.com
```

**Security Notes:**
- Never expose PayPal Client Secret in frontend code.
- Never commit `.env` files to GitHub.
- Use PayPal Sandbox credentials during development and testing.

### Payment Integration Architecture

```text
Next.js Frontend
       |
       v
Express Backend
       |
       v
PayPal Controller
       |
       v
PayPal Service
       |
       v
PayPal TypeScript Server SDK
       |
       v
PayPal Sandbox Orders API
```

### Payment Flow

1. Authenticated user requests a payment order.
2. Backend validates the payment amount.
3. PayPal creates a Sandbox order.
4. Frontend receives the PayPal order details.
5. User approves the payment through PayPal Checkout.
6. Backend captures the approved order.
7. Payment status is verified and updated.

**Development Status:** Backend order creation and capture APIs are implemented. Frontend Checkout integration, webhooks, database status updates, and end-to-end testing are pending.




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
````

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

## 🗓 DAY 3 – PayPal Integration

**Goal:** Integrate PayPal Sandbox payments into PactPay AI.

### Progress Tracker

| Hour    | Task                       | Status       |
| ------- | -------------------------- | ------------ |
| Hour 1  | PayPal Sandbox Setup       | ✅ Completed |
| Hour 2  | Checkout SDK               | ✅ Completed |
| Hour 3  | Orders API                 | ✅ Completed |
| Hour 4  | Create Order API           | ✅ Completed |
| Hour 5  | Capture Payment API        | ✅ Completed |
| Hour 6  | PayPal Webhook Integration | ✅ Completed |
| Hour 7  | Update Payment Status      | ⏳ Pending   |
| Hour 8  | Update Milestone Status    | ⏳ Pending   |
| Hour 9  | Transaction History        | ⏳ Pending   |
| Hour 10 | Payment Success Page       | ⏳ Pending   |
| Hour 11 | Error Handling             | ⏳ Pending   |
| Hour 12 | Complete Testing           | ⏳ Pending   |

### Hour 6 – PayPal Webhook Integration ✅

- Created PayPal Sandbox Webhook for PactPay AI US.
- Configured webhook endpoint using ngrok.
- Registered four PayPal webhook events:
  - `CHECKOUT.ORDER.APPROVED`
  - `PAYMENT.CAPTURE.COMPLETED`
  - `PAYMENT.CAPTURE.DENIED`
  - `PAYMENT.CAPTURE.REFUNDED`

- Implemented PayPal webhook signature verification.
- Configured raw body parsing.
- Updated the new webhook ID in backend environment variables.
- Verified actual Sandbox webhook event delivery.

### PayPal Sandbox Payment Test ✅

Successfully completed a $10.00 USD Sandbox payment.

| Detail            | Result              |
| ----------------- | ------------------- |
| Seller            | US Business Sandbox |
| Buyer             | US Personal Sandbox |
| Payment Amount    | $10.00              |
| PayPal Fee        | $0.84               |
| Seller Receivable | $9.16               |
| Payment Status    | COMPLETED           |

### Remaining Tasks

- Hour 7: Update Payment Status in Database
- Hour 8: Update Milestone Status
- Hour 9: Transaction History
- Hour 10: Payment Success Page
- Hour 11: Error Handling
- Hour 12: Complete Testing

**Day 3 Final Goal:** End-to-End Payment Flow 🚀

### Hour 7: Update Payment Status ✅

- Integrated PayPal webhook with Prisma Payment model.
- Verified PAYMENT.CAPTURE.COMPLETED event.
- Automatically updated payment status from PENDING to PAID.
- Verified payment status in Supabase database.
- Successfully tested two Sandbox payments:
  - Payment 1: $1,200 — PAID
  - Payment 2: $1,800 — PAID
- Confirmed webhook database updates successfully.

### Hour 8: Update Milestone Status ✅

- Integrated PayPal webhook with the Prisma Milestone model.
- Automatically updates milestone status when PayPal payment is completed.
- `PAYMENT.CAPTURE.COMPLETED` event updates the linked milestone to `COMPLETED`.
- Verified webhook event processing and database updates.
- Successfully tested Deployment milestone payment.
- Confirmed Payment status as `PAID` and Milestone status as `COMPLETED` in Supabase.

**Result:** Milestone status is automatically synchronized with successful PayPal payments.

### PayPal Payment Integration

- Integrated PayPal Sandbox payment gateway.
- Create PayPal checkout orders for project milestones.
- Capture approved PayPal payments.
- Handle PayPal payment webhooks.
- Automatically update payment and milestone statuses after successful webhook processing.
- Maintain transaction history for authenticated users.
- Retrieve payment details along with associated milestones and contracts.
- Secure payment APIs using JWT authentication.

### Transaction History

- REST API: `GET /api/transactions`
- Displays authenticated user's payment transactions.
- Includes payment amount, status, milestone details, and contract information.
- Supports chronological transaction retrieval.

### Payment Testing

Successfully tested the PayPal Sandbox payment flow using Postman and Supabase.

Verified a $200 USD payment with:

- Payment Status: `PAID`
- Milestone Status: `COMPLETED`

# 💳 PayPal Payment Integration

PactPay AI integrates PayPal Sandbox to support secure milestone-based payments.

## Features

- PayPal Sandbox Checkout Integration
- PayPal Order Creation API
- Automatic Payment Capture
- Payment Success Page
- Payment Cancellation Page
- Transaction History
- Payment Status Tracking
- Milestone Status Automation
- Payment Ownership Verification
- Duplicate Capture Protection
- Error Handling and JWT Authentication

## Payment Workflow

1. User selects a contract milestone.
2. Backend creates a PayPal order.
3. User approves the payment through PayPal Sandbox.
4. User returns to the Payment Success page.
5. Frontend automatically calls the payment capture API.
6. Backend captures the PayPal payment.
7. Payment status updates to `PAID`.
8. Related milestone status updates to `COMPLETED`.
9. Transaction details appear in Payment History.

## Payment Statuses

- `PENDING` – Payment is awaiting completion.
- `PAID` – Payment has been successfully captured.
- `FAILED` – Payment failed.

## Milestone Statuses

- `PENDING` – Milestone payment is not completed.
- `IN_PROGRESS` – Milestone is in progress.
- `COMPLETED` – Milestone payment is completed.

## Payment Pages

- `/dashboard/payments/success`
- `/dashboard/payments/cancel`
- `/dashboard/payments/history`

## Testing

- PayPal Sandbox payment flow tested.
- Automatic payment capture verified.
- Payment and milestone database updates verified.
- Transaction History API tested.
- Invalid JWT authentication tested (401 Unauthorized).
- Frontend production build successful.
- Backend TypeScript build successful.

## Day 3 Progress

- Hour 10 – Payment Success Page: COMPLETED
- Hour 11 – Error Handling: COMPLETED
