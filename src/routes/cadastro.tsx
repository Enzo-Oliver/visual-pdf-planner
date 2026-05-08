import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flame, Mail, Lock, User, Phone, ArrowLeft, Wrench, UserRound } from "lucide-react";

export const Route = createFileRoute("/cadastro")({
  component: CadastroPage,
  head: () => ({
    meta: [
      { title: "Criar conta — ChamaServ" },
      { name: "description", content: "Cadastre-se gratuitamente como cliente ou prestador de serviço na ChamaServ e comece em minutos." },
    ],
  }),
});

type Tipo = "cliente" | "prestador";

function CadastroPage() {
  const [tipo, setTipo] = useState<Tipo>("cliente");
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", senha: "", servico: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    setTimeout(() => {
      setSubmitting(false);
      setMsg(`Cadastro de ${tipo} simulado com sucesso! (ative o Lovable Cloud para salvar de verdade)`);
    }, 800);
  }

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <section className="flex items-center justify-center bg-background px-6 py-12 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>

          <h1 className="font-display text-3xl font-bold tracking-tight">Crie sua conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Já possui cadastro?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">Entrar</Link>
          </p>

          {/* Tipo */}
          <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl border border-border bg-muted/40 p-1">
            {([
              { id: "cliente", label: "Sou cliente", Icon: UserRound },
              { id: "prestador", label: "Sou prestador", Icon: Wrench },
            ] as const).map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTipo(id)}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  tipo === id
                    ? "bg-card text-foreground shadow-[var(--shadow-soft)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <Field id="nome" label="Nome completo" icon={User} value={form.nome} onChange={(v) => update("nome", v)} placeholder="Seu nome" />
            <Field id="email" label="E-mail" icon={Mail} type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="voce@email.com" />
            <Field id="telefone" label="Telefone (WhatsApp)" icon={Phone} value={form.telefone} onChange={(v) => update("telefone", v)} placeholder="(85) 9 9999-9999" />

            {tipo === "prestador" && (
              <div className="space-y-2">
                <Label htmlFor="servico">Serviço principal</Label>
                <select
                  id="servico"
                  required
                  value={form.servico}
                  onChange={(e) => update("servico", e.target.value)}
                  className="h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Selecione...</option>
                  <option>Eletricista</option>
                  <option>Pedreiro</option>
                  <option>Diarista</option>
                  <option>Pintor</option>
                  <option>Encanador</option>
                  <option>Jardineiro</option>
                </select>
              </div>
            )}

            <Field id="senha" label="Senha" icon={Lock} type="password" value={form.senha} onChange={(v) => update("senha", v)} placeholder="Mínimo 6 caracteres" minLength={6} />

            <label className="flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-border accent-[oklch(0.68_0.22_38)]" />
              Concordo com os <a href="#" className="text-primary hover:underline">Termos</a> e{" "}
              <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
            </label>

            <Button type="submit" variant="flame" size="xl" className="w-full" disabled={submitting}>
              {submitting ? "Criando conta..." : "Criar conta"}
            </Button>

            {msg && (
              <p className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">{msg}</p>
            )}
          </form>
        </div>
      </section>

      <aside
        className="relative hidden flex-col justify-between p-10 text-primary-foreground lg:flex order-1 lg:order-2"
        style={{ backgroundImage: "var(--gradient-flame)" }}
      >
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Flame className="h-5 w-5" />
          </span>
          ChamaServ
        </Link>
        <div className="space-y-4">
          <h2 className="font-display text-4xl font-bold leading-tight">Acende a chama da sua próxima oportunidade.</h2>
          <ul className="space-y-3 text-primary-foreground/90">
            <li>✓ Cadastro 100% gratuito</li>
            <li>✓ Perfis verificados geram mais confiança</li>
            <li>✓ Receba pedidos por bairro</li>
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">© 2026 ChamaServ · Fortaleza-CE</p>
      </aside>
    </main>
  );
}

function Field({
  id, label, icon: Icon, value, onChange, type = "text", placeholder, minLength,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  minLength?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type={type}
          required
          minLength={minLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9 h-11"
        />
      </div>
    </div>
  );
}