import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './TestApp.jsx'  // Using TestApp temporarily
import ErrorBoundary from './ErrorBoundary.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)