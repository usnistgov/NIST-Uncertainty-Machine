//Restrict languages to only completed ones
//var listOfLanguages = Object.keys(MLstrings[0]);
var listOfLanguages = ["English","French","Spanish","Portuguese"];





function includes(container, value) {
	var returnValue = false;
	var pos = container.indexOf(value);
	if (pos >= 0) {
		returnValue = true;
	}
	return returnValue;
}




var MLstrings = [
	{
		English: "User's manual available",
		French: "Manuel de l'utilisateur disponible",
		German: "Einführung für Anwender",
		Ukrainian: "Посібник для користувача",
		Russian: "Руководство пользователя",
		Spanish: "Manual de usuario disponible",
		Portuguese: "Manual do utilizador disponivel",
	},

	{
		English: "The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty associated with an	output quantity defined by a measurement model of the form",
		French: "NIST Uncertainty Machine est une application Web permettant d'évaluer l'incertitude de mesure associée à une quantitée définie par un modèle de la forme",
		German: "The NIST Uncertainty Machine  ist eine webbasierte Softwareanwendung zur Bewertung der Messunsicherheit, die einer durch ein Messmodell des Formulars definierten Ausgangsgröße zugeordnet ist",
		Ukrainian: "The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty associated with an	output quantity defined by a measurement model of the form_",// TODO:
		Russian: "The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty associated with an	output quantity defined by a measurement model of the form_",//todo
		Spanish: "La Máquina de Incertidumbre del NIST es una aplicación de software basada en la web para evaluar la incertidumbre de medición asociada con una cantidad de salida definida por un modelo de medición de forma",
		Portuguese: "A Máquina de Incerteza do NIST é uma aplicação na World Wide Web para calcular a incerteza	de medição associada com uma quantidade de saída definida num modelo de medição de forma",
	},
	{
		English: "Introduction",
		French: "Introduction",
		German: "Einführung",//
		Ukrainian: "Вступ",//
		Russian: "Вступление",//
		Spanish: "Introducción",
		Portuguese: "Introdução",

	},
	{
		English: "1. Select Inputs & Choose Distributions",
		French: "1. Sélectionner les quantitées d'entrées et choisir leurs distributions",
		German: "1. Wählen Sie Eingänge und wählen Sie Verteilungen",//
		Ukrainian: "1. Виберіть Входи & Виберіть Розподіл",//
		Russian: "1. Выберите входы и выберите распределения",//
		Spanish: "1. Seleccionar entradas y elegir distribuciones",//
		Portuguese: "1. Selecione Entradas e Escolha Distribuições",

	},
	{
		English: "2. Choose Options",
		French: "2. Choisissez les options",
		German: "2. Wählen Sie Optionen",//
		Ukrainian: "2. Виберіть Опції",//
		Russian: "2. Выберите параметры",//
		Spanish: "2. Elegir opciones",//
		Portuguese: "2. Escolha Opções",

	},
	{
		English: "3. Write the Definition of Output Quantity",
		French: "3. Écrire la définition de la quantité de sortie",
		German: "3. Schreiben Sie die Definition der Ausgabemenge",//
		Ukrainian: "3. Напишіть визначення вихідної кількості",//
		Russian: "3. Напишите определение количества продукции",//
		Spanish: "3. Escriba la definición de cantidad de salida",//
		Portuguese: "3. Escreva a definição da quantidade de saída",

	},


	{
		English: "here",
		French: "ici",
		German: "hier",
		Ukrainian: "тут",
		Russian: "здесь",
		Spanish: "aquí",
		Portuguese: "aqui",

	},
	{
		English: "Load examples",
		French: "Exemples",
		German: "Lade Beispiele",
		Ukrainian: "перегляд прикладів/Завантажте приклади",
		Russian: "Загрузить примеры",
		Spanish: "Cargar ejemplos",
		Portuguese: "Carregue os exemplos",

	},
	{
		English: "Instructions:",
		French: "Instructions:",
		German: "Anleitung:",
		Ukrainian: "Інструкція:",
		Russian: "Инструкция:",
		Spanish: "Instrucciones:",
		Portuguese: "Instruções:",

	},
	{
		English: "Select the number of input quantities.",
		French: "Sélectionnez le nombre de grandeurs d'entrée.",
		German: "Wählen Sie die Anzahl der Eingangsgrößen.",
		Ukrainian: "Виберіть кількість вхідних величин.",
		Russian: "Выберите количество вводимых значений.",
		Spanish: "Seleccione el número de cantidades de entrada.",
		Portuguese: "Selecione o numero das quantidades de entrada.",

	},
	{
		English: "Change the quantity names if necessary.",
		French: "Changez les noms des grandeurs si nécessaire.",
		German: "Ändern Sie ggf. die Namen der Eingangsgrößen.",
		Ukrainian: "При необхідності змініть назви величин.",
		Russian: "При необходимости измените названия значений.",
		Spanish: "Cambie los nombres de las cantidades si es necesario.",
		Portuguese: "Altere os nomes das quantidades se necessário.",

	},
	{
		English: "For each input quantity choose its distribution and its parameters.",
		French: "Pour chaque grandeur d'entrée, choisissez sa distribution et ses paramètres.",
		German: "Wählen Sie für jede Eingangsgröße eine Verteilung und die Parameter aus.",
		Ukrainian: "Для кожної вхідної величини виберіть розподіл і його параметри.",
		Russian: "Для каждого вводимого значения выберите распределение и его параметры.",
		Spanish: "Para cada cantidad de entrada elija su distribución y sus parámetros.",
		Portuguese: "Escolha uma distribuição e os respectivos parâmetros para cada uma das quantidades de entrada.",

	},
	{
		English: "Choose the number of realizations.",
		French: "Choisissez le nombre de réalisations.",
		German: "Wählen Sie die Anzahl der Realisierungen.",
		Ukrainian: "Виберіть кількість реалізацій.",
		Russian: "Выберите количество реализаций.",
		Spanish: "Elija el número de realizaciones.",
		Portuguese: "Escolha o número de realizações.",

	},
	{
		English: "Write the definition of the output quantity in a valid R expression.",
		French: "Exprimez la définition du mesurande à l'aide d'une expression R valide.",
		German: "Schreiben Sie die Definition der Ausgangsgröße in einem gültigen R-Ausdruck.",
		Ukrainian: "Напишіть вираз для вихідної величини у синтаксисі мови програмування R",
		Russian: "Напишите выражение для выходного значения в синтаксисе языка программирования R",
		Spanish: "Escriba la definición de la cantidad de salida en una expresión R válida.",
		Portuguese: "Escreva a definição da quantidade de saída	na forma de uma expressão válida em R.",
	},
	{
		English: "Choose and set the correlations if necessary.",
		French: "Choisissez et spécifiez les corrélations si nécessaire.",
		German: "Wählen Sie die Korrelationen aus und legen Sie sie gegebenenfalls fest.",
		Ukrainian: "При необхідності задайте кореляції.",
		Russian: "При необходимости выберите и зафиксируйте корреляции.",
		Spanish: "Elija y establezca las correlaciones si es necesario.",
		Portuguese: "Escolha e atribua valores às correlações	se necessário."
	},
	{
		English: "Run the computation.",
		French: "Lancer le calcul.",
		German: "Führen Sie die Berechnung aus.",
		Ukrainian: "Запустіть обчислення.",
		Russian: "Запустите вычисление.",
		Spanish: "Ejecute los cálculos",
		Portuguese: "Execute os cálculos",
	},
	{
		English: "Random number generator seed:",
		French: "Graine du générateur de nombres aléatoires:",
		German: "Zufallszahlengenerator's Seed(Startwert):",
		Ukrainian: "Cід генераторa випадкових чисел(Випадкове початкове значення):",
		Russian: "Сид генератора случайных чисел (Случайное исходное значение):",
		Spanish: "Semilla del generador de números aleatorios:",
		Portuguese: "Semente do gerador de números aleatórios:",

	},
	{
		English: "Number of input quantities:",
		French: "Nombre de grandeurs d'entrée:",
		German: "Anzahl der Eingangsgrößen:",
		Ukrainian: "Kількість вхідних величин:",
		Russian: "Kоличество вводимых значений:",
		Spanish: "Número de cantidades de entrada:",
		Portuguese: "Número de quantidades de entrada:",

	},

	{
		English: "Names of input quantities:",
		French: "Noms des grandeurs d'entrée:",
		German: "Namen der Eingangsgrößen:",
		Ukrainian: "Назви вхідних величин:",
		Russian: "Названия вводимых значений:",
		Spanish: "Nombres de las cantidades de entrada:",
		Portuguese: "Nomes das quantidades de entrada:",

	},
	{
		English: "Number of realizations of the output quantity:",
		French: "Nombre de réalisations du mesurande:",
		German: "Anzahl der Realisierungen der Ausgangsgröße:",
		Ukrainian: "Кількість реалізацій вихідної змінної:",
		Russian: "Количество реализаций выходной переменной",
		Spanish: "Número de realizaciones de la cantidad de salida:",
		Portuguese: "Número de realizações da quantidade de saída:",

	},
	{
		English: "Definition of output quantity (R expression):",
		French: "Définition de la grandeur de sortie (expression R):",
		German: "Definition der Ausgangsgröße (R-Ausdruck):",
		Ukrainian: "Визначення вихідної величини (R-вираз):",
		Russian: "Определение выходного значения (R-выражение):",
		Spanish: "Definición de la cantidad de salida (expresión R):",
		Portuguese: "Definição da quantidade de saída (expressão R):",

	},
	{
		English: "Symmetrical coverage intervals",
		French: "Intervalles de couverture symétriques",
		German: "Symmetrische Überdeckungsintervalle",
		Ukrainian: "Симметричні інтервали покриття",
		Russian: "Симметричные интервалы охвата",
		Spanish: "Intervalos simétricos de cobertura",
		Portuguese: "Intervalos de cobertura simétricos",

	},
	{
		English: "Correlations",
		French: " Corrélations",
		German: "Korrelationen",
		Ukrainian: "Кореляції",
		Russian: "Корреляции",
		Spanish: "Correlaciones",
		Portuguese: "Correlações",

	},
	{
		English: "Drop configuration file here or click to upload",
		French: "Déposez le fichier de configuration ici ou cliquez pour télécharger",
		German: "Ziehen Sie die Konfigurationsdatei hier hinein oder klicken Sie hier zum Hochladen",
		Ukrainian: "Скиньте конфігураційний файл сюди або клікніть, щоб завантажити",
		Russian: "Сбросьте конфигурационный файл сюда или кликните, чтобы загрузить",
		Spanish: "Suelte el archivo de configuración aquí o haga clic para cargar",//
		Portuguese: "Arraste para aqui o ficheiro de configuração ou pressione para carregamento",
	},




	////distributions
	{
		English: "Rectangular (Mean, StdDev)",
		French: "Rectangulaire (Moyenne, StdDev)",
		German: "Rechteckverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Неперервний рівномірний розподіл (математичне сподівання, стандартне відхилення)",
		Russian: "Непрерывное равномерное распределение(математическое ожидание, стандартное отклонение) ",
		Spanish: "Rectangular (Mean, StdDev)",//
		Portuguese: "Rectangular (Média, Desvio Padrão)",

	},
	{
		English: "Bernoulli (Prob. of success)",
		French: "Bernoulli (Prob. de succès)",
		German: "Bernoulli-Verteilung(Erfolgswahrscheinlichkeit) ",
		Ukrainian: "Розподіл Бернуллі (імовірність успіху)",
		Russian: "Распределение Бернулли (вероятность успеха)",
		Spanish: "Bernoulli (Probabilidad de éxito)",//
		Portuguese: "Bernoulli (Probabilidade de sucesso)",

	},
	{
		English: "Beta (Mean, StdDev)",
		French: "Beta (Moyenne, StdDev)",
		German: "Betaverteilung(Erwartungswert, Standardabweichung)",
		Ukrainian: "Бета-розподіл(математичне сподівання, стандартне відхилення)",
		Russian: "Бета-распределение(математическое ожидание, стандартное отклонение) ",
		Spanish: "Beta (Media, Desviación Estándar)",//
		Portuguese: "Beta (Média, Desvio Padrão)",

	},
	{
		English: "Beta (Shape1, Shape2)",
		French: "Beta (Forme1, Forme2)",
		German: "Betaverteilung (Formparameter1, Formparameter2)",
		Ukrainian: "Бета-розподіл(параметр форми1, параметр форми2)",
		Russian: "Бета-распределение(параметр формы1, параметр формы2)",
		Spanish: "Beta (Forma1, Forma2)",
		Portuguese: "Beta (Forma1, Forma2)",

	},
	{
		English: "Chi-Squared (No. of degrees of freedom)",
		French: "Chi-Squared (Nb. de degrés de liberté)",
		German: "Chi-Quadrat-Verteilung(Freiheitsgrade) ",
		Ukrainian: "Розподіл Пірсона/хі-квадрат(число ступенів вільності)",
		Russian: "Распределение Пирсона/хи-квадрат(число степеней свободы)",
		Spanish: "Chi-cuadrado (número de grados de libertad)",
		Portuguese: "Qui-quadrado (Número de graus de liberdade)",

	},
	{
		English: "Exponential (Mean)",
		French: "Exponential (Moyenne)",
		German: "Exponentialverteilung (Erwartungswert)",
		Ukrainian: "Експоненційний розподіл(Математичне сподівання)",
		Russian: "Экспоненциальное распределение (Математическое ожидание)",
		Spanish: "Exponencial (Media)",//
		Portuguese: "Exponencial (Média)",

	},
	{
		English: "Gamma (Mean, StdDev)",
		French: "Gamma (Moyenne, StdDev)",
		German: "Gammaverteilung(Erwartungswert, Standardabweichung)",
		Ukrainian: "Гамма-розподіл (Mатематичне сподівання,Cтандартне відхилення)",
		Russian: "Гамма-распределение (Математическое ожидание, Cтандартное отклонение)",
		Spanish: "Gamma (Media, Desviación Estándar)",
		Portuguese: "Gama (Média, Desvio Padrão)",

	},
	{
		English: "Gamma (Shape, Scale)",
		French: "Gamma (Forme, Echelle)",
		German: "Gammaverteilung(Formparameter,Skalenparameter)",
		Ukrainian: "Гамма-розподіл(Kоефіцієнт форми, Kоефіцієнт масштабу)",
		Russian: "Гамма-распределение(Kоэффициент формы,Kоэффициент масштаба)",
		Spanish: "Gama (Forma, Escala)",
		Portuguese: "Gama (Forma, Escala)",

	},
	{
		English: "Gaussian (Mean, StdDev)",
		French: "Gauss (Moyenne, StdDev)",
		German: "Gauß-Verteilung(Erwartungswert, Standardabweichung)",
		Ukrainian: "Нормальний розподіл/розподіл Ґауса ( математичне сподівання, стандартне відхилення)",
		Russian: "Нормальное распределение/Гаусса( математическое ожидание, стандартное отклонение )",
		Spanish: "Gaussiana (Media, Desviación Estándar)",
		Portuguese: "Gaussiana (Média, Desvio Padrão)",

	},
	{
		English: "Gaussian -- Truncated (Mean, StdDev, Left Endpoint, Right Endpoint)",
		French: "Gauss -- Truncated (Moyenne, StdDev, Extrémité gauche, Extrémité droite)",
		German: "Normal/Gauß-Verteilung -- abgeschnitten(Erwartungswert, Standardabweichung, linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Нормальний розподіл/розподіл Ґауса --усічений (математичне сподівання, стандартне відхилення, ліва гранична точка, права гранична точка)",
		Russian: "Нормальное распределение / распределение Гаусса --усечённое(математическое ожидание, стандартное отклонение, нижний предел, верхний предел)",
		Spanish: "Gaussian -- Truncada (Media, Desviación	Estándar, Limite Izquierdo, Limite Derecho)",
		Portuguese: "Gaussiana -- Truncada (Média, Desvio	Padrão, Limite Esquerdo, Limite Direito)",

	},
	{
		English: "Rectangular (Mean, StdDev)",
		French: "Rectangulaire (Moyenne, StdDev)",
		German: "Rechteckverteilung/Stetige Gleichverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Неперервний рівномірний розподіл (математичне сподівання, стандартне відхилення)",
		Russian: "Непрерывное равномерное распределение (математическое ожидание, стандартное отклонение)",
		Spanish: "Rectangular (Media, Desviación Estándar)",//
		Portuguese: "Rectangular (Média, Desvio Padrão)",

	},
	{
		English: "Rectangular (Left Endpoint, Right Endpoint)",
		French: "Rectangulaire (Extrémité gauche, Extrémité droite)",
		German: "Rechteckverteilung/Stetige Gleichverteilung (linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Неперервний рівномірний розподіл(ліва гранична точка, права гранична точка)",
		Russian: "Непрерывное равномерное распределение (нижний предел, верхний предел)",
		Spanish: "Rectangular (Limite Izquierdo, Limite Derecho)",
		Portuguese: "Rectangular (Limite Esquerdo, Limite Direito)",

	},
	{
		English: "Student t (Mean, StdDev, No. of degrees of freedom)",
		French: "Student t (Rectangulaire, StdDev, Nb. de degrés de liberté)",
		German: "Student-t-Verteilung(Erwartungswert, Standardabweichung, Freiheitsgrade)",
		Ukrainian: "t-розподіл Стьюдента(математичне сподівання, стандартне відхилення,число ступенів вільності)",
		Russian: "Распределение Стьюдента/t-распределение(математическое ожидание, стандартное отклонение, число степеней свободы)",
		Spanish: "Student t (Media, Desviación Estándar, Número de grados de libertad)",
		Portuguese: "Student t (Média, Desvio Padrão, Número de graus de liberdade)",

	},
	{
		English: "Student t (Center, Scale, No. of degrees of freedom)",
		French: "Student t (Center, Scale, Nb. de degrés de liberté)",
		German: "Student-t-Verteilung(Center, Skalenparameter, Freiheitsgrade)",
		Ukrainian: "t-розподіл Стьюдента(Центр, коефіцієнт масштабу, число ступенів вільності)",
		Russian: "Распределение Стьюдента/t-распределение(Центр, коэффициент масштаба, число степеней свободы",
		Spanish: "Student t (Centro, Escala, Número de grados	de libertad)",//
		Portuguese: "Student t (Centro, Escala, Número de graus de liberdade)",

	},
	{
		English: "Triangular -- Symmetric (Mean, StdDev)",
		French: "Triangulaire -- Symmetric (Moyenne, StdDev)",
		German: "Dreiecksverteilung -- symmetrische (Erwartungswert, Standardabweichung)",
		Ukrainian: "Трикутний розподіл Сімпсона -- симетричний (математичне сподівання, стандартне відхилення)",
		Russian: "Треугольное распределение Симпсона -- симметричное (математическое ожидание, стандартное отклонение)",
		Spanish: "Triangular -- Symmetric (Media, Desviación Estándar)",//
		Portuguese: "Triangular -- Simétrica (Média, Desvio Padrão)",

	},
	{
		English: "Triangular -- Symmetric (Left Endpoint, Right Endpoint)",
		French: "Triangulaire -- Symmetric (Extrémité gauche, Extrémité droite)",
		German: "Dreiecksverteilung -- symmetrische (linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Трикутний розподіл Сімпсона -- симетричний (ліва гранична точка, права гранична точка)",
		Russian: "Треугольное распределение Симпсона -- симметричное (нижний предел, верхний предел)",
		Spanish: "Triangular -- Symmetric (Limite Izquierdo, Limite Derecho)",
		Portuguese: "Triangular -- Simétrica (Limite Esquerdo, Limite Direito)",

	},
	{
		English: "Triangular -- Asymmetric (Left Endpoint, Mode, Right Endpoint)",
		French: "Triangulaire -- Asymmetric (Extrémité gauche, Mode, Extrémité droite)",
		German: "Dreiecksverteilung -- asymmetrische (linker Endpunkt, Modalwert, rechter Endpunkt)",
		Ukrainian: "Трикутний розподіл Сімпсона --асиметричний (ліва гранична точка, мода, права гранична точка)",
		Russian: "Треугольное распределение Симпсона -- асимметричное (нижний предел, мода, верхний предел)",
		Spanish: "Triangular -- Asimétrica (Limite Izquierdo,	Valor Modal, Limite Derecho)",//
		Portuguese: "Triangular -- Assimétrica (Limite Esquerdo, Valor Modal, Limite Direito)",

	},
	{
		English: "Uniform (Mean, StdDev)",
		French: "Uniform (Moyenne, StdDev)",
		Russian: "Непрерывное равномерное распределение (математическое ожидание, стандартное отклонение)",
		German: "Stetige Gleichverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Неперервний рівномірний розподіл (математичне сподівання, стандартне відхилення)",
		Spanish: "Uniforme (Media, Desviación Estándar)",
		Portuguese: "Uniforme (Média, Desvio Padrão)",


	},
	{
		English: "Uniform (Left Endpoint, Right Endpoint)",
		French: "Uniform (Extrémité gauche, Extrémité droite)",
		German: "Stetige Gleichverteilung (linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Неперервний рівномірний розподіл(ліва гранична точка, права гранична точка)",
		Russian: "Непрерывное равномерное распределение (нижний предел, верхний предел)",
		Spanish: "Uniforme (Limite Izquierdo, Limite Derecho)",//
		Portuguese: "Uniforme (Limite Esquerdo, Limite Direito)",
	},
	{
		English: "Weibull (Mean, StdDev)",
		French: "Weibull (Moyenne, StdDev)",
		German: "Weibull-Verteilung(Erwartungswert, Standardabweichung)",
		Ukrainian: "Розподіл Вейбула(математичне сподівання, стандартне відхилення)",
		Russian: "Распределение Вейбулла (математическое ожидание, стандартное отклонение)",
		Spanish: "Weibull (Media, Desviación Estándar)",
		Portuguese: "Weibull (Média, Desvio Padrão)",

	},
	{
		English: "Weibull (Shape, Scale)",
		French: "Weibull (Forme, Echelle)",
		German: "Weibull-Verteilung(Formparameter,Skalenparameter)",
		Ukrainian: "Розподіл Вейбула(Kоефіцієнт форми, Kоефіцієнт масштабу)",
		Russian: "Распределение Вейбулла(Kоэффициент формы,Kоэффициент масштаба)",
		Spanish: "Weibull (Forma, Escala)",//
		Portuguese: "Weibull (Forma, Escala)",

	},
	{
		English: "Constant (Value)",
		French: "Constante (Valeur)",
		German: "Konstant/Dirac-Delta",
		Ukrainian: "Kонстанта/Дельта-функція Дірака",
		Russian: "Kонстанта/Дельта-функция Дирака",
		Spanish: "Constante (Valor)",
		Portuguese: "Constante (Valor)",

	},
	{
		English: "Beta -- Shifted & Rescaled (Mean, StdDev, Left, Right)",
		French: "Beta -- Shifted & Rescaled (Moyenne, StdDev, Extrémité gauche, Extrémité droite)",
		German: "Betaverteilung -- verschoben & reskaliert (Erwartungswert, Standardabweichung,linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Бета-розподіл-- зміщений & перемасштабований (математичне сподівання, стандартне відхилення, ліва гранична точка, права гранична точка)",
		Russian: "Бета-распределение -- смещенное & перемасштабированное (математическое ожидание, стандартное отклонение, нижний предел, верхний предел) ",
		Spanish: "Beta -- Desplazada y reescalada (Media, Desviación Estándar, Limite Izquierdo, Limite Derecho)",
		Portuguese: "Beta -- Deslocada & Reescalada (Média,	Desvio Padrão, Limite Esquerdo, Limite Direito)",
	},
	{
		English: "Beta -- Shifted & Rescaled (Shape1, Shape2, Left, Right)",
		French: "Beta -- Shifted & Rescaled (Forme1, Forme2, Extrémité gauche, Extrémité droite)",
		German: "Betaverteilung -- verschoben & reskaliert (Formparameter1, Formparameter2, linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Бета-розподіл-- зміщений & перемасштабований (коефіцієнт форми1, коефіцієнт форми2, ліва гранична точка, права гранична точка)",
		Russian: "Бета-распределение -- смещенное & перемасштабированное (коэффициент формы1, коэффициент формы2, нижний предел, верхний предел) ",
		Spanish: "Beta -- Desplazada y reescalada (Forma1, Forma2, Limite Izquierdo, Limite Derecho)",
		Portuguese: "Beta -- Deslocada & Reescalada (Forma1, Forma2, Limite Esquerdo, Limite Direito)",
	},
	{
		English: "Lognormal (Mean, StdDev)",
		French: "Lognormal (Moyenne, StdDev)",
		German: "Log-Normalverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Логнормальний розподіл(математичне сподівання, стандартне відхилення)",
		Russian: "Логнормальное распределение (математическое ожидание, стандартное отклонение)",
		Spanish: "Lognormal (Media, Desviación Estándar)",//
		Portuguese: "Lognormal (Média, Desvio Padrão)",

	},
	{
		English: "Sample values (between 30 and 100000)",
		French: "Sample values (entre 30 et 100000)",
		German: "Stichprobenwerte(zwischen 30 und 100000)",
		Ukrainian: "Значення вибірки (від 30 до 100000)",
		Russian: "Значения выборки (от 30 до 100000)",
		Spanish: "Valores en la muestra (entre 30 y 100000)",//
		Portuguese: "Valores na amostra (entre 30 e 100000)",

	},
	{
		English: "More choices",
		French: "Plus de choix",
		German: "Mehr Auswahl",
		Ukrainian: "Більший вибір",
		Russian: "Больший выбор",
		Spanish: "Más elecciones",
		Portuguese: "Mais escolhas",

	},
	{
		English: "Asymmetric (Median, Left uncertainty, Right uncertainty, Coverage probability)",
		French: "Asymmetrique (Médiane, Extrémité gauche, Extrémité droite, Probabilité de couverture)",
		German: "(Asymmetrische Verteilung (Median, Unsicherheit links, Unsicherheit rechts, Überdeckungswahrscheinlichkeit)",
		Ukrainian: "Асиметричний розподіл (медіана, невизначеність ліворуч, невизначеність праворуч, довірча ймовірність)",
		Russian: "Асимметричное распределение (медиана, неопределенность слева, неопределенность справа, доверительная вероятность)",
		Spanish: "Asimétrica (Mediana, Incertidumbre izquierda,	Incertidumbre derecha, Probabilidad de cobertura)",//
		Portuguese: "Assimétrica (Mediana, Incerteza Esquerda, Incerteza Direita, Probabilidade de Cobertura)",
	},

	////Results
	{
		English: "Results",
		French: "Résultats",
		German: "Ergebnisse",
		Ukrainian: "Результати",
		Russian: "Результаты",
		Spanish: "Resultados",
		Portuguese: "Resultados",

	},

	{
		English: "Download binary R data file with Monte Carlo values of output quantity",
		French: "Télécharger le fichier R (Rdata) contenant les valeurs Monte Carlo du mesurande",
		German: "Zum herunterladen der binären R-Datei mit Monte-Carlo-Werten der Ausgabegröße bitte hier klicken",
		Ukrainian: "Завантажити бінарний R-файл з Монте-Карло значеннями вихідних даних",
		Russian: "Загрузить двоичный R-файл с Монте-Карло значениями выходных данных",
		Spanish: "Descargue el archivo de datos binarios R con los valores de Monte Carlo de la cantidad de salida",
		Portuguese: "Descarregue um ficheiro binário R com os valores de Monte Carlo da quantidade de saída",

	},
	{
		English: "Download a text file with Monte Carlo values of output quantity",
		French: "Télécharger un fichier texte avec des valeurs Monte Carlo de la quantité de sortie",
		German: "Zum herunterladen einer Textdatei mit Monte-Carlo-Werten der Ausgabegröße bitte hier klicken",
		Ukrainian: "Завантажити текстовий файл з Монте-Карло значеннями вихідних даних",
		Russian: "Загрузить текстовый файл с Монте-Карло значениями выходных данных",
		Spanish: "Descargar un archivo de texto con valores de Monte Carlo de la cantidad de salida",
		Portuguese: "Descarregue um ficheiro de texto com os valores de Monte Carlo da quantidade de saída",
	},
	{
		English: "Download text file with numerical results shown on this page",
		French: "Télécharger un fichier texte avec les résultats numériques affichés sur cette page",
		German: "Zum herunterladen der Textdatei mit den auf dieser Seite angezeigten numerischen Ergebnissen bitte hier klicken",
		Ukrainian: "Завантажити текстовий файл з числовими результатами, показаними на цій сторінці",
		Russian: "Загрузить текстовый файл с числовыми результатами, показанными на этой странице",
		Spanish: "Descargue el archivo de texto con los	resultados numéricos que se muestran en esta página",
		Portuguese: "Descarregue um ficheiro de texto com os resultados numéricos apresentados nesta página",

	},
	{
		English: "Download JPEG file with plot shown on this page",
		French: "Télécharger le fichier JPEG avec le graph affiché sur cette page",
		German: "Zum herunterladen einer JPEG-Datei mit dem auf dieser Seite gezeigten graphischen Darstellungen bitte hier klicken",
		Ukrainian: "Завантажити JPEG файл з графічним зображенням, показаним на цій сторінці",
		Russian: "Загрузить JPEG  файл с графическим изображением, показанным на этой странице",
		Spanish: "Descargar el archivo JPEG con el gráfico que se	muestra en esta página",
		Portuguese: "Descarregue um ficheiro JPEG com o	gráfico apresentado nesta página",

	},
	{
		English: "Download configuration file",
		French: "Télécharger le fichier de configuration",
		German: "Zum herunterladen der Konfigurationsdatei bitte hier klicken",
		Ukrainian: "Завантажити конфігураційний файл",
		Russian: "Загрузить конфигурационный файл",
		Spanish: "Descargar archivo de configuracion",//
		Portuguese: "Descarregue o ficheiro de configuração",

	},
	{
		English: "Shared Outputs",
		French: "Fichiers communs",
		German: "Geteilte Ausgaben",
		Ukrainian: "Спільні вихідні дані",
		Russian: "Общие выходные данные",
		Spanish: "Salidas compartidas",//
		Portuguese: "Saídas Comuns",

	},
	{
		English: "Download binary R data file with Monte Carlo values all output quantities",
		French: "Fichier R (Rdata) contenant les valeurs Monte Carlo de toutes les mesurandes",
		German: "Zum herunterladen der binären R-Datei mit Monte-Carlo-Werten aller Ausgangsgrößen bitte hier klicken",
		Ukrainian: "Завантажити бінарний R-файл з Монте-Карло значеннями всіх вихідних даних",
		Russian: "Загрузить двоичный R-файл с Монте-Карло значениями всех выходных данных",
		Spanish: "Descargue el archivo de datos binarios R con los valores de Monte Carlo en todas las cantidades de salida",
		Portuguese: "Descarregue um ficheiro binário R com os valores de Monte Carlo de todas as quantidade de saída",

	},
	{
		English: "Download text file with numerical results",
		French: "Fichier texte contenant les résultats numériques",
		German: "Zum herunterladen einer Textdatei mit numerischen Ergebnissen bitte hier klicken",
		Ukrainian: "Завантажити текстовий файл з числовими результатами",
		Russian: "Загрузить текстовый файл с числовыми результатами",
		Spanish: "Descargar archivo de texto con los resultados	numéricos.",
		Portuguese: "Descarregue um ficheiro de texto com os resultados numéricos",

	},
	{
		English: "Download a text file with Monte Carlo values of all output quantities",
		French: "Fichier texte contenant les valeurs Monte Carlo de toutes les mesurandes",
		German: "Zum herunterladen einer Textdatei mit Monte-Carlo-Werten aller Ausgangsgrößen bitte hier klicken",
		Ukrainian: "Завантажити текстовий файл з Монте-Карло значеннями всіх вихідних даних",
		Russian: "Загрузить текстовый файл с Монте-Карло значениями всех выходных данных",
		Spanish: "Descargue un archivo de texto con valores de Monte Carlo de todas las cantidades de salida",
		Portuguese: "Descarregue um ficheiro de texto com os valores de Monte Carlo de todas as quantidade de saída",
	},
	{
		English: "Download JPEG file of this plot",
		French: "Télécharger le fichier JPEG de ce graphe",
		German: "Download JPEG file of this plot",//
		Ukrainian: "Download JPEG file of this plot",//
		Russian: "Download JPEG file of this plot",//
		Spanish: "Descarga el archivo JPEG con esto gráfico.",//
		Portuguese: "Descarregue um ficheiro JPEG com este gráfico",
	},

	//Error Messages in PHP

	{
		English: "The random number generator seed is not a valid number",
		French: "La graine du générateur de nombres aléatoires n'est pas un nombre valide",
		German: "Der Zufallszahlengenerator-Startwert ist keine gültige Zahl",
		Ukrainian: "The random number generator seed is not a valid number",//
		Russian: "The random number generator seed is not a valid number",//
		Spanish: "La semilla del generador de números	aleatorios no es un número válido",
		Portuguese: "O valor da semente do gerador de números	aleatórios não é um número válido",
	},
	{
		English: "The quantity name",
		French: "Le nom de la grandeur",
		German: "Der Name",
		Ukrainian: "The quantity name",//
		Russian: "The quantity name",//
		Spanish: "El nombre de la cantidad",
		Portuguese: "O nome da quantidade",

	},
	{
		English: "is not a valid name",
		French: "n'est pas un nom valide",
		German: "ist kein gültiger Name",
		Ukrainian: "is not a valid name",//
		Russian: "is not a valid name",//
		Spanish: "no es un nombre válido",
		Portuguese: "não é um nome válido",

	},
	{
		English: "The parameter",
		French: "Le paramètre",
		German: "Der Parameter",
		Ukrainian: "The parameter",//
		Russian: "The parameter",//
		Spanish: "El parámetro",
		Portuguese: "O parâmetro",

	},
	{
		English: "of the quantity",
		French: "de la grandeur",
		German: "der Menge",
		Ukrainian: "of the quantity",//
		Russian: "of the quantity",//
		Spanish: "de la cantidad",
		Portuguese: "da quantidade",

	},

	{
		English: "is not a valid number",
		French: "n'est pas un nombre valide",
		German: "ist keine gültige Nummer",
		Ukrainian: "is not a valid number",//
		Russian: "is not a valid number",//
		Spanish: "no es un número válido",
		Portuguese: "não é um número válido",
	},
	{
		English: "The number of realizations field is not a valid number",
		French: "Le nombre de réalisations n'est pas un nombre valide",
		German: "Das Feld für die Anzahl der Realisierungen ist keine gültige Zahl",
		Ukrainian: "The number of realizations field is not a valid number",//
		Russian: "The number of realizations field is not a valid number",//
		Spanish: "El número de realizaciones no es válido",
		Portuguese: "O número de realizações não válido",
	},
	{
		English: "The number of degrees of freedom of the copula is not a valid number",
		French: "Le nombre de degrés de liberté de la copula n'est pas un nombre valide",
		German: "Die Anzahl der Freiheitsgrade der Kopula ist keine gültige Zahl",
		Ukrainian: "The number of degrees of freedom of the copula is not a valid number",//
		Russian: "The number of degrees of freedom of the copula is not a valid number",//
		Spanish: "El número de grados de libertad de la cópula no es un número válido",
		Portuguese: "O número dos graus de liberdade da cópula não é válido",
	},
	{
		English: "The correlation value",
		French: "La valeur de corrélation",
		German: "Der Korrelationswert",
		Ukrainian: "The correlation value",//
		Russian: "The correlation value",//
		Spanish: "El valor de la correlacion",
		Portuguese: "O valor da correlação",

	},
	{
		English: "The output quantity",
		French: "La grandeur de sortie",
		German: "Die Ausgabemenge",
		Ukrainian: "The output quantity",//
		Russian: "The output quantity",//
		Spanish: "La cantidad de salida",
		Portuguese: "A quantidade de saída",
	},
	{
		English: "is empty or not valid",
		French: "est vide ou non valide",
		German: "ist leer oder ungültig",
		Ukrainian: "is empty or not valid",//
		Russian: "is empty or not valid",//
		Spanish: "está vacío o no es válido",
		Portuguese: "não tem valor ou o valor não é válido",
	}
];

var MLstringsResults = [
	{

		English: "RESULTS",
		French: "RÉSULTATS",
		German: "ERGEBNISSE",
		Ukrainian: "РЕЗУЛЬТАТИ",
		Russian: "РЕЗУЛЬТАТЫ",
		Spanish: "RESULTADOS",
		Portuguese: "RESULTADOS",

	},
	{
		English: "Monte Carlo Method",
		French: "Méthode de Monte Carlo ",
		German: "Monte Carlo Method",
		Ukrainian: "Monte Carlo Method",
		Russian: "Monte Carlo Method",
		Spanish: "Método de Monte Carlo",
		Portuguese: "Método de Monte Carlo",

	},
	{
		English: "Summary statistics for sample of size",
		French: "Résultats pour un échantillon de taille ",
		German: "Summary statistics for sample of size",
		Ukrainian: "Summary statistics for sample of size",
		Russian: "Summary statistics for sample of size",
		Spanish: "Estadísticas de resumen para muestra de tamaño",
		Portuguese: "Estatísticas de sumário para amostra de tamanho",

	},
	{
		English: "ave",
		French: "moyenne ",
		German: "erwartungswert",
		Ukrainian: "математичне",
		Russian: "ожидание",
		Spanish: "Media",
		Portuguese: "Média",

	},
	{
		English: "sd",
		French: "sd",
		German: "sd",
		Ukrainian: "відхилення",
		Russian: "отклонение",
		Spanish: "Desviación Estándar",
		Portuguese: "Desvio Padrão",

	},
	{
		English: "median",
		French: "mediane",
		German: "erwartungswert",
		Ukrainian: "математичне",
		Russian: "ожидание",
		Spanish: "mediana",
		Portuguese: "mediana",

	},
	{
		English: "Coverage intervals",
		French: "Intervalles de couverture",
		German: "Coverage intervals",
		Ukrainian: "Coverage intervals",
		Russian: "Coverage intervals",
		Spanish: "Intervalos de cobertura",
		Portuguese: "Intervalos de cobertura",

	},
	{
		English: "w/out Residual w/ Residual",
		French: "Avec Résiduelle Sans Résiduelle",
		German: "w/out Residual w/ Residual",
		Ukrainian: "w/out Residual w/ Residual",
		Russian: "w/out Residual w/ Residual",
		Spanish: "Sin Residual    Con Residual",
		Portuguese: "Sem Resíduo    Com Resíduo",

	},
	{
		English: "Gauss's Formula (GUM's Linear Approximation)",
		French: "Formule de Gauss (Approximation lineaire du GUM)",
		German: "erwartungswert",
		Ukrainian: "математичне",
		Russian: "ожидание",
		Spanish: "Fórmula de Gauss (Aproximación Linear del GUM)",
		Portuguese: "Fórmula de Gauss (Aproximação Linear do GUM)",

	},
	{
		English: "SensitivityCoeffs Percent.u2",
		French: "Sensibilité Coeff Pourcent.u2",
		German: "SensitivityCoeffs Percent.u2",
		Ukrainian: "SensitivityCoeffs Percent.u2",
		Russian: "SensitivityCoeffs Percent.u2",
		Spanish: "CoeficientesDeSensibilidad Percentage.u2",
		Portuguese: "CoeficientesDeSensitividade Percentagem.u2",

	},

	//error messages in R
	{
		English: "In quantity",
		French: "Dans la grandeur",
		German: "In quantity",
		Ukrainian: "In quantity",
		Russian: "In quantity",
		Spanish: "En la cantidad",
		Portuguese: "Na quantidade",

	},
	{
		English: "StdDev must be positive",
		French: "StdDev doit être positif",
		German: "StdDev must be positive",
		Ukrainian: "StdDev must be positive",
		Russian: "StdDev must be positive",
		Spanish: "Desviación Estándar debe ser positiva",
		Portuguese: "Desvio Padrão tem de ser positivo",

	},
	{
		English: "Probability must be greater than 0 and smaller than 1",
		French: "Probabilité doit être supérieure à 0 et inférieure à 1",
		German: "Probability must be greater than 0 and smaller than 1",
		Ukrainian: "Probability must be greater than 0 and smaller than 1",
		Russian: "Probability must be greater than 0 and smaller than 1",
		Spanish: "Probabilidad debe ser mayor que 0 y menor que 1",
		Portuguese: "Probabilidade tem de ser maior do que 0 e	menor do que 1",

	},
	{
		English: "Mean must be greater than 0 and smaller than 1",
		French: "La moyenne doit être supérieure à 0 et inférieure à 1",
		German: "Mean must be greater than 0 and smaller than 1",
		Ukrainian: "Mean must be greater than 0 and smaller than 1",
		Russian: "Mean must be greater than 0 and smaller than 1",
		Spanish: "Media debe ser mayor que 0 y menor que 1",
		Portuguese: "Média tem de ser maior do que 0 e menor do que 1",
	},
	{
		English: "StdDev must be greater than 0 and smaller than 1/2",
		French: "StdDev doit être supérieur à 0 et inférieur à 1/2",
		German: "StdDev must be greater than 0 and smaller than 1/2",
		Ukrainian: "StdDev must be greater than 0 and smaller than 1/2",
		Russian: "StdDev must be greater than 0 and smaller than 1/2",
		Spanish: "Desviación Estándar debe ser mayor que 0 y menor que 1/2",
		Portuguese: "Desvio Padrão tem de ser maior do que 0 e menor do que 1/2",
	},
	{
		English: "Illegal combination of Mean and StdDev",
		French: "Combinaison illégale de la moyenne et StdDev",
		German: "Illegal combination of Mean and StdDev",
		Ukrainian: "Illegal combination of Mean and StdDev",
		Russian: "Illegal combination of Mean and StdDev",
		Spanish: "Combinación ilegal de Media y Desviación Estándar",
		Portuguese: "Combinação ilegal dos valores da Média e	do Desvio Padrão",
	},
	{
		English: "StdDev must be between",
		French: "StdDev doit être compris entre",
		German: "StdDev must be between",
		Ukrainian: "StdDev must be between",
		Russian: "StdDev must be between",
		Spanish: "Desviación Estándar debe estar entre",
		Portuguese: "Desvio Padrão tem de estar entre",

	},
	{
		English: "StdDev must be less than",
		French: "StdDev doit être inférieur à",
		German: "StdDev must be less than",
		Ukrainian: "StdDev must be less than",
		Russian: "StdDev must be less than",
		Spanish: "Desviación Estándar debe ser menor que",
		Portuguese: "Desvio Padrão tem de ser menor do que",
	},
	{
		English: "Both shape parameters must be positive",
		French: "Les deux paramètres de forme doivent être positifs",
		German: "Both shape parameters must be positive",
		Ukrainian: "Both shape parameters must be positive",
		Russian: "Both shape parameters must be positive",
		Spanish: "Los dos parámetros de forma deben ser positivos",
		Portuguese: "Ambos os parâmetros de forma têm de ser positivos",
	},
	{
		English: "No. of degrees of freedom must be positive",
		French: "Le nombre de degrés de liberté doit être positif",
		German: "No. of degrees of freedom must be positive",
		Ukrainian: "No. of degrees of freedom must be positive",
		Russian: "No. of degrees of freedom must be positive",
		Spanish: "Los grados de libertad deben ser positivos",
		Portuguese: "O número de graus de liberdade tem de ser positivo",

	},
	{
		English: "The mean must be positive",
		French: "La moyenne doit être positif",
		German: "The mean must be positive",
		Ukrainian: "The mean must be positive",
		Russian: "The mean must be positive",
		Spanish: "La media debe ser positiva",
		Portuguese: "A média tem de ser positiva",

	},
	{
		English: "StdDev must be positive",
		French: "StdDev doit être positif",
		German: "StdDev must be positive",
		Ukrainian: "StdDev must be positive",
		Russian: "StdDev must be positive",
		Spanish: "Desviación Estándar debe ser positiva",
		Portuguese: "Desvio Padrão tem de ser positivo",

	},
	{
		English: "The shape and the scale must be positive",
		French: "La forme et l'échelle doivent être positifs",
		German: "The shape and the scale must be positive",
		Ukrainian: "The shape and the scale must be positive",
		Russian: "The shape and the scale must be positive",
		Spanish: "La forma y la escala deben ser positivas",
		Portuguese: "A forma e a escala têm de ser positivas",

	},
	{
		English: "Left must be less than Right",
		French: "L'extrémité gauche doit être inférieur à l'extrémité droite",
		German: "Left must be less than Right",
		Ukrainian: "Left must be less than Right",
		Russian: "Left must be less than Right",
		Spanish: "Izquerdo debe ser menor que el Derecho",
		Portuguese: "O limite esquerdo tem de ser	menor do que o limite direito",
	},
	{
		English: "No. of degrees of freedom must be greater than 2",
		French: "Le nombre de degrés de liberté doit être supérieur à 2",
		German: "No. of degrees of freedom must be greater than 2",
		Ukrainian: "No. of degrees of freedom must be greater than 2",
		Russian: "No. of degrees of freedom must be greater than 2",
		Spanish: "El número de grados de libertad debe ser mayor que 2",
		Portuguese: "O número de graus de liberdade tem de ser maior do que 2",

	},
	{
		English: "Scale must be positive",
		French: "L'échelle doit être positif",
		German: "Scale must be positive",
		Ukrainian: "Scale must be positive",
		Russian: "Scale must be positive",
		Spanish: "Escala debe ser positiva",
		Portuguese: "A escala tem se ser positiva",

	},
	{
		English: "Left must be less than or equal to Mode",
		French: "L'extrémité gauche doit être inférieur au Mode",
		German: "Left must be less than or equal to Mode",
		Ukrainian: "Left must be less than or equal to Mode",
		Russian: "Left must be less than or equal to Mode",
		Spanish: "Izquierdo debe ser menor o igual al valor modal",
		Portuguese: "O limite esquerdo tem de ser	menor ou igual ao valor modal",

	},
	{
		English: "Mode must be less than or equal to Right",
		French: "Mode doit être inférieur à l'extrémité droite",
		German: "Mode must be less than or equal to Right",
		Ukrainian: "Mode must be less than or equal to Right",
		Russian: "Mode must be less than or equal to Right",
		Spanish: "El valor modal debe ser menor o igual al Derecho",
		Portuguese: "O valor modal tem de ser menor do que o limite direito",

	},
	{
		English: "Left and Right must be different",
		French: "L'extrémité gauche et l'extrémité droite doivent être différents",
		German: "Left and Right must be different",
		Ukrainian: "Left and Right must be different",
		Russian: "Left and Right must be different",
		Spanish: "Izquierdo y Derecho deben ser diferentes",
		Portuguese: "Os valores terminais esquerdo e direito têm de ser diferentes",

	},
	{
		English: "Mean must be greater than Left and smaller than Right",
		French: "La moyenne doit être supérieure à gauche et inférieure à droite",
		German: "Mean must be greater than Left and smaller than Right",
		Ukrainian: "Mean must be greater than Left and smaller than Right",
		Russian: "Mean must be greater than Left and smaller than Right",
		Spanish: "La media debe ser mayor que el Izquierdo y menor que el Derecho",
		Portuguese: "Média tem de ser maior do que o limite	esquerdo e menor do que o limite direito",

	},
	{
		English: "StdDev must be greater than 0 and smaller than",
		French: "StdDev doit être supérieur à 0 et inférieur à",
		German: "StdDev must be greater than 0 and smaller than",
		Ukrainian: "StdDev must be greater than 0 and smaller than",
		Russian: "StdDev must be greater than 0 and smaller than",
		Spanish: "Desviación Estándar debe ser mayor que 0 y menor que",
		Portuguese: "Desvio Padrão tem de ser maior do que 0 e menor do que",

	},
	{
		English: "Both shape parameters must be positive",
		French: "Les deux paramètres de forme doivent être positifs",
		German: "Both shape parameters must be positive",
		Ukrainian: "Both shape parameters must be positive",
		Russian: "Both shape parameters must be positive",
		Spanish: "Los dos parámetros de forma deben ser positivos",
		Portuguese: "Ambos os parâmetros de forma them de ser	positivos",
	},
	{
		English: "Left must be strictly smaller than Right",
		French: "Left doit être strictement plus petit que Right",
		German: "Left must be strictly smaller than Right",
		Ukrainian: "Left must be strictly smaller than Right",
		Russian: "Left must be strictly smaller than Right",
		Spanish: "El Izquierdo debe ser estrictamente menor que	el Derecha",
		Portuguese: "O limite esquerdo tem de ser	estritamente menor do que o limite direito",
	},
	{
		English: "The number of sample must be bigger than 30",
		French: "Le nombre d'échantillon doit être supérieur à 30",
		German: "The number of sample must be bigger than 30",
		Ukrainian: "The number of sample must be bigger than 30",
		Russian: "The number of sample must be bigger than 30",
		Spanish: "El tamaño de la muestra debe ser superior a 30",
		Portuguese: "O tamanho da amostra tem de ser maior do que 30",

	},
	{
		English: "The number of sample must be smaller than 100 000",
		French: "Le nombre d'échantillons doit être inférieur à 100 000",
		German: "The number of sample must be smaller than 100 000",
		Ukrainian: "The number of sample must be smaller than 100 000",
		Russian: "The number of sample must be smaller than 100 000",
		Spanish: "El tamaño de la muestra debe ser menor que 100 000",
		Portuguese: "O tamanho da amostra tem de ser menor do	que 100 000",

	},
	{
		English: "Error in the evaluation of the output expression:",
		French: "Erreur dans l'évaluation de la grandeur de sortie:",
		German: "Error in the evaluation of the output expression:",
		Ukrainian: "Error in the evaluation of the output expression:",
		Russian: "Error in the evaluation of the output expression:",
		Spanish: "Error en la evaluación de la expresión de salida.",
		Portuguese: "Erro na avaliação da espressão que define a quantidade de saída:",
	},



];

var submitStrings =
{
	English: "Run the computation",
	French: "Lancer le calcul",
	German: "Führen Sie die Berechnung aus",
	Ukrainian: "Запустіть обчислення",
	Russian: "Выполнить вычисление",
	Spanish: "Ejecutar el cálculo",
	Portuguese: "Execute os cálculos",
};


var mlrLangInUse;
var chosenLang = "English";



const root = document.documentElement;



mlrLangInUse = chosenLang;

function createMLDrop() {
	var mbPOCControlsLangDrop = document.getElementById("mbPOCControlsLangDrop");
	// Reset the menu
	mbPOCControlsLangDrop.innerHTML = "";
	// Now build the options

	for (var j = 0; j < listOfLanguages.length; j++) {
		let HTMLoption = document.createElement("option");
		var lang = listOfLanguages[j];
		HTMLoption.value = lang;
		HTMLoption.textContent = lang;
		mbPOCControlsLangDrop.appendChild(HTMLoption);
		if (lang === chosenLang) {
			mbPOCControlsLangDrop.value = lang;
		}
	}
	mbPOCControlsLangDrop.addEventListener("change", function(e) {
		mlrLangInUse = mbPOCControlsLangDrop[mbPOCControlsLangDrop.selectedIndex].value;
		resolveAllMLStrings();
		var newurlT= updateQueryStringParameter(window.location.href,"lang",mlrLangInUse)
		updateURL(newurlT);
		oldLangURL=langURL;
		langURL=mlrLangInUse;
		checkResultsLanguage(oldLangURL,langURL);
	});
}


function changeSubmit() {
	$("#submit").val(submitStrings[mlrLangInUse]);
}

function changeAbout() {
	var aboutFile = "about/about_"+mlrLangInUse+".md.html"
	$("#tabs-1").load(aboutFile);
}




function resolveAllMLStrings() {
	let stringsToBeResolved = document.querySelectorAll('[data-mlr-text]');
	for (var stringsToBeResolvedIndex = 0; stringsToBeResolvedIndex < stringsToBeResolved.length; stringsToBeResolvedIndex++) {
		let originaltextContent = stringsToBeResolved[stringsToBeResolvedIndex].textContent;
		let resolvedText = resolveMLString(originaltextContent, MLstrings);
		stringsToBeResolved[stringsToBeResolvedIndex].textContent = resolvedText;
	}
	changeSubmit();
	changeAbout();
}


function resolveMLString(stringToBeResolved, MLstrings) {

	for (var l = 0; l < MLstrings.length; l++) {
		var Objvalues =Object.keys(MLstrings[l]).map(function(e) {
			return MLstrings[l][e]
		})
		if(  includes(Objvalues,stringToBeResolved))
		var matchingStringIndex = MLstrings[l];
	}


	if (matchingStringIndex && matchingStringIndex[mlrLangInUse] !== undefined) {
		return matchingStringIndex[mlrLangInUse];
	} else {
		// If we don't have a match in our language strings, return the original
		return stringToBeResolved;
	}
}


function checkLanguage()
{
	if (typeof langURL !== undefined && includes(listOfLanguages,langURL))
	{
		resolveAllMLStrings();
		var mbPOCControlsLangDrop = document.getElementById("mbPOCControlsLangDrop");
		if(typeof mbPOCControlsLangDrop != 'undefined')
		mbPOCControlsLangDrop.value = langURL;
	}
}

function checkResultsLanguage(from,to)
{
	if (includes(listOfLanguages,from) && includes(listOfLanguages,to))
	{
		var resPreList = $(".resultsText");
		for (var i = 0; i < resPreList.length; i++)
		{
			var tempRes =  resPreList[i].outerHTML;
			for (var j = 0; j < MLstringsResults.length; j++)
			{
				tempRes=tempRes.replace(MLstringsResults[j][from],MLstringsResults[j][to])
			}
			resPreList[i].outerHTML = tempRes;
		}
	}
}
function checkResultsLanguageTab(to,resultTab)
{
	if (includes(listOfLanguages,to))
	{

		var resPreList = $("#tabs-"+resultTab ).find(".resultsText");
		for (var i = 0; i < resPreList.length; i++)
		{
			var tempRes =  resPreList[i].outerHTML;
			for (var j = 0; j < MLstringsResults.length; j++)
			{
				tempRes=tempRes.replace(MLstringsResults[j]["English"],MLstringsResults[j][to])
			}
			resPreList[i].outerHTML = tempRes;
		}

	}
}

function updateQueryStringParameter(uri, key, value) {
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}

function updateURL(newurl) {
	if (history.pushState) {
		window.history.pushState({path:newurl},'',newurl);
	}
}
