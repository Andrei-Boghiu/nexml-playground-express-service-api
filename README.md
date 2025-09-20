# Nexml Playground – Express Service API

A RESTful API server for the **Nexml Playground** platform.  
This service provides JSON-based endpoints to manage users, CV archives, job listings, policies, and instructions. It also integrates with external AI services to analyze CVs.

---

## **Features**

- **User Management** – Create, authenticate, and manage users with soft-delete support.
- **Authentication & Security** – JWT-based authentication with refresh tokens, bcrypt password hashing, and secure cookie support.
- **CV Archive Management** – Upload, organize, and track AI-analyzed CVs.
- **Job Listings & Policies** – Store and manage hiring-related data.
- **Configurable User Limits** – Control user-specific quotas (archives, CVs, policies, etc.).
- **Prisma ORM with PostgreSQL** – Type-safe database layer.

---

## **Tech Stack**

- **Runtime:** Node.js
- Some: some
- **Framework:** Express
- **Database:** PostgreSQL (via Prisma ORM)
- **Language:** TypeScript (compiled to CommonJS)
- **Validation:** Zod
- **Authentication:** JSON Web Tokens (JWT) with bcrypt
- **Environment Management:** dotenv

---

## **Database Schema**

Defined in [`./src/prisma/schema.prisma`](./src/prisma/schema.prisma), the database consists of:

- **User** – Soft-delete enabled, with optional organization and access metadata.
- **UserLimits** – Custom per-user limits for archives, CVs, policies, etc.
- **CvArchive** – Groups CVs for each user.
- **Cv** – Stores individual CVs and their AI analysis results.
- **JobListing** – Stores job positions.
- **Policy** – Stores policies related to hiring or analysis.
- **Instruction** – Stores custom AI instructions.

### Key Enums

- **UserRole**: `USER`, `ADMIN`, `DEV`
- **CvState**: `NOT_ANALYZED`, `IN_PROGRESS`, `ANALYZED`, `FAILED`, `REJECTED`
- **Qualification**: `UNDER_QUALIFIED`, `QUALIFIED`, `OVERQUALIFIED`

---

## **Getting Started**

### 1. **Clone the Repository**

```bash
git clone https://github.com/Andrei-Boghiu/nexml-playground-express-service-api.git
cd nexml-playground-express-service-api
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Set Up Environment Variables**

Create a `.env` file with:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/playground_db"
JWT_SECRET="your-secret-key"
```

### 4. **Run Database Migrations**

For development:

```bash
npm run prisma:dev
```

For production:

```bash
npm run prisma:prod
```

### 5. **Start the Development Server**

```bash
npm run dev
```

Build and start for production:

```bash
npm run build
npm start
```

---

## **API Overview**

- **Authentication**

  - `POST /auth/login` – User login
  - `POST /auth/register` – User registration
  - `POST /auth/logout` – Invalidate session

- **Users**

  - `GET /user/profile` – Get current user profile
  - `PATCH /user/update` – Update user details

- **CV Archives**

  - `POST /archives` – Create an archive
  - `GET /archives` – List user archives

- **CVs**

  - `POST /cvs` – Upload a CV for analysis
  - `GET /cvs/:id` – Get CV details

- **Job Listings, Policies, Instructions** – Standard CRUD endpoints.

---

## **Development Notes**

- Uses **soft delete** on `User` via `deletedAt`.
- Prisma schema path is configured via `package.json` → `"prisma": { "schema": "src/prisma/schema.prisma" }`.
- All database interactions go through a centralized Prisma client (`src/prisma/client.ts`).

---

## **References**

See [REFERENCES.md](./docs/REFERENCES.md) for a curated list of libraries and their documentation.

---

## **Author**

- **Name:** Andrei Boghiu
- **GitHub:** [Andrei-Boghiu](https://github.com/Andrei-Boghiu)
