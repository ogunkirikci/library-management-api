import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Management API',
      version: '1.0.0',
      description: 'A simple library management API',
      contact: {
        name: 'Developer',
        email: 'ognkrkci@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' }
          }
        },
        Book: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            averageRating: { type: 'number' }
          }
        },
        Loan: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            userId: { type: 'integer' },
            bookId: { type: 'integer' },
            borrowDate: { type: 'string', format: 'date-time' },
            returnDate: { type: 'string', format: 'date-time' },
            rating: { type: 'integer', minimum: 1, maximum: 10 }
          }
        }
      }
    },
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Books',
        description: 'Book management endpoints'
      },
      {
        name: 'Loans',
        description: 'Loan management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.ts']
};

export const specs = swaggerJsdoc(options); 