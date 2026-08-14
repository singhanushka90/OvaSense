# PCOS Detection - Frontend

A modern React + Vite frontend for the PCOS Detection ML application with JWT authentication and real-time predictions.

## Features

- 🔐 JWT-based authentication with secure token management
- 🎯 AI-powered PCOS prediction form with field validation
- 📊 Prediction history with pagination and deletion
- 👤 User profile management
- 🎨 Modern UI built with Tailwind CSS
- 📱 Responsive mobile-friendly design
- ⚡ Fast development with Vite

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## Prerequisites

- Node.js 16+ and npm
- FastAPI backend running at http://127.0.0.1:8000

## Installation

1. Install dependencies:

```bash
npm install
```

2. Environment configuration:

The `.env.local` file is already set up with:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Modify if your backend runs on a different URL.

## Development

Start the development server:

```bash
npm run dev
```

The app will open at http://localhost:5173

## Project Structure

```
src/
├── api/                    # API integration
│   ├── api.js             # Axios instance with interceptors
│   ├── authApi.js         # Authentication endpoints
│   ├── userApi.js         # User profile endpoints
│   ├── predictionApi.js   # Prediction endpoints
│   └── historyApi.js      # History endpoints
├── components/            # Reusable components
│   ├── Navbar.jsx
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Select.jsx
│   ├── Card.jsx
│   ├── LoadingSpinner.jsx
│   ├── ErrorMessage.jsx
│   ├── PredictionResult.jsx
│   ├── ConfirmDialog.jsx
│   └── ProtectedRoute.jsx
├── pages/                 # Page components
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Prediction.jsx
│   ├── History.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
├── context/              # React context
│   └── AuthContext.jsx
├── App.jsx               # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Pages and Routes

### Public Routes
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/dashboard` - Home dashboard
- `/prediction` - PCOS prediction form
- `/history` - View prediction history
- `/profile` - User profile and settings

## Authentication Flow

1. User registers or logs in
2. JWT token is stored in localStorage
3. Axios interceptor automatically adds token to API requests
4. Protected routes check authentication status
5. Invalid/expired tokens trigger automatic logout and redirect to login

## API Integration

All API calls use centralized Axios client with:
- Base URL configuration via environment variable
- Automatic JWT token injection via interceptor
- Automatic 401 error handling (clears token and redirects to login)

### Authentication API

- `POST /auth/register` - User registration
- `POST /auth/login` - User login (OAuth2PasswordRequestForm)

### User API

- `GET /users/me` - Get current user profile

### Prediction API

- `POST /predict/` - Get PCOS prediction

### History API

- `GET /predictions/?page=1&limit=10` - Get prediction history with pagination
- `DELETE /predictions/{prediction_id}` - Delete a prediction

## Building for Production

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Features in Detail

### Login & Registration
- Email and password validation
- Error message display
- Auto-redirect to dashboard after successful login

### Dashboard
- Personalized welcome message
- Quick access to prediction, history, and profile
- Application overview and features list

### PCOS Prediction
- Comprehensive form with 10 fields
- Field validation with error messages
- Loading state during prediction
- Beautiful result display with medical disclaimer
- Ability to make multiple predictions

### Prediction History
- Paginated list of all predictions
- Date and time display
- Quick delete with confirmation
- Empty state message

### Profile
- User information display
- Account settings section
- Logout functionality
- Privacy notice

## Error Handling

The app handles:
- Network errors
- 401 Unauthorized (automatic logout and redirect)
- 404 Not Found
- 422 Validation errors
- 500 Server errors
- Form validation errors

## Development Tips

1. Use the browser DevTools to inspect API responses
2. Check localStorage for token: `localStorage.getItem('auth_token')`
3. Clear localStorage to test login flow: `localStorage.clear()`
4. Use Tailwind's `@apply` directive for custom component styles

## Troubleshooting

### Backend not responding
- Ensure FastAPI backend is running at http://127.0.0.1:8000
- Check CORS configuration in backend
- Verify network connectivity

### Token issues
- Clear localStorage and login again
- Check if token is expired (request new one)
- Verify token format in API requests

### Styling issues
- Ensure Tailwind CSS is compiled (check `dist/assets`)
- Clear browser cache
- Restart dev server

## License

MIT
