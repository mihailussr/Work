// BasketContext.jsx

'use strict';

/**
 * @file Компонент страницы корзины
 * @description Отвечает за отображение корзины товаров, управление количеством, удаление товаров и подсчёт итоговой суммы
 * @version 1.0.0
 */

// ===================== ИМПОРТЫ (подключение модулей) =====================

/**
 * Импорт хуков useState и useEffect из React
 * @description useState - для управления состоянием корзины
 * @description useEffect - для загрузки данных из localStorage при монтировании компонента
 */
import { useState, useEffect } from 'react'

/**
 * Импорт навигационных хуков и компонентов из React Router
 * @description useNavigate - для программной навигации между страницами
 * @description Link - для создания ссылок без перезагрузки страницы
 */
import { useNavigate, Link } from 'react-router-dom'

/**
 * Импорт стилей компонента корзины
 * @description CSS-модуль с классами для стилизации страницы корзины
 */
import s from './BasketContext.module.css'


// ===================== КОМПОНЕНТ СТРАНИЦЫ КОРЗИНЫ =====================

/**
 * Компонент Basket (страница корзины)
 * @description Отображает список добавленных товаров, позволяет управлять количеством,
 * удалять товары, очищать корзину и просматривать итоговую сумму.
 * Данные хранятся в localStorage и синхронизируются между вкладками.
 * 
 * @returns {JSX.Element} JSX-разметка страницы корзины
 * 
 * @example
 * // Использование компонента
 * <Basket />
 * 
 * @example
 * // Размещение в маршрутизации
 * <Route path="/basket" element={<Basket />} />
 * 
 * @example
 * // Переход на страницу корзины
 * <Link to="/basket">Корзина</Link>
 * navigate('/basket')
 */
const Basket = () => {
  // ===================== ХУКИ И СОСТОЯНИЯ =====================

  /**
   * Хук для программной навигации
   * @description Позволяет перенаправлять пользователя на другие страницы
   */
  const navigate = useNavigate()

  /**
   * Состояние корзины
   * @description Массив товаров, добавленных в корзину
   * @type {Array} cartItems - список товаров в корзине
   * @property {number} id - уникальный идентификатор товара
   * @property {string} name - название товара
   * @property {string} price - цена товара (формат: $52.00)
   * @property {number} quantity - количество товара
   * @property {string} img - путь к изображению
   * @property {string} text - описание товара
   */
  const [cartItems, setCartItems] = useState([])


  // ===================== ЭФФЕКТЫ (SIDE EFFECTS) =====================

  /**
   * Эффект загрузки корзины
   * @description При монтировании компонента загружает сохранённые товары из localStorage
   * @listens mount - выполнятся один раз при создании компонента
   */
  useEffect(() => {
    /**
     * Получение сохранённой корзины из localStorage
     * @type {string|null} savedCart - JSON-строка с данными корзины
     */
    const savedCart = localStorage.getItem('cart')
    
    // Если данные есть — парсим и сохраняем в состояние
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, []) // Пустой массив зависимостей — эффект выполняется только при монтировании


  // ===================== ФУНКЦИИ УПРАВЛЕНИЯ КОРЗИНОЙ =====================

  /**
   * Обновление количества товара
   * @description Увеличивает или уменьшает количество выбранного товара на 1
   * @param {number} id - идентификатор товара
   * @param {number} delta - изменение количества (+1 или -1)
   * 
   * @example
   * // Увеличить количество товара с id=1
   * updateQuantity(1, 1)
   * 
   * // Уменьшить количество товара с id=1
   * updateQuantity(1, -1)
   */
  const updateQuantity = (id, delta) => {
    /**
     * Создание нового массива с обновлённым количеством
     * @type {Array} newCart - обновлённый массив товаров
     */
    const newCart = cartItems.map(item => {
      // Если это нужный товар
      if (item.id === id) {
        // Вычисляем новое количество
        const newQuantity = item.quantity + delta
        
        // Если количество становится меньше 1 — удаляем товар
        if (newQuantity < 1) return null
        
        // Возвращаем товар с обновлённым количеством
        return { ...item, quantity: newQuantity }
      }
      // Остальные товары возвращаем без изменений
      return item
    }).filter(Boolean) // Удаляем null-элементы (товары с количеством 0)
    
    // Обновляем состояние
    setCartItems(newCart)
    // Сохраняем в localStorage
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  /**
   * Удаление товара из корзины
   * @description Полностью удаляет выбранный товар из корзины
   * @param {number} id - идентификатор товара для удаления
   * 
   * @example
   * // Удалить товар с id=2
   * removeItem(2)
   */
  const removeItem = (id) => {
    /**
     * Фильтрация — оставляем все товары, кроме удаляемого
     * @type {Array} newCart - массив без удалённого товара
     */
    const newCart = cartItems.filter(item => item.id !== id)
    
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  /**
   * Полная очистка корзины
   * @description Удаляет все товары из корзины после подтверждения пользователя
   * 
   * @example
   * // Очистить всю корзину
   * clearCart()
   */
  const clearCart = () => {
    // Запрашиваем подтверждение у пользователя
    if (window.confirm('Очистить корзину?')) {
      // Очищаем состояние
      setCartItems([])
      // Очищаем localStorage
      localStorage.setItem('cart', '[]')
    }
  }

  /**
   * Подсчёт итоговой суммы
   * @description Суммирует стоимость всех товаров с учётом количества
   * @returns {number} Общая сумма корзины (в долларах)
   * 
   * @example
   * const total = getTotal() // возвращает число, например 156.00
   */
  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      // Извлекаем числовое значение цены (удаляем символ $)
      const price = parseFloat(item.price.replace('$', ''))
      // Добавляем стоимость товара (цена × количество)
      return sum + (price * item.quantity)
    }, 0) // Начальная сумма = 0
  }


  // ===================== УСЛОВНЫЙ РЕНДЕРИНГ =====================

  /**
   * Отображение пустой корзины
   * @description Если в корзине нет товаров, показывается сообщение с предложением перейти в каталог
   */
  if (cartItems.length === 0) {
    return (
      <div className={s.emptyCart}>
        <div className={s.emptyIcon}>🛒</div>
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары из каталога, чтобы оформить заказ</p>
        <Link to="/catalog" className={s.continueBtn}>
          Перейти в каталог
        </Link>
      </div>
    )
  }

  // ===================== ОСНОВНАЯ РАЗМЕТКА (КОРЗИНА С ТОВАРАМИ) =====================

  return (
    <div className={s.basket}>
      
      {/* ===================== ХЛЕБНЫЕ КРОШКИ (BREADCRUMBS) ===================== */}
      {/* Показывает путь навигации: HOME / CART / SHOPPING CART */}
      <div className={s.breadcrumbs}>
        <div className={s.breadcrumbsContainer}>
          <h1>SHOPPING CART</h1>
          <div className={s.breadcrumbLinks}>
            <Link to="/">HOME</Link> / CART / <span>SHOPPING CART</span>
          </div>
        </div>
      </div>

      <div className={s.cartContainer}>
        
        {/* ===================== ЗАГОЛОВКИ КОЛОНОК ТАБЛИЦЫ ===================== */}
        <div className={s.cartHeader}>
          <div>Product</div>   {/* Колонка с товаром */}
          <div>Price</div>     {/* Колонка с ценой */}
          <div>Quantity</div>  {/* Колонка с количеством */}
          <div>Total</div>     {/* Колонка с итогом по товару */}
          <div></div>          {/* Пустая колонка для кнопки удаления */}
        </div>

        {/* ===================== СПИСОК ТОВАРОВ В КОРЗИНЕ ===================== */}
        <div className={s.cartItems}>
          {cartItems.map(item => {
            // Вычисляем цену товара (число без $)
            const price = parseFloat(item.price.replace('$', ''))
            // Вычисляем итог по конкретному товару (цена × количество)
            const total = price * item.quantity
            
            return (
              <div key={item.id} className={s.cartItem}>
                
                {/* Блок с информацией о товаре (изображение + название + описание) */}
                <div className={s.productInfo}>
                  <div className={s.productImage}>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className={s.productDetails}>
                    <h3>{item.name}</h3>
                    <p className={s.productDesc}>{item.text.substring(0, 80)}...</p>
                  </div>
                </div>
                
                {/* Цена товара (из данных товара) */}
                <div className={s.productPrice}>
                  {item.price}
                </div>
                
                {/* Блок управления количеством (- кнопка, число, + кнопка) */}
                <div className={s.productQuantity}>
                  <button 
                    onClick={() => updateQuantity(item.id, -1)} 
                    className={s.qtyBtn}
                  >
                    -
                  </button>
                  <span className={s.qtyNumber}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)} 
                    className={s.qtyBtn}
                  >
                    +
                  </button>
                </div>
                
                {/* Итоговая сумма по товару (цена × количество) */}
                <div className={s.productTotal}>
                  ${total.toFixed(2)}
                </div>
                
                {/* Кнопка удаления товара */}
                <button 
                  onClick={() => removeItem(item.id)} 
                  className={s.removeBtn}
                >
                  ✕
                </button>
              </div>
            )
          })}
        </div>

        {/* ===================== НИЖНЯЯ ПАНЕЛЬ С КНОПКАМИ ===================== */}
        <div className={s.cartFooter}>
          {/* Кнопка полной очистки корзины */}
          <button onClick={clearCart} className={s.clearBtn}>
            CLEAR SHOPPING CART
          </button>
          
          {/* Кнопка продолжения покупок (переход в каталог) */}
          <Link to="/catalog" className={s.continueShopBtn}>
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* ===================== БЛОК С ИТОГОВОЙ СУММОЙ ===================== */}
        <div className={s.summaryBlock}>
          <div className={s.orderSummary}>
            <h3>ORDER SUMMARY</h3>
            
            {/* Промежуточная сумма (субтотал) */}
            <div className={s.summaryRow}>
              <span>Subtotal:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            
            {/* Стоимость доставки (всегда бесплатно) */}
            <div className={s.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            
            {/* Итоговая сумма (выделена жирным) */}
            <div className={`${s.summaryRow} ${s.totalRow}`}>
              <span>Total:</span>
              <span className={s.totalPrice}>${getTotal().toFixed(2)}</span>
            </div>
            
            {/* Кнопка оформления заказа */}
            <button className={s.checkoutBtn}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===================== ЭКСПОРТ КОМПОНЕНТА =====================

/**
 * Экспорт компонента Basket по умолчанию
 * @description Делает компонент доступным для импорта в других файлах
 * 
 * @example
 * // Импорт компонента в другом файле
 * import Basket from './app/Сontext/BasketContext'
 * 
 * @example
 * // Использование в маршрутизации
 * <Route path="/basket" element={<Basket />} />
 */
export default Basket