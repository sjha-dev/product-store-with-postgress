# Product Store — PERN Stack

A full-stack mini product store application built using the **PERN stack (PostgreSQL, Express.js, React.js, and Node.js)**. The project follows a modular architecture with dedicated frontend pages, backend controllers and routes, PostgreSQL database integration, request security, and persistent theme selection.

## Overview

Product Store is designed to provide a structured foundation for a modern product browsing application. The frontend uses React for rendering pages and managing navigation, while the backend exposes APIs for handling product-related requests. PostgreSQL serves as the database, and Arcjet adds a security layer for incoming requests.

The application also includes a theme selection system that allows users to customize the storefront appearance and retain their preference through browser storage.

## Tech Stack

- **Frontend:** React.js, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Database Hosting:** Neon
- **Request Security:** Arcjet
- **Routing:** React Router
- **Theme Persistence:** Browser Local Storage

## Key Features

- **Product API:** Backend API structure for handling product-related operations.
- **Modular Backend:** Separate API server, product routes, product controller, and database client.
- **PostgreSQL Integration:** Database connectivity using Neon PostgreSQL.
- **React-Based Storefront:** Component-based frontend architecture.
- **Client-Side Routing:** Separate home and product pages using React Router.
- **Theme Selection:** Dedicated theme selector with configurable theme options.
- **Persistent Theme Preferences:** Stores the selected theme in browser storage.
- **Request Security:** Arcjet integration for applying security rules to incoming API requests.

## Architecture

The application is organized into independent modules for the storefront, product API, request security, and theme management.



## How It Works

1. The shopper accesses the application through a browser.
2. The React entry point loads the application and initializes client-side routing.
3. React Router directs users to the appropriate storefront page.
4. Product-related requests are sent to the backend API.
5. Express routes dispatch requests to the product controller.
6. The database client communicates with Neon PostgreSQL to execute database operations.
7. Arcjet security rules are applied to incoming requests.
8. The theme selector updates the selected theme, while the theme store synchronizes the preference with browser storage.

## Project Structure

```text
project-root/
├── frontend/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── HomePage.jsx
│       ├── Navbar.jsx
│       ├── ProductPage.jsx
│       └── ThemeSelector.jsx
│
├── backend/
│   ├── server.js
│   ├── productRoutes.js
│   ├── ProductController.js
│   ├── db.js
│   └── arcjet.js
│
├── package.json
└── README.md
```

*Note: Update the directory names and file paths above if your actual repository structure differs.*

## Getting Started

### Prerequisites

- Node.js and npm
- A Neon PostgreSQL database or another PostgreSQL instance
- Required API credentials and environment variables

### 1. Clone the Repository

```bash
git clone https://github.com/sjha-dev/product-store-with-postgres.git
cd product-store-with-postgres
```

### 2. Install Dependencies

Install the frontend and backend dependencies according to your repository structure.

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create the required `.env` files for your backend and frontend configuration.

Example backend environment variables:

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
ARCJET_KEY=your_arcjet_key
```

Add any frontend API URL or other environment variables required by your implementation.

**Important:** Never commit real database credentials, API keys, or other secrets to GitHub. Add `.env` files to `.gitignore`.

### 4. Run the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

The exact commands may vary depending on the scripts defined in your `package.json` files.

## Database

The application uses PostgreSQL for structured data storage, with Neon providing the hosted database infrastructure.

The database client is maintained separately from the product routes and controllers, helping keep database access modular and easier to maintain.

## Security

Arcjet is integrated as a dedicated request-security module. Its configured rules can help protect the API against unwanted or abusive requests.

The actual protections depend on the Arcjet rules enabled in the application.

## Future Improvements


- Implement user authentication and authorization.
- Add product search, filtering, and sorting.
- Introduce pagination for product listings.
- Add automated backend and frontend tests.
- Improve API error handling and input validation.
- Add a shopping cart and checkout workflow.

## Author

**Sudhanshu Shekhar Jha**

- GitHub: [@sjha-dev](https://github.com/sjha-dev)
- LinkedIn: [sjha-dev](https://www.linkedin.com/in/sjha-dev/)

---

