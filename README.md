# Lonca Mobile App

A React Native mobile app for browsing Lonca products. This project includes both the mobile app and the backend server.

## Features

- Product listing page displaying products with image, brand, name, and price
- Product detail page showing all product information
- Responsive design for mobile devices

## Technologies Used

- React Native
- TypeScript
- NativeWind (TailwindCSS for React Native)
- Node.js with Express
- React Navigation

## Project Structure

```
lonca-app/
├── app/                    # App screens
├── components/             # Reusable components
├── services/               # API services
├── types/                  # TypeScript types
├── server/                 # Backend server
└── parent_products.json    # Product data
```

## Setup and Installation

### Mobile App

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npx expo start
   ```

### Backend Server

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product by ID 