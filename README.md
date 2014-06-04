### MedCar
=====================

Aplikacja przychodni online w Node.js

#### Jak uruchomić

1) Klonujemy repozytorium:

    git clone git@github.com:jaresh/MedCar.git


2) Pobieramy depy:

    npm install

3) Uruchamiamy skrypt który doda nam przykładowe dane do bazy MONGO:

    node db_seed.js 
    
    // Skrypt uruchamiamy po to aby uzyskać dostęp do kont, 
    // miedzy innymi, administratora który może praktycznie wszystko.
    // Obok formularza logowania, pod przyciskiem "Dane do logowania"
    // znajduje się ściąga z loginami i hasłami.

4) Uruchamiamy serwer:

    node server.js
    
    // Po wpisaniu w przegladarke http://localhost:3000/ aplikacja się uruchomi
    
    
