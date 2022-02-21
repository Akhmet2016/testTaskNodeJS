<h1 align="center">Тестовое задание по Node.js</h1>
<p style="text-indent: 30px;" align="justify">Сервер можно запустит с помощью команды <b>npm start</b>, либо <b>node server</b>. 
GET запрос можно осуществлять из адресной строки браузера, я использовал Insomnia, по адресу 
<b>http://localhost:4000/api/cars/{Наименование марки автомобиля}</b>, для фильтрации по engine:
<b>http://localhost:4000/api/cars/{Наименование марки автомобиля}/{Тип двигателя}</b>. 
Можно указывать следующие типы двигателя: </p>
<div style='margin-left:40px;'> 'Gasoline' : 'Бензин', </div>
<div style='margin-left:40px;'> 'Diesel' : 'Дизель', </div>
<div style='margin-left:40px;'> 'Gas' : 'Газ', </div>
<div style='margin-left:40px;'> 'None' : 'Нет', </div>
<div style='margin-left:40px;'> 'Other' : 'Прочие'. </div>
<p style="text-indent: 30px;" align="justify">Даже если что-то будет введено не правильно, сервер скажет вам об этом.</p>
<p style="text-indent: 30px;" align="justify">Пример запроса: <b>localhost:4000/api/cars/volkswagen/Diesel</b></p>