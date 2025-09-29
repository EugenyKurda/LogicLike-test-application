# LogicLike Test Application

Проект состоит из бэкенда на Node.js, фронтенда на React и базы данных MySQL, запускаемой в Docker.

### Предварительные требования
- Установленный Docker и Docker Compose
- Node.js (рекомендуется LTS версия)


### Ручной запуск

1. **Запустите MySQL в Docker:**
```bash
docker-compose up -d mysql
```

2. **Подождите пока MySQL запустится:**
```bash
sleep 10
```

3. **Проверьте что MySQL работает:**
```bash
docker ps | grep logiclike-mysql
```

4. **Запустите бэкенд:**
```bash
cd backend
npm run dev
```

5. **Запустите фронтенд:**
```bash
cd frontend
npm run dev
```

## Доступ к сервисам

- **MySQL база данных**: `localhost:3306`
- **Бэкенд приложение**: `localhost:3001`
- **Фронтенд приложение**: `localhost:3000`