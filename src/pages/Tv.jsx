import React, { useEffect, useMemo, useState } from "react";
import DevicesSection from "../components/DevicesSection";

const PLAN_ORDER = ["smart", "economico", "exclusivo"];

// Map bastante tolerante: trim, lower, trata variações
function mapPlan(plan) {
  if (plan == null) return "economico";
  const p = String(plan).trim().toLowerCase();

  if (["basic", "básico", "economico", "econômico"].includes(p))
    return "economico";
  if (["smart"].includes(p)) return "smart";
  if (["plus", "premium", "exclusivo", "exclusive"].includes(p))
    return "exclusivo";
  if (["soon", "em breve", "em_breve"].includes(p)) return "soon";

  return p;
}

function normalizeLogo(logo) {
  if (!logo) return "/channels/default.png";
  return logo.startsWith("./") ? logo.replace(/^\.\//, "/") : logo;
}

export default function Channels({ playerUrl = "{PLAYER_URL}" }) {
  const [channels, setChannels] = useState([]);
  const [plan, setPlan] = useState("economico");
  const [tab, setTab] = useState("todos");
  const [onlyIncluded, setOnlyIncluded] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // carregar favoritos
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("npgo:favs") || "[]");
      setFavorites(new Set((saved || []).map(String)));
    } catch {
      setFavorites(new Set());
    }
  }, []);

  // salvar favoritos
  useEffect(() => {
    localStorage.setItem(
      "npgo:favs",
      JSON.stringify(Array.from(favorites).map(String))
    );
  }, [favorites]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetch("/canais.json")
      .then((res) => {
        if (!res.ok) throw new Error("Falha no fetch: " + res.status);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        const mapped = (data || []).map((c) => ({
          ...c,
          id: String(c.id),
          plan: mapPlan(c.plan),
          logo: normalizeLogo(c.logo),
          category: (c.category || "Sem categoria").trim(),
          name: (c.name || "").trim(),
          url: c.url ?? "https://netplaygo.com.br",
        }));
        setChannels(mapped);
        setLoading(false);
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(channels.map((c) => (c.category || "Sem categoria").trim())),
    ].sort();
  }, [channels]);

  const filtered = useMemo(() => {
    const qLower = q.trim().toLowerCase();

    let base = channels.filter((c) => {
      if (tab === "fav" && !favorites.has(String(c.id))) return false;
      if (qLower && !`${c.name} ${c.category}`.toLowerCase().includes(qLower))
        return false;
      if (cat && (c.category || "") !== cat) return false;
      return true;
    });

    if (onlyIncluded) {
      const planIndex = PLAN_ORDER.indexOf(plan);

      base = base.filter((c) => {
        const channelIndex = PLAN_ORDER.indexOf(c.plan);
        // inclui apenas canais até o plano selecionado (exclui "soon")
        return channelIndex !== -1 && channelIndex <= planIndex;
      });
    } else {
      base = base.slice().sort((a, b) => {
        const aIsPlan =
          plan === "exclusivo"
            ? a.plan === "exclusivo" || a.plan === "soon"
            : a.plan === plan;
        const bIsPlan =
          plan === "exclusivo"
            ? b.plan === "exclusivo" || b.plan === "soon"
            : b.plan === plan;

        if (aIsPlan && !bIsPlan) return -1;
        if (!aIsPlan && bIsPlan) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return base;
  }, [channels, tab, favorites, q, cat, onlyIncluded, plan]);

  function toggleFav(id) {
    setFavorites((prev) => {
      const next = new Set(prev);
      const s = String(id);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }

  if (loading)
    return (
      <div className="p-6 text-center text-gray-400">Carregando canais...</div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-400">
        Erro ao carregar canais: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b1220] text-gray-200">
      {/* Planos em destaque no topo */}
      <div className="sticky top-0 z-20 bg-[#0b1220] border-b border-[#1f2a3a]">
        <div className="max-w-6xl mx-auto flex justify-center gap-3 p-4">
          {["smart", "economico", "exclusivo"].map((p) => (
            <button
              key={p}
              onClick={() => setPlan(p)}
              className={`px-4 py-2 rounded-lg text-sm font-bold border border-[#1f2a3a] transition-colors ${
                plan === p
                  ? "bg-gradient-to-b from-violet-700/40 to-[#0f1426] text-white"
                  : "bg-[#0f1426] text-gray-400 hover:text-gray-200"
              }`}
            >
              {p.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="bg-[#0f172a]/90 border-b border-[#1f2a3a] backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center gap-2 p-3">
          <strong className="text-gray-100">NetPlayGO · Canais</strong>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-3">
        {/* Controls */}
        <section className="rounded-xl border border-[#1f2a3a] bg-[#0f1426] p-3 space-y-3">
          <div className="grid gap-3 md:grid-cols-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Buscar</div>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Nome do canal ou categoria"
                className="w-full px-2 py-1 rounded-lg border border-[#1f2a3a] bg-[#0f1426] text-sm text-gray-200 placeholder-gray-500"
              />
            </div>

            <div>
              <div className="text-xs text-gray-400 mb-1">Categoria</div>
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full px-2 py-1 rounded-lg border border-[#1f2a3a] bg-[#0f1426] text-sm text-gray-200"
              >
                <option value="">Todas</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                checked={onlyIncluded}
                onChange={(e) => setOnlyIncluded(e.target.checked)}
                className="accent-violet-600"
              />
              <label className="text-sm">
                Somente incluídos
                <br />
                <span className="text-xs text-gray-400">
                  Oculta os fora do plano (tudo exceto 'soon')
                </span>
              </label>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border border-[#1f2a3a] rounded-lg overflow-hidden">
            <button
              onClick={() => setTab("todos")}
              className={`flex-1 py-1 text-sm font-semibold ${
                tab === "todos"
                  ? "bg-white/10 text-gray-100"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setTab("fav")}
              className={`flex-1 py-1 text-sm font-semibold ${
                tab === "fav"
                  ? "bg-white/10 text-gray-100"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              Favoritos
            </button>
          </div>
        </section>

        {/* Grid */}
        <section className="mt-4">
          {filtered.length === 0 ? (
            <div className="text-center text-gray-400 border border-dashed border-[#1f2a3a] rounded-lg p-6">
              Nenhum canal encontrado.
            </div>
          ) : (
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filtered.map((c) => {
                const isSoon = String(c.plan).toLowerCase() === "soon";
                const isIncluded =
                  plan === "exclusivo"
                    ? c.plan === "exclusivo" || c.plan === "soon"
                    : c.plan === plan;

                return (
                  <article
                    key={c.id}
                    className="rounded-xl border border-[#1f2a3a] overflow-hidden bg-gradient-to-b from-[#0c1426] to-[#0a1220]"
                  >
                    <div className="aspect-video flex items-center justify-center bg-white">
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="w-12 h-12 object-contain drop-shadow-md"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-2">
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-xs truncate">
                            {c.name}
                          </div>
                          <div className="text-[11px] text-gray-400 truncate">
                            {c.category}
                          </div>
                        </div>

                        {!isSoon && (
                          <button
                            onClick={() => toggleFav(c.id)}
                            className={`text-sm ${
                              favorites.has(String(c.id))
                                ? "text-yellow-400"
                                : "text-gray-500"
                            }`}
                          >
                            ★
                          </button>
                        )}
                      </div>

                      <div className="mt-1 text-[11px] border border-[#1f2a3a] rounded-full px-2 py-0.5 inline-block bg-white/5">
                        {isSoon
                          ? "🚧 Em breve"
                          : `Plano: ${String(c.plan).toUpperCase()}`}
                      </div>

                      <div className="mt-2 flex gap-2">
                        {(() => {
                          if (isSoon) {
                            return (
                              <span className="flex-1 text-center text-xs border border-[#1f2a3a] rounded-lg py-1 text-gray-500">
                                🚧 Em breve
                              </span>
                            );
                          }

                          const planIndex = PLAN_ORDER.indexOf(plan);
                          const channelIndex = PLAN_ORDER.indexOf(c.plan);
                          const isIncluded =
                            c.plan === "soon" || channelIndex <= planIndex;

                          if (!isIncluded) {
                            return (
                              <span className="flex-1 text-center text-xs border border-red-700 rounded-lg py-1 text-red-400 font-bold bg-red-900/30">
                                🔒 Bloqueado
                              </span>
                            );
                          }

                          return (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center text-xs border border-[#1f2a3a] rounded-lg py-1 bg-gradient-to-b from-violet-700/30 to-[#0f1426] hover:from-violet-700/50 hover:to-[#121a33] transition-all"
                            >
                              ▶ Player
                            </a>
                          );
                        })()}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <DevicesSection />
    </div>
  );
}
