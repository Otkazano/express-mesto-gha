<!-- [![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) -->
[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)


### Бэкенд для веб приложения «‎Место!»‎
Проект представляет собой api-сервис для веб-приложения.

### Технологии в проекте:  
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Директории:

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  

### Функционал в проекте: 
* Для пользователя:
  - GET `/users` - возвращает всех пользователей
  - GET `/users/me` - возвращает текущего пользователя
  - GET `/users/:userId` - возвращает пользователя по id
  - PATCH `/users/me` - обновляет данные пользователя
  - PATCH `/users/me/avatar` - обновляет аватар пользователя

* Для карточек:
  - GET `/cards` - возвращает все карточки из базы данных
  - POST `/cards` - создаёт новую карточку 
  - DELETE `/cards/:cardId` - удаляет карточку по id
  - PUT `/cards/:cardId/likes` - добавляет лайк карточке
  - DELETE `/cards/:cardId/likes` - удаляет лайк карточке
  
### Установка и запуск проекта: 
Клонировать репозиторий:
```bash
git clone https://github.com/Otkazano/express-mesto-gha.git
```
Установаить зависимости:
```bash
npm install
```
Запустить базу данных:
```bash
mongod
```
Запустить сервер:
```bash
npm run start
```
Запустить сервер с hot-reload:
```bash
npm run dev
```
