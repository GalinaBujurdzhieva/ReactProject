import React from 'react'
import ReactDOM from 'react-dom/client'
import {BlogProvider} from '../src/contexts/Blog/BlogProvider.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BlogProvider>
    <App />
    </BlogProvider>
)
