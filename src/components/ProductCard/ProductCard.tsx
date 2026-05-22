import s from './ProductCard.module.css'

const ProductCard = ({ item, onAddToCart }) => {

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(item)
    }
  }

  return (
    <div className={s.productItem}>
      <div className={s.productImg}>
        <img src={item.img} alt={item.name} />
        <div className={s.productOverlay}>
          <button className={s.addToCartBtn} onClick={handleAddToCart}>
            <img src="images/cart.svg" alt="cart" />
            Купить
          </button>
        </div>
      </div>

      <div className={s.productInfo}>
        <div className={s.productName}>{item.name}</div>
        <div className={s.productDesc}>{item.text}</div>
        <div className={s.productPrice}>{item.price}</div>
      </div>
    </div>
  )
}

export default ProductCard