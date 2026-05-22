import { useNavigate } from 'react-router-dom'  // ← добавляем импорт
import s from './Featured.module.css'

const Featured = () => {
  const navigate = useNavigate()  // ← хук для навигации

  const featuredItems = [
    {
      id: 1,
      img: "images/featured/1.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00"
    },
    {
      id: 2,
      img: "images/featured/2.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00"
    },
    {
      id: 3,
      img: "images/featured/3.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00"
    },
    {
      id: 4,
      img: "images/featured/4.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00"
    },
    {
      id: 5,
      img: "images/featured/5.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00"
    },
    {
      id: 6,
      img: "images/featured/6.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00"
    }
  ]

  // Функция для перехода на страницу каталога
  const goToCatalog = () => {
    navigate('/catalog')
  }

  return (
    <div className={s.featuredContainer}>
      <h2 className={s.featuredHeader}>Fetured Items</h2>
      <div className={s.featuredTitle}>Shop for items based on what we featured in this week</div>

      <div className={s.featuredItems}>
        {featuredItems.map((item) => (
          <div key={item.id} className={s.featuredItem}>
            <div className={s.featuredImgWrap}>
              <img src={item.img} alt={item.name} />
              <div className={s.featuredImgDark}>
                <button>
                  <img src="images/cart.svg" alt="cart" />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className={s.featuredData}>
              <div className={s.featuredName}>{item.name}</div>
              <div className={s.featuredText}>{item.text}</div>
              <div className={s.featuredPrice}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка с переходом на каталог */}
      
      <button className={s.featuredBrowseBtn} onClick={goToCatalog} > {/* // ← добавляем обработчик клика */}
        Browse All Product
      </button>
    </div>
  )
}

export default Featured