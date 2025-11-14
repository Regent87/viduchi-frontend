# 1. Локальный запуск

## 1.1. Через Docker

1. Создаем файл `.env` и записываем в него переменные окружения:

```
ADMIN_API_URL=http://host.docker.internal:8081
RENDER_SERVER_URL=http://render-server:4000
```

2. Запускаем сервисы

```bash
docker compose --env-file .env -f docker-compose.yml up --build -d
```

## 1.2. Без Docker

1. Создаем файл `.env` и записываем в него переменные окружения:

```
ADMIN_API_URL=http://localhost:8081
RENDER_SERVER_URL=http://localhost:4000
```

2. Запускаем сервисы

- Запуск админки:

```bash
npm run dev
```

- Запуск сервера рендеринга:

```bash
node server.mjs
```

# 2. Запуск на сервере

1. Создаем домен `test.viduchi.ru` и настраиваем DNS-серверы.

2. Создаем SSL-сертификаты для домена `test.viduchi.ru`.

3. Настраиваем Nginx для домена `test.viduchi.ru` → см. файл `nginx.conf`.

3. Создаем файл `.env` и записываем в него переменные окружения:

```
ADMIN_API_URL=http://host.docker.internal:8081
RENDER_SERVER_URL=http://render-server:4000
```

2. Запускаем сервисы

```bash
docker compose --env-file .env -f docker-compose.yml up --build -d
```