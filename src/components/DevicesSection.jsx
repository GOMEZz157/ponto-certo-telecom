import React from "react";

const DevicesSection = () => {
  const devices = [
    { name: "Google Play", icon: "/devices/googleplay.png" },
    { name: "Apple Store", icon: "/devices/applestore.png" },
    { name: "Web Desktop", icon: "/devices/desktop.png" },
    { name: "Samsung SmartTV", icon: "/devices/samsung.png" },
    { name: "LG", icon: "/devices/lg.png" },
    { name: "Apple TV", icon: "/devices/appletv.png" },
    { name: "Roku", icon: "/devices/roku.png" },
    { name: "Chromecast", icon: "/devices/chromecast.png" },
    { name: "Amazon Fire", icon: "/devices/amazonfire.png" },
    { name: "Android TV", icon: "/devices/androidtv.png" },
  ];

  return (
    <section className="bg-[#0f1426] border-t border-[#1f2a3a] py-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-6">
          Disponível em todos os dispositivos
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-6 items-center">
          {devices.map((d) => (
            <div
              key={d.name}
              className="flex flex-col items-center text-gray-300 hover:text-white transition"
            >
              <img
                src={d.icon}
                alt={d.name}
                className="h-8 w-auto mb-2 object-contain"
                loading="lazy"
              />
              <span className="text-xs">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevicesSection;
