import contato from "../assets/contato.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Contato = () => {
  const contatos = [
    {
      title: "WhatsApp",
      description: "11 94890 5363",
      link: "https://wa.link/gkcjyx",
      icon: <FontAwesomeIcon icon={faWhatsapp} />,
    },
    {
      title: "Email",
      description: "contato@pontocertointernet.com.br",
      link: "mailto:contato@pontocertointernet.com.br",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
    {
      title: "Telefone",
      description: "11 5891 1726",
      link: "tel:1158911726",
      icon: <FontAwesomeIcon icon={faPhone} />,
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {/* Section ocupa a tela inteira */}
      <section className="relative flex flex-col items-center justify-center w-screen min-h-screen">
        {/* Imagem de fundo */}
        <img
          src={contato}
          alt="Pessoas com headset se comunicando"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        {/* Conteúdo */}
        <div className="relative z-10 text-center text-white px-4 flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Precisa de ajuda para contratar ou tem dúvidas? Fale conosco!
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
            {contatos.map((contato, index) => (
              <a
                key={index}
                href={contato.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full p-6 border rounded-lg shadow-lg bg-white/95 text-blue hover:bg-white/100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl text-blue mb-2">
                  {contato.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{contato.title}</h3>
                <p className="text-gray-600">{contato.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Footer fica fora da section */}
      <Footer />
    </div>
  );
};

export default Contato;