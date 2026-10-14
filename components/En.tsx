// Termos em inglês saem em itálico. Para incluir outro, é só acrescentar à lista.
// Siglas (ESG, CDP, SPO...), nomes próprios e palavras já incorporadas (site, e-mail, cookies) ficam de fora.
const TERMOS = /\b(framework|second party opinion|as a service|ratings?|performance|millennials|the accounting review)\b/gi;

export default function En({ children }: { children: string }) {
  return <>{children.split(TERMOS).map((s, i) => (i % 2 ? <em key={i}>{s}</em> : s))}</>;
}
