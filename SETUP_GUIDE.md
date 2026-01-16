# E-Commerce Website - Complete Setup Guide

## Overview
This e-commerce website includes:
- Frontend (HTML, CSS, JavaScript)
- Node.js Backend (Express + MongoDB)
- Spring Boot Backend (Java + MySQL)
- Shopkeeper authentication and bank account management
- Payment system with 15% commission
- Product management with camera upload

## Frontend Setup

1. Open `index.html` in your browser - it works standalone with localStorage
2. To use backend APIs, update `config.js`:
   - Set `useBackend = true` in `script.js`
   - Update `BASE_URL` in `config.js` to match your backend

## Node.js Backend Setup

### Prerequisites
- Node.js 16+ installed
- MongoDB installed and running

### Steps

1. Navigate to backend directory:
```bash
cd backend-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `env.example`):
```bash
PORT=3000
JWT_SECRET=your-secret-key-change-this-in-production
MONGODB_URI=mongodb://localhost:27017/ecommerce
COMMISSION_RATE=0.15
```

4. Start MongoDB:
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

5. Start the server:
```bash
npm start
# or for development
npm run dev
```

Server will run on `http://localhost:3000`

## Spring Boot Backend Setup

### Prerequisites
- Java 17+ installed
- Maven 3.6+ installed
- MySQL 8.0+ installed and running

### Steps

1. Create MySQL database:
```sql
CREATE DATABASE ecommerce;
```

2. Navigate to backend directory:
```bash
cd backend-springboot
```

3. Update `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

4. Build the project:
```bash
mvn clean install
```

5. Run the application:
```bash
mvn spring-boot:run
```

Server will run on `http://localhost:8080`

## Features

### Customer Features
- User registration and login
- Browse products
- Add to cart
- Checkout
- Order history
- Profile management
- Address management

### Shopkeeper Features
- Shopkeeper registration and login
- Add/Edit/Delete products
- Camera upload for product images
- Bank account management
- Sales reports
- Earnings tracking (with 15% commission)
- Payment history

### Payment System
- When a product is purchased:
  - 15% commission is deducted
  - Remaining 85% goes to shopkeeper's pending balance
  - Shopkeeper can view earnings in their panel
  - Bank account details required for payments

## API Endpoints

### Authentication
- `POST /api/auth/register` - Customer registration
- `POST /api/auth/login` - Customer login
- `POST /api/auth/shopkeeper/register` - Shopkeeper registration
- `POST /api/auth/shopkeeper/login` - Shopkeeper login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (shopkeeper only)
- `PUT /api/products/:id` - Update product (shopkeeper only)
- `DELETE /api/products/:id` - Delete product (shopkeeper only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user` - Get user orders
- `GET /api/orders/shopkeeper` - Get shopkeeper orders

### Shopkeeper
- `GET /api/shopkeeper/profile` - Get shopkeeper profile
- `PUT /api/shopkeeper/bank-account` - Update bank account
- `GET /api/shopkeeper/products` - Get shopkeeper products
- `GET /api/shopkeeper/earnings` - Get earnings

## Switching Between Backends

### To use Node.js backend:
1. Update `config.js`: `BASE_URL: 'http://localhost:3000/api'`
2. Set `useBackend = true` in `script.js`
3. Make sure Node.js backend is running

### To use Spring Boot backend:
1. Update `config.js`: `BASE_URL: 'http://localhost:8080/api'`
2. Set `useBackend = true` in `script.js`
3. Make sure Spring Boot backend is running

### To use localStorage only (no backend):
1. Set `useBackend = false` in `script.js`
2. All data will be stored in browser localStorage

## Troubleshooting

### CORS Errors
- Make sure backend CORS is configured to allow your frontend origin
- Check that backend is running on the correct port

### Database Connection Issues
- **MongoDB**: Ensure MongoDB is running and accessible
- **MySQL**: Check database credentials in `application.properties`

### Authentication Issues
- Clear browser localStorage if tokens are corrupted
- Check JWT_SECRET matches between frontend and backend

## Production Deployment

1. Change JWT_SECRET to a strong random string
2. Use environment variables for sensitive data
3. Enable HTTPS
4. Configure proper CORS origins
5. Set up database backups
6. Use a production database (not localhost)

## Support

For issues or questions, check:
- Backend README files in respective directories
- Browser console for frontend errors
- Backend logs for API errors
