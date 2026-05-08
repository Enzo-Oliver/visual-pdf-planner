import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Search, MapPin, Star, Shield, Zap, MessageCircle, Calendar, CheckCircle2,
  Wrench, Paintbrush, Plug, Sparkles, Hammer, Scissors, ArrowRight, Flame,
} from "lucide-react";
import heroPro from "@/assets/hero-pro.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const categories = [
  { icon: Plug, name: "Eletricista", count: "320+ profissionais" },
  { icon: Hammer, name: "Pedreiro", count: "210+ profissionais" },
  { icon: Sparkles, name: "Diarista", count: "480+ profissionais" },
  { icon: Paintbrush, name: "Pintor", count: "175+ profissionais" },
  { icon: Wrench, name: "Encanador", count: "190+ profissionais" },
  { icon: Scissors, name: "Jardineiro", count: "95+ profissionais" },
];

const pros = [
  { name: "Carla Mendes", job: "Diarista premium", rating: 4.9, reviews: 142, area: "Aldeota · 2 km", price: "R$ 130/diária" },
  { name: "Roberto Lima", job: "Eletricista certificado", rating: 5.0, reviews: 89, area: "Meireles · 3 km", price: "R$ 90/serviço" },
  { name: "Juliana Souza", job: "Pintora residencial", rating: 4.8, reviews: 64, area: "Cocó · 5 km", price: "Orçamento" },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-flame)" }}>
              <Flame className="h-5 w-5" />
            </span>
            ChamaServ
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#categorias" className="hover:text-foreground">Categorias</a>
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <a href="#profissionais" className="hover:text-foreground">Profissionais</a>
            <a href="#para-pros" className="hover:text-foreground">Sou prestador</a>
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
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{ backgroundImage: "var(--gradient-ember)" }}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Novo em Fortaleza-CE
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              Acende a <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-flame)" }}>chama</span> do seu serviço.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Conecte-se a eletricistas, pedreiros, diaristas e pintores verificados, com avaliações reais e agendamento em poucos cliques.
            </p>

            {/* Search */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.4fr_1fr_auto]">
                <label className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input className="w-full bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Que serviço você precisa?" />
                </label>
                <label className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <input className="w-full bg-transparent outline-none placeholder:text-muted-foreground" placeholder="Bairro em Fortaleza" defaultValue="Aldeota" />
                </label>
                <Button variant="flame" size="xl" className="md:w-auto">Buscar</Button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Perfis verificados</span>
              <span className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Avaliações reais</span>
              <span className="flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Resposta rápida</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] opacity-50 blur-2xl" style={{ backgroundImage: "var(--gradient-flame)" }} />
            <img
              src={heroPro}
              alt="Profissional ChamaServ sorrindo em Fortaleza ao pôr do sol"
              width={1080}
              height={1620}
              className="relative h-[560px] w-full rounded-[2rem] object-cover shadow-[var(--shadow-flame)]"
            />
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">4.9 / 5 média</div>
                <div className="text-muted-foreground">+12 mil serviços avaliados</div>
              </div>
            </div>
            <div className="absolute -top-4 right-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Verificado</div>
                <div className="text-muted-foreground">Documentos validados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categorias" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl">Categorias em alta</h2>
            <p className="mt-3 text-muted-foreground">Os serviços mais contratados na sua região hoje.</p>
          </div>
          <a href="#" className="hidden text-sm text-primary md:inline-flex items-center gap-1 font-medium">
            Ver tudo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ icon: Icon, name, count }) => (
            <a
              key={name}
              href="#"
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-flame)]"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:text-primary-foreground" style={{}}>
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-semibold">{name}</div>
              <div className="text-xs text-muted-foreground">{count}</div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como-funciona" className="bg-secondary text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Como funciona</span>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">Do clique ao serviço pronto em 3 passos.</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { icon: Search, title: "Busque", desc: "Filtre por categoria, bairro e avaliação para achar o pro ideal." },
              { icon: MessageCircle, title: "Converse", desc: "Chat integrado para alinhar escopo, valor e horário sem fricção." },
              { icon: Calendar, title: "Agende & avalie", desc: "Confirme o serviço, acompanhe o status e deixe sua nota." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl text-primary-foreground" style={{ backgroundImage: "var(--gradient-flame)" }}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-3xl font-bold opacity-30">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-secondary-foreground/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROS */}
      <section id="profissionais" className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl">Profissionais em destaque</h2>
            <p className="mt-3 text-muted-foreground">Selecionados pelas melhores avaliações desta semana.</p>
          </div>
          <Button variant="outline">Ver todos os profissionais</Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pros.map((p) => (
            <article key={p.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1">
              <div className="relative h-44" style={{ backgroundImage: "var(--gradient-flame)" }}>
                <div className="absolute bottom-0 left-6 translate-y-1/2">
                  <div className="grid h-20 w-20 place-items-center rounded-2xl border-4 border-card bg-secondary text-secondary-foreground text-2xl font-bold">
                    {p.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                </div>
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-foreground">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {p.rating}
                </span>
              </div>
              <div className="px-6 pb-6 pt-14">
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.job}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" />{p.area}</span>
                  <span className="font-semibold text-primary">{p.price}</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{p.reviews} avaliações</div>
                <Button variant="night" className="mt-5 w-full">Ver perfil</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA PROS */}
      <section id="para-pros" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16" style={{ backgroundImage: "var(--gradient-flame)" }}>
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-[1.3fr_1fr]">
            <div className="text-primary-foreground">
              <h2 className="text-4xl font-bold md:text-5xl">É prestador de serviço? Sua agenda cheia começa aqui.</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/90">
                Cadastre-se grátis, receba pedidos qualificados na sua região e construa sua reputação com avaliações transparentes.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="night" size="xl">
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
