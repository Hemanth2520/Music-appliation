import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MusicStreamingApp from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import React from 'react';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <MusicStreamingApp />
  // </StrictMode>,
  <React.StrictMode>
    <BrowserRouter>
<MusicStreamingApp />
    </BrowserRouter>
  </React.StrictMode>
)
