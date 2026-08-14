function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-4 border-transparent border-t-blue-600 rounded-full animate-spin absolute top-0 left-0`}></div>
      </div>
      {text && <p className="mt-4 text-gray-600 text-sm font-medium">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
