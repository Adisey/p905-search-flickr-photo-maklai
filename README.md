## Техническое Задание - Maklai

**Сверстать страничку, которая отображает результаты поиска с flickr (используя его api). 
Flickr – это ресурс, который работает с фотографиями и изображениями и предоставляет свой api для работы. Flickr api link: https://www.flickr.com/services/api/**

1. Верстка:
Контейнер поиска:
Должно присутствовать поле ввода поискового запроса, рядом кнопка, по нажатии на которую будет отправляться запрос на flickr. Результат должен отображаться под полем ввода
Контейнер результата:
Десктоп-версия должна содержать по горизонтали 5 изображений
Таблеты - 3
Мобильная версия - 1 изображение
Остальные требования к верстке:
Использование BEM методологии
Верстка не должнаа содержать css фреймворков (таких как bootstrap, foundation etc)
Верстка должна поддерживаться в браузерах:
-	IE(10-11)
-	Edge, Safari, FF, Chrome – последние версии  

2. JS:
Написать модуль, который отвечает за поиск по сервису flickr
Написать модуль, который работает с DOM - принимает поисковую строку для запроса и отображает результат
На странице должна присутствовать пагинация или(!) подгрузка «show more».

I.	Пагинация:
-	Показывать на странице 10 картинок. 
-	При нажатии на следующую страницу показывать новую страничку со следующими 10-ю картинками

II. Подгрузка «show more»:
-	Показывать на странице 10 картинок. 
-	Под показанными картинками должна присутствовать кнопка «show more», по нажатию на которую подгружаются следующие 10 картинок. 
-	Предыдущие 10 не скрываются

###Результат:

http://adisey.zzz.com.ua/

* Валидация в строке кода
![Валидация в строке кода](https://raw.githubusercontent.com/Adisey/p905-search-flickr-photo-maklai/master/demo/validation.png)

* Результат на телефоне
![Результат на телефоне](https://raw.githubusercontent.com/Adisey/p905-search-flickr-photo-maklai/master/demo/phonepreview.png)

* Результат на Desktop
![Результат на Desktop](https://raw.githubusercontent.com/Adisey/p905-search-flickr-photo-maklai/master/demo/desktoppreview.png)

