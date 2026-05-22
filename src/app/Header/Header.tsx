// Header.jsx
import { Link } from 'react-router-dom'  // ← добавить импорт
import s from './Header.module.css'

const Header = () => {
  return (
    <div className={s.Head}>
      <div className={s.leftHeader}>
        <Link to="/">
          <img src="images/logo.png" alt="logo" />
        </Link>
        <img src="images/search.png" alt="search" />
      </div>

      <div className={s.rightHeader}>
        <img src="images/bars.png" alt="menu" />
        <img src="images/user.png" alt="user" />
        <Link to="/basket">  {/* ← ссылка на страницу корзины */}
          <img className={s.cartIcon} src="images/cart.png" alt="Basket" />
        </Link>
      </div>
    </div>
  )
}

export default Header