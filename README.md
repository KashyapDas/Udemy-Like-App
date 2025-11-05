# Udemy-Like-App (Backend)

A Udemy-like backend application providing essential routes for a course-selling platform: **signup**, **signin**, **forgetPassword**, **getData**, **searchData**, and more. Built with **Node.js + Express**, **MongoDB** (Mongoose), and JavaScript. Validation and security are handled using libraries like **zod**, **bcrypt**, and **jsonwebtoken (JWT)**.

---

## 🔖 Short Description (for GitHub sidebar)
> Backend for a Udemy-like course marketplace — Node + Express + MongoDB. Includes auth (signup/signin/forget-password), course search, user data endpoints, and input validation with Zod.

---

## 🧾 Table of Contents
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Available Scripts](#available-scripts)  
- [API Endpoints](#api-endpoints)  
- [Auth Flow](#auth-flow)  
- [Validation](#validation)  
- [Security Notes](#security-notes)  
- [Contributing](#contributing)  
- [License](#license)  

---

## ✅ Features
- User authentication: **signup**, **signin**, **forgot password**.  
- Secure password handling with **bcrypt** (hashing) and optional salting.  
- Token-based authentication using **JWT** (cookies or Authorization header).  
- Course and user data endpoints: **getData**, **searchData**, etc.  
- Input validation using **Zod** schemas.  
- MongoDB models using **Mongoose**.  
- CORS enabled and cookie parsing for session flows.  
- Clean project structure ready for extensions (admin panels, payments, etc.).

---

## 🛠 Tech Stack
- **Node.js** + **Express** (server)  
- **MongoDB** with **Mongoose** (database)  
- **JavaScript (ES6+)**  
- Packages: `zod`, `mongoose`, `cors`, `bcrypt`, `jsonwebtoken`, `cookie-parser`, and others

---

## 🚀 Getting Started

1. **Clone the repo**
```bash
git clone https://github.com/KashyapDas/Udemy-Like-App.git
cd Udemy-Like-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** (see below for variables) and add your values.

4. **Run the server (development)**
```bash
npm run dev
```

5. Open API client (Postman / Insomnia) and hit the endpoints on `http://localhost:4000` (or configured port).

---

## ⚙️ Environment Variables

Create a `.env` file in the project root and add at least the following keys:
```
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
COOKIE_SECRET=your_cookie_secret_here   # optional if using signed cookies
NODE_ENV=development
```
> **Note:** Keep `.env` out of version control and never commit secrets to GitHub.

---

## 📚 API Endpoints (example routes)
> Replace `:id` with actual resource id, and use `POST`, `GET` etc as specified.

### Auth & User
- `POST /signup` — Register a new user. Body: `{ username, email, password, ... }`
- `POST /signin` — Login using **email | username | phoneNo** + `password`. Returns JWT (cookie or JSON).
- `POST /forgot-password` — Begin password-recovery flow (generate recovery token / code).
- `POST /reset-password` — Reset password using recovery token/code.
- `GET /me` — Get profile of currently authenticated user (requires auth token).

### Courses / Data
- `GET /courses` — List courses (supports pagination & filters)
- `GET /courses/:id` — Course details
- `GET /search` — Search endpoint (e.g., `GET /search?q=react`)
- `POST /courses` — Create course (protected route — instructor/admin)

> These are example endpoints — adapt them to match your repository’s actual routes and controllers.

---

## 🔐 Auth Flow (recommended)
- On successful `signin`, a JWT is issued and sent to the client either as:
  - **HTTP-only cookie** (recommended) with `Secure` & `SameSite` flags, or
  - JSON response `{ token }` to be stored in client side storage (less secure).
- Protected routes verify token via `Authorization: Bearer <token>` header or cookie verification middleware.
- Passwords stored as hashed values using bcrypt (and an optional custom salt algorithm if desired).

---

## 📎 Validation
- Use **Zod** schemas to validate request bodies before processing (signup, signin, course creation, etc.).
- Example pattern:
```js
const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6)
});
const result = schema.safeParse(req.body);
if(!result.success) return res.status(400).json({ error: result.error.errors });
```
This pattern helps return friendly validation errors and prevents invalid data reaching your database layer.

---

## 🔒 Security Notes & Best Practices
- **Do not store plaintext passwords** — always hash them with `bcrypt` (and a salt).  
- Use **HTTPS** in production and set `cookie.secure = true`.  
- Set `SameSite` cookie policies carefully (`None` + Secure for cross-site, or Lax for same-site).  
- Use `helmet` middleware for helpful HTTP header protections.  
- Rate-limit auth endpoints (to mitigate brute force attacks).  
- Keep `JWT_SECRET` secure and rotate if compromised.

---

## 🧩 Project Structure (example)
```
/controllers
/models
/routes
/middleware
/zod               # zod schemas
/security          # salting / encrypt helpers
/functions         # small helper functions
server.js / app.js
```

---

## 🤝 Contributing
Contributions, issues and feature requests are welcome! Please follow the common flow:
1. Fork the project → create a branch → commit → open PR.
2. Keep changes focused and add tests or examples when possible.
3. Use descriptive commit messages and PR description.

---

## 🧑‍💻 Author
**Kashyap Jyoti Das** — Full Stack / Backend Developer.  
GitHub: https://github.com/KashyapDas

---

## 📜 License
This project is open-source and typically uses the MIT License. Add a `LICENSE` file if you choose MIT.


---
