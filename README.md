# Oxido Task
## Opis
Aplikacja pobiera tekst z pliku article.txt, przetwarza go i generuje plik HTML (output/artykul.html). To prosta aplikacja stworzona jako zadanie rekrutacyjne.

## Wymagania
Node.js (14+)
npm

## Instalacja
Sklonuj repozytorium:

git clone https://github.com/bvnvn23/oxido-task.git
Przejdź do katalogu projektu:

cd oxido-task
Zainstaluj zależności:

npm install
Utwórz plik .env (np. z kluczem API).

## Uruchomienie
Uruchom aplikację:
node app.js
Wygenerowany plik HTML znajdziesz w output/artykul.html.

## Struktura
app.js – główny plik aplikacji
article.txt – plik wejściowy z tekstem
output/artykul.html – wynikowy plik HTML
.gitignore – ignoruje node_modules i .env
