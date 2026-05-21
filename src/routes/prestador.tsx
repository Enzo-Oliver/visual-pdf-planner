import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, CalendarDays, Clock, Wrench, Filter, CheckCircle2 } from "lucide-react";
import logo from "@/assets/logo-chamaserv.png";
import {
  getUsuario,
  listSolicitacoes,
  logout,
  updateStatus,
  type Solicitacao,
} from "@/lib/solicitacoes";

export const Route = createFileRoute("/prestador")({
  component: PrestadorPage,
  head: () => ({
    meta: [{ title: "Painel do prestador — ChamaServ" }],
  }),
});

function PrestadorPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Solicitacao[]>([]);
  const [user, setUser] = useState<{ nome: string; servico?: string } | null>(null);
  const [somenteMinhaArea, setSomenteMinhaArea] = useState(true);

  function refresh() {
    setItems(listSolicitacoes());
  }

  useEffect(() => {
    const u = getUsuario();
    if (!u || u.tipo !== "prestador") {
      navigate({ to: "/login" });
      return;
    }
    setUser({ nome: u.nome, servico: u.servico });
    refresh();
  }, [navigate]);

  const visiveis = useMemo(() => {
    if (!somenteMinhaArea || !user?.servico) return items;
    return items.filter((s) => s.servico === user.servico);
  }, [items, somenteMinhaArea, user]);

  function aceitar(id: string) {
    updateStatus(id, "aceita");
    refresh();
  }
  function concluir(id: string) {
    updateStatus(id, "concluida");
    refresh();
  }

  return (
    <main className="min-h-screen bg-muted/40">
      <header className="border-b border-border bg-secondary text-secondary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="ChamaServ" className="h-9 w-auto bg-white/95 rounded-md p-1" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm opacity-90 sm:inline">
              {user?.nome} {user?.servico && `· ${user.servico}`}
            </span>
            <button
              onClick={() => { logout(); navigate({ to: "/" }); }}
              className="inline-flex items-center gap-1 text-sm opacity-90 hover:opacity-100"
            >
              <ArrowLeft className="h-4 w-4" /> Sair
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Solicitações de clientes
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Veja os pedidos em aberto e aceite os que cabem na sua agenda.
            </p>
          </div>
          {user?.servico && (
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm shadow-[var(--shadow-soft)]">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <input
                type="checkbox"
                className="h-4 w-4 accent-[oklch(0.70_0.19_50)]"
                checked={somenteMinhaArea}
                onChange={(e) => setSomenteMinhaArea(e.target.checked)}
              />
              Somente {user.servico}
            </label>
          )}
        </div>

        {visiveis.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma solicitação no momento. Volte em instantes.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {visiveis.map((s) => (
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
                  <p className="mt-3 rounded-lg bg-muted/60 p-3 text-sm">{s.descricao}</p>
                )}

                <dl className="mt-3 space-y-1.5 text-sm">
                  <Row icon={MapPin} v={s.endereco} />
                  <Row
                    icon={CalendarDays}
                    v={s.data ? new Date(s.data).toLocaleDateString("pt-BR") : "—"}
                  />
                  <Row icon={Clock} v={s.hora || "—"} />
                </dl>

                <div className="mt-4 flex gap-2">
                  {s.status === "pendente" && (
                    <Button variant="flame" size="sm" onClick={() => aceitar(s.id)}>
                      Aceitar serviço
                    </Button>
                  )}
                  {s.status === "aceita" && (
                    <Button variant="night" size="sm" onClick={() => concluir(s.id)}>
                      <CheckCircle2 className="h-4 w-4" /> Marcar como concluído
                    </Button>
                  )}
                  {s.status === "concluida" && (
                    <span className="text-xs text-muted-foreground">Serviço finalizado</span>
                  )}
                </div>
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
    pendente: "bg-amber-100 text-amber-800",
    aceita: "bg-blue-100 text-blue-800",
    concluida: "bg-emerald-100 text-emerald-800",
  } as const;
  const label = { pendente: "Pendente", aceita: "Aceita", concluida: "Concluída" }[status];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${map[status]}`}>
      {label}
    </span>
  );
}
