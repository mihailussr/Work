import s from './Offers.module.css'

const Offers = () => {
  return (
    <div className={s.offersContainer}>
      <div className={s.offerWomen}>
        <img className={s.offerImgThree} src="images/offers/offerWomen375.jpg" alt="women" />
        <div className={s.offerTitle}>
          <div className={s.offerTitleTop}>30% OFF</div>
          <div className={s.offerTitleBottom}>FOR WOMEN</div>
        </div>
      </div>

      <div className={s.offerMen}>
        <img className={s.offerImgThree} src="images/offerMen.jpg" alt="men" />
        <div className={s.offerTitle}>
          <div className={s.offerTitleTop}>HOT DEAL</div>
          <div className={s.offerTitleBottom}>FOR MEN</div>
        </div>
      </div>

      <div className={s.offerKids}>
        <img className={s.offerImgThree} src="images/offerKids.jpg" alt="kids" />
        <div className={s.offerTitle}>
          <div className={s.offerTitleTop}>NEW ARRIVALS</div>
          <div className={s.offerTitleBottom}>FOR KIDS</div>
        </div>
      </div>

      <div className={s.offerAccesories}>
        <img className={s.offerImgLast} src="images/offerAccesories.jpg" alt="accesories" />
        <div className={s.offerTitle}>
          <div className={s.offerTitleTop}>LUXIROUS & TRENDY</div>
          <div className={s.offerTitleBottom}>ACCESORIES</div>
        </div>
      </div>
    </div>
  )
}

export default Offers