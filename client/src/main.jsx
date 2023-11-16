import React from 'react'
import ReactDOM from 'react-dom/client'
import {BlogProvider} from '../src/contexts/Blog/BlogContext.jsx'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BlogProvider>
    <App />
    </BlogProvider>
)
