# 🧑‍💼 People Dashboard

A full-stack user management dashboard built with **Node.js**, **Express**, **MySQL**, and **EJS**.  
Supports complete CRUD operations with a clean, responsive UI.

## 🔗 Live Demo
> Coming soon / Add your deployed link here

---

## 📸 Screenshots
<img width="1260" height="413" alt="image" src="https://github.com/user-attachments/assets/60b1da9d-f2e4-4908-b09a-cb8d43f5da7e" />
<img width="581" height="296" alt="image" src="https://github.com/user-attachments/assets/b6522e22-7138-45ef-bfa3-20fdd2fa3ff4" />
<img width="1217" height="615" alt="image" src="https://github.com/user-attachments/assets/bbe4c26b-5698-4ef9-ad92-c8f50add8b9f" />
<img width="915" height="466" alt="image" src="https://github.com/user-attachments/assets/f70049cc-dc4f-48aa-a85d-fd1e005eb7ae" />
<img width="942" height="417" alt="image" src="https://github.com/user-attachments/assets/d1cadb51-f1d2-4043-a250-9b47cc7b9c8a" />

<img width="1059" height="565" alt="image" src="https://github.com/user-attachments/assets/19001b73-9d47-44fd-86c9-9263ea3dece3" />





---

## ✨ Features

- View all users in a clean dashboard table
- Add new users with auto-generated UUID
- Edit username with password confirmation
- Delete users with password confirmation
- Responsive design — works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MySQL |
| Templating | EJS |
| Styling | Vanilla CSS |
| Utilities | method-override, faker.js, uuid |

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MySQL installed and running

### Installation

1. **Clone the repo**
```bash
   git clone https://github.com/YOUR_USERNAME/people-dashboard.git
   cd people-dashboard
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

4. **Set up the database**

   Run this SQL to create the table:
```sql
   CREATE TABLE users (
       id VARCHAR(50) PRIMARY KEY,
       username VARCHAR(50) NOT NULL UNIQUE,
       email VARCHAR(100) NOT NULL UNIQUE,
       password VARCHAR(30) NOT NULL
   );
```

5. **Start the server**
```bash
   node index.js
```

6. Open your browser and go to `http://localhost:3000`

---

## 📁 Project Structure
<img width="852" height="339" alt="image" src="https://github.com/user-attachments/assets/f5361ca9-ddee-4879-b97d-c5ea52e9cad4" />




---

## 🔮 Planned Improvements

- [ ] Password hashing with bcrypt
- [ ] User authentication with sessions
- [ ] Search and pagination
- [ ] Deploy to Railway / Render

---

## 👨‍💻 Author

**Vikram Dhatarwal**  
https://github.com/vikramdhatarwal

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).
