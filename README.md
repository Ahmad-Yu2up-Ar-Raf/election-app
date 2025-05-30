# 🗳️ Election App - Modern Student Council Voting System

A modern, secure, and user-friendly web application built with Laravel and React (Inertia.js) specifically designed for student council elections. This system streamlines the entire election process, from candidate registration to real-time vote counting, making student council elections more efficient, transparent, and engaging.

![Laravel](https://img.shields.io/badge/Laravel-10.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🔐 Secure Authentication System
- 👥 Candidate Management
- 🎯 Real-time Vote Tracking
- 📱 Responsive Design
- 🌓 Dark/Light Mode
- 📊 Vote Analytics
- 🛡️ Data Validation & Security
- 🎨 Modern UI/UX with Tailwind CSS
- 🚀 Fast and Efficient Performance

## 🚀 Getting Started

### Prerequisites

- PHP 8.1 or higher
- Node.js 16.x or higher
- Composer
- npm or yarn
- SQLite (default database)

### Installation

1. **Clone the repository**
   ```powershell
   git clone https://github.com/yourusername/election-app.git
   cd election-app
   ```

2. **Install PHP dependencies**
   ```powershell
   composer install
   ```

3. **Install Node.js dependencies**
   ```powershell
   npm install
   ```

4. **Environment Setup**
   ```powershell
   cp .env.example .env
   php artisan key:generate
   ```

5. **Create storage symlink**
   ```powershell
   php artisan storage:link
   ```

6. **Run database migrations**
   ```powershell
   php artisan migrate
   ```

7. **Start the development server**
   ```powershell
   # Terminal 1: Start Laravel server
   php artisan serve

   # Terminal 2: Start Vite development server
   npm run dev
   ```

8. **Visit [http://localhost:8000](http://localhost:8000) in your browser** 🎉

## 🏗️ Project Structure

```
├── app/               # Laravel application core
├── resources/
│   ├── js/           # React/TypeScript components
│   └── css/          # Tailwind CSS styles
├── database/
│   └── migrations/   # Database structure
└── routes/           # Application routes
```

## 💡 Key Features Explained

### Candidate Management
- Easy registration of student council candidates
- Profile picture upload with drag-and-drop support (max 2MB)
- Comprehensive candidate profiles with vision (visi) and mission (misi) statements
- Advanced status tracking (active, inactive, pending, qualified, etc.)
- Gender classification support
- Class/Grade level management

### Voting System
- One-student-one-vote secure system
- Real-time vote counting and result display
- Anti-fraud measures with student verification
- Vote status tracking and verification
- Anonymous voting capability
- Detailed voting analytics and reports

### User Interface
- Clean and intuitive design
- Mobile-responsive layout
- Accessible components
- Smooth transitions and animations

## 🛡️ Security Features

- CSRF protection
- SQL injection prevention
- Form validation
- Secure session management
- Rate limiting
- XSS protection

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Laravel, React, and Inertia.js
- UI components powered by Tailwind CSS
- Form handling with React Hook Form
- Type safety with TypeScript

---

Made with ❤️ for better digital voting experiences
