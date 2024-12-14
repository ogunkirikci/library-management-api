# Library Management API

A RESTful API for managing a library system built with Node.js, Express, TypeScript, and PostgreSQL using Sequelize ORM.

## Features

- User management
- Book management
- Loan tracking
- Book rating system
- Borrowing history

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ogunkirikci/library-management-api
   cd library-management-api
2. **Install dependencies**
    ```bash
    npm install
3. **Create a `.env` file in the root directory with the following variables: .env**
    #### Linux/MacOS:
        cp .env.example .env
    #### Windows (PowerShell):
        Copy-Item .env.example .env
    #### Windows (Command Prompt - CMD):
        copy .env.example .env
    ### Also you can provide them with the following command
        npm run env:init
4. **Create and initailez the database**
    ```bash
    npm run db:create
## Database Schema

### Users Table
| Column    | Type      | Constraints                  |
|-----------|-----------|------------------------------|
| id        | SERIAL    | PRIMARY KEY                  |
| name      | VARCHAR   | NOT NULL                     |
| createdAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP    |
| updatedAt | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP    |

### Books Table
| Column        | Type      | Constraints                  |
|---------------|-----------|------------------------------|
| id            | SERIAL    | PRIMARY KEY                  |
| name          | VARCHAR   | NOT NULL                     |
| averageRating | DECIMAL   | DEFAULT 0                    |
| createdAt     | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP    |
| updatedAt     | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP    |

### Loans Table
| Column     | Type      | Constraints                  |
|------------|-----------|------------------------------|
| id         | SERIAL    | PRIMARY KEY                  |
| userId     | INTEGER   | FOREIGN KEY REFERENCES Users |
| bookId     | INTEGER   | FOREIGN KEY REFERENCES Books |
| borrowDate | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP    |
| returnDate | TIMESTAMP | NULL                         |
| rating     | INTEGER   | CHECK (rating >= 1 AND <= 10)|
| createdAt  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP    |
| updatedAt  | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP    |

## API Endpoints
### Users
* GET /users - Get all users
* GET /users/:id - Get user by ID
* POST /users - Create new user
### Books
* GET /books - Get all books
* GET /books/:id - Get book by ID
* POST /books - Create new book
### Loans
* POST /borrow - Borrow a book
* POST /return - Return a book with rating

## Running the Application
- Development mode:
    ```bash
    npm run dev
- Production mode:
    ```bash
    npm run build
    npm run start
## Project Structure
    src/
        ├── config/       # Configuration files
        │   ├── database.ts   # Database connection setup
        │   └── database.sql  # SQL schema definitions
        │
        ├── controllers/  # Request handlers
        │   ├── userController.ts  # User-related operations
        │   ├── bookController.ts  # Book-related operations
        │   └── loanController.ts  # Loan-related operations
        │
        ├── models/       # Database models
        │   ├── User.ts        # User model definition
        │   ├── Book.ts        # Book model definition
        │   └── Loan.ts        # Loan model definition
        │
        ├── routes/       # API routes
        │   ├── userRoutes.ts  # User endpoints
        │   ├── bookRoutes.ts  # Book endpoints
        │   └── loanRoutes.ts  # Loan endpoints
        │
        ├── services/     # Business logic layer
        │   ├── userService.ts # User business logic
        │   ├── bookService.ts # Book business logic
        │   └── loanService.ts # Loan business logic
        │
        └── app.ts        # Application entry point

## Error Handling
The API includes a global error handling middleware that catches and processes all errors, returning appropriate HTTP status codes and error messages.

## Data Validation
* Book ratings must be between 1 and 10.
* Users cannot borrow already borrowed books.
* Users must return books before borrowing new ones.

### Contact to developer
- E-mail: ognkrkci@gmail.com
- GitHub: ogunkirikci