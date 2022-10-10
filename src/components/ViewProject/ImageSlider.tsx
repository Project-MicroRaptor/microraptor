import { useState } from 'react';
import styles from "./ViewProject.module.scss";

type Props = {
  slides: string;
}

const ImageSlider = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = props.slides;

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
    backgroundImage: `url(${slides[currentIndex]})`,
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
