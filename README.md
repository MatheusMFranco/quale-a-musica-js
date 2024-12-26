<div align="center">

# What is this Song?

![GitHub Tag](https://img.shields.io/github/v/tag/matheusmfranco/quale-a-musica-js) ![Vite](https://img.shields.io/badge/framework-Vite-brightgreen) [![codecov](https://codecov.io/gh/MatheusMFranco/quale-a-musica-js/branch/main/graph/badge.svg?token=KQNXQNZBY6)](https://codecov.io/gh/MatheusMFranco/quale-a-musica-js)

Web application built that generates random programming quotes.

</div>

## Preview


<img src="/prints/home.png" height="300" />
<img src="/prints/video.png" height="300" />

## Features
This web applicaton recognize your voice to get the song name and shows to you the Youtube video about the song.

## Stack


- **Vitest**: Framework that enables the creation of unit tests;
- **Stryker**: Mutation testing tool that helps improve code quality;
- **Prettier**: Code formatter that enforces consistent style for readability and simplicity;
- **ESLint**: Linting tool that identifies and fixes potential errors and code quality issues;
- **Standard-version**: Versioning tool that automates semantic versioning and changelog generation;
- **Commitlint**: Tool that enforces standardized commit messages for better readability and changelog consistency;
- **Husky**: Git hooks manager that enhances code quality by enabling pre-commit and pre-push checks.

## Before add something

This project uses husky para automate commits to still in pattern and pushes, so before to add something in this project, please run this command:

```bash
npm run prepare
```

To know more about how to create a good commit message, [read this documentation](https://www.conventionalcommits.org/en/v1.0.0/).

## Run Local

Add `.env` file on `src` folder and fill with this code with your [Youtube API KEY](https://developers.google.com/youtube/v3/getting-started?hl=pt-br).

```properties
VITE_API_KEY=YOUR APP KEY HERE
```
Then, run:
```bash
npm install
npm start
```

## Run Docker

```bash
docker run -p 3000:80 matheusmagal/what-is-this-song
```

## Run Tests

All tests, mudatation and unit tests will run before the push, but if you want run them in any case follow these commands:

### Unit

```bash
npm test
```

### Mutation

```bash
npx stryker run
```

### E2E

To see the E2E with Cypress, access [this repo](https://github.com/MatheusMFranco/spreadReport).

![Phantom](https://media.tenor.com/_yFLs1OWgBAAAAAM/vinyl-disc-dance-music.gif)
