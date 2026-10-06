import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { Placeholder } from "@/components/Section";
import { footer } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como o site da Juliana Diniz Sustentabilidade trata dados pessoais e usa cookies, conforme a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const h2 = "mt-14 font-serif text-[1.7rem] leading-tight md:text-[2rem]";
const p = "mt-4 leading-[1.8] text-navy/80";
const ul = "mt-4 list-disc space-y-2 pl-6 leading-[1.8] text-navy/80 marker:text-sage";

export default function PrivacyPage() {
  return (
    <main className="min-h-svh bg-cream text-navy">
      <div className="mx-auto max-w-[46rem] px-6 pb-24 pt-10 md:pt-14">
        <Link href="/" className="inline-flex items-center gap-3 text-[0.8rem] tracking-wide text-navy/70 transition-colors hover:text-navy">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/monograma-fundo-claro.svg" alt="" width={552} height={647} className="h-9 w-auto" />
          <span aria-hidden>←</span> Voltar ao início
        </Link>

        <p className="eyebrow mt-14 text-sage">Privacidade</p>
        <h1 className="mt-4 font-serif text-[clamp(2.4rem,6vw,3.6rem)] leading-[1.05] tracking-[-0.02em]">Política de privacidade</h1>
        <p className="mt-6 text-[0.85rem] tracking-wide text-navy/60">
          Última atualização: <Placeholder className="text-sage-600">data a definir</Placeholder>
        </p>
        <p className={p}>
          Esta política explica, em linguagem simples, quais dados pessoais são tratados quando você visita este site e como você pode controlá-los,
          conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).
        </p>

        <h2 className={h2}>1. Quem é a responsável</h2>
        <p className={p}>
          A controladora dos dados é Juliana Diniz Abreu Andrade, que atua como Juliana Diniz Sustentabilidade.
        </p>
        <ul className={ul}>
          <li>
            Razão social e CNPJ: <Placeholder className="text-sage-600">a definir</Placeholder>
          </li>
          <li>
            Contato para assuntos de privacidade: <Placeholder className="text-sage-600">e-mail a definir</Placeholder>
          </li>
        </ul>

        <h2 className={h2}>2. Quais dados são tratados</h2>
        <ul className={ul}>
          <li>
            <strong className="font-medium text-navy">Dados que você envia ao chamar pelo WhatsApp:</strong> nome, número de telefone e o conteúdo da
            conversa. Ao clicar em &ldquo;Vamos conversar&rdquo;, um pequeno formulário pede seu nome, o assunto e como você conheceu o site, apenas para montar a
            mensagem: essas informações não são gravadas neste site, vão direto para o WhatsApp, que tem termos e política próprios (Meta).
          </li>
          <li>
            <strong className="font-medium text-navy">Dados de navegação, somente se você aceitar os cookies de análise:</strong> páginas visitadas,
            cliques, rolagem, movimentos do mouse, tipo de dispositivo, navegador, sistema operacional, resolução de tela e localização aproximada
            (país e cidade, a partir do IP). A ferramenta pode gerar gravações anônimas de sessão e mapas de calor.
          </li>
          <li>
            <strong className="font-medium text-navy">Dados técnicos de servidor:</strong> endereço IP, data e hora do acesso e navegador, registrados
            pela hospedagem para manter o site seguro e funcionando. Provedor de hospedagem:{" "}
            <Placeholder className="text-sage-600">a definir</Placeholder>.
          </li>
        </ul>

        <h2 className={h2}>3. Para que usamos e em que base legal</h2>
        <ul className={ul}>
          <li>
            <strong className="font-medium text-navy">Responder ao seu contato e a pedidos de proposta:</strong> procedimentos preliminares a pedido do
            titular e legítimo interesse (art. 7º, V e IX, da LGPD).
          </li>
          <li>
            <strong className="font-medium text-navy">Entender como o site é usado e melhorá-lo:</strong> seu consentimento (art. 7º, I). Sem o aceite,
            nenhuma ferramenta de análise é carregada.
          </li>
          <li>
            <strong className="font-medium text-navy">Segurança e funcionamento do site:</strong> legítimo interesse (art. 7º, IX).
          </li>
        </ul>

        <h2 className={h2}>4. Cookies</h2>
        <p className={p}>Este site usa dois tipos de armazenamento no seu navegador:</p>
        <ul className={ul}>
          <li>
            <strong className="font-medium text-navy">Essencial:</strong> guarda a sua escolha sobre cookies (aceitou ou recusou), para não perguntar
            de novo a cada visita. Não identifica você.
          </li>
          <li>
            <strong className="font-medium text-navy">Análise (só com o seu aceite):</strong> o Microsoft Clarity define cookies como <code>_clck</code>{" "}
            (identificador do navegador, até 1 ano) e <code>_clsk</code> (agrupa as páginas de uma mesma visita, cerca de 1 dia) para medir o uso do site.
          </li>
        </ul>
        <p className={p}>
          Você pode mudar de ideia a qualquer momento, inclusive revogando o consentimento:{" "}
          <CookieSettingsButton className="font-medium text-navy underline decoration-sage underline-offset-4 transition-colors hover:text-sage-600" />.
        </p>

        <h2 className={h2}>5. Com quem os dados podem ser compartilhados</h2>
        <ul className={ul}>
          <li>Microsoft (Clarity), apenas se você aceitar os cookies de análise.</li>
          <li>Meta (WhatsApp), quando você inicia uma conversa.</li>
          <li>Provedor de hospedagem do site.</li>
        </ul>
        <p className={p}>
          Esses fornecedores podem tratar dados fora do Brasil, observadas as garantias do art. 33 da LGPD. Não vendemos dados pessoais.
        </p>

        <h2 className={h2}>6. Por quanto tempo guardamos</h2>
        <p className={p}>
          Conversas de contato: pelo tempo necessário ao atendimento, à relação comercial e ao cumprimento de obrigações legais (prazo:{" "}
          <Placeholder className="text-sage-600">a definir</Placeholder>). Dados de análise: pelo prazo de retenção da ferramenta, que são eliminados
          depois disso.
        </p>

        <h2 className={h2}>7. Seus direitos</h2>
        <p className={p}>Nos termos do art. 18 da LGPD, você pode, a qualquer momento:</p>
        <ul className={ul}>
          <li>confirmar se tratamos seus dados e acessá-los;</li>
          <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
          <li>pedir anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade;</li>
          <li>pedir a portabilidade dos dados;</li>
          <li>saber com quem os dados foram compartilhados;</li>
          <li>revogar o consentimento e se opor a tratamentos feitos com base em legítimo interesse.</li>
        </ul>
        <p className={p}>
          Para exercer qualquer desses direitos, escreva para <Placeholder className="text-sage-600">e-mail a definir</Placeholder>. Se entender que
          seus dados foram tratados de forma inadequada, você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
        </p>

        <h2 className={h2}>8. Segurança e crianças</h2>
        <p className={p}>
          Adotamos medidas técnicas razoáveis para proteger os dados (conexão HTTPS e cabeçalhos de segurança). O site é voltado a empresas e não coleta
          intencionalmente dados de crianças e adolescentes.
        </p>

        <h2 className={h2}>9. Mudanças nesta política</h2>
        <p className={p}>
          Esta política pode ser atualizada. A data da última revisão aparece no topo desta página.
        </p>
      </div>

      <div className="border-t border-navy/10 px-6 py-6 text-center text-[0.75rem] tracking-wide text-navy/55">{footer.copyright}</div>
    </main>
  );
}
