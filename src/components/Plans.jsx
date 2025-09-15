import React, { useState, useEffect, useRef } from "react";
import BlueButton from "./BlueButton";
import deezer from "../assets/deezer.png";
import max from "../assets/max.png";
import netplaygo from "../assets/netplaygo.png";
import paramount from "../assets/paramount.png";

const Plans = () => {
  const [visiblePlans, setVisiblePlans] = useState([]);
  const planRefs = useRef([]);

  const plans = [
    {
      size: "1GB",
      price: 209.99,
      benefits: [
        "1000MB de Velocidade",
        "Roteador 5G",
        "Wi-Fi 6",
        "Sem Limite de Consumo",
      ],
      logos: [deezer, max, paramount, netplaygo],
    },
    {
      size: "850MB",
      price: 159.99,
      benefits: ["850MB de Velocidade", "Roteador 5G", "Sem Limite de Consumo"],
      logos: [max, paramount, netplaygo],
      best: true,
    },
    {
      size: "750MB",
      price: 129.99,
      benefits: ["750MB de Velocidade", "Roteador 5G", "Sem Limite de Consumo"],
      logos: [deezer, paramount, netplaygo],
    },
    {
      size: "600MB",
      price: 99.99,
      benefits: [
        "600MB de Velocidade",
        "Roteador 5G",
        "Sem Limite de Consumo",
        "Acesso 24 horas por dia",
      ],
    },
    {
      size: "350MB",
      price: 79.99,
      benefits: [
        "350MB de Velocidade",
        "Roteador 5G",
        "Sem Limite de Consumo",
        "Acesso 24 horas por dia",
      ],
    },
    {
      size: "90MB",
      price: 59.99,
      benefits: [
        "90MB de Velocidade",
        "Ideal para escutar músicas",
        "Sem Limite de Consumo",
        "Acesso 24 horas por dia",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisiblePlans((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    planRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = (index) => {
    const isVisible = visiblePlans.includes(index);
    
    if (!isVisible) {
      return "opacity-0 transform translate-y-16";
    }
    
    return "opacity-100 transform translate-y-0";
  };

  const getAnimationDelay = (index) => {
    return `${index * 150}ms`;
  };

  return (
    <section className="flex flex-col items-center justify-center mt-32 mb-30">
      <BlueButton
        text="Planos de internet"
        variant="nohover"
        className="mb-30"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            ref={(el) => (planRefs.current[index] = el)}
            data-index={index}
            className={`relative rounded-lg shadow-md p-8 w-80 flex flex-col justify-between items-center max-w-full transition-all duration-700 ease-out ${
              plan.best ? "bg-blue text-white lg:mt-[-3rem]" : "bg-white"
            } ${getAnimationClass(index)}`}
            style={{
              transitionDelay: visiblePlans.includes(index) ? getAnimationDelay(index) : '0ms'
            }}
          >
            {plan.best && (
              <span className="absolute -top-3 bg-yellow text-dark-blue text-xs font-bold px-3 py-1 rounded">
                MELHOR PLANO
              </span>
            )}
            {/* Cabeçalho */}
            <div className="flex flex-col items-center">
              <h3 className="text-3xl font-extrabold mb-4">{plan.size}</h3>
              <p className="text-4xl font-bold mb-6">
                R$ {plan.price.toFixed(2).replace(".", ",")}
                <span className="text-base font-normal"> /mês</span>
              </p>
            </div>
            {/* Benefícios */}
            <ul className="flex-1 mb-6 text-sm text-center space-y-2">
              {plan.benefits.map((b, i) => (
                <li
                  key={i}
                  className={`border-b pb-1 ${
                    plan.best ? "border-offwhite" : "border-gray-300"
                  }`}
                >
                  {b}
                </li>
              ))}
            </ul>
            {/* Logos */}
            {plan.logos && (
              <div
                className={`flex gap-3 mb-6 ${
                  plan.best ? "bg-white p-4 rounded-xl" : ""
                }`}
              >
                {plan.logos.map((logo, i) => (
                  <img key={i} src={logo} alt="benefício" className="h-6" />
                ))}
              </div>
            )}
            {/* Botão */}
            <a href="https://wa.link/gkcjyx">
              <BlueButton
                text="Quero esse plano"
                variant={plan.best ? "highlight" : "primary"}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Plans;