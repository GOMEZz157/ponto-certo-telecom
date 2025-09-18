import logo from "../assets/logo-horizontal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faBars,
  faTimes,
  faHome,
  faRocket,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";

// Lista de links comuns (desktop + mobile)
const links = [
  { href: "/", label: "Home", target: "_self", icon: faHome },
  { href: "https://wa.link/gkcjyx", label: "Contato", target: "_blank", icon: faWhatsapp },
  {
    href: "https://pontocerto.dualstack.speedtestcustom.com/",
    label: "Speed Test",
    target: "_blank",
    icon: faRocket
  },
];

// Botão reutilizável
function CentralDoClienteButton({ className = "", onClick }) {
  return (
    <a
      href="https://pontocertotelecom.com.br/central_assinante_web/login"
      className={`flex items-center gap-3 text-lg font-bold border border-yellow rounded-2xl transition-colors px-6 py-3 ${className}`}
      target="_blank"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faCircleUser} />
      Central do Cliente
    </a>
  );
}

function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  
  // Função para scroll suave até a seção de planos
  const scrollToPlans = (e) => {
    e.preventDefault();
    const planosElement = document.getElementById('planos');
    if (planosElement) {
      planosElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuAberto(false); // Fecha o menu mobile se estiver aberto
  };
  
  return (
    <header className="bg-dark-blue w-screen">
      <nav className="flex justify-between items-center px-8 py-4 text-white">
        {/* Logo */}
        <a href="/" className="cursor-pointer">
          <img src={logo} className="max-h-13" alt="Logo da ponto certo" />
        </a>
        
        {/* Botão Hamburguer (mobile) */}
        <button
          className="text-2xl hover:text-yellow focus:outline-none lg:hidden"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          <FontAwesomeIcon icon={menuAberto ? faTimes : faBars} />
        </button>
        
        {/* Menu desktop */}
        <ul className="gap-8 text-lg hidden lg:flex items-center">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-yellow"
                target={link.target}
              >
                {link.icon && (
                  <FontAwesomeIcon icon={link.icon} className="mr-1" />
                )}
                {link.label}
              </a>
            </li>
          ))}
          {/* Link Planos separado para controle do scroll */}
          <li>
            <button
              onClick={scrollToPlans}
              className="hover:text-yellow cursor-pointer bg-transparent border-none text-lg text-white"
            >
              <FontAwesomeIcon icon={faWifi} className="mr-1" />
              Planos
            </button>
          </li>
        </ul>
        
        {/* Botão Central do Cliente (desktop) */}
        <div className="hidden lg:flex">
          <CentralDoClienteButton className="bg-dark-blue text-white hover:bg-yellow hover:text-dark-blue" />
        </div>
      </nav>
      
      {/* Dropdown mobile */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuAberto ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center gap-4 px-8 py-6 bg-dark-blue text-white border-t border-yellow">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-yellow"
                onClick={() => setMenuAberto(false)}
                target={link.target}
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* Link Planos separado para mobile */}
          <li>
            <button
              onClick={scrollToPlans}
              className="hover:text-yellow cursor-pointer bg-transparent border-none text-lg text-white"
            >
              Planos
            </button>
          </li>
          <li className="w-full">
            <CentralDoClienteButton
              className="w-full justify-center bg-dark-blue text-white hover:bg-yellow hover:text-dark-blue mt-2"
              onClick={() => setMenuAberto(false)}
            />
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;