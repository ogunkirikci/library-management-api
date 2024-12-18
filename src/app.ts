import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import loanRoutes from './routes/loanRoutes';
import { errorHandler } from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/loans', loanRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

// Database connection
sequelize.sync({ force: true })
  .then(() => {
    console.log('Database connected successfully');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));

export default app;