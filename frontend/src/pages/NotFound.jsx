import { Link } from 'react-router-dom'
import Button from '../components/Button'

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <Link to="/dashboard">
          <Button variant="primary" size="lg">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
