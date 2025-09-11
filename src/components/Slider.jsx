import { useState } from "react";
import BlueButton from "./BlueButton";
import cellphone from "../assets/cellphone.png";
import videogame from "../assets/videogames.png";
import movies from "../assets/movies.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const slides = [
  {
    image: cellphone,
    title: "Conecte-se a qualquer hora",
    description: "Com nossa internet você nunca perde uma mensagem importante.",
    buttonText: "Saiba Mais",
  },
  {
    image: videogame,
    title: "Jogos sem lag",
    description: "Experimente a melhor conexão para seus games favoritos.",
    buttonText: "Experimente Agora",
  },
  {
    image: movies,
    title: "Streaming sem travar",
    description: "Maratone suas séries e filmes sem interrupções.",
    buttonText: "Assista Agora",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  return (
    <div className="relative w-full max-h-[80vh] overflow-hidden">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0 h-[80vh]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-15 max-w-lg text-white">
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl mb-6">{slide.description}</p>
              <BlueButton text={slide.buttonText} />
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Slider;
