import logo from "../assets/logo.webp";
import max from "../assets/max.png";
import deezer from "../assets/deezer.png";
import netplaygo from "../assets/netplaygo.png";
import paramount from "../assets/paramount.png";

const Benefícios = () => {
  const beneficios = [
    {
      icon: netplaygo,
      title: "NetPlaygoTV",
      description:
        "Streaming de canais ao vivo, filmes e séries na palma da sua mão! Tenha acesso a uma programação completa com esportes, notícias, entretenimento e muito mais para curtir em qualquer lugar.",
      playstore:
        "https://play.google.com/store/apps/details?id=netplaygo.com.br",
      appstore: "https://apps.apple.com/br/app/netplay-go/id6450018239",
      gradient: "from-green-600 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    },
    {
      icon: max,
      title: "Max",
      description:
        "Streaming de filmes, séries e muito mais para o seu entretenimento! Curta lançamentos exclusivos, sucessos do cinema, produções originais, documentários e uma vasta biblioteca de conteúdos para maratonar quando e onde quiser.",
      playstore:
        "https://play.google.com/store/apps/details/Max_Stream_HBO_TV_Movies?id=com.wbd.stream&hl=pt_BR&pli=1",
      appstore:
        "https://apps.apple.com/br/app/hbo-max-programas-e-filmes/id1666653815",
      gradient: "from-purple-600 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
    {
      icon: deezer,
      title: "Deezer",
      description:
        "Streaming de áudio para mais música no seu dia a dia! Escute seus artistas, podcasts e playlists favoritos, descubra novos sons, explore conteúdos exclusivos e aproveite milhões de faixas do mundo todo.",
      playstore:
        "https://play.google.com/store/apps/details?id=deezer.android.app",
      appstore:
        "https://apps.apple.com/br/app/deezer-ouvir-m%C3%BAsica-e-podcast/id292738169",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    },
    {
      icon: paramount,
      title: "Paramount+",
      description:
        "Streaming de séries, filmes e desenhos para toda a família! Assista produções originais, grandes sucessos de Hollywood, clássicos da TV e conteúdos exclusivos que você só encontra na Paramount.",
      playstore: "https://play.google.com/store/apps/details?id=com.cbs.ca",
      appstore: "https://apps.apple.com/br/app/paramount/id1340650234",
      gradient: "from-blue-600 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-700 mb-4">
            Benefícios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra um mundo de entretenimento com os melhores serviços de
            streaming
          </p>
        </div>

        {/* Main Card */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-3xl bg-blue-700 p-8 shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex flex-col lg:flex-row justify-between items-center">
              <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  Streaming e Música
                </h2>
                <p className="text-white/90 text-lg">
                  Acesso completo aos melhores conteúdos
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src={logo}
                  alt="logo da pontocerto"
                  className="max-h-12 lg:max-h-16 filter drop-shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {beneficios.map((beneficio, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl ${beneficio.bgColor} p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50`}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${beneficio.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              <div className="relative">
                {/* Icon and Title */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${beneficio.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                    <img
                      src={beneficio.icon}
                      alt={`Ícone do ${beneficio.title}`}
                      className="relative w-16 h-16 bg-white rounded-2xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300 object-contain"
                    />
                  </div>
                  <h3
                    className={`text-2xl font-bold bg-gradient-to-r ${beneficio.gradient} bg-clip-text text-transparent`}
                  >
                    {beneficio.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-lg leading-relaxed mb-8 line-clamp-4">
                  {beneficio.description}
                </p>

                {/* Download Buttons */}
                <div
                  className="
    grid grid-cols-2 gap-4 items-center
    sm:flex sm:flex-row sm:justify-start
  "
                >
                  {/* Google Play */}
                  <a
                    href={beneficio.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn w-full sm:w-48 h-12 flex items-center justify-center rounded-lg transform hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Baixar na Google Play Store"
                      className="h-full w-auto object-contain"
                    />
                  </a>

                  {/* App Store */}
                  <a
                    href={beneficio.appstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn w-full sm:w-48 h-12 flex items-center justify-center rounded-lg transform hover:scale-105 transition-transform duration-200"
                  >
                    <img
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="Baixar na App Store"
                      className="h-full w-auto object-contain"
                    />
                  </a>

                  {/* Botão extra só para NetPlaygo */}
                  {beneficio.title === "NetPlaygoTV" && (
                    <a
                      href="/tv"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
        col-span-2 w-full sm:w-48 h-12
        flex items-center justify-center
        rounded-lg bg-gradient-to-r from-green-600 to-emerald-600
        text-white font-semibold shadow-md
        hover:shadow-lg hover:scale-105 transition-all duration-200
      "
                    >
                      Visualizar Canais
                    </a>
                  )}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-32 h-32 opacity-5">
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-br ${beneficio.gradient}`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <a
          href="https://wa.link/gkcjyx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-center mt-16">
            <div className="inline-block p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pronto para começar?
              </h3>
              <p className="text-white/90 text-lg">
                Aproveite todos esses benefícios agora mesmo!
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Benefícios;
