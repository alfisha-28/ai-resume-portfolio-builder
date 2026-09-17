````md
# 🧠 ResuMind

### Build Smarter. Get Hired.

> An AI-powered career platform for building, optimizing, tailoring, and showcasing professional resumes and portfolios.

ResuMind is a full-stack web application that brings the complete resume-to-career workflow into one platform.

Create a professional resume, improve it with AI, analyze ATS compatibility, match it against job descriptions, tailor it for specific opportunities, and transform it into a personal portfolio — all from one place.

---

## ✨ Features

### 🔐 Authentication & Dashboard

- JWT-based authentication
- Secure Login & Registration
- Protected routes
- User profile management
- Password management
- Resume ownership and authorization
- Personalized dashboard

---

### 📄 Resume Builder

Build and manage professional resumes with a structured editor.

**Resume Sections**

- Personal Information
- Professional Summary
- Education
- Work Experience
- Projects
- Skills
- Certifications
- Languages
- Achievements
- Interests

**Resume Management**

- Create resumes
- Edit resumes
- Duplicate resumes
- Delete resumes
- Search & sort resumes
- Resume completion tracking
- Real-time preview
- Debounced autosave

---

### 🎨 Resume Templates

Choose from multiple professional templates:

- **Classic**
- **Modern**
- **Minimal**
- **Professional**

Templates are designed with clean typography, spacing, hierarchy, and print-ready layouts.

---

### 📑 PDF Export

Export resumes as professional PDFs with:

- A4 formatting
- Print-optimized layouts
- Multi-page support
- Proper page breaks
- Template-preserved styling
- Clickable links

---

# 🤖 AI Career Suite

ResuMind integrates Google's Gemini AI to provide intelligent resume assistance.

### ✍️ AI Summary Assistant

Generate and improve professional summaries with:

- Summary generation
- Professional rewriting
- Concise rewriting
- ATS-focused optimization

---

### 💼 AI Experience Enhancer

Improve experience bullet points with:

- Strong action verbs
- Achievement-oriented writing
- Professional rewriting
- Concise bullet points
- AI-assisted generation

---

### 🚀 AI Project Assistant

Improve project descriptions with:

- Project generation
- Bullet-point generation
- Concise rewriting
- ATS optimization
- Professional improvements

---

### 🛠️ AI Skills Suggestions

Get relevant skill recommendations based on existing resume context while avoiding duplicate skills.

---

# 📊 ATS Resume Analyzer

Analyze resume compatibility using a hybrid deterministic + AI analysis engine.

The analyzer evaluates:

- Contact information
- Summary
- Experience
- Education
- Projects
- Skills
- Keywords
- Metrics
- Role alignment
- Resume completeness

### Analysis includes:

- ATS compatibility score
- Strengths
- Weaknesses
- Keyword analysis
- Improvement recommendations
- Action plan

> **Note:** ATS results are estimated compatibility indicators and are not official scores from any ATS vendor.

---

# 🎯 Job Description Matching

Paste a target job description and compare it with your resume.

The matching engine analyzes:

- Skills
- Technologies
- Experience terminology
- Project terminology
- Education
- Role alignment
- Relevant keywords

### Results include:

- Match score
- Matching skills
- Missing keywords
- Section-level analysis
- Recommendations

---

# 🧠 AI Resume Tailoring

Tailor your resume to a specific job description while keeping the user in control.

### Workflow

```text
Resume
   ↓
Job Description
   ↓
AI Analysis
   ↓
Tailoring Suggestions
   ↓
Accept / Reject
   ↓
Apply Selected Changes
   ↓
Tailored Resume
````

The AI can suggest improvements to:

* Experience bullets
* Project descriptions
* Skills
* Keywords
* Job-specific terminology

### 🛡️ Anti-Fabrication

ResuMind is designed to improve the presentation of existing information without inventing:

* Companies
* Job titles
* Degrees
* Technologies
* Certifications
* Achievements
* Dates
* Metrics
* Projects
* Professional experience

Every AI suggestion can be reviewed before being applied.

---

# 🌐 Portfolio Builder

Turn your resume into a professional personal portfolio.

### Portfolio Templates

| Template         | Design                                                   |
| ---------------- | -------------------------------------------------------- |
| **Modern**       | Gradient cards, technology badges & interactive projects |
| **Minimal**      | Clean typography & generous whitespace                   |
| **Professional** | Corporate dual-column layout                             |
| **Creative**     | Product showcase layout & dynamic badges                 |

---

## 🎨 Portfolio Customization

Customize your portfolio with:

* Live preview
* Accent colors
* Section reordering
* Section visibility controls
* Contact privacy settings
* Source resume selection
* Autosave

### Accent Palettes

* Blue
* Purple
* Emerald
* Orange
* Monochrome

### Contact Privacy

Choose whether to display:

* Email
* Phone
* Location

---

## ✨ AI About Me

Use AI to improve your portfolio's About Me section.

The AI focuses on:

* Clarity
* Professional tone
* Structure
* Conciseness
* Personal branding

while following the same anti-fabrication principles used throughout ResuMind.

---

# 📢 Public Portfolio

Publish your portfolio and share it through a public URL:

```text
/portfolio/[username]
```

Public portfolios include:

* Responsive design
* Dynamic SEO metadata
* OpenGraph metadata
* Twitter/X metadata
* Resume PDF download
* Web Share API
* One-click URL copying
* ResuMind branding

---

# 📈 Portfolio Management

Manage your portfolio from a dedicated dashboard.

Features include:

* Profile completeness score
* Publish / Unpublish
* Portfolio URL
* Share portfolio
* Copy URL
* Switch source resume
* Customize portfolio
* Live preview

---

# 🏗️ Tech Stack

## Frontend

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **React Query**
* **Axios**
* **React Hook Form**
* **Zod**
* **Framer Motion**
* **Lucide React**
* **React Hot Toast**
* **React-to-Print**

## Backend

* **Node.js**
* **Express.js**
* **JavaScript**
* **Prisma ORM**
* **PostgreSQL**
* **JWT**
* **bcrypt**

## AI

* **Google Gemini**
* **@google/genai**

## Tools

* Git
* GitHub
* VS Code
* npm

---

# 🏛️ Architecture

```text
                     ┌─────────────────────┐
                     │     ResuMind UI     │
                     │      Next.js        │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │      REST API       │
                     │       Express       │
                     └──────────┬──────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
       ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
       │    Prisma   │   │  AI Service │   │    Auth     │
       │     ORM     │   │   Gemini    │   │    JWT      │
       └──────┬──────┘   └─────────────┘   └─────────────┘
              │
              ▼
       ┌─────────────┐
       │ PostgreSQL  │
       └─────────────┘
```

---

# 📁 Project Structure

```text
ai-resume-portfolio-builder/
│
├── client/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── register/
│   │   ├── portfolio/
│   │   └── resumes/
│   │
│   ├── components/
│   │   ├── ai/
│   │   ├── dashboard/
│   │   ├── portfolio/
│   │   ├── resume/
│   │   └── templates/
│   │
│   ├── services/
│   ├── contexts/
│   ├── hooks/
│   └── public/
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── config/
│   │
│   └── prisma/
│
└── README.md
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js 20+
* npm
* PostgreSQL
* Git

---

## 1. Clone

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ai-resume-portfolio-builder
```

---

## 2. Install Frontend

```bash
cd client
npm install
```

---

## 3. Install Backend

```bash
cd ../server
npm install
```

---

## 4. Environment Variables

Create a `.env` file inside `server/`:

```env
DATABASE_URL="your_database_url"
JWT_SECRET="your_jwt_secret"
GEMINI_API_KEY="your_gemini_api_key"
GEMINI_MODEL="gemini-3.6-flash"
PORT=7000
CLIENT_URL="http://localhost:3000"
```

Never commit your `.env` file.

---

## 5. Database Setup

From the `server` directory:

```bash
npx prisma generate
npx prisma migrate dev
```

Optional — open Prisma Studio:

```bash
npx prisma studio
```

---

## 6. Run Backend

```bash
cd server
npm run dev
```

Backend:

```text
http://localhost:7000
```

---

## 7. Run Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 🔌 API Overview

### Authentication

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/profile
```

### Resumes

```text
GET    /api/v1/resumes
GET    /api/v1/resumes/:id
POST   /api/v1/resumes
PUT    /api/v1/resumes/:id
DELETE /api/v1/resumes/:id
```

### AI

```text
POST /api/v1/ai/summary
POST /api/v1/ai/experience
POST /api/v1/ai/project
POST /api/v1/ai/skills
POST /api/v1/ai/analyze
POST /api/v1/ai/match
POST /api/v1/ai/tailor
```

---

# 🔒 Security

ResuMind follows several security practices:

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* Resource ownership validation
* Server-side Gemini API calls
* Environment-based secrets
* Input validation
* Sanitized API errors
* Anti-fabrication AI rules
* CORS configuration

Sensitive credentials are never exposed to the client.

---

# 🧪 Production Build

### Frontend

```bash
cd client
npm run build
```

### Backend

```bash
cd server
node --check src/server.js
```

The project has been validated with the Next.js production build and TypeScript checks.

---

# 📌 Project Status

## ✅ Feature Complete

ResuMind currently includes:

* Authentication
* Resume Builder
* Resume Templates
* Autosave
* PDF Export
* AI Resume Assistance
* ATS Analysis
* Job Description Matching
* AI Resume Tailoring
* Portfolio Builder
* Portfolio Customization
* Public Portfolio
* SEO Metadata
* Responsive UI
* ResuMind Branding

The current focus is on **stability, testing, deployment, and production readiness**.

---

# 🎯 Product Workflow

```text
                 RESUMIND

            Create Your Resume
                    │
                    ▼
              AI Enhancement
                    │
                    ▼
              ATS Analysis
                    │
                    ▼
            Job Description
                 Matching
                    │
                    ▼
            AI Resume Tailoring
                    │
                    ▼
             Portfolio Builder
                    │
                    ▼
            Publish Your Portfolio
```

---

# 💡 What Makes ResuMind Different?

Most resume builders focus on creating a document.

ResuMind connects the entire career-document workflow:

```text
Create
  ↓
Improve
  ↓
Analyze
  ↓
Match
  ↓
Tailor
  ↓
Showcase
```

A user's resume becomes the central source of information that powers both their optimized resume and personal portfolio.

---

# 👩‍💻 Author

## Alfisha Ansari

Computer Science & Engineering Student
UI/UX Designer • Product Design Enthusiast • Full-Stack Developer

🌐 **Portfolio:** [alfisha.in](https://www.alfisha.in)

---

## ⭐ If You Like ResuMind

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational, portfolio, and demonstration purposes.

````

### One thing I strongly recommend for the GitHub version

Don't leave the README as **100% text**. Since ResuMind is a highly visual product, add a section near the top like:

```md
## 🖥️ Preview

![ResuMind Dashboard](./screenshots/dashboard.png)

![ResuMind Resume Builder](./screenshots/resume-builder.png)

![ResuMind AI Assistant](./screenshots/ai-assistant.png)

![ResuMind Portfolio](./screenshots/portfolio.png)
````

That will make the repository feel much more like a **finished product** when someone opens it on GitHub.
