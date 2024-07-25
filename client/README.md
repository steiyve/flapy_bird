# clone de flappy bird.

## utiliser:
1. lancer le serveur avec les commandes suivantes:
	```bash
	cd server
	npm install cors
	npm install express
	npm start
	```
2. lancer le site web(je ne sais pas comment faire autrement):
	1. installer l'extension de vscode live server.
	2. appuyer sur le bouton GO LIVE.
3. après chaque partie aller supprimer les fichier **best_score.json** et autre variation.

## fonctionnement du serveur
1. telechargement du fichier avec le best score
2. call vers le serveur pour lancer un script batch
3. le script déplace le fichier **best_score.json** dans le dossier du jeu
voila pourquoi il faut supprimer les fichier de votre dossier téléchargement
