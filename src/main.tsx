import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './config/index.css'
import BlockChainContext from './context/BlockChainContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BlockChainContext>
      <App />
    </BlockChainContext>
  </React.StrictMode>,
)
