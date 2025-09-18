import { useState, useEffect } from "react";
import BlueButton from "./BlueButton";
import cellphone from "../assets/cellphone.png";
import videogame from "../assets/videogames.png";
import movies from "../assets/movies.png";
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
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const slides = [
  {
    type: "glass-hero",
    title: "Conecte-se ao futuro",
    description: "Fibra ótica de última geração com velocidade e estabilidade incomparáveis.",
    buttonText: "Ver planos",
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Suporte" },
      { value: "1GB", label: "Velocidade" }
    ]
  },
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
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1);
  };

  const prevSlide = () => {
    setCurrent(prev => prev === 0 ? slides.length - 1 : prev - 1);
  };

  // useEffect para controlar a reprodução automática
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrent(prev => prev === slides.length - 1 ? 0 : prev + 1);
    }, 4000); // Muda de slide a cada 4 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying]); // Removido 'current' da dependência

  // Pausa a reprodução automática quando o usuário interage
  const handleUserInteraction = (action) => {
    setIsAutoPlaying(false);
    action();
    // Reativa a reprodução automática após 10 segundos
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderSlideContent = (slide) => {
    if (slide.type === "glass-hero") {
      return (
        <div className="w-full h-full relative overflow-hidden">
          {/* Background com gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
            {/* Formas geométricas de fundo */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
            
            {/* Grade sutil */}
            <div className="absolute inset-0 opacity-10" 
                 style={{
                   backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                   backgroundSize: '50px 50px'
                 }}>
            </div>
          </div>

          {/* Elementos flutuantes glassmorphism */}
          <div className="absolute top-32 right-32 w-32 h-32 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center animate-float">
            <svg className="w-16 h-16 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          </div>

          <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center animate-float" style={{animationDelay: '1s'}}>
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <div className="absolute top-1/2 right-16 w-20 h-20 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center animate-float" style={{animationDelay: '2.5s'}}>
            <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>

          {/* Partículas flutuantes pequenas */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      );
    } else if (slide.type === "video") {
      return (
        <video
          src={slide.videoSrc}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src={slide.videoSrc} type="video/mp4" />
        </video>
      );
    } else {
      return (
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
      );
    }
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
                      <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-4 py-3 text-center min-w-[80px]">
                        <div className="text-white font-bold text-lg">{stat.value}</div>
                        <div className="text-white/70 text-sm">{stat.label}</div>
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
                  <span className="text-white/90 text-sm font-medium">Rede 100% Online</span>
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