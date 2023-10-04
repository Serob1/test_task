# Laravel

## Installation


```bash
composer install
```
for windows
```bash
copy .env.example .env
```
or for linux
```bash
cp .env.example .env
```
Open your .env file and change the database name (DB_DATABASE) to whatever you have, username (DB_USERNAME) and password (DB_PASSWORD) field correspond to your configuration.

```bash
php artisan key:generate
```
```bash
php artisan migrate
```
## Start project

```bash
php artisan serve
```
Go to http://localhost:8000/

## Tests
```bash
php artisan test
```