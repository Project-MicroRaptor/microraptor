import { useState } from 'react';
import styles from "./ViewProject.module.scss";

const ImageSlider = ({ slides }: { slides: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  const goNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  const image = {
    backgroundImage: `url(${slides[currentIndex].url})`,
  }

  return (
    <div className={styles.sliderStyles}>
      <div className={styles.leftArrow} onClick={goToPrevious}>❰</div>
      <div className={styles.rightArrow} onClick={goNext}>❱</div>
      <div className={styles.slideStyles} style={image} />
    </div >
  )
};

export default ImageSlider;
