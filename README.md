# dcsc_proyecto1
Proyecto 1

1. editar archivo convert modificando de acuerdo a la máquina donde se ejecutará

<code>*/1 * * * * root cd /xxxx/xxxx/xxxx/dcsc_proyecto1/cloudprojects/ && bash convert.sh > /xxxx/xxxx/xxxx/covert.log 2>&1</code>

Nota: */1 * * * * hace que se ejecute cada minuto

2. copiar archivo convert en el directorio /etc/cron.d
