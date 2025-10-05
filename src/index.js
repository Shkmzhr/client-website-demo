import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import the global styles
import App from './App';

// Find the root element in index.html
const container = document.getElementById('root');

// Create a React root
if (container) {
    const root = createRoot(container);

    // Initial render of the App component
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Failed to find the root element with id 'root'. Check public/index.html.");
}
