![NIST](https://nccoe.nist.gov/sites/all/themes/custom/nccoe2x/asset/img/NIST_logo.svg)

# Máquina de Incertidumbre del NIST

La Máquina de Incertidumbre del NIST es una aplicación de
software basada en la web y producida por el "National Institute
of Standards and Technology" ([NIST](www.nist.gov)), para evaluar
la incertidumbre de medición asociada con una cantidad de salida
escalar o vectorial que es una función conocida y explícita de un
conjunto de cantidades de entrada escalares para las cuales se
dispone de estimaciones y evaluaciones de incertidumbre de
medición.

La Máquina de Incertidumbre del NIST implementa el método
aproximado de evaluación de incertidumbre descrito en la "Guía
para la expresión de incertidumbre en la medición" (GUM), y el
método de Monte Carlo de los Suplementos 1 y 2 del GUM. Las
cantidades de entrada y salida se modelan como variables
aleatorias, y sus distribuciones de probabilidad se utilizan
para caracterizar la incertidumbre de medición. Para las entradas
que están correlacionadas, la Máquina de Incertidumbre del NIST
ofrece los medios para especificar las correlaciones
correspondientes y la manera en que se tendrán en cuenta.

El resultado de la Máquina de Incertidumbre del NIST consiste de:

 * Una estimación de la cantidad de salida (mensurando)
 * Valuacion de la incertidumbre estandár, y incertidumbres expandidas
 * Los intervalos de cobertura para el valor real del mensurando
 * Un presupuesto de incertidumbre que cuantifica la influencia que las
incertidumbres de la Las entradas tienen sobre la incertidumbre
de la salida.

Para obtener detalles sobre la Máquina de Incertidumbre del NIST
y ejemplos de su aplicación, consulte su manual de usuario,
disponible [aqui](./NISTUncertaintyMachine-UserManual.pdf), y a T. Lafarge y A. Possolo (2015) "La Máquina
de Incertidumbre del NIST", NCSLI Measure Journal of Measurement
Science, volumen 10, número 3 (septiembre), páginas 20-27.

NIST es el instituto nacional de metrología de los Estados Unidos
de América. Visítenos en www.nist.gov. Fundado en 1901, NIST es
una agencia federal no reguladora dentro del Departamento de
Comercio de los Estados Unidos. La misión de NIST es promover la
innovación en los EE. UU. y la competitividad industrial mediante
el avance de la ciencia, los estándares y la tecnología de
medición de manera que mejoren la seguridad económica y nuestra
calidad de vida.

Los informes de errores y las sugerencias para mejorar son
bienvenidos: envíelos a thomas.lafarge@nist.gov y a
antonio.possolo@nist.gov.

## Instrucciones

* Seleccione el número de cantidades de entrada.
* Cambie los nombres de la cantidad si es necesario.
* Para cada cantidad de entrada elija su distribución y sus parámetros.
* Elija y establezca las correlaciones si es necesario.
* Elija el número de realizaciones.
* Escriba la definición de la cantidad de salida en una expresión R válida.
* Ejecutar el cálculo.

## Validación y Verificación R Script

FullScriptNUM.R es un codigo R destinado a ejecutarse localmente
cuando el usuario siente la necesidad de validar, verificar o
reproducir los resultados obtenidos por la Máquina de
Incertidumbre NIST (NUM). Información más detallada está
disponible en el Capítulo 6 del manual del usuario.

Al pasar un archivo de configuración producido por el NUM como un
argumento a FullScriptNUM.R, se obtienen los mismos resultados
que cuando el mismo archivo de configuración se carga en la
aplicación web y se ejecuta allí.

Supongamos que el archivo de configuración se llama
`NUMConfigExample.um`. El script se puede ejecutar con el siguiente
comando:

`$ Rscript FullScriptNUM.R NUMConfigExample.um`

El codigo generará 3 archivos con el mismo prefijo que el archivo
de configuración. En el caso del ejemplo anterior, los archivos
de salida serían:

* `NUMConfigExample-result.txt`, un archivo de texto plano con
  los mismos resultados y diseño de los resultados numéricos
  mostrados en la página web de resultados del NUM;

* `NUMConfigExample-density.jpg`, un archivo JPEG con el mismo
  gráfico que se muestra en la página web de salida del NUM, que
  muestra los gráficos de dos densidades de probabilidad;

* `NUMConfigExample-value.Rd`, un archivo de datos binarios R con
las réplicas de las cantidades de entrada y con los valores
correspondientes de la cantidad de salida, correspondientes al
método de Monte Carlo del suplemento GUM 1. En R, el comando load
('NUMConfigExample -values.Rd ') creará tantos vectores como haya
cantidades de entrada, con sus nombres como se especifica en el
archivo de configuración, y un vector llamado "y" con los valores
de la cantidad de salida.  El script instalará todos los paquetes
R necesarios que no se hayan instalado previamente en la versión
local del sistema R. La secuencia de comandos primero escribe su
número de versión en la ventana del terminal, que debe coincidir
con la versión del NUM que se muestra en la parte superior de la
página de la aplicación web.

O codigo instalará todos los paquetes R necesarios que no se
hayan instalado previamente en la versión local del sistema R. La
secuencia de comandos primero escribe su número de versión en la
ventana del terminal, que debe coincidir con la versión del NUM
que se muestra en la parte superior de la página de la aplicación
web.

### Descarregar
  *   [NIST Validation & Verification Script Version 1.4](./FullScriptNUM/FullScriptNUM_1.4.R)
  *   [NIST Validation & Verification Script Version 1.3.6](./FullScriptNUM/FullScriptNUM_1.3.6.R)
  *   [NIST Validation & Verification Script Version 1.3.5](./FullScriptNUM/FullScriptNUM_1.3.5.R)
  *   [NIST Validation & Verification Script Version 1.3.4](./FullScriptNUM/FullScriptNUM_1.3.4.R)
