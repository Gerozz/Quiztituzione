#!/usr/bin/env bash
mysqld_safe --skip-grant-tables &          #avvia mariadb senza autenticazione (tipo xampp). normalmente non si farebbe ma siamo in un container docker e non accettiamo connessioni sulla porta 3306 per cui non creiamo gravi problemi di sicurezza
exec apache2-foreground
