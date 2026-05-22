import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './app/Header/Header'
import BrandWrap from './app/brandWrap/brandWrap'
import Offers from './app/offers/offers'
import Featured from './app/Featured/Featured'
import Catalog from './app/Catalog/Catalog'
import './index.css'

// Компонент главной страницы (объединяет все секции)
const HomePage = () => {
  return (
    <>
      <BrandWrap />
      <Offers />
      <Featured />
    </>
  )
}

// Главный компонент приложения с маршрутизацией
const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)