# Changelog

## v0.1.5 — English translation

### Adicionado
- Imagens localizadas para en-US (`marquee-en.png`, `screenshot-en.png`, `small-promo-en.png`).
- Versão em inglês da landing page com imagens, metadados e conteúdo traduzidos.

### Alterado
- Página `en/index.html` atualizada com imagens e metadados em inglês.
- Bump de versão para v0.1.5.
- Adicionado auto-redirect pt→en no `index.html` raiz baseado em `navigator.language`.

## v0.1.4 — Settings overlay

- Settings agora abre fechada por padrão.
- Painel de configurações abre como overlay sobre a interface, sem espremer sidebar/editor.
- Adicionado backdrop com clique fora para fechar.
- Adicionado fechamento por `Esc`.
- Toggles refinados e mais compactos.
- Texto de foco simplificado para melhorar legibilidade.
- Adicionado painel de ajuda com instruções de uso, edição, importação/exportação e privacidade.
- Corrigido botão do GitHub para abrir o repositório do projeto em uma nova aba.
- Substituída a permissão ampla de host por permissões opcionais por origem `http`/`https`.
- Adicionado estado de permissão para solicitar acesso apenas ao site atual.
- Adicionada abertura do playground do DataSidekick na primeira instalação.

## v0.1.3

### Adicionado
- Adicionado playground de demonstração para popular dados complexos em LocalStorage e SessionStorage.
- Adicionada âncora `#access-control` com detalhes sobre permissões e acesso aos dados.
- Adicionados exemplos extras de SessionStorage para validar o fluxo completo no DataSidekick.
- Adicionados metadados SEO, Open Graph, Twitter Card, JSON-LD, `robots.txt` e `sitemap.xml`.
- Adicionadas seções de casos de uso e perguntas frequentes para melhorar descoberta e conversão.
- Adicionado Google Tag Manager com Consent Mode padrão e banner de consentimento de analytics.
- Adicionados eventos semânticos no `dataLayer` para CTA, playground, navegação por âncora, FAQ e links externos.
- Adicionadas versões WebP otimizadas das imagens principais e versão reduzida do logo para o header.

### Alterado
- Mensagem do console do playground agora separa claramente chaves de LocalStorage e SessionStorage.
- Melhorados o título, a descrição da página e os atributos de performance das imagens principais.
- Hero e captura de ecrã agora usam `<picture>` com WebP e fallback PNG.

## v0.1.2

### Adicionado
- Adicionado o CNAME para reconhecimento do DNS

### Alterado
- N/A

## v0.1.1

### Adicionado
- Landing page estática para apresentação do DataSidekick.
- Seção principal com chamada para instalação.
- Lista de recursos da extensão.
- Seção de privacidade.
- Seção “Como funciona”.
- Card com links do Rodrigo Nascimento.
- Link para o repositório oficial do projeto.
- Âncora compacta `?` no menu para acessar o card de informações.

### Alterado
- Versão exibida atualizada para `v0.1.3` do plugin.
- Navegação simplificada.
- Cards sociais refinados com ícones SVG.
- Textos ajustados para explicar melhor o propósito da extensão.

## v0.1.0

### Adicionado
- Primeira versão da landing page.
- HTML, CSS e JavaScript sem dependências externas.
- Layout responsivo.
- Visual dark mode alinhado com a identidade do DataSidekick.
