# Viduchi Admin Cabinet

# С Docker

1. Создаем файл `.env` и записываем в него переменные окружения:

```
ADMIN_API_URL=http://host.docker.internal:8081
RENDER_SERVER_URL=http://render-server:4000
```

2. Запускаем сервисы

```bash
docker compose --env-file .env -f docker-compose.yml up --build -d
```

# Без Docker

1. Создаем файл `.env` и записываем в него переменные окружения:

```
ADMIN_API_URL=http://localhost:8081
RENDER_SERVER_URL=http://localhost:4000
```

2. Запускаем сервисы

```bash
npm run dev
node server.mjs
```