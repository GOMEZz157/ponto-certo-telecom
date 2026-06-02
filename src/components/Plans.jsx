import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import BlueButton from "./BlueButton";
import deezer from "../assets/deezer.png";
import max from "../assets/max.png";
import netplaygo from "../assets/netplaygo.png";
import paramount from "../assets/paramount.png";

// Constantes movidas para fora do componente para evitar recriação
const WHATSAPP_LINK = "https://wa.link/gkcjyx";

const INTERSECTION_OBSERVER_OPTIONS = {
  threshold: 0.1,
  rootMargin: "50px",
};

// Dados dos planos movidos para uma constante
const PLANS_DATA = [
  {
    id: "1gb",
    size: "1GB",
    price: 209.99,
    tv: "econômico",
    benefits: [
      "1000MB de Velocidade",
      "Wi-Fi 6 de última geração",
      "Streaming em 8K sem travar",
      "Streaming incluso(a consultar)",
    ],
    logos: [netplaygo],
  },
  {
    id: "850mb",
    size: "850MB",
    price: 159.99,
    tv: "econômico",
    benefits: [
      "850MB de Velocidade",
      "Roteador 5G incluso",
      "Qualidade Ultra HD em todas as telas",
      "Streaming incluso(a consultar)",
    ],
    logos: [netplaygo],
    best: true,
  },
  {
    id: "750mb",
    size: "750MB",
    price: 129.99,
    tv: "econômico",
    benefits: [
      "750MB de Velocidade",
      "Ideal para Home Office e reuniões online",
      "Baixa latência para Games Competitivos",
      "Conexão estável para múltiplos dispositivos",
    ],
    logos: [netplaygo],
  },
  {
    id: "600mb",
    size: "600MB",
    price: 99.99,
    tv: "smart",
    benefits: [
      "600MB de Velocidade",
      "Perfeito para assistir séries e filmes",
      "Navegação rápida em sites e redes sociais",
      "Download de arquivos pesados com agilidade",
    ],
    logos: [netplaygo],
  },
  {
    id: "350mb",
    size: "350MB",
    price: 79.99,
    benefits: [
      "350MB de Velocidade",
      "Bom para chamadas de vídeo com qualidade",
      "Uso confortável em até 5 dispositivos",
      "Facilidade para estudar online",
    ],
  },
  {
    id: "90mb",
    size: "90MB",
    price: 69.99,
    benefits: [
      "90MB de Velocidade",
      "Ideal para escutar músicas",
      "Navegação básica no dia a dia",
      "Uso indicado para até 2 dispositivos",
    ],
  },
];

// Componente separado para o card do plano
const PlanCard = React.memo(
  ({ plan, index, isVisible, animationDelay, onRef }) => {
    const cardClasses = useMemo(() => {
      const baseClasses =
        "relative rounded-lg shadow-md p-8 w-80 flex flex-col justify-between items-center max-w-full transition-transform duration-100 ease-out hover:-translate-y-3";
      const backgroundClasses = plan.best
        ? "bg-blue text-white lg:mt-[-3rem]"
        : "bg-white";
      const animationClasses = isVisible
        ? "animate-fade-in-up opacity-100"
        : "opacity-0";

      return `${baseClasses} ${backgroundClasses} ${animationClasses}`;
    }, [plan.best, isVisible]);

    const formatPrice = useCallback((price) => {
      return `R$ ${price.toFixed(2).replace(".", ",")}`;
    }, []);

    return (
      <div
        ref={onRef}
        data-index={index}
        className={cardClasses}
        style={
          isVisible
            ? { animationDelay } // só vale para a entrada
            : {}
        }
        role="article"
        aria-labelledby={`plan-title-${plan.id}`}
      >
        {plan.best && (
          <span
            className="absolute -top-3 bg-yellow text-dark-blue text-xs font-bold px-3 py-1 rounded"
            aria-label="Melhor plano"
          >
            MELHOR PLANO
          </span>
        )}

        {/* Cabeçalho */}
        <header className="flex flex-col items-center">
          <h3
            id={`plan-title-${plan.id}`}
            className="text-3xl font-extrabold mb-4"
          >
            {plan.size}
          </h3>
          <p className="text-4xl font-bold mb-6">
            {formatPrice(plan.price)}
            <span className="text-base font-normal"> /mês</span>
          </p>
        </header>

        {/* Benefícios */}
        <ul
          className="flex-1 mb-6 text-sm text-center space-y-2"
          aria-label={`Benefícios do plano ${plan.size}`}
        >
          {plan.benefits.map((benefit, benefitIndex) => (
            <li
              key={`${plan.id}-benefit-${benefitIndex}`}
              className={`border-b pb-1 ${
                plan.best ? "border-offwhite" : "border-gray-300"
              }`}
            >
              {benefit}
            </li>
          ))}
        </ul>

        {/* Logos */}
        {plan.logos && plan.logos.length > 0 && (
          <div
            className={`flex gap-3 mb-6 items-center ${
              plan.best ? "bg-white p-4 rounded-xl" : ""
            }`}
            role="img"
            aria-label="Aplicativos inclusos no plano"
          >
            {plan.logos.map((logo, logoIndex) => (
              <img
                key={`${plan.id}-logo-${logoIndex}`}
                src={logo}
                alt={`Aplicativo incluído ${logoIndex + 1}`}
                className={logo === netplaygo ? "h-12" : "h-6"}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {plan.tv && (
          <a
            href="/tv"
            className="mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label="Confira os canais"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BlueButton
              text={`Confira os canais ${plan.tv}`}
              variant={plan.best ? "highlight" : "primary"}
            />
          </a>
        )}

        {/* Botão */}
        <a
          href={WHATSAPP_LINK}
          aria-label={`Contratar plano ${plan.size}`}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          <BlueButton
            text="Quero esse plano"
            variant={plan.best ? "highlight" : "primary"}
          />
        </a>
      </div>
    );
  },
);

PlanCard.displayName = "PlanCard";

const Plans = () => {
  const [visiblePlans, setVisiblePlans] = useState(new Set());
  const planRefs = useRef([]);
  const observerRef = useRef(null);

  // Callback otimizado para o intersection observer
  const handleIntersection = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        setVisiblePlans((prev) => new Set([...prev, index]));
      }
    });
  }, []);

  // Função para calcular delay da animação
  const getAnimationDelay = useCallback((index) => {
    return `${index * 150}ms`;
  }, []);

  // Callback para refs dos cards
  const setPlanRef = useCallback(
    (index) => (el) => {
      planRefs.current[index] = el;
    },
    [],
  );

  // Effect para configurar o Intersection Observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      INTERSECTION_OBSERVER_OPTIONS,
    );

    const currentRefs = planRefs.current.filter(Boolean);
    currentRefs.forEach((ref) => {
      observerRef.current.observe(ref);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  return (
    <section
      className="flex flex-col items-center justify-center mt-32 mb-30"
      aria-labelledby="plans-section-title"
    >
      <BlueButton
        text="Planos de internet"
        variant="nohover"
        className="mb-30"
        id="plans-section-title"
        role="heading"
        aria-level="2"
      />

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        role="list"
        aria-label="Lista de planos de internet"
      >
        {PLANS_DATA.map((plan, index) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            index={index}
            isVisible={visiblePlans.has(index)}
            animationDelay={getAnimationDelay(index)}
            onRef={setPlanRef(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Plans;
