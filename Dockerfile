FROM php:8-apache

# Installo mysql (mariadb)
RUN apt update
RUN apt -y install mariadb-server mariadb-client
# Installo il modulo mysqli per PHP
RUN a2enmod rewrite
RUN docker-php-ext-install mysqli

# Copio i file del sito nella cartella di apache e imposto i permessi
COPY codice/ /var/www/html/
RUN chown -R www-data /var/www/html/*

# Inizializzo il database
COPY quiztituzione.sql /
COPY initdb.sh /
RUN bash /initdb.sh

# Configuro il segnale di stop "graceful" per apache anzichè terminarlo killando il processo
STOPSIGNAL SIGWINCH

# Questo container espone solo la porta 80 al resto del mondo
EXPOSE 80

# Copio il lo script di avvio (entrypoint)
COPY entrypoint.sh /

# Il comando da eseguire all'avvio del container è lo script di avvio
CMD ["bash", "/entrypoint.sh"]
