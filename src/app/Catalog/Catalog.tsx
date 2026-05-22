import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import s from './Catalog.module.css'
import ProductCard from '../../components/ProductCard/ProductCard'


const Catalog = () => {
  const navigate = useNavigate()
  
  const catalogItems = [
    {
      id: 1,
      img: "images/featured/1.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00",
      category: "women"
    },
    {
      id: 2,
      img: "images/featured/2.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00",
      category: "women"
    },
    {
      id: 3,
      img: "images/featured/3.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00",
      category: "men"
    },
    {
      id: 4,
      img: "images/featured/4.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00",
      category: "men"
    },
    {
      id: 5,
      img: "images/featured/5.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00",
      category: "kids"
    },
    {
      id: 6,
      img: "images/featured/6.jpg",
      name: "ELLERY X M'O CAPSULE",
      text: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
      price: "$52.00",
      category: "kids"
    },
    {
      id: 7,
      img: "images/featured/1.jpg",
      name: "CLASSIC DENIM JACKET",
      text: "Stylish denim jacket for everyday wear, perfect for any casual occasion.",
      price: "$89.00",
      category: "men"
    },
    {
      id: 8,
      img: "images/featured/2.jpg",
      name: "ELEGANT BLOUSE",
      text: "Beautiful blouse with lace details, ideal for office or special events.",
      price: "$45.00",
      category: "women"
    },
    {
      id: 9,
      img: "images/featured/3.jpg",
      name: "SPORT SNEAKERS",
      text: "Comfortable sneakers for running and daily activities.",
      price: "$75.00",
      category: "sport"
    }
  ]

  // Функция добавления товара в корзину
  const addToCart = (item) => {
    // Получаем текущую корзину из localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Проверяем, есть ли уже такой товар в корзине
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id)
    
    if (existingItemIndex !== -1) {
      // Если товар уже есть — увеличиваем количество
      existingCart[existingItemIndex].quantity += 1
    } else {
      // Если товара нет — добавляем с количеством 1
      existingCart.push({
        ...item,
        quantity: 1
      })
    }
    
    // Сохраняем обновлённую корзину
    localStorage.setItem('cart', JSON.stringify(existingCart))
    
    // Показываем уведомление
    // alert(`✅ Товар "${item.name}" добавлен в корзину!`)
  }

  return (
    <div className={s.shop}>
      {/* Хлебные крошки и заголовок */}
      <div className={s.breadcrumbs}>
        <div className={s.breadcrumbsContainer}>
          <h1>NEW ARRIVALS</h1>
          <div className={s.breadcrumbLinks}>
            HOME / MEN / <span>NEW ARRIVALS</span>
          </div>
        </div>
      </div>

      {/* Фильтр и сортировка */}
      <div className={s.filterSort}>
        <div className={s.filterContainer}>
          <div className={s.filterLeft}>
            <button className={s.filterButton}>
              FILTER
            </button>
          </div>
          <div className={s.filterRight}>
            <select className={s.sortSelect}>
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Сетка товаров */}
      <div className={s.productGrid}>
        <div className={s.productContainer}>
          {catalogItems.map((item) => (
            <ProductCard 
              key={item.id} 
              item={item} 
              onAddToCart={addToCart}  // ← передаём функцию
            />
          ))}
        </div>
      </div>

      {/* Пагинация */}
      <div className={s.pagination}>
        <div className={s.paginationContainer}>
          <button className={s.paginationBtn}>&lt;</button>
          <button className={`${s.paginationBtn} ${s.active}`}>1</button>
          <button className={s.paginationBtn}>2</button>
          <button className={s.paginationBtn}>3</button>
          <button className={s.paginationBtn}>...</button>
          <button className={s.paginationBtn}>10</button>
          <button className={s.paginationBtn}>&gt;</button>
        </div>
      </div>
    </div>
  )
}

export default Catalog