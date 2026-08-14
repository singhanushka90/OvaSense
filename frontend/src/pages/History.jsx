import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ConfirmDialog from '../components/ConfirmDialog'
import { historyApi } from '../api/historyApi'

function History() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    fetchHistory()
  }, [currentPage])

  const fetchHistory = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await historyApi.getHistory(currentPage, pageSize)
      setPredictions(data)
    } catch (err) {
      console.error('Failed to fetch history:', err)
      setError(
        err.response?.data?.detail ||
          'Failed to load prediction history. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (prediction) => {
    setDeleteConfirm(prediction)
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirm) return

    setDeleting(true)

    try {
      await historyApi.deletePrediction(deleteConfirm.id)
      setDeleteConfirm(null)
      // Refresh the list
      await fetchHistory()
    } catch (err) {
      console.error('Failed to delete prediction:', err)
      setError(
        err.response?.data?.detail ||
          'Failed to delete prediction. Please try again.'
      )
      setDeleting(false)
    }
  }

  const handleCancelDelete = () => {
    setDeleteConfirm(null)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Prediction History
          </h1>
          <p className="text-gray-600 mt-2">
            View all your PCOS predictions
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <ErrorMessage
              message={error}
              onClose={() => setError('')}
            />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : predictions.length === 0 ? (
          <Card className="p-8 text-center">
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No predictions yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't made any PCOS predictions yet. Start your first prediction now!
            </p>
            <Button variant="primary" onClick={() => window.location.href = '/prediction'}>
              Make a Prediction
            </Button>
          </Card>
        ) : (
          <>
            <div className="grid gap-4">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`flex-shrink-0 w-3 h-3 rounded-full ${
                            prediction.prediction === 1
                              ? 'bg-red-500'
                              : 'bg-green-500'
                          }`}
                        ></div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {prediction.result}
                        </h3>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h12a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{formatDate(prediction.created_at)}</span>
                        </span>
                        <span className="hidden sm:flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{formatTime(prediction.created_at)}</span>
                        </span>
                      </div>
                      <div className="mt-2 sm:hidden">
                        <span className="text-sm text-gray-600">
                          {formatTime(prediction.created_at)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(prediction)}
                      disabled={deleting}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || loading}
              >
                Previous
              </Button>
              <span className="text-gray-600 font-medium">
                Page {currentPage}
              </span>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={predictions.length < pageSize || loading}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </main>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Prediction"
        message="Are you sure you want to delete this prediction? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText={deleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        isDangerous={true}
      />
    </div>
  )
}

export default History
