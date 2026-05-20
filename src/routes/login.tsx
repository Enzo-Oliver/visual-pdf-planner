import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-chamaserv.png";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Entrar — ChamaServ" },
      { name: "description", content: "Acesse sua conta ChamaServ para contratar profissionais ou gerenciar seus serviços em Fortaleza." },
    ],
  }),
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    setTimeout(() => {
      setSubmitting(false);
      setMsg("Login simulado com sucesso! (ative o Lovable Cloud para autenticação real)");
    }, 700);
  }

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Brand panel */}
      <aside
        className="relative hidden flex-col justify-between p-10 text-primary-foreground lg:flex"
        style={{ backgroundImage: "var(--gradient-flame)" }}
      >
        <Link to="/" className="inline-flex items-center">
          <img src={logo} alt="ChamaServ" className="h-12 w-auto bg-white/95 rounded-xl p-2" />
        </Link>
        <div className="space-y-4">
          <h2 className="font-display text-4xl font-bold leading-tight">Bem-vindo de volta.</h2>
          <p className="max-w-md text-primary-foreground/90">
            Continue de onde parou: novos pedidos, mensagens e profissionais avaliados na sua região.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/70">© 2026 ChamaServ · Fortaleza-CE</p>
      </aside>

      {/* Form panel */}
      <section className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>

          <h1 className="font-display text-3xl font-bold tracking-tight">Entrar na sua conta</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Não tem cadastro?{" "}
            <Link to="/cadastro" className="font-semibold text-primary hover:underline">
              Crie agora
            </Link>
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <a href="#" className="text-xs text-primary hover:underline">Esqueci minha senha</a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border accent-[oklch(0.68_0.22_38)]" />
              Manter conectado
            </label>

            <Button type="submit" variant="flame" size="xl" className="w-full" disabled={submitting}>
              {submitting ? "Entrando..." : "Entrar"}
            </Button>

            {msg && (
              <p className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">{msg}</p>
            )}
          </form>

          <div className="my-8 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> ou <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" size="lg" className="w-full">Continuar com Google</Button>
        </div>
      </section>
    </main>
  );
}