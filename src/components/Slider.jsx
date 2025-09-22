import { useState, useEffect } from "react";
import BlueButton from "./BlueButton";
import cellphone from "../assets/cellphone.png";
import videogame from "../assets/videogames.png";
import movies from "../assets/movies.png";
import homeoffice from "../assets/home-office.jpg";
import business from "../assets/business.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Adicionar estilos CSS personalizados
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

// Injetar estilos no head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const slides = [

  {
    type: "image",
    image: cellphone,
    title: "Conecte-se a qualquer hora",
    description: "Com nossa internet você nunca perde uma mensagem importante.",
    buttonText: "Saiba Mais",
  },
  {
    type: "image",
    image: videogame,
    title: "Jogos sem lag",
    description: "Experimente a melhor conexão para seus games favoritos.",
    buttonText: "Experimente Agora",
  },
  {
    type: "image",
    image: movies,
    title: "Streaming sem travar",
    description: "Maratone suas séries e filmes sem interrupções.",
    buttonText: "Assista Agora",
  },
  {
    type: "image",
    image: business,
    title: "Internet para empresas",
    description: "Soluções de internet rápidas e confiáveis para o seu negócio.",
    buttonText: "Conheça Nossas Soluções",
  },
  {
    type: "image",
    image: homeoffice,
    title: "Trabalhe de casa",
    description: "Conexão estável para suas reuniões e tarefas diárias.",
    buttonText: "Saiba Mais",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // useEffect para controlar a reprodução automática
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Muda de slide a cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]); // Removido 'current' da dependência

  // Pausa a reprodução automática quando o usuário interage
  const handleUserInteraction = (action) => {
    setIsAutoPlaying(false);
    action();
  };

  const renderSlideContent = (slide) => {
    return (
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover"
      />
    );
  };

  return (
    <div
      className="relative w-full max-h-[80vh] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full flex-shrink-0 h-[80vh]">
            {renderSlideContent(slide)}
            {/* Container principal com glassmorphism */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 lg:px-16">
              {/* Card principal glassmorphism */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 lg:p-12 max-w-2xl shadow-2xl">
                {/* Stats cards */}
                {slide.stats && (
                  <div className="flex space-x-4 mb-8">
                    {slide.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-4 py-3 text-center min-w-[80px]"
                      >
                        <div className="text-white font-bold text-lg">
                          {stat.value}
                        </div>
                        <div className="text-white/70 text-sm">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Título com efeito glass */}
                <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                  {slide.title}
                </h1>

                {/* Descrição */}
                <p className="text-lg lg:text-xl mb-8 text-white/90 leading-relaxed">
                  {slide.description}
                </p>

                {/* Container do botão com glassmorphism */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 inline-block">
                  <a href="https://wa.link/gkcjyx">
                    <BlueButton text={slide.buttonText} />
                  </a>
                </div>
              </div>

              {/* Card secundário flutuante */}
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hidden lg:block">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm font-medium">
                    Rede 100% Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={() => handleUserInteraction(prevSlide)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 z-10"
        aria-label="Slide anterior"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={() => handleUserInteraction(nextSlide)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors duration-200 z-10"
        aria-label="Próximo slide"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {/* Indicadores de slide */}
      <div className="absolute bottom-30 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleUserInteraction(() => setCurrent(index))}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
