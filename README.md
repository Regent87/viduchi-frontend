# Viduchi Admin Cabinet

## Локальный запуск

### С Docker

1. Переменные окружения должны быть следующие:

```
ADMIN_API_URL=http://host.docker.internal:8081
RENDER_SERVER_URL=http://render-server:4000
```

2. Запускаем сервисы

```bash
docker compose -f docker-compose-dev.yml up --build -d
```

### Без Docker

1. Переменные окружения должны быть следующие:

```
ADMIN_API_URL=http://localhost:8081
RENDER_SERVER_URL=http://localhost:4000
```

2. Запускаем сервисы

```bash
npm run dev
node server.mjs
```