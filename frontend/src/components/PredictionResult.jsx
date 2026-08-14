function PredictionResult({ prediction, result, isLoading }) {
  if (isLoading) {
    return null
  }

  const isPCOSDetected = prediction === 1

  return (
    <div
      className={`p-6 rounded-lg border-2 ${
        isPCOSDetected
          ? 'bg-red-50 border-red-200'
          : 'bg-green-50 border-green-200'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
          isPCOSDetected ? 'bg-red-200' : 'bg-green-200'
        }`}>
          {isPCOSDetected ? (
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div>
          <p className={`text-sm font-medium ${
            isPCOSDetected ? 'text-red-800' : 'text-green-800'
          }`}>
            Prediction Result
          </p>
          <p className={`text-2xl font-bold ${
            isPCOSDetected ? 'text-red-900' : 'text-green-900'
          }`}>
            {result}
          </p>
        </div>
      </div>
      <p className={`mt-3 text-sm ${
        isPCOSDetected ? 'text-red-700' : 'text-green-700'
      }`}>
        {isPCOSDetected
          ? 'The model suggests PCOS might be present. Please consult with a healthcare professional for confirmation.'
          : 'The model does not indicate PCOS. However, consult a healthcare professional for a complete diagnosis.'}
      </p>
    </div>
  )
}

export default PredictionResult
