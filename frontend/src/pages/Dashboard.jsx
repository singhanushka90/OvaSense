import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { userApi } from '../api/userApi'

function Dashboard() {
  const { user, setUserData } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await userApi.getProfile()
        setUserData(profileData)
      } catch (err) {
        console.error('Failed to fetch user profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [setUserData])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Welcome Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome, {user?.username}! 👋
              </h1>
              <p className="text-lg text-gray-600">
                AI-Powered PCOS Detection and Health Analytics Platform
              </p>
            </div>

            {/* About Section */}
            <Card className="mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About PCOS Detection
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Polycystic Ovary Syndrome (PCOS) is a common endocrine disorder affecting reproductive-age women. 
                Our machine learning model provides predictions based on clinical features including hormonal and imaging data.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Disclaimer:</strong> This tool is for educational and informational purposes only. 
                It is not a substitute for professional medical advice, diagnosis, or treatment. 
                Always consult with a qualified healthcare professional.
              </p>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/prediction">
                <Card className="p-8 hover:shadow-lg cursor-pointer h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v2h8v-2zM2 8a2 2 0 11-4 0 2 2 0 014 0zM8 15a4 4 0 00-8 0v2h8v-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    New Prediction
                  </h3>
                  <p className="text-gray-600">
                    Start a new PCOS prediction by entering your clinical data
                  </p>
                </Card>
              </Link>

              <Link to="/history">
                <Card className="p-8 hover:shadow-lg cursor-pointer h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H6a6 6 0 016 6v3.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L10 9.586V8a4 4 0 00-4-4H4a1 1 0 000 2H4a2 2 0 00-2 2v3a1 1 0 100 2 1 1 0 100 2H4a2 2 0 002 2h3a1 1 0 100-2H6a2 2 0 01-2-2v-3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    View History
                  </h3>
                  <p className="text-gray-600">
                    Check all your previous predictions and results
                  </p>
                </Card>
              </Link>

              <Link to="/profile">
                <Card className="p-8 hover:shadow-lg cursor-pointer h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Your Profile
                  </h3>
                  <p className="text-gray-600">
                    View and manage your account information
                  </p>
                </Card>
              </Link>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">AI-Powered Predictions</p>
                    <p className="text-sm text-gray-600">ML model trained on clinical data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Secure Authentication</p>
                    <p className="text-sm text-gray-600">JWT-based security with password hashing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Prediction History</p>
                    <p className="text-sm text-gray-600">Track all your predictions over time</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Data Privacy</p>
                    <p className="text-sm text-gray-600">Your data is encrypted and protected</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard
