 # Отчет по лабораторной работе №1
 
 #### 1. Установил сервер Apache для Ubuntu 
 ```
 sudo apt-get install apache2
 ```
 #### 2. Создал директорию сайта
 ```
 sudo mkdir -p /var/www/karimmarabet.com/public_html
 ```
 #### 3. Создал главную страницу, страницы с ошибкой 403 и 404
 ```
 nano /var/www/karimmarabet.com/public_html/index.html
 nano /var/www/karimmarabet.com/public_html/error404.html
 nano /var/www/karimmarabet.com/public_html/error403.html
 nano /var/www/karimmarabet.com/public_html/secret.html
 ```
 ###### index.html
 ```
 <html>
  <head>
    <title>Karim Marabet</title>
  </head>
  <body>
    <h1>Hello World, from karimmarabet.com</h1>
  </body>
</html>
 ```
 ###### error404.html
 ```
 <p>Sorry )))::: 404 Not found</p>
 ```
 ###### error403.html
 ```
 <p>OOOPPPSS! You cannot access to this page. Error 403 Forbidden</p>
 ```
 #### 4. Создал новый виртуальный хост
 ```
 sudo nano /etc/apache2/sites-available/karimmarabet.com.conf
 ```
 ##### Активировать .htaccess файл, настроил виртуальный хост и http ошибки 403 и 404
 ```
 <Directory /var/www/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    allow from all
</Directory>

<VirtualHost *:80>
    ServerAdmin admin@karimmarabet.com
    ServerName karimmarabet.com
    ServerAlias www.karimmarabet.com
    DocumentRoot /var/www/karimmarabet.com/public_html
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
    
    ErrorDocument 403 /error403.html
    ErrorDocument 404 /error404.html
</VirtualHost>
```
#### 5. Открыл доступ виртуальному хосту и закрыл хочту по дефолту
```
sudo a2ensite test.com.conf
sudo a2dissite 000-default.conf
```
#### 6. Обновил Local Host файл
```
sudo nano /etc/hosts
```
```
127.0.1.2   karimmarabet.com
```
#### 7. Настроил .htaccess файл 
```
sudo nano /var/www/karimmarabet.com/.htaccess
```
##### Настроил кастомные файлы для генерации http ошибок 403 и 404 и запретил доступ к страницу `secret.html` чтобы вызвать ошибку 403 
```
ErrorDocument 403 /error403.html
ErrorDocument 404 /error404.html

<Files "secret.html">
  Require all denied
</Files>
```
#### 8. Перезапустил сервер
```
sudo service apache2 restart
```
#### URL ссылки
```
http://karimmarabet.com/
http://karimmarabet.com/secret.html
http://karimmarabet.com/something
```
