# Используем образ Nginx на базе Alpine
FROM nginx:alpine

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение из папки app
COPY ../app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
