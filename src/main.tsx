'use strict';

/**
 * @file Точка входа React-приложения
 * @description Приложение с маршрутизацией (главная страница и каталог)
 * @version 1.0.0
 */

// ===================== ИМПОРТЫ (подключение модулей) =====================

/**
 * Импорт StrictMode из библиотеки React
 * @description Строгий режим для обнаружения потенциальных проблем в приложении
 */
import { StrictMode } from 'react'

/**
 * Импорт createRoot из React DOM
 * @description Современный метод рендеринга React-компонентов в DOM-дерево
 */
import { createRoot } from 'react-dom/client'

/**
 * Импорт компонентов маршрутизации из React Router
 * @description BrowserRouter - обёртка для маршрутизации
 * @description Routes - контейнер для списка маршрутов
 * @description Route - отдельный маршрут (страница)
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/**
 * Импорт пользовательских компонентов
 * @description Компоненты, созданные разработчиком
 */
import Header from './app/Header/Header'           // Шапка сайта
import BrandWrap from './app/brandWrap/brandWrap' // Блок с брендами
import Offers from './app/offers/offers'          // Блок с предложениями
import Featured from './app/Featured/Featured'    // Блок с избранным
import Catalog from './app/Catalog/Catalog'       // Страница каталога
import Basket from './app/Context/BasketProvider' // Страницы Корзины
/**
 * Импорт глобальных стилей
 * @description CSS-файл, применяемый ко всему приложению
 */
import './index.css'

// ===================== КОМПОНЕНТ ГЛАВНОЙ СТРАНИЦЫ =====================

/**
 * Компонент главной страницы
 * @description Объединяет три основных секции: бренды, предложения и избранное
 * @returns {JSX.Element} JSX-разметка с тремя компонентами
 * 
 * @example
 * // Использование компонента
 * <HomePage />
 * 
 * // Результат: отображает BrandWrap, Offers и Featured
 */
const HomePage = () => {
  return (
    <>
      <BrandWrap />  {/* Блок с логотипами брендов */}
      <Offers />     {/* Блок с акционными предложениями */}
      <Featured />   {/* Блок с рекомендуемыми товарами */}
    </>
  )
}

// ===================== ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ =====================

/**
 * Главный компонент приложения
 * @description Управляет маршрутизацией и отображением шапки на всех страницах
 * @returns {JSX.Element} JSX-разметка с маршрутизацией
 * 
 * @example
 * // Использование компонента
 * <App />
 * 
 * // Результат: приложение с шапкой и двумя страницами
 */
const App = () => {
  return (
    // Оборачивает приложение для поддержки маршрутизации
    <BrowserRouter>
      {/* Основной контейнер для стилизации */}
      <div className="app-wrapper">
        
        {/* Шапка — отображается на ВСЕХ страницах */}
        <Header />
        
        {/* Контейнер для объявления маршрутов */}
        <Routes>

          {/* Маршрут главной страницы (путь: /) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Маршрут страницы каталога (путь: /catalog) */}
          <Route path="/catalog" element={<Catalog />} />

          {/* Маршрут страницы каталога (путь: /basket) */}
          <Route path="/basket" element={<Basket />} />
          
          {/* 🔴 ДОБАВЛЕНО: Обработчик 404  */}
          <Route path="*" element={<div style={{textAlign: 'center', padding: '50px'}}>
            <h1>404 - Страница не найдена</h1>
            <a href="/">Вернуться на главную</a>
          </div>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

// ===================== ЗАПУСК (РЕНДЕРИНГ) ПРИЛОЖЕНИЯ =====================

/**
 * Рендеринг React-приложения в DOM
 * @description Находит элемент #root в HTML и вставляет туда приложение
 * 
 * @example
 * // HTML должен содержать:
 * // <div id="root"></div>
 * 
 * // Результат: приложение отображается на странице
 */

// 🔴 ИСПРАВЛЕНО: Добавил проверку существования элемента
const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    // Строгий режим — помогает находить ошибки в коде
    <StrictMode>
      <App />  {/* Запуск главного компонента */}
    </StrictMode>
  )
} else {
  console.error('Критическая ошибка: элемент #root не найден в HTML')
  document.body.innerHTML = '<div style="text-align:center;margin-top:50px"><h1>Ошибка загрузки приложения</h1><p>Не найден корневой элемент</p></div>'
}