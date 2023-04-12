import { useEffect, useState } from "react";
import { longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carousel = () => {
  const people = [...longList];
  const [currentPerson, setCurrentPerson] = useState(0);
  const prevSlide = () => {
    setCurrentPerson((oldValue) => {
      const newValue = (oldValue - 1 + people.length) % people.length;
      return newValue;
    });
  };
  const nextSlide = () => {
    setCurrentPerson((oldValue) => {
      const newValue = (oldValue + 1) % people.length;
      return newValue;
    });
  };
  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);
  return (
    <section className="slider-container">
      {people.map((person, i) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (i - currentPerson)}%)`,
              opacity: i === currentPerson ? 1 : 0,
              visibility: i === currentPerson ? "visible" : "hidden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
