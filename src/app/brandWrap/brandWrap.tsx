import s from './brandWrap.module.css'

const BrandWrap = () => {
  return (
    <div className={s.brandContainer}>
      <div className={s.brandLeft}>
        <img src="images/brand-man.jpg" alt="brand" />
      </div>
      
      <div className={s.brandRight}>
        <div className={s.brandPromoWrap}>
          <div className={s.brandLeftLine}></div>
          <div className={s.brandTopSign}>THE BRAND</div>
          <div className={s.brandBottomSign}>OF LUXERIOUS <span>FASHION</span></div>
        </div>
      </div>
    </div>
  );
};

export default BrandWrap