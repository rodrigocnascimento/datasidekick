# DataSidekick

![O DataSidekick é uma extensão do Chrome para desenvolvedores](assets/marquee.png)

O DataSidekick é uma extensão do Chrome para desenvolvedores que desejam uma maneira mais limpa, rápida e visual de inspecionar e editar o armazenamento do navegador.

Ele abre como um painel lateral do Chrome e permite que você trabalhe com `localStorage` e `sessionStorage` diretamente da origem da aba atual, sem precisar vasculhar as Ferramentas de Desenvolvedor ou editar JSON como uma string compactada bruta.

## Recursos

- Interface de painel lateral do Chrome
- Leitura do armazenamento focada na aba/origem atual
- Suporte a `localStorage` e `sessionStorage`
- Busca por chave ou valor
- Editor visual de árvore JSON
- Edição inline para valores simples
- Importar e exportar dados como JSON
- Copiar valores
- Excluir chaves individuais
- Limpar o armazenamento com confirmação
- Ocultar chaves irrelevantes
- Ocultar e exibir novamente chaves individuais
- Favoritar chaves importantes por origem/armazenamento
- Modo escuro por padrão
- Alternar para o modo claro
- Controles de tamanho da fonte

## Por que usar o DataSidekick?

O armazenamento do navegador é útil, mas gerenciá-lo diretamente das Ferramentas de Desenvolvedor pode ser lento e complicado.

O DataSidekick tem um foco principal:

> Facilitar a localização, a compreensão e a edição de dados locais do navegador.

Se um valor for um JSON válido, o DataSidekick o exibe como uma árvore estruturada e editável, em vez de obrigá-lo a editar uma string minimizada.

## Armazenamentos suportados

Atualmente suportados:

- `localStorage`
- `sessionStorage`

Ideias planejadas:

- IndexedDB
- Cookies
- Visualização de diferenças
- Histórico/Desfazer
- Validação de esquema JSON

## Instalação

### Da Chrome Web Store

Em breve.

### Desenvolvimento local

1. Clone o repositório:

```bash
git clone https://github.com/rodrigocnascimento/datasidekick.git
cd datasidekick
```

2. Abra o Chrome e acesse:

```texto
chrome://extensions
```

3. Ative o **Modo de desenvolvedor**.

4. Clique em **Carregar descompactado**.

5. Selecione a pasta da extensão.

## Uso

1. Abra qualquer site ou aplicativo local.

2. Abra o DataSidekick no Chrome.

3. Selecione `LocalStorage` ou `SessionStorage`.

4. Procure a chave que deseja inspecionar.

5. Edite valores simples diretamente no navegador ou valores JSON na árvore visual.

6. Salve, exporte, importe, adicione aos favoritos, oculte ou exclua dados conforme necessário.

## Privacidade

O DataSidekick é executado localmente no seu navegador.

- Não coleta dados do usuário.
- Não envia dados de armazenamento para servidores externos.

- Não utiliza código remoto.

- Acessa apenas a guia/origem ativa quando o usuário abre e utiliza a extensão.

## Permissões

O DataSidekick utiliza permissões de extensão do Chrome para fornecer sua funcionalidade principal:

| Permissão | Por que é necessária |
| --- | --- |
| `sidePanel` | Abre a interface da extensão como um painel lateral do Chrome. |
| `tabs` | Identifica a guia ativa e a origem atual. |
| `activeTab` | Permite o acesso à guia ativa quando o usuário invoca a extensão. |
| `scripting` | Executa scripts locais no contexto da página ativa para ler e editar o armazenamento do navegador. |
| `downloads` | Exporta dados de armazenamento selecionados como um arquivo JSON local. |
| Permissões do host | Permite que a extensão funcione em todos os sites onde o usuário abre o painel. |

## Versão

Versão atual: `v0.1.4`

Consulte o arquivo [CHANGELOG.md](./CHANGELOG.md) para obter as notas de lançamento.

## Links do projeto

- Repositório: https://github.com/rodrigocnascimento/datasidekick
- LinkedIn: https://www.linkedin.com/in/rodrigocesarnascimento/
- Twitter / X: https://x.com/_whiletruedo
- GitHub: https://github.com/rodrigocnascimento/

## Autor

Criado por **Rodrigo Nascimento**.

## Licença

MIT
