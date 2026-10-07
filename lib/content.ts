// Todo o texto da página vem daqui.
// Marcadores: [[destaque]] vira palavra em destaque no título; itens com `placeholder` aguardam dado da cliente.

export const LINKEDIN = "https://www.linkedin.com/in/juliana-diniz-abreu-andrade/";

export const WHATSAPP = {
  // [PLACEHOLDER] DDI + DDD + número, só dígitos. Ex.: 5511999999999
  number: "",
  message:
    "Olá, Juliana! Vi sua página e gostaria de conversar sobre ESG e sustentabilidade na minha empresa.",
};

export const whatsappHref = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.message)}`;

// Pop-up que qualifica o lead antes de abrir o WhatsApp: a mensagem já chega com nome, assunto e origem.
export const leadForm = {
  eyebrow: "Vamos conversar",
  title: "Fale com a Juliana",
  lead: "Conte rapidinho quem é você e o que procura. A conversa já começa direcionada.",
  topics: [
    { label: "Estratégia e Governança de Sustentabilidade", about: "estratégia e governança de sustentabilidade" },
    { label: "Finanças sustentáveis", about: "finanças sustentáveis" },
    { label: "Mudanças climáticas", about: "mudanças climáticas" },
    { label: "Relatórios, índices e reportes ESG", about: "relatórios, índices e reportes ESG" },
    { label: "Assessoria", about: "assessoria em ESG" },
    { label: "Gerência ESG “as a service”", about: "gerência ESG “as a service”" },
    { label: "Ainda não sei, quero entender melhor", about: "ESG e como ele se aplica à minha empresa" },
  ],
  sources: [
    { label: "Google", how: "encontrei o seu site no Google" },
    { label: "LinkedIn", how: "vi o seu perfil no LinkedIn e cheguei ao seu site" },
    { label: "Instagram", how: "cheguei ao seu site pelo Instagram" },
    { label: "Indicação", how: "cheguei ao seu site por indicação" },
    { label: "Evento ou palestra", how: "conheci o seu trabalho em um evento" },
    { label: "Outro", how: "vi o seu site" },
  ],
  submit: "Enviar pelo WhatsApp",
  note: "Usamos o que você informa só para montar a mensagem. Nada é guardado neste site.",
};

export const nav = [
  { label: "Soluções", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Quem conduz", href: "#quem-conduz" },
  { label: "Perguntas", href: "#perguntas" },
];

export const hero = {
  eyebrow: "Consultoria em sustentabilidade e ESG",
  title: "ESG que sai do papel e entra na [[estratégia do seu]] negócio.",
  subtitle:
    "Cliente, banco ou índice cobrando dados de sustentabilidade? Construímos a estratégia com a sua empresa e conduzimos a execução ao lado do seu time.",
  cta: "Vamos conversar",
  ctaSecondary: "Conheça as soluções",
  credibility: "Mais de 20 anos conectando estratégia, clima e operação.",
};

type Source = { label: string; href: string };

export const costs = {
  eyebrow: "O custo de adiar",
  title: "Quem adia ESG não escapa da cobrança. Só perde tempo para responder.",
  intro:
    "Sua empresa já sabe o que é ESG. O risco está em ser cobrada antes de estar preparada.",
  stat: {
    value: 45,
    suffix: " mil+",
    label: "fornecedores foram solicitados a divulgar informações pelo CDP em 2025.",
    title: "Contratos e clientes",
    body: "Grandes compradores já pedem dados ambientais aos fornecedores. Sem dados e processo, cada questionário vira correria.",
    source: { label: "CDP, 2025", href: "https://www.cdp.net/en/supply-chain" } as Source,
  },
  cards: [
    {
      title: "Crédito e capital",
      body: "Os bancos seguem regras próprias de responsabilidade social, ambiental e climática (Resolução CMN 4.945/2021), e já existe crédito com condições atreladas a metas ESG. Para entrar nessa conversa, é preciso ter estratégia, metas e indicadores.",
      sources: [
        { label: "Res. CMN 4.945/2021", href: "https://abde.org.br/prsac/" },
        {
          label: "CNN Brasil, 2026",
          href: "https://www.cnnbrasil.com.br/agro/rabobank-financia-us-20-milhoes-com-metas-esg-para-usina-em-mg/",
        },
      ] as Source[],
    },
    {
      title: "Regras que mudam",
      body: "As regras oscilam: em maio de 2026, a CVM tornou voluntário o reporte IFRS S1/S2 para companhias abertas. A cobrança de clientes e do mercado financeiro continua. Quem tem estratégia própria se adapta a qualquer cenário.",
      sources: [
        {
          label: "Mayer Brown, 2026",
          href: "https://www.mayerbrown.com/pt/insights/publications/2026/06/copy-of-cvm-torna-facultativa-a-divulgacao-de-reportes-financeiros-relacionados-a-sustentabilidade-ifrs-s1-e-s2-para-as-companhias-abertas",
        },
      ] as Source[],
    },
    {
      title: "Reputação e talentos",
      body: "Talentos, consumidores e investidores estão atentos à coerência entre discurso e prática. No Brasil, 83% dos profissionais desempregados dizem que boas iniciativas ESG pesam ao aceitar uma vaga, e só 20% dos consumidores confiam nas promessas de sustentabilidade das marcas (81% as questionam, em outra pesquisa). Lá fora, 94% dos investidores veem afirmações sem comprovação nos relatórios de sustentabilidade, e 70% da Geração Z e dos millennials dão peso ao ambiental ao escolher empregador.",
      sources: [
        {
          label: "Robert Half, 2021",
          href: "https://forbes.com.br/negocios/2021/06/83-dos-profissionais-levam-praticas-de-esg-em-consideracao-antes-de-aceitar-oferta-de-emprego/",
        },
        {
          label: "Ilumeo, 2026",
          href: "https://www.portaltela.com/noticias/economia/2026/05/25/apenas-20-dos-brasileiros-confiam-em-promessas-de-sustentabilidade-das-marcas/",
        },
        {
          label: "Getty Images, 2025",
          href: "https://mundodomarketing.com.br/silencio-de-empresas-sobre-as-proprias-acoes-sustentaveis-desagrada-consumidores-brasileiros",
        },
        {
          label: "PwC, 2023",
          href: "https://www.pwc.com/gx/en/issues/c-suite-insights/global-investor-survey/global-investor-survey-2023.html",
        },
        {
          label: "Deloitte, 2025",
          href: "https://esgtoday.com/70-of-gen-z-millennials-consider-environmental-sustainability-important-in-choosing-employers-deloitte-survey",
        },
      ] as Source[],
    },
  ],
  closing: "Preparar-se antes dá tempo de escolher o caminho. Vamos juntos.",
  cta: "Vamos conversar",
};

export const marquee = [
  "Estratégia",
  "Materialidade",
  "Foco",
  "Escuta ativa",
  "Finanças sustentáveis",
  "Mudanças climáticas",
  "Mitigação",
  "Adaptação",
  "Relatórios",
  "Índices e ratings",
  "Performance ESG",
  "Gestão humanizada",
  "Resiliência",
  "Potencializar valor",
];

export const solutions = {
  eyebrow: "Soluções",
  title: "Soluções desenhadas [[junto com a sua empresa]]",
  lead: "Nada de prateleira. Cada solução parte do seu negócio, porque quem o conhece é você.",
  items: [
    {
      icon: "estrategia",
      title: "Estratégia e Governança de Sustentabilidade",
      for: "Para dar direção ao ESG e sair do improviso.",
      body: "Plano estratégico para atender às diretrizes de sustentabilidade do negócio: estruturação de Comissão ESG, planos de ação e indicadores de desempenho.",
    },
    {
      icon: "financas-sustentaveis",
      title: "Finanças sustentáveis",
      for: "Para abrir a conversa com bancos e acessar crédito atrelado a metas ESG.",
      body: "Estruturação de framework para captação de recursos verdes, acesso a financiamentos para projetos sustentáveis, preparação para o SPO (Second Party Opinion, o parecer independente sobre o framework) e interface com a instituição financeira.",
    },
    {
      icon: "mudancas-climaticas",
      title: "Mudanças climáticas",
      for: "Para responder à cobrança climática de clientes e do mercado.",
      body: "Plano estratégico para estruturar a gestão climática, com foco em mitigação e adaptação.",
    },
    {
      icon: "relatorios-indices-esg",
      title: "Relatórios, índices e reportes ESG",
      for: "Para responder questionários e índices sem correria.",
      body: "Condução e suporte ao time operacional na elaboração, asseguração e publicação do relatório de sustentabilidade, conforme o framework adotado (IFRS S1/S2, SASB, GRI e IIRC). Gestão das respostas a índices e reportes como ISE, ICO2, CDP, CSA S&P e MSCI. Assessoria às áreas em questionários de avaliação ESG, como a avaliação de fornecedores.",
    },
  ],
  cta: "Falar sobre a minha necessidade",
};

export const moments = {
  eyebrow: "Formatos",
  title: "Em que momento está o [[ESG]] na sua empresa?",
  cards: [
    {
      tag: "Assessoria",
      who: "Para quem está estruturando a agenda.",
      body: "Implantação e desdobramento da sustentabilidade na estratégia do negócio: o que importa, quem decide e o que medir.",
    },
    {
      tag: "Gerência ESG “as a service”",
      who: "Para quem tem a agenda e precisa de quem conduza.",
      body: "Condução e execução junto ao time operacional na implementação da estratégia e das diretrizes ESG, com interface entre as áreas da empresa, lado a lado com a liderança.",
    },
  ],
  common:
    "Nos dois formatos, apoio ao atendimento das demandas ESG de clientes, do mercado financeiro, de índices e reportes, ou de uma estratégia global.",
  cta: "Conversar sobre o meu momento",
};

export const steps = {
  eyebrow: "Como funciona",
  title: "Um caminho [[construído junto]]",
  note: "É sobre uma jornada: caminhar, aprender e ser transparente.",
  cta: "Começar pela conversa",
  items: [
    {
      title: "Escuta",
      body: "Entender o negócio, a operação e as demandas que já chegam: clientes, mercado financeiro, índices.",
    },
    {
      title: "Foco",
      body: "Definir o que é prioridade para o negócio (materialidade) e onde concentrar esforço.",
    },
    {
      title: "Estratégia",
      body: "Desenhar com a empresa o plano de ação, a governança, as metas e os indicadores.",
    },
    {
      title: "Implantação e evolução",
      body: "Conduzir junto ao time operacional, conectar as áreas e evoluir relatórios, índices e acesso a capital.",
    },
  ],
};

export const pillars = {
  eyebrow: "Jeito de trabalhar",
  title: "Parceria no lugar de [[pacote pronto]]",
  lead: "Um trabalho construído com a sua empresa, do planejamento à operação.",
  items: [
    {
      icon: "parceria",
      title: "Complementaridade",
      body: "Soluções construídas com a empresa, porque é ela quem conhece o seu negócio.",
    },
    {
      icon: "lideranca-equipe",
      title: "Conexão",
      body: "Das diretrizes à realidade da operação: entre liderança, áreas e time operacional.",
    },
    {
      icon: "materialidade",
      title: "Foco",
      body: "Sustentabilidade ligada à estratégia, com eficiência e potencialização de valor.",
    },
    {
      icon: "crescimento-sustentavel",
      title: "Consistência",
      body: "Uma agenda que se mantém ao longo da jornada, com transparência e compromisso com resultado.",
    },
  ],
};

export const results = {
  eyebrow: "Resultados do mercado",
  title: "O que empresas que levaram ESG à gestão [[já registram]]",
  lead: "Exemplos públicos, com fonte. Não são clientes da Juliana; mostram o que a agenda pode entregar.",
  items: [
    {
      tag: "Capital",
      stat: "US$ 20 mi",
      statLabel: "em crédito atrelado a metas ESG, em 5 anos",
      title: "Crédito com condições atreladas a metas ESG",
      body: "A Bioenergética Aroeira, do setor sucroenergético em Minas Gerais, obteve US$ 20 milhões em cinco anos com o Rabobank. As condições financeiras variam conforme o desempenho em indicadores de sustentabilidade, como eficiência no uso de fertilizantes, uso de biometano na frota, participação feminina e programas sociais.",
      source: {
        label: "CNN Brasil · 29/05/2026",
        href: "https://www.cnnbrasil.com.br/agro/rabobank-financia-us-20-milhoes-com-metas-esg-para-usina-em-mg/",
      },
    },
    {
      tag: "Eficiência",
      stat: "−28%",
      statLabel: "de resíduos em três meses",
      title: "Menos resíduo, menos energia, menos custo",
      body: "A Distribuidora DMarcas, do setor automotivo, com apoio do Sebrae, reduziu em 28% o volume total de resíduos e economizou 15% da energia elétrica em três meses. O custo médio de descarte caiu 12%.",
      source: {
        label: "Sebrae-PR · 19/11/2025",
        href: "https://sebraepr.com.br/comunidade/artigo/sustentabilidade-uma-inspiracao-para-o-publico-mei",
      },
    },
    {
      tag: "Evidência",
      stat: "2016",
      statLabel: "The Accounting Review",
      title: "Foco no que é material faz diferença",
      body: "Pesquisa publicada na The Accounting Review encontrou que empresas com bom desempenho nas questões de sustentabilidade materiais para o seu setor tiveram desempenho superior às de desempenho fraco nessas questões. É uma associação estatística, não uma garantia, e reforça o ponto de partida do trabalho: definir o que realmente importa para o negócio.",
      source: {
        label: "Khan, Serafeim e Yoon · 2016",
        href: "https://doi.org/10.2308/accr-51383",
      },
    },
  ],
};

export const about = {
  eyebrow: "Quem conduz",
  title: "Experiência de quem já esteve [[do lado de quem contrata]]",
  quote: "Já estive do lado de quem contrata o serviço.",
  paragraphs: [
    "Há cerca de duas décadas, atuo na interseção entre meio ambiente, sustentabilidade e estratégia de negócio. Sou engenheira ambiental e construí minha trajetória em empresas de grande porte, liderando agendas que vão da operação ao corporativo, da proposição de estratégia à implantação de processos, com definição de metas e indicadores, com foco em sustentabilidade e mudanças climáticas.",
    "Conecto diretrizes à realidade da operação, com liderança humanizada e transparente, sem perder objetividade nem compromisso com resultado.",
  ],
  name: "Juliana Diniz Abreu Andrade",
  role: "Engenheira ambiental e consultora em sustentabilidade e ESG",
  highlights: [
    { k: "Atuação", t: "Empresas de infraestrutura e de alimentos e bebidas, como Motiva/CCR e Nestlé." },
    { k: "Meio Ambiente", t: "Implantação e gestão da área em unidade operacional, da formação da equipe ao licenciamento e à operação." },
    { k: "ISO 14001", t: "Implantação, certificação e manutenção da ISO 14001:2004 em duas unidades fabris." },
    { k: "Responsabilidade Social", t: "Coordenação de Responsabilidade Social e Comunicação, com Investimento Social Privado." },
    { k: "Liderança", t: "Equipe multidisciplinar: engenharia, biologia, jornalismo, administração e responsabilidade social." },
    { k: "Internacional", t: "Eventos de sustentabilidade: COP 16 (Colômbia), Equador e Costa Rica." },
  ],
  placeholder: "Formação acadêmica, pós-graduação e certificações · a definir",
};

export const faq = {
  eyebrow: "Perguntas",
  title: "Perguntas [[frequentes]]",
  items: [
    {
      q: "Recebi um questionário ESG de um cliente. Faz sentido conversar?",
      a: "Faz. Apoiar o atendimento das demandas de clientes, do mercado financeiro e de índices faz parte do trabalho, seja para responder o que já chegou, seja para se preparar para o próximo pedido.",
    },
    {
      q: "Quanto custa e quanto tempo leva?",
      a: "Depende do escopo e do formato escolhido, Assessoria ou Gerência “as a service”. A conversa inicial serve para entender o seu cenário.",
      placeholder: "Faixa de investimento e prazo típico · a definir",
    },
    {
      q: "A solução já vem pronta?",
      a: "Não. Nada de prateleira: cada solução é construída junto com a empresa, porque é ela quem conhece o negócio.",
    },
    {
      q: "Qual a diferença entre Assessoria e Gerência “as a service”?",
      a: "Na Assessoria, a empresa recebe apoio para implantar e desdobrar a sustentabilidade na estratégia. Na Gerência “as a service”, a condução e a execução acontecem junto ao time operacional, com interface entre as áreas e a liderança.",
    },
    {
      q: "Minha empresa precisa ter uma área de sustentabilidade para começar?",
      a: "O formato “as a service” existe para conduzir a agenda ao lado do seu time. Conte o seu cenário na conversa inicial.",
    },
    {
      q: "Como funciona a primeira conversa?",
      a: "Começa pelo WhatsApp: você conta o momento da empresa e as demandas que já recebe.",
      placeholder: "Duração, formato e se há custo · a definir",
    },
    {
      q: "Em quais setores há experiência?",
      a: "Infraestrutura e alimentos e bebidas.",
      placeholder: "Outros setores atendidos · a definir",
    },
  ],
};

export const finalCta = {
  title: "Vamos juntos construir o [[próximo passo.]]",
  text: "Conte o momento da sua empresa. A conversa começa pelo WhatsApp, sem formulário.",
  button: "Conversar no WhatsApp",
};

export const footer = {
  tagline: "Integrando a sustentabilidade ao modelo de negócio, construindo o caminho juntos.",
  placeholders: [
    "WhatsApp · a definir",
    "E-mail · a definir",
    "Razão social e CNPJ · a definir",
  ],
  copyright: "© 2026 Juliana Diniz Sustentabilidade",
};
