# Hono-Vercel Backend

A modern backend API built with Hono.js, Drizzle ORM, and PostgreSQL, deployed on Vercel.

## Features

- 🚀 Built with Hono.js for high performance
- 📦 TypeScript support
- 🗄️ PostgreSQL database with Drizzle ORM
- 🔐 User authentication with bcrypt
- 🎯 Vercel deployment ready

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Bun runtime (recommended) or Node.js

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=your_postgresql_connection_string
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hono-vercel
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up the database:
```bash
# Generate database migrations
npm run db:generate

# Push migrations to database
npm run db:push
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:push` - Push migrations to database
- `npm run db:studio` - Open Drizzle Studio for database management

## Project Structure

```
.
├── api/
│   ├── controllers/    # Business logic
│   ├── db/            # Database schema and configuration
│   ├── routes/        # API routes
│   └── index.ts       # Application entry point
├── public/            # Static files
└── vercel.json        # Vercel configuration
```

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Deployment

This project is configured for deployment on Vercel. Simply push your changes to your repository and Vercel will automatically deploy your application.

## License

ISC
