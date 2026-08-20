# EngControl v1.2

**O jogo de Planejamento e Controle da Manutenção**

Esta versão reorganiza internamente o projeto sem alterar a experiência pedagógica da v1.1.

## Estrutura

- `index.html` — estrutura principal da interface.
- `css/styles.css` — identidade visual e estilos.
- `js/app.js` — navegação, campanha, saves, relatórios, prática e lógica do jogo.
- `data/game-data.js` — banco pedagógico dos níveis, Biblioteca PCM, avatares e distratores.
- `assets/` — imagens, logotipos e avatares.

## Compatibilidade

- Mantém o save portátil EGC4 da v1.1.
- Mantém compatibilidade com saves legados EGC2/EGC3.
- Não altera a chave local existente, preservando o progresso salvo no navegador.

## Objetivo da refatoração

Separar conteúdo, apresentação e lógica para facilitar revisão pedagógica, correção de bugs, versionamento no GitHub e expansão futura do treinamento.

Desenvolvido por DGandra - 2026.
