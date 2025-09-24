import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTv,
  faGamepad,
  faHouseLaptop,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const Cards = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const cards = [
    { title: "streaming", description: "Com a PONTOCERTO você tem a velocidade e qualidade de internet pra maratonar sua série favorita sem travar.", icon: <FontAwesomeIcon icon={faTv} /> },
    { title: "jogos online", description: "Chega de sofrer com o ping alto e falhas de conexão, com a PONTOCERTO a gameplay vai VOAR para outro level.", icon: <FontAwesomeIcon icon={faGamepad} /> },
    { title: "home office", description: "Com a PONTOCERTO você tem a velocidade e qualidade de internet pra maratonar sua série favorita sem travar.", icon: <FontAwesomeIcon icon={faHouseLaptop} /> },
    { title: "Qualidade de internet", description: "Chega de ficar na mão com uma internet e atendimento demorado, com a PONTOCERTO você tem qualidade do começo ao fim.", icon: <FontAwesomeIcon icon={faGlobe} /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleCards((prev) => (prev.includes(index) ? prev : [...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    cardRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  const highlightPONTOCERTO = (text) =>
    text.replace(/PONTOCERTO/g, '<strong class="text-yellow">PONTOCERTO</strong>');

  const getEntranceClass = (index) => {
    const isVisible = visibleCards.includes(index);
    if (!isVisible) return "opacity-0"; // invisível até virar visível
    return index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right";
  };

  const getAnimationDelay = (index) => `${index * 150}ms`;

  return (
    <section className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            data-index={index}
            className={`
              bg-dark-blue rounded-lg shadow-md p-6 w-[250px]
              transition-transform duration-75 ease-out hover:-translate-y-3
              ${getEntranceClass(index)}
            `}
            style={
              visibleCards.includes(index)
                ? { animationDelay: getAnimationDelay(index) } // só vale pra animação, não pra transition
                : {}
            }
          >
            <div className="text-6xl text-yellow mb-8">{card.icon}</div>
            <h3 className="text-2xl font-bold mb-8 text-white uppercase">
              {card.title}
            </h3>
            <p
              className="text-white"
              dangerouslySetInnerHTML={{ __html: highlightPONTOCERTO(card.description) }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
