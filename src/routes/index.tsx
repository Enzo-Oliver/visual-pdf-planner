import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  TrendingUp, ShieldCheck, MapPin, CheckCircle2, Clock, Star,
  Wrench, Paintbrush, Plug, Sparkles, Hammer, Scissors,
  Smartphone, MessageCircle, CalendarCheck, Flame, ArrowRight,
  Search, Bell, Home, MessageSquare, User, ClipboardList,
  Sun, Moon, BadgeCheck, Calendar, Briefcase, Award,
} from "lucide-react";
import logo from "@/assets/logo-chamaserv.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const servicesHome = [
  { icon: Sparkles, tag: "FAVORITO", name: "Diarista", desc: "Limpeza na medida certa para o dia a dia da sua casa.", availability: "Disponível para hoje" },
  { icon: Plug, name: "Eletricista", desc: "Instalações, reparos e emergências com profissionais certificados.", availability: "Disponível para hoje" },
  { icon: Wrench, name: "Encanador", desc: "Vazamentos, desentupimentos e manutenção hidráulica.", availability: "Disponível para hoje" },
  { icon: Hammer, name: "Pedreiro", desc: "Pequenos reparos, reformas e acabamentos de qualidade.", availability: "Disponível amanhã" },
  { icon: Paintbrush, name: "Pintor", desc: "Pintura interna e externa com acabamento impecável.", availability: "Disponível amanhã" },
  { icon: Scissors, name: "Jardineiro", desc: "Poda, paisagismo e manutenção de áreas verdes.", availability: "Disponível esta semana" },
];

const servicesBusiness = [
  { icon: Sparkles, tag: "POPULAR", name: "Limpeza corporativa", desc: "Equipes treinadas para escritórios, lojas e clínicas.", availability: "Plano mensal" },
  { icon: Plug, name: "Manutenção elétrica", desc: "Atendimento programado e plantão para sua empresa.", availability: "Plano mensal" },
  { icon: Wrench, name: "Manutenção predial", desc: "Hidráulica, alvenaria e reparos sob demanda.", availability: "Sob demanda" },
  { icon: Paintbrush, name: "Pintura comercial", desc: "Renovação de fachadas e ambientes corporativos.", availability: "Orçamento" },
];

const pros = [
  {
    name: "Carla Mendes", job: "Diarista premium", rating: 4.9, reviews: 142, area: "Aldeota · 2 km", price: "R$ 130/diária",
    about: "Especialista em limpeza residencial e organização de ambientes. Atuo com produtos eco-friendly e métodos que garantem um lar impecável sem agredir a saúde da sua família.",
    experience: "8 anos", jobs: "1.200+", badges: ["Verificada", "Top avaliada", "Eco-friendly"],
    specialties: ["Limpeza pós-obra", "Organização de closets", "Limpeza profunda"],
    schedule: "Seg a Sáb · 7h às 18h",
  },
  {
    name: "Roberto Lima", job: "Eletricista certificado", rating: 5.0, reviews: 89, area: "Meireles · 3 km", price: "R$ 90/serviço",
    about: "Eletricista com certificação CREA e experiência em instalações residenciais e comerciais. Especialista em troca de quadros, instalação de tomadas inteligentes e reparos de emergência.",
    experience: "12 anos", jobs: "850+", badges: ["Certificado CREA", "Emergência 24h", "Garantia 90 dias"],
    specialties: ["Instalações elétricas", "Reparos emergenciais", "Tomadas inteligentes"],
    schedule: "Seg a Dom · 6h às 22h",
  },
  {
    name: "Juliana Souza", job: "Pintora residencial", rating: 4.8, reviews: 64, area: "Cocó · 5 km", price: "Orçamento",
    about: "Pintora com formação em design de interiores. Transformo ambientes com cores que traduzem a personalidade de cada cliente. Trabalho com texturas, efeitos decorativos e pintura padronizada.",
    experience: "6 anos", jobs: "420+", badges: ["Pintura fine art", "Consultoria de cor", "Material incluído"],
    specialties: ["Texturas e efeitos", "Pintura externa", "Restauração de fachadas"],
    schedule: "Seg a Sex · 8h às 17h",
  },
];

type Pro = typeof pros[number];

function Index() {
  const [tab, setTab] = useState<"home" | "business">("home");
  const [dark, setDark] = useState(false);
  const [selectedPro, setSelectedPro] = useState<Pro | null>(null);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("chamaserv-theme");
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggleDark = (v: boolean) => {
    setDark(v);
    document.documentElement.classList.toggle("dark", v);
    localStorage.setItem("chamaserv-theme", v ? "dark" : "light");
  };
  const services = tab === "home" ? servicesHome : servicesBusiness;
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="ChamaServ" className="h-10 w-auto" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#servicos" className="hover:text-foreground">Meu lar</a>
            <a href="#servicos" className="hover:text-foreground">Minha empresa</a>
            <a href="#para-pros" className="hover:text-foreground">Trabalhe no app</a>
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <a href="#profissionais" className="hover:text-foreground">Ajuda</a>
          </nav>
          <div className="flex items-center gap-2">
            <label className="mr-2 hidden items-center gap-2 rounded-full border border-border bg-card/60 px-2.5 py-1.5 text-xs text-muted-foreground sm:inline-flex">
              <Sun className={`h-3.5 w-3.5 ${dark ? "" : "text-primary"}`} />
              <Switch checked={dark} onCheckedChange={toggleDark} aria-label="Alternar tema escuro" />
              <Moon className={`h-3.5 w-3.5 ${dark ? "text-primary" : ""}`} />
            </label>
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Entrar</Link>
            </Button>
            <Button asChild variant="flame" size="sm">
              <Link to="/cadastro">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Navy backdrop blob like the splash screen */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full bg-secondary/95" />
          <div className="absolute -top-10 left-[28%] h-32 w-32 rounded-full bg-primary/90 blur-2xl opacity-60" />
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="flex flex-col">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-secondary shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" /> ChamaServ · Fortaleza-CE
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Conectando pessoas a <span className="text-primary">profissionais</span> qualificados.
            </h1>
            <ul className="mt-8 space-y-4 text-base text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <TrendingUp className="h-4 w-4" />
                </span>
                <span><strong className="text-foreground">Mais de 12 mil</strong> serviços realizados em Fortaleza desde 2024 e crescendo.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span>Profissionais <strong className="text-foreground">aprovados e verificados</strong> com documentos validados.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>Disponível em mais de 121 bairros, <strong className="text-foreground">até mesmo para daqui 1 hora</strong>.</span>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="flame" size="xl">
                <a href="#servicos">Ver serviços</a>
              </Button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> 4.9 / 5</span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> SSL seguro</span>
                <span className="h-3 w-px bg-border" />
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Verificado</span>
              </div>
            </div>
          </div>

          {/* Phone mockup — Tela Inicial */}
          <div className="relative mx-auto w-full max-w-[340px]">
            <div className="absolute -bottom-6 -right-6 hidden h-[88%] w-[88%] rounded-[2.5rem] bg-primary/90 lg:block" />
            <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-foreground/90 bg-background shadow-[var(--shadow-flame)]">
              {/* status bar */}
              <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-foreground/80">
                <span>9:41</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-foreground/70" /><span className="h-1.5 w-1.5 rounded-full bg-foreground/70" /><span className="h-1.5 w-1.5 rounded-full bg-foreground/70" /></span>
              </div>
              {/* location bar */}
              <div className="flex items-center justify-between px-5 pt-4">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-secondary">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Fortaleza - CE
                </span>
                <Bell className="h-4 w-4 text-secondary" />
              </div>
              {/* greeting */}
              <div className="px-5 pt-4">
                <h3 className="text-xl font-extrabold leading-tight text-secondary">
                  Olá, João! <span className="text-primary">👋</span>
                </h3>
                <p className="text-xl font-extrabold leading-tight text-secondary">Como podemos<br/>te ajudar hoje?</p>
              </div>
              {/* search */}
              <div className="px-5 pt-4">
                <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/70 p-1.5 pl-3">
                  <span className="text-[11px] text-muted-foreground flex-1 truncate">Buscar serviço ou profissional...</span>
                  <button className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-primary-foreground">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {/* categories */}
              <div className="px-5 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary">Categorias populares</span>
                  <span className="text-[10px] font-semibold text-primary">Ver todas</span>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2 text-center">
                  {[
                    { i: Plug, n: "Eletricista" },
                    { i: Paintbrush, n: "Pintor" },
                    { i: Sparkles, n: "Diarista" },
                    { i: Hammer, n: "Pedreiro" },
                    { i: Wrench, n: "Encanador" },
                  ].map(({ i: I, n }) => (
                    <div key={n} className="flex flex-col items-center gap-1">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-muted text-secondary">
                        <I className="h-4 w-4" />
                      </span>
                      <span className="text-[9px] font-semibold text-secondary/80">{n}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* verified card */}
              <div className="px-5 pt-5">
                <div className="flex items-center gap-3 rounded-2xl bg-secondary p-4 text-secondary-foreground">
                  <div>
                    <p className="text-xs font-bold leading-snug">Profissionais verificados<br/>e avaliados por quem<br/>realmente contratou!</p>
                  </div>
                  <span className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                </div>
              </div>
              {/* tab bar */}
              <div className="mt-5 grid grid-cols-5 border-t border-border bg-card py-2 text-[9px] font-semibold text-muted-foreground">
                {[
                  { i: Home, n: "Início", a: true },
                  { i: Search, n: "Buscar" },
                  { i: ClipboardList, n: "Solicitações" },
                  { i: MessageSquare, n: "Mensagens" },
                  { i: User, n: "Perfil" },
                ].map(({ i: I, n, a }) => (
                  <div key={n} className={`flex flex-col items-center gap-0.5 ${a ? "text-primary" : ""}`}>
                    <I className="h-4 w-4" />
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -left-4 bottom-10 flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-[11px] font-semibold shadow-[var(--shadow-soft)]">
              <span className="grid h-6 w-6 place-items-center rounded-full text-primary-foreground" style={{ backgroundImage: "var(--gradient-flame)" }}>
                <Flame className="h-3 w-3" />
              </span>
              +12 mil serviços
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES with Tabs */}
      <section id="servicos" className="bg-muted/60">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Escolha o serviço ideal</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Tudo o que sua casa ou empresa precisa, com profissionais verificados em Fortaleza.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-border bg-muted p-1 text-sm font-semibold">
            <button
              onClick={() => setTab("home")}
              className={`rounded-full px-5 py-2 transition-colors ${tab === "home" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              PARA O SEU LAR
            </button>
            <button
              onClick={() => setTab("business")}
              className={`rounded-full px-5 py-2 transition-colors ${tab === "business" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              PARA SUA EMPRESA
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, tag, name, desc, availability }) => (
            <article
              key={name}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-flame)]"
            >
              {tag && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
                  {tag}
                </span>
              )}
              <div className="relative grid h-44 place-items-center" style={{ backgroundImage: "var(--gradient-ember)" }}>
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="h-10 w-10" />
                </div>
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-lg font-bold">{name}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Clock className="h-3.5 w-3.5" /> {availability}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      </section>

      {/* PROS */}
      <section id="profissionais" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Profissionais em destaque</h2>
            <p className="mt-2 text-sm text-muted-foreground">Selecionados pelas melhores avaliações desta semana.</p>
          </div>
          <Button variant="outline" size="sm">Ver todos os profissionais</Button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pros.map((p) => (
            <article
              key={p.name}
              onClick={() => { setSelectedPro(p); setOpenModal(true); }}
              className="cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
            >
              <div className="relative h-32" style={{ backgroundImage: "var(--gradient-flame)" }}>
                <div className="absolute bottom-0 left-6 translate-y-1/2">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl border-4 border-card bg-secondary text-secondary-foreground text-lg font-bold">
                    {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                </div>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-foreground">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {p.rating}
                </span>
              </div>
              <div className="px-6 pb-6 pt-12">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.job}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.area}</span>
                  <span className="font-semibold text-primary">{p.price}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{p.reviews} avaliações</div>
                <Button variant="flame" size="sm" className="mt-4 w-full" onClick={(e) => { e.stopPropagation(); setSelectedPro(p); setOpenModal(true); }}>Ver perfil</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Como funciona</span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Em 3 passos seu serviço está agendado</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: Smartphone, title: "Escolha o serviço", desc: "Selecione a categoria, o bairro e o melhor horário no app." },
              { icon: MessageCircle, title: "Converse com o pro", desc: "Chat direto com o profissional para alinhar tudo antes." },
              { icon: CalendarCheck, title: "Agende e avalie", desc: "Acompanhe o status, pague online e deixe sua avaliação." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="relative rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                <span className="absolute right-6 top-6 font-display text-4xl font-bold text-primary/40">0{i + 1}</span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/75">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA PROS */}
      <section id="para-pros" className="mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-24 md:pb-40">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16" style={{ backgroundImage: "var(--gradient-flame)" }}>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div className="text-primary-foreground">
              <h2 className="text-3xl font-bold md:text-5xl">Trabalhe no app. Sua agenda cheia começa aqui.</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/90">
                Cadastre-se grátis, receba pedidos qualificados na sua região e construa sua reputação com avaliações transparentes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="secondary" size="xl">
                  <Link to="/cadastro">Cadastrar como profissional</Link>
                </Button>
                <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-white/10">Saiba mais</Button>
              </div>
            </div>
            <ul className="space-y-4 text-primary-foreground">
              {["Sem mensalidade para começar", "Verificação de perfil que gera confiança", "Painel com agenda, chat e pagamentos", "Visibilidade segmentada por bairro"].map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5" />
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-8 border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <img src={logo} alt="ChamaServ" className="h-9 w-auto" />
          <p className="text-sm text-muted-foreground">© 2026 ChamaServ · Fortaleza-CE · Projeto Integrador SENAC</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacidade</a>
            <a href="#" className="hover:text-foreground">Termos</a>
            <a href="#" className="hover:text-foreground">Contato</a>
          </div>
        </div>
      </footer>

      {/* PROFESSIONAL MODAL */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        {selectedPro && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-secondary text-secondary-foreground text-xl font-bold">
                  {selectedPro.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <DialogTitle className="text-xl">{selectedPro.name}</DialogTitle>
                  <DialogDescription className="text-sm">{selectedPro.job}</DialogDescription>
                  <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {selectedPro.rating} · {selectedPro.reviews} avaliações
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-5">
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedPro.about}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 text-xs">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="font-medium">{selectedPro.experience} de experiência</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 text-xs">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="font-medium">{selectedPro.jobs} serviços</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Diferenciais</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPro.badges.map((b) => (
                    <span key={b} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      <BadgeCheck className="h-3 w-3" /> {b}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Especialidades</h4>
                <ul className="space-y-1.5">
                  {selectedPro.specialties.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 text-xs">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-medium">{selectedPro.schedule}</span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {selectedPro.area}
                </div>
                <span className="text-sm font-bold text-primary">{selectedPro.price}</span>
              </div>

              <Button variant="flame" className="w-full" asChild>
                <Link to="/solicitar">Solicitar serviço</Link>
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
