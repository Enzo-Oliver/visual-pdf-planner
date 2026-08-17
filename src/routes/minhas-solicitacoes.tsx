import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, CalendarDays, Clock, Wrench, Plus } from "lucide-react";
import logo from "@/assets/logo-chamaserv.png";
import { getUsuario, listSolicitacoes, logout, type Solicitacao } from "@/lib/solicitacoes";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/minhas-solicitacoes")({
  component: MinhasSolicitacoesPage,
  head: () => ({
    meta: [{ title: "Minhas solicitações — ChamaServ" }],
  }),
});

function MinhasSolicitacoesPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Solicitacao[]>([]);
  const [nome, setNome] = useState<string>("");

  useEffect(() => {
    const u = getUsuario();
    if (!u) {
      navigate({ to: "/login" });
      return;
    }
    setNome(u.nome || "Cliente");
    const all = listSolicitacoes().filter((s) => s.cliente === u.email);
    setItems(all);
  }, [navigate]);

  return (
    <main className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ChamaServ" className="h-9 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="hidden text-sm text-muted-foreground sm:inline">Olá, {nome}</span>
            <button
              onClick={() => { logout(); navigate({ to: "/" }); }}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Minhas solicitações</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acompanhe os pedidos que você fez na ChamaServ.
            </p>
          </div>
          <Button variant="flame" size="lg" onClick={() => navigate({ to: "/solicitar" })}>
            <Plus className="h-4 w-4" /> Nova solicitação
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Você ainda não fez nenhuma solicitação.
            </p>
            <Button variant="flame" className="mt-4" onClick={() => navigate({ to: "/solicitar" })}>
              Solicitar agora
            </Button>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {items.map((s) => (
              <li
                key={s.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Wrench className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold">{s.servico}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(s.criadaEm).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={s.status} />
                </div>
                {s.descricao && (
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{s.descricao}</p>
                )}
                <dl className="mt-3 space-y-1.5 text-sm">
                  <Row icon={MapPin} v={s.endereco} />
                  <Row icon={CalendarDays} v={s.data ? new Date(s.data).toLocaleDateString("pt-BR") : "—"} />
                  <Row icon={Clock} v={s.hora || "—"} />
                </dl>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function Row({ icon: Icon, v }: { icon: React.ComponentType<{ className?: string }>; v: string }) {
  return (
    <div className="flex items-center gap-2 text-foreground/80">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span>{v}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: Solicitacao["status"] }) {
  const map = {
    pendente: "bg-status-pending text-status-pending-foreground",
    aceita: "bg-status-accepted text-status-accepted-foreground",
    concluida: "bg-status-done text-status-done-foreground",
  } as const;
  const label = { pendente: "Pendente", aceita: "Aceita", concluida: "Concluída" }[status];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status]}`}>
      {label}
    </span>
  );
}
