# Quick Start Guide

## Initial Setup

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:
```env
PORT=3001
```

Start the server:
```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Testing the Application

1. Open http://localhost:5173
2. Enter card details:
   - Card Number: Any 16-digit number (e.g., 1234 5678 9012 3456)
   - Expiry: MM/YY format (e.g., 12/25)
   - CVV: 3-4 digits (e.g., 123)
   - Cardholder Name: Any name
3. Select a context (Travel, Food, Shopping, or OTT)
4. Click "View Benefits" to see the dashboard

## Notes

- Card data is validated but **never stored**
- All API endpoints are RESTful
- The card input automatically masks numbers for security
