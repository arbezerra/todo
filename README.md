# Desafio Técnico - Backend

[![Testes](https://github.com/arbezerra/todo/actions/workflows/jest.yml/badge.svg)](https://github.com/arbezerra/todo/actions/workflows/jest.yml)

Esta é uma proposta de resposta ao [Desafio Técnico - Backend](./DESAFIO.md)

## Instalação

Após fazer o clone do repositório, copie o arquivo `BACK/.env.example` para `BACK/.env`

Altere o valor de `JWT_SECRET`, você pode gerar uma senha com o `openssl`. Por exemplo:

```console
openssl rand -base64 32
```

Lembre de alterar o `login` e `password` para os valores do Desafio.

## Iniciar o projeto

Para iniciar o projeto, execute na raiz do repositório:

```console
docker compose up
```

E abra [http://localhost:3000](http://localhost:3000) em seu navegador.

## Testes Unitários

Para rodar os testes

```console
cd BACK
yarn test
```
