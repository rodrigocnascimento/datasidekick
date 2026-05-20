# Changelog

## v0.1.8

### Corrigido
- Removida a permissão `downloads` do `manifest.json`.
- Mantida a exportação de JSON usando `Blob` + `<a download>`, sem necessidade da API `chrome.downloads`.
- Atualizadas as permissões para atender à política de menor escopo da Chrome Web Store.
- Mantidas permissões opcionais de host com `optional_host_permissions`, solicitando acesso por origem somente quando necessário.

### Motivo da versão
Esta versão atende à revisão da Chrome Web Store, que apontou que a permissão `downloads` era solicitada, mas não utilizada diretamente pela extensão.

## v0.1.7 — Correções de internacionalização

### Corrigido
- Placeholders de i18n (`$1$`, `$2$`, …) convertidos para o formato do Chrome (`$nome$` + bloco `placeholders`), eliminando o erro *Variable $1$ used but not defined* ao carregar a extensão.
- `applyI18n()` no `sidepanel.js` para substituir `__MSG_*__` no HTML em tempo de execução (o Chrome não processa esses tokens em páginas do side panel).
- Referência `__MSG_itemsCount__` removida do HTML (valor dinâmico preenchido apenas via JS).
- Chave `__MSG_settings___` corrigida para o message `settings_`.
- Chave inexistente `permissionRequired` trocada por `permissionNeeded` no estado de permissão pendente.
- Função `t()` ajustada para aceitar substituições passadas como array (`t('itemsCount', ['5'])`).

### Alterado
- Bump de versão para v0.1.7.

## v0.1.6 — Observação bidirecional do storage

### Adicionado
- Observer injetado na página que monkey-patcha `Storage.prototype` para detectar alterações externas.
- Polling leve via contador inteiro (`__ds_revision__`) a cada 1.5s para atualizar o painel automaticamente.
- Evento customizado `datasidekick:changed` / `datasidekick:cleared` disparado na página ao alterar dados pelo SidePanel.
- Animação de giro (360°) no botão de refresh como feedback visual.

### Alterado
- `writeStorage`, `removeStorageKey`, `clearStorage` e `importStorage` agora disparam `CustomEvent` na página.
- Botão de refresh gira ao ser clicado.
- Ajuste de versão para v0.1.6.

## v0.1.5 — Internacionalização (i18n)

### Adicionado
- Sistema de internacionalização com `_locales/en/` e `_locales/pt_BR/`.
- `manifest.json` agora usa `__MSG_*__` e `default_locale` para nome e descrição.
- `sidepanel.html` com `__MSG_*__` em todos os textos estáticos (labels, títulos, placeholders).
- `sidepanel.js` com `chrome.i18n.getMessage()` para strings dinâmicas (toasts, erros, status).
- `background.js` detecta idioma do navegador (`@@ui_locale`) para abrir playground correto.

### Alterado
- Todas as strings do addon externalizadas para arquivos de mensagens.
- Bump de versão para v0.1.5.

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
- Exibição da origem da aba atual com formatação mais limpa.
- Opção para exibir novamente chaves ocultas individuais.
- Página inicial para apresentação do projeto e avaliação na Chrome Web Store.
- Seção de criador/contato com links para LinkedIn, Twitter/X, GitHub e repositório do projeto.

### Alterado
- Legibilidade aprimorada do indicador de origem.
- Navegação da página inicial refinada com um ponto de interrogação compacto.
- Todas as referências públicas foram atualizadas para `v0.1.3`.

## v0.1.2

### Adicionado
- Leitura do armazenamento com escopo de aba/origem atual.
- Indicador mostrando a origem ativa.
- Suporte a chaves ocultas.
- Favoritos por origem/armazenamento.
- Opção para ocultar chaves de SDK/análise com informações irrelevantes.
- Exportação de metadados com informações de origem.

## v0.1.1

### Adicionado
- Menu de configurações.
- Alternância entre tema claro e escuro.
- Controles de tamanho da fonte.
- Ícones de seta SVG para navegação em árvore JSON.
- Estilização de botões para ações de adicionar/excluir.

### Alterações
- Alinhamento de ícones aprimorado.
- Layout atualizado com base na direção refinada da interface.

## v0.1.0

### Adições
- Extensão MV3 para Chrome com suporte ao Painel Lateral.
- Visualizador de LocalStorage e SessionStorage.
- Busca por chave/valor.
- Editor visual de árvore JSON.
- Edição em linha para valores simples.
- Importação/exportação de JSON.
- Ações de copiar, excluir chave e limpar o armazenamento.
- Interface com tema escuro.
