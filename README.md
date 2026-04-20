# StockSnap Full Stack Project

StockSnap is an offline product finder platform built with **React** for the frontend and **Spring Boot** for the backend.

## Stack
- Frontend: React + Vite + React Router + Axios
- Backend: Spring Boot 3 + Spring Security + JWT + Spring Data JPA
- Database: H2 (file-based for easy local setup)

## Features
- Register and login for Customer / Store Owner
- JWT-based authentication
- Public product search and filters
- Store owner can create a store and manage products
- Customer can save favorite products
- Admin can verify stores and manage users/products
- Seeded sample products, stores, and admin account

## Demo Credentials
- Admin: `admin@stocksnap.com` / `Admin@123`
- Store Owner: `owner@stocksnap.com` / `Owner@123`
- Customer: `customer@stocksnap.com` / `Customer@123`

## Run Backend
1. Install Java 17+ and Maven.
2. Open `backend/`
3. Run:
   ```bash
   mvn spring-boot:run
   ```
4. Backend runs on `http://localhost:8080`
5. H2 console: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:file:./data/stocksnapdb`
   - user: `sa`
   - password: `password`

## Run Frontend
1. Open `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Vite dev server:
   ```bash
   npm run dev
   ```
4. Frontend runs on `http://localhost:5173`

## API Summary
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/products`
- `GET /api/products/search?q=milk&category=Groceries&brand=Amul&inStock=true&city=Pune`
- `POST /api/stores`
- `POST /api/products`
- `POST /api/favorites/{productId}`
- `PUT /api/admin/stores/{id}/verify`

## Notes
- This project is intentionally made as a clean starter that is easy to understand and extend.
- Product purchase is not implemented because StockSnap focuses on offline product discovery.
