import { useState } from 'react';
import { Figure } from 'react-bootstrap';

export interface IProductImageGalleryProps {
  listImages: string[];
}

export function ProductImageGallery({ listImages }: IProductImageGalleryProps) {
  const NO_SLIDER_IMAGE = 3;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  let startSliderIndex = 0;

  const currentMax = Math.max(currentIndex - Math.floor(NO_SLIDER_IMAGE / 2), 0);

  if (currentMax < listImages.length - NO_SLIDER_IMAGE) {
    // If there are enough images after the current index to fill the slider, start the slider at the current max
    startSliderIndex = currentMax;
  } else {
    // Otherwise, start the slider at the end of the list minus the maximum number of images to show
    startSliderIndex = listImages.length - NO_SLIDER_IMAGE;
  }

  const visibleImages = listImages.slice(startSliderIndex, startSliderIndex + NO_SLIDER_IMAGE);

  const handleNextClick = () => {
    if (currentIndex < listImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <>
      <Figure className="main-image">
        <Figure.Image width={500} height={500} alt="photo" src={listImages[currentIndex]} />
      </Figure>
      <div className="image-slider">
        <button disabled={currentIndex === 0} className="slider-button" onClick={handlePrevClick}>
          <i className="bi bi-chevron-left"></i>
        </button>

        <Figure className="list-images">
          {visibleImages.map((item, index) => (
            <div
              className={`wrapper ${listImages[currentIndex] === item ? 'active' : ''}`}
              key={`${item}-${index}`}
              onClick={() => {
                setCurrentIndex(listImages.indexOf(item));
              }}
            >
              <Figure.Image width={100} height={100} alt="photo" src={item} />
            </div>
          ))}
        </Figure>

        <button
          disabled={currentIndex === listImages.length - 1}
          className="slider-button"
          onClick={handleNextClick}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </>
  );
}
