### MedCar

Aplikacja przychodni online w Node.js

#### Jak uruchomić

1) Klonujemy repozytorium:

git@github.com:jaresh/MedCar.git


2) Pobieramy depy:

npm install

3) Uruchamiamy skrypt który doda nam przykładowe dane do bazy MONGO:

node db_seed.js

-- skrypt uruchamiamy po to aby uzyskać dostęp do konta administratora który może praktycznie wszystko.

4) Uruchamiamy serwer:

node server.js

-- po wpisaniu w przegladarke http://localhost:3000/ aplikacja się uruchomi
