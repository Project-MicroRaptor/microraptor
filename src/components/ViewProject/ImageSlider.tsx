import { useState } from 'react';
import styles from "./ViewProject.module.scss";

type Props = {
  images: Array<string>;
}

const ImageSlider = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = props.images;

  const image = {
    backgroundImage: `url(${slides[currentIndex]})`,
  }

  return (
    <>
      {slides.length === 1 ? (
        <div className={styles.sliderStyles}>
          <div className={styles.slideStyles} style={image} />
        </div>
      ) : (
        <div className={styles.sliderStyles}>
          <div className={styles.leftArrow} onClick={() => setCurrentIndex((slides.length + (currentIndex - 1)) % slides.length)}>
            ❰
          </div>
          <div className={styles.rightArrow} onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}>
            ❱
          </div>
          <div className={styles.slideStyles} style={image} />
        </div>
      )}
    </>
  )
};

export default ImageSlider;
