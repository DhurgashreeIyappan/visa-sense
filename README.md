# VISA-SENSE

A full-stack application for exploring personalized Visa card benefits based on different contexts (Travel, Food, Shopping, OTT).

## Features

- **Frontend**: React with Vite, Tailwind CSS
- **Backend**: Node.js + Express REST APIs
- **Masked Card Input**: Secure card number input with masking
- **Context Selection**: Choose from Travel, Food, Shopping, or OTT & Entertainment
- **Benefits Dashboard**: View personalized benefits based on selected context
- **No Card Data Storage**: Card validation without storing sensitive data

## Project Structure

```
visa-sense/
├── client/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── package.json
├── server/          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Environment Variables

### Server (.env)

```env
PORT=3001
# CORS_ORIGIN=http://localhost:5173 (optional)
```

## API Endpoints

### Card Validation
- **POST** `/api/card/validate`
  - Validates card details (does not store any data)
  - Body: `{ cardNumber, expiryDate, cvv, cardholderName }`

### Benefits
- **GET** `/api/benefits`
  - Returns all benefits for all contexts
- **GET** `/api/benefits/:context`
  - Returns benefits for a specific context (travel, food, shopping, ott)

### Health Check
- **GET** `/api/health`
  - Returns server health status

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Enter card details (card number is masked for security)
4. Select a context (Travel, Food, Shopping, or OTT)
5. Click "View Benefits" to see personalized benefits dashboard

## Security Notes

- Card data is validated but **never stored**
- All API requests are validated server-side
- Card numbers are masked in the UI
- Environment variables are used for configuration

## Production Build

### Frontend
```bash
cd client
npm run build
```

The build output will be in the `client/dist` directory.

### Backend
```bash
cd server
npm start
```

## License

ISC