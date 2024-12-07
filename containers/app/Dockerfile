# Фронтенд (Vue.js)
FROM node:20.18.1 AS build-stage

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY ../../app/package*.json ./
RUN npm install

# Копируем все остальные файлы
COPY ~areal-hr-test-2024/app ./

# Собираем приложение
RUN npm run build

# Устанавливаем сервер для статических файлов
FROM nginx:alpine

# Копируем собранное приложение в директорию Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Открываем порт 8080
EXPOSE 8080

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
