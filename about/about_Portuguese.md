![NIST](https://nccoe.nist.gov/sites/all/themes/custom/nccoe2x/asset/img/NIST_logo.svg)
# Máquina de Incerteza do NIST

A Máquina de Incerteza do NIST é um aplicativo de software baseado na
Web e produzido pelo "National Institute of Standards and Technology"
([NIST](www.nist.gov)) para avaliar a incerteza de medição associada a uma grandeza de
saída escalar ou vectorial que é uma função conhecida e explícita de um
conjunto de grandezas de entrada escalares para as quais estimativas e
avaliações de incerteza de medição estão disponíveis.

A Máquina de Incerteza do NIST utiliza o método aproximado de
avaliação de incerteza descrito no "Guia para a expressão da incerteza
na medição" (GUM), e o método de Monte Carlo dos Suplementos 1 e 2 do
GUM. As grandezas de entrada e saída são modelizadas como variáveis
​​aleatórias e as suas distribuições de probabilidade são usadas para
caracterizar a incerteza de medição. Para entradas correlacionadas, a
Máquina de Incerteza do NIST oferece os meios para especificar as
correlações correspondentes e a maneira como elas serão tomadas em
consideração.

A saída da Máquina de Incerteza do NIST consiste de :

 *  Uma estimativa da quantidade de saída (mensurando)
 *  Avaliações da incerteza padrão associada e incertezas expandidas
 *  Intervalos de cobertura para o valor verdadeiro do mensurando
 *  Um orçamento de incerteza que quantifica a influência que as incertezas do entradas têm sobre a
incerteza da saída

Para obter detalhes sobre a Máquina de incerteza do NIST e exemplos da
sua aplicação, consulte o manual do usuário, disponível aqui, e
T. Lafarge e A. Possolo (2015) "The NIST Uncertainty Machine", NCSLI
Measure Journal of Measurement Science, volume 10, número 3
(setembro), páginas 20-27.

O NIST é o instituto nacional de metrologia dos Estados Unidos da
América. Visite-nos em www.nist.gov. Fundado em 1901, o NIST é uma
agência federal não reguladora dentro do Departamento de Comércio dos
EUA. A missão do NIST é promover a inovação e a competitividade
industrial dos EUA, promovendo a ciência, os padrões e a tecnologia de
medição, de forma a aumentar a segurança econômica e melhorar a nossa
qualidade de vida.

Relatórios de erros e sugestões de melhoria são bem-vindos: envie-os
para thomas.lafarge@nist.gov e para antonio.possolo@nist.gov.




## Instruções

* Selecione o número de quantidades de entrada.
* Altere os nomes das quantidades, se necessário.
* Para cada quantidade de entrada, escolha a sua distribuição e parâmetros.
* Escolha e defina correlações, se necessário.
* Escolha o número de realizações da quantidade de saida.
* Escreva a definição da quantidade de saída na forma de uma expressão R válida.
* Execute os cálculos.

## Código R de Validação e Verificação

O `FullScriptNUM.R` é um código R destinado a ser executado localmente
quando o usuário sente a necessidade de validar, verificar ou
reproduzir os resultados obtidos pela Máquina de Incerteza do NIST (NUM).
Informações mais detalhadas estão disponíveis no [Manual do
usuário, Capítulo 6]("./NISTUncertaintyMachine-UserManual.pdf#page=17").

Passando um arquivo de configuração produzido pelo NUM como um argumento
para `FullScriptNUM.R` produz os mesmos resultados que se obtêm quando o mesmo
arquivo de configuração é carregado no aplicativo da Web e executado
nele.

Suponha que o arquivo de configuração se chama `NUMConfigExample.um`. O
código pode ser executado com o comando seguinte:

`$ Rscript FullScriptNUM.R NUMConfigExample.um`

O código gerará 3 arquivos com o mesmo prefixo que o arquivo de
configuração. No caso do exemplo acima, os arquivos de saída seriam:

* `NUMConfigExample-result.txt`: um arquivo de texto simples com os mesmos
resultados e organização dos resultados numéricos apresentados na página da
Web de saída do NUM;
* `NUMConfigExample-density.jpg`: um arquivo JPEG com o mesmo gráfico
exibido na página da Web de saída do NUM, mostrando os gráficos de
duas densidades de probabilidade;
* `NUMConfigExample-value.Rd`: um arquivo de dados R binários com os
valores das grandezas de entrada e com os valores correspondentes
da quantidade de saída, correspondente ao método Monte Carlo do
Suplemento GUM 1. Em R, o comando `load('NUMConfigExample-values.Rd')`
criará tantos vectores quantas as quantidades de entrada, com os
mesmos nomes especificados no arquivo de configuração, e um vector
"y" com os valores da quantidade de saída.

O código instalará todos os pacotes de R necessários que não tenham
sido previamente instalados na versão local do sistema R. O código
primeiro escreve o número de versão na janela do terminal, que deve
corresponder à versão do NUM exibida na parte superior da página do
aplicativo da Web.

### Descarregar
  *   [NIST Validation & Verification Script Version 1.4](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.4.R)
  *   [NIST Validation & Verification Script Version 1.3.6](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.6.R)
  *   [NIST Validation & Verification Script Version 1.3.5](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.5.R)
  *   [NIST Validation & Verification Script Version 1.3.4](https://uncertainty.nist.gov/FullScriptNUM/FullScriptNUM_1.3.4.R)
