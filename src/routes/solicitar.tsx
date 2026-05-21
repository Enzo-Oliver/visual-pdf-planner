import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MapPin,
  CalendarDays,
  Clock,
  Wrench,
  CheckCircle2,
  Search,
} from "lucide-react";
import logo from "@/assets/logo-chamaserv.png";
import { addSolicitacao, getUsuario } from "@/lib/solicitacoes";

export const Route = createFileRoute("/solicitar")({
  component: SolicitarPage,
  head: () => ({
    meta: [
      { title: "Solicitar serviço — ChamaServ" },
      {
        name: "description",
        content:
          "Solicite um profissional verificado: escolha o serviço, informe o endereço e agende um horário.",
      },
    ],
  }),
});

const SERVICOS = [
  "Eletricista",
  "Pedreiro",
  "Diarista",
  "Pintor",
  "Encanador",
  "Jardineiro",
] as const;

function SolicitarPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [servico, setServico] = useState<string>("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("Av. Beira Mar, Fortaleza - CE");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(endereco || "Fortaleza, CE");
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [endereco]);

  function next() {
    setStep((s) => {
      const novo = s < 4 ? ((s + 1) as 2 | 3 | 4) : s;
      if (s === 3 && novo === 4) {
        const u = getUsuario();
        addSolicitacao({
          cliente: u?.email || "anonimo@chamaserv",
          servico,
          descricao,
          endereco,
          data,
          hora,
        });
      }
      return novo;
    });
  }
  function prev() {
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  }

  return (
    <main className="min-h-screen bg-muted/40">
      {/* Top bar */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ChamaServ" className="h-9 w-auto" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Sair
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Solicitar um profissional
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Em poucos passos você encontra alguém de confiança perto de você.
          </p>
        </div>

        {/* Stepper */}
        <Stepper step={step} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Form panel */}
          <section className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl font-semibold">
                  Qual serviço você precisa?
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {SERVICOS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setServico(s)}
                      className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition ${
                        servico === s
                          ? "border-primary bg-primary/5 shadow-[var(--shadow-flame)]"
                          : "border-border bg-background hover:border-primary/40"
                      }`}
                    >
                      <Wrench
                        className={`h-5 w-5 ${
                          servico === s ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm font-medium">{s}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descreva o que precisa</Label>
                  <Textarea
                    id="descricao"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    placeholder="Ex.: Tomada da sala não funciona, preciso trocar..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl font-semibold">
                  Onde será o serviço?
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço completo</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="endereco"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      placeholder="Rua, número, bairro, cidade"
                      className="h-11 pl-9 pr-24"
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2"
                    >
                      <Search className="h-3.5 w-3.5" /> Buscar
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use o mapa ao lado para confirmar a localização.
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-border">
                  <iframe
                    title="Mapa do endereço"
                    src={mapSrc}
                    className="h-72 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl font-semibold">
                  Quando podemos ir?
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="data">Data</Label>
                    <div className="relative">
                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="data"
                        type="date"
                        min={today}
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="h-11 pl-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora">Horário</Label>
                    <div className="relative">
                      <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="hora"
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        className="h-11 pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Sugestões rápidas</p>
                  <div className="flex flex-wrap gap-2">
                    {["08:00", "10:00", "13:00", "15:00", "17:00"].map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHora(h)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          hora === h
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:border-primary/40"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold">
                  Solicitação enviada!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Estamos avisando os profissionais próximos. Você receberá
                  propostas em instantes no seu WhatsApp.
                </p>
                <div className="mx-auto max-w-sm rounded-xl border border-border bg-muted/50 p-4 text-left text-sm">
                  <p><span className="font-semibold">Serviço:</span> {servico || "—"}</p>
                  <p><span className="font-semibold">Endereço:</span> {endereco}</p>
                  <p>
                    <span className="font-semibold">Quando:</span>{" "}
                    {data ? new Date(data).toLocaleDateString("pt-BR") : "—"}
                    {hora ? ` às ${hora}` : ""}
                  </p>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <Button variant="outline" onClick={() => navigate({ to: "/minhas-solicitacoes" })}>
                    Ver minhas solicitações
                  </Button>
                  <Button
                    variant="flame"
                    onClick={() => {
                      setStep(1);
                      setServico("");
                      setDescricao("");
                      setData("");
                      setHora("");
                    }}
                  >
                    Nova solicitação
                  </Button>
                </div>
              </div>
            )}

            {step < 4 && (
              <div className="mt-8 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prev}
                  disabled={step === 1}
                >
                  Voltar
                </Button>
                <Button
                  type="button"
                  variant="flame"
                  size="lg"
                  onClick={next}
                  disabled={
                    (step === 1 && !servico) ||
                    (step === 2 && !endereco.trim()) ||
                    (step === 3 && (!data || !hora))
                  }
                >
                  {step === 3 ? "Confirmar solicitação" : "Continuar"}
                </Button>
              </div>
            )}
          </section>

          {/* Side preview */}
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
              <iframe
                title="Pré-visualização do mapa"
                src={mapSrc}
                className="h-48 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Localização
                </p>
                <p className="mt-1 text-sm font-medium">{endereco || "—"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Resumo
              </p>
              <dl className="mt-2 space-y-1.5 text-sm">
                <Row k="Serviço" v={servico || "—"} />
                <Row k="Data" v={data ? new Date(data).toLocaleDateString("pt-BR") : "—"} />
                <Row k="Horário" v={hora || "—"} />
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-foreground">{v}</dd>
    </div>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
  const items = [
    { n: 1, label: "Serviço" },
    { n: 2, label: "Endereço" },
    { n: 3, label: "Agendamento" },
    { n: 4, label: "Pronto" },
  ];
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {items.map((it, i) => {
        const active = step === it.n;
        const done = step > it.n;
        return (
          <li key={it.n} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-flame)]"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? "✓" : it.n}
            </div>
            <span
              className={`hidden text-sm sm:inline ${
                active || done ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {it.label}
            </span>
            {i < items.length - 1 && (
              <div className={`h-px flex-1 ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}