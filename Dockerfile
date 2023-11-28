FROM r-base:4.1.3

RUN apt-get update
RUN apt-get install php libapache2-mod-php -y

RUN mkdir num 
WORKDIR /num

RUN R -e "install.packages(c('truncnorm','triangle','nleqslv','mvtnorm','numDeriv','evd','sn'))"

COPY . .

EXPOSE 8080

CMD ["php","-S","0.0.0.0:8080"]