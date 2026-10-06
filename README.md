# Landing page Juliana Diniz

Next.js 16 + Tailwind CSS 4 + Motion (animações). Textos em `lib/content.ts`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

- **WhatsApp:** preencher `WHATSAPP.number` em `lib/content.ts` (DDI+DDD+número, só dígitos). Todos os CTAs usam esse link.
- **Placeholders:** itens "a definir" no rodapé, FAQ e "Quem conduz" aguardam dados da cliente.
- **Preloader:** `components/Preloader.tsx` (tempo mínimo em `MIN_MS`). Animação de texto: `SplitText.tsx` (palavras/letras sobem de dentro de uma máscara). Entrada de blocos: `Reveal.tsx`.
- **Scroll suave:** Lenis (`components/Providers.tsx`, opções `lerp`/`wheelMultiplier`); trava durante o preloader e respeita `prefers-reduced-motion`. Âncoras (`#solucoes`) rolam suavemente.
- **Cursor:** `components/Cursor.tsx`, só com mouse (ponteiro fino); ponto + anel, vira lente sálvia com seta sobre links/botões. Esconde o cursor nativo via classe `has-cursor` no `<html>`.
- **Barra de rolagem:** estilizada em `app/globals.css` (trilho marinho, polegar sálvia).
- **Ícones:** recortados da folha oficial do manual em `public/icons/{navy,white}`; logos em `public/logo`; hero em `public/images`.

## SEO, segurança e domínio

Domínio final previsto: `https://julianadinizesg.com.br` (ainda não ativo). Tudo é derivado de `lib/site.ts`.

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública (canonical, OG, sitemap, JSON-LD). Padrão: `https://julianadinizesg.com.br`. |
| `NEXT_PUBLIC_CLARITY_ID` | ID do projeto Microsoft Clarity. Sem ele nenhum script de análise é carregado; com ele, só após o "Aceitar" do banner (`components/CookieConsent.tsx`). Também libera o Clarity na CSP. |
| `NEXT_PUBLIC_NOINDEX=true` | Staging: robots.txt `Disallow: /`, meta `noindex` e header `X-Robots-Tag`. |

- **Metadados:** título, descrição, canonical, `hreflang pt-BR`, Open Graph e Twitter em `app/layout.tsx`. Imagem de compartilhamento: `public/og.jpg` (1200×630).
- **JSON-LD:** `components/JsonLd.tsx` (WebSite, WebPage, Organization/ProfessionalService, Person, Service/OfferCatalog, FAQPage), montado a partir de `lib/content.ts`. Quando houver número de WhatsApp, entra `contactPoint`; o LinkedIn entra como `sameAs` da Person.
- **Arquivos gerados:** `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, ícones (`app/icon.svg`, `app/apple-icon.png`, `app/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`) e `app/not-found.tsx`. Atualizar `LAST_MODIFIED` em `lib/site.ts` quando o conteúdo mudar.
- **Headers de segurança e redirects:** `next.config.ts` (HSTS, CSP em produção, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP/CORP/COEP). A CSP mantém `'unsafe-inline'` em script e style porque a página é estática; endurecer exige nonce com renderização dinâmica.
- **HTTPS forçado:** o redirect `http→https` e `www→apex` está no `next.config.ts` e depende do proxy enviar `x-forwarded-proto`. Na hospedagem, ative também "forçar HTTPS" e o redirect de www.
- **Depois do domínio ativo:** testar em securityheaders.com e no Rich Results Test; considerar HSTS preload (hstspreload.org) só quando todos os subdomínios estiverem em HTTPS.

## Scripts

- `python scripts/gerar-og.py` regenera `public/og.jpg` a partir do hero (precisa de `pip install pillow`).
- `node scripts/gerar-icones.mjs <pasta-temp>` regenera os ícones do app a partir do monograma.
