import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

export default function CarouselMain() {
  const posterArr = [
    { id: 1, src: "/images/carousel/1.webp" },
    { id: 2, src: "/images/carousel/2.webp" },
    { id: 3, src: "/images/carousel/3.webp" },
    { id: 4, src: "/images/carousel/4.webp" },
    { id: 5, src: "/images/carousel/5.webp" },
    { id: 6, src: "/images/carousel/6.webp" },
    { id: 7, src: "/images/carousel/7.webp" },
  ];

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setNextFoto();
    }, 3000); // 3 seconds

    return () => clearInterval(carouselInterval); // cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isShowNav, setIsShowNav] = useState(false);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

  const setNextFoto = () => {
    setCurrentPosterIndex((prevIndex) => (prevIndex + 1) % posterArr.length);
  };

  const setPrevFoto = () => {
    setCurrentPosterIndex(
      (prevIndex) => (prevIndex - 1 + posterArr.length) % posterArr.length
    );
  };
  return (
    <div
      className="CarouselMain__container"
      onMouseEnter={() => setIsShowNav(true)}
      onMouseLeave={() => setIsShowNav(false)}
    >
      <div className="w-full m-0 p-0 bg-amber-200 cursor-pointer relative">
        <img
          src={posterArr[currentPosterIndex].src}
          className="w-full h-auto object-cover"
          alt="carouselImg"
        />
        {isShowNav && (
          <div className="absolute bottom-10 right-10 flex gap-4">
            <span
              className="bg-white p-4 text-lg rounded-full"
              onClick={() => setPrevFoto()}
            >
              <FaAngleLeft />
            </span>
            <span
              className="bg-white p-4 text-lg  rounded-full"
              onClick={() => setNextFoto()}
            >
              <FaAngleRight />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
