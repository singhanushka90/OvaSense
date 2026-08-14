function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
