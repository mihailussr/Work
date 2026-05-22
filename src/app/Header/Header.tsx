import { Link } from 'react-router-dom'  // ← импортируем Link
import s from './Header.module.css'

const Header = () => {
  return (
    <div className={s.Head}>
      <div className={s.leftHeader}>
        <Link to="/">  {/* ← ссылка на главную */}
          <img src="images/logo.png" alt="logo" />
        </Link>
        <img src="images/search.png" alt="search" />
      </div>

      <div className={s.rightHeader}>
        <img src="images/bars.png" alt="menu" />
        <img src="images/user.png" alt="user" />
          <img className={s.cartIcon} src="images/cart.png" alt="cart" />
      </div>
    </div>
  )
}

export default Header

