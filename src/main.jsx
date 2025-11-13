import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import Map from './pages/Map.jsx'
import Species from './pages/Species.jsx'
import PermitsWeather from './pages/PermitsWeather.jsx'
import Favorites from './pages/Favorites.jsx'
import 'leaflet/dist/leaflet.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Map /> },
    { path: 'species/:areaId', element: <Species /> },
    { path: 'permits/:areaId', element: <PermitsWeather /> },
    { path: 'favorites', element: <Favorites /> },
  ]}
])

const qc = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
