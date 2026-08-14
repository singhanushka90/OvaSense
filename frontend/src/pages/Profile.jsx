import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useAuth } from '../context/AuthContext'
import { userApi } from '../api/userApi'

function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await userApi.getProfile()
        // User data is set in the context
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch profile:', err)
        setError(
          err.response?.data?.detail ||
            'Failed to load profile. Please try again.'
        )
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onClose={() => setError('')} />
          </div>
        )}

        <Card className="p-8">
          <div className="mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.username || 'User'}
                </h2>
                <p className="text-gray-600">{user?.email || 'Email'}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Account Information
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Username</p>
                  <p className="text-lg text-gray-900 font-semibold">
                    {user?.username}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-lg text-gray-900 font-semibold">
                    {user?.email}
                  </p>
                </div>
              </div>

              {user?.id && (
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-600">User ID</p>
                    <p className="text-sm text-gray-900 font-mono break-all">
                      {user.id}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Settings
            </h3>
            <p className="text-gray-600 mb-6 text-sm">
              Additional account settings and features coming soon.
            </p>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">
              Danger Zone
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Once you logout, you will need to sign in again to access your account.
            </p>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </Card>

        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Privacy Notice:</strong> Your personal information and prediction history are securely stored 
            and encrypted. We never share your data with third parties.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Profile
