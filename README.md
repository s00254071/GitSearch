# GitSearch

Basically Google, but for GitHub. Search any topic and GitSearch pulls matching repositories straight from the GitHub API.

**Live site:** https://s00254071.github.io/GitSearch/

## Features

- Search all public GitHub repositories
- Quick search buttons for popular topics
- Shows stars, forks and language for each repo
- Pages to move through the results
- Save repos to a favourites list (stored in MongoDB)

## Built with

- Angular
- TypeScript
- Bootstrap
- GitHub REST API
- MongoDB and an Express API for favourites

## Run it locally

npm install
ng serve

Then open http://localhost:4200

## Note

Search works all the time. Favourites need the backend server to be running. If it isn't, the site shows "Database not active".

## Author

Mehmet Ali Buk, Software Development student at ATU Sligo
