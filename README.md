<p align="center">
  <img
    loading="lazy"
    src="https://img.shields.io/static/v1?label=STATUS&message=%20CONCLUIDO&color=GREEN&style=for-the-badge"
  />
</p>

<h1 align="center">Fokus</h1>

<p align="center">
  Timer inspirado na tecnica Pomodoro com interface clean, trilha sonora opcional
  e foco em produtividade com boa experiencia visual.
</p>

## Sobre o projeto

O **Fokus** e um projeto de portifolio desenvolvido para praticar construcao de
interfaces interativas com `HTML`, `CSS` e `TypeScript`, aplicando conceitos de
responsividade, semantica, manipulacao do DOM e organizacao de estado no lado do
cliente.

A proposta do projeto e oferecer uma experiencia simples para gestao de tempo,
com alternancia entre foco, pausa curta e pausa longa em uma interface visualmente
mais limpa e objetiva.

## Funcionalidades

- Timer inspirado na tecnica Pomodoro
- Modos de foco, pausa curta e pausa longa
- Atualizacao visual conforme o contexto da sessao
- Controles de iniciar, pausar e reiniciar o ciclo
- Trilha sonora opcional durante o uso
- Interface responsiva para desktop e mobile
- Feedback mais claro ao concluir ou reiniciar sessoes

## Tecnologias utilizadas

- `HTML5`
- `CSS3`
- `TypeScript`
- `JavaScript`

## Estrutura do projeto

```text
Fokus/
|- dist/
|- docs/
|  |- screenshots/
|- public/
|- scripts/
|- src/
|  |- css/
|  |- imagens/
|  |- sons/
|  |- ts/
|- index.html
|- package.json
|- tsconfig.json
|- vercel.json
```

## Arquitetura atual

O projeto segue uma estrutura front-end enxuta, com separacao entre arquivos de
estilo, logica, assets visuais e arquivos de apoio ao build.

### Interface

- Estrutura principal em `index.html`
- Estilos organizados em `src/css/styles.css`
- Experiencia visual pensada para reduzir ruido e melhorar legibilidade

### Logica

- Comportamento do timer implementado em `src/ts/script.ts`
- Build final gerado para a pasta `dist/`
- Script de build para preparar os arquivos finais da aplicacao

## Como executar localmente

1. Instale as dependencias:

```bash
npm install
```

2. Gere o build do projeto:

```bash
npm run build
```

3. Abra o arquivo `index.html` no navegador.

## Scripts disponiveis

```bash
npm run build
npm run check
```

## Objetivos de aprendizado demonstrados

- Manipulacao do DOM com TypeScript
- Controle de estado em interface interativa
- Estruturacao de projeto front-end para portifolio
- Responsividade e refinamento visual
- Uso de assets visuais e sonoros em uma aplicacao web

## Melhorias realizadas nesta versao

- Estrutura HTML mais semantica e acessivel
- Interface visual mais minimalista e consistente
- Timer com comportamento mais previsivel
- Melhor organizacao do codigo TypeScript
- README reestruturado para apresentacao profissional

## Preview

### Tela principal

![Preview da tela principal do Fokus](./docs/screenshots/fokus-home.png)

### Modo pausa curta

![Preview do modo pausa curta do Fokus](./docs/screenshots/fokus-short-break.png)

## Deploy

Deploy atual do projeto:

[https://fokus-a4u1ev5sm-fnovitchs-projects.vercel.app/](https://fokus-a4u1ev5sm-fnovitchs-projects.vercel.app/)

