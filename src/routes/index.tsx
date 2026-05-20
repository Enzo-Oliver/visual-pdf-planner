import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, ShieldCheck, MapPin, CheckCircle2, Clock, Star,
  Wrench, Paintbrush, Plug, Sparkles, Hammer, Scissors,
  Smartphone, MessageCircle, CalendarCheck, Flame, ArrowRight,
} from "lucide-react";
import heroPro from "@/assets/hero-pro.jpg";

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
  { name: "Carla Mendes", job: "Diarista premium", rating: 4.9, reviews: 142, area: "Aldeota · 2 km", price: "R$ 130/diária" },
  { name: "Roberto Lima", job: "Eletricista certificado", rating: 5.0, reviews: 89, area: "Meireles · 3 km", price: "R$ 90/serviço" },
  { name: "Juliana Souza", job: "Pintora residencial", rating: 4.8, reviews: 64, area: "Cocó · 5 km", price: "Orçamento" },
];

function Index() {
  const [tab, setTab] = useState<"home" | "business">("home");
  const services = tab === "home" ? servicesHome : servicesBusiness;
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-flame)" }}>
              <Flame className="h-5 w-5" />
            </span>
            ChamaServ
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#servicos" className="hover:text-foreground">Meu lar</a>
            <a href="#servicos" className="hover:text-foreground">Minha empresa</a>
            <a href="#para-pros" className="hover:text-foreground">Trabalhe no app</a>
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <a href="#profissionais" className="hover:text-foreground">Ajuda</a>
          </nav>
          <div className="flex items-center gap-2">
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Serviços para o seu lar com <span className="text-primary">praticidade</span> e qualidade.
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
                <span>Disponível em mais de 30 bairros, <strong className="text-foreground">até mesmo para daqui 1 hora</strong>.</span>
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

          <div className="relative">
            {/* teal accent block, parafuzo-style */}
            <div className="absolute -bottom-4 -right-4 hidden h-[88%] w-[88%] rounded-[2rem] bg-primary/90 lg:block" />
            <img
              src={heroPro}
              alt="Profissional ChamaServ atendendo em Fortaleza"
              width={1080}
              height={1620}
              className="relative h-[460px] w-full rounded-[2rem] object-cover shadow-[var(--shadow-soft)]"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-card px-4 py-2 text-xs font-semibold shadow-[var(--shadow-soft)]">
              <span className="grid h-7 w-7 place-items-center rounded-full text-primary-foreground" style={{ backgroundImage: "var(--gradient-flame)" }}>
                <Flame className="h-3.5 w-3.5" />
              </span>
              +12 mil serviços
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES with Tabs */}
      <section id="servicos" className="mx-auto max-w-7xl px-6 py-20">
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
            <article key={p.name} className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1">
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
                <Button variant="flame" size="sm" className="mt-4 w-full">Ver perfil</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="bg-muted/40">
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
              <div key={title} className="relative rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
                <span className="absolute right-6 top-6 font-display text-4xl font-bold text-primary/15">0{i + 1}</span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA PROS */}
      <section id="para-pros" className="mx-auto max-w-7xl px-6 pb-24">
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
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg text-primary-foreground" style={{ backgroundImage: "var(--gradient-flame)" }}>
              <Flame className="h-4 w-4" />
            </span>
            ChamaServ
          </div>
          <p className="text-sm text-muted-foreground">© 2026 ChamaServ · Fortaleza-CE · Projeto Integrador SENAC</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacidade</a>
            <a href="#" className="hover:text-foreground">Termos</a>
            <a href="#" className="hover:text-foreground">Contato</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
