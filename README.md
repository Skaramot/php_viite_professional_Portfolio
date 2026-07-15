# Professional Portfolio & Blog Platform

Welcome to the professional portfolio and blog of **Karabo Motlaleselelo**. This project is a modern, full-stack web application built to showcase professional experience, projects, skills, and publications, while also serving as an interactive blog and analytics engine.

## 🚀 Built With
- **Backend:** [Laravel 11](https://laravel.com/) (PHP)
- **Frontend:** [React.js](https://reactjs.org/) with [Inertia.js](https://inertiajs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** SQLite
- **Charting:** [Recharts](https://recharts.org/) (for Admin Analytics)

## ✨ Features

### Public Portfolio
- **Home & Profile:** Clean, responsive overview of professional attributes and focus areas.
- **Experience & Education:** Chronological display of career history and academic achievements.
- **Projects & Skills:** Live integration with GitHub to display repositories, top languages, and technical traits.
- **Interactive Blog:** A social-media-style blog where visitors can read posts, leave comments, and react (👍, ❤️, 🔥, 👏, 🤔).
- **Theming:** Full Light and Dark mode support with a professional, sleek design system.

### Admin Panel & Analytics
- **Secure Access:** Protected dashboard for site administrators.
- **Traffic Analytics:** Tracks page views, unique visitors, referral sources, device types (Mobile/Desktop/Tablet), and browsers.
- **Interactive Dashboards:** Visualizes traffic data over the last 30 days, hourly breakdowns, and real-time visitor counts.
- **Blog Management:** Full CRUD (Create, Read, Update, Delete) interface to publish and manage blog posts with image uploads.

---

## 🛠️ How to Run Locally

### Prerequisites
Make sure you have the following installed on your local machine:
- PHP >= 8.2
- Composer
- Node.js & npm (or yarn)
- Git

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Skaramot/php_viite_professional_Portfolio.git
   cd php_viite_professional_Portfolio
   ```

2. **Install PHP dependencies:**
   ```bash
   composer install
   ```

3. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

4. **Environment Configuration:**
   Copy the example environment file and generate your application key:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   Ensure your `.env` file is set to use SQLite:
   ```env
   DB_CONNECTION=sqlite
   ```

5. **Setup the Database:**
   Create the SQLite database file and run the migrations:
   ```bash
   touch database/database.sqlite
   php artisan migrate
   ```

6. **Link Storage (for Blog Images):**
   ```bash
   php artisan storage:link
   ```

7. **Run the Application:**
   You will need two terminal windows running simultaneously.
   
   Terminal 1 (Vite Dev Server):
   ```bash
   npm run dev
   ```
   
   Terminal 2 (Laravel Artisan Server):
   ```bash
   php artisan serve
   ```
   The application will now be available at `http://127.0.0.1:8000`.

---

## 🔐 Admin Access

To access the admin dashboard and post to the blog, you must create a user account. You can do this quickly via Laravel Tinker:

```bash
php artisan tinker
```
Inside the Tinker shell, run:
```php
User::create([
    'name' => 'Admin User',
    'email' => 'admin@skaramot.com',
    'password' => bcrypt('password'),
]);
```

After creating the user, visit `http://127.0.0.1:8000/login`, enter your credentials, and you will be redirected to the **Admin Dashboard**.

---

## 📄 License
This project is open-sourced software.
