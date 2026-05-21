export type Solicitacao = {
  id: string;
  cliente: string;
  servico: string;
  descricao: string;
  endereco: string;
  data: string;
  hora: string;
  status: "pendente" | "aceita" | "concluida";
  criadaEm: string;
};

const KEY = "chamaserv:solicitacoes";
const USER_KEY = "chamaserv:user";

export type UsuarioAtual = {
  nome: string;
  email: string;
  tipo: "cliente" | "prestador";
  servico?: string;
} | null;

export function getUsuario(): UsuarioAtual {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch { return null; }
}
export function setUsuario(u: NonNullable<UsuarioAtual>) {
  localStorage.setItem(USER_KEY, JSON.stringify(u));
}
export function logout() { localStorage.removeItem(USER_KEY); }

export function listSolicitacoes(): Solicitacao[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function addSolicitacao(s: Omit<Solicitacao, "id" | "criadaEm" | "status">): Solicitacao {
  const nova: Solicitacao = {
    ...s,
    id: crypto.randomUUID(),
    criadaEm: new Date().toISOString(),
    status: "pendente",
  };
  const all = listSolicitacoes();
  all.unshift(nova);
  localStorage.setItem(KEY, JSON.stringify(all));
  return nova;
}
export function updateStatus(id: string, status: Solicitacao["status"]) {
  const all = listSolicitacoes().map((s) => (s.id === id ? { ...s, status } : s));
  localStorage.setItem(KEY, JSON.stringify(all));
}
