# Бэкенд (Node.js)
FROM node:20.18.1

# Установка рабочей директории
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY ../../api/package*.json ./
RUN npm install

# Копируем все остальные файлы
COPY ~/areal-hr-test-2024/api ./

# Открываем порт 8081
EXPOSE 8081

# Запускаем приложение
CMD ["npm", "start"]
