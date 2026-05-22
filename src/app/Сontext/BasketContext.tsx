// src/pages/Basket/Basket.jsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import s from './BasketContext.module.css'

const Basket = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const updateQuantity = (id, delta) => {
    const newCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta
        if (newQuantity < 1) return null
        return { ...item, quantity: newQuantity }
      }
      return item
    }).filter(Boolean)
    
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const removeItem = (id) => {
    const newCart = cartItems.filter(item => item.id !== id)
    setCartItems(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const clearCart = () => {
    if (window.confirm('Очистить корзину?')) {
      setCartItems([])
      localStorage.setItem('cart', '[]')
    }
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return sum + (price * item.quantity)
    }, 0)
  }

  // Если корзина пуста
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

  return (
    <div className={s.basket}>
      {/* Хлебные крошки */}
      <div className={s.breadcrumbs}>
        <div className={s.breadcrumbsContainer}>
          <h1>SHOPPING CART</h1>
          <div className={s.breadcrumbLinks}>
            <Link to="/">HOME</Link> / CART / <span>SHOPPING CART</span>
          </div>
        </div>
      </div>

      <div className={s.cartContainer}>
        {/* Заголовки колонок */}
        <div className={s.cartHeader}>
          <div>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
          <div></div>
        </div>

        {/* Список товаров */}
        <div className={s.cartItems}>
          {cartItems.map(item => {
            const price = parseFloat(item.price.replace('$', ''))
            const total = price * item.quantity
            
            return (
              <div key={item.id} className={s.cartItem}>
                <div className={s.productInfo}>
                  <div className={s.productImage}>
                    <img src={item.img} alt={item.name} />
                  </div>
                  <div className={s.productDetails}>
                    <h3>{item.name}</h3>
                    <p className={s.productDesc}>{item.text.substring(0, 80)}...</p>
                  </div>
                </div>
                
                <div className={s.productPrice}>
                  {item.price}
                </div>
                
                <div className={s.productQuantity}>
                  <button onClick={() => updateQuantity(item.id, -1)} className={s.qtyBtn}>-</button>
                  <span className={s.qtyNumber}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className={s.qtyBtn}>+</button>
                </div>
                
                <div className={s.productTotal}>
                  ${total.toFixed(2)}
                </div>
                
                <button onClick={() => removeItem(item.id)} className={s.removeBtn}>
                  ✕
                </button>
              </div>
            )
          })}
        </div>

        {/* Кнопки внизу */}
        <div className={s.cartFooter}>
          <button onClick={clearCart} className={s.clearBtn}>
            CLEAR SHOPPING CART
          </button>
          <Link to="/catalog" className={s.continueShopBtn}>
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* Блок с суммой */}
        <div className={s.summaryBlock}>
          <div className={s.orderSummary}>
            <h3>ORDER SUMMARY</h3>
            <div className={s.summaryRow}>
              <span>Subtotal:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className={s.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className={`${s.summaryRow} ${s.totalRow}`}>
              <span>Total:</span>
              <span className={s.totalPrice}>${getTotal().toFixed(2)}</span>
            </div>
            <button className={s.checkoutBtn}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basket