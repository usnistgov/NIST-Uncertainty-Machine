//Restrict languages to only completed ones
//var listOfLanguages = Object.keys(MLstrings[0]);
var listOfLanguages = ["English","French","Spanish","Portuguese","Japanese","Ukrainian","Russian","German"];





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
		Japanese: "利用マニュアル (英語) は",

	},
	{
		English: "The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty associated with an output quantity defined by a measurement model of the form",
		French: "NIST Uncertainty Machine est une application Web permettant d'évaluer l'incertitude de mesure associée à une quantitée définie par un modèle de la forme",
		German: "The NIST Uncertainty Machine  ist eine webbasierte Softwareanwendung zur Bewertung der Messunsicherheit, die einer durch ein Messmodell des Formulars definierten Ausgangsgröße zugeordnet ist",
		Ukrainian: "NIST машина невизначеності - це веб-програмний додаток для оцінки похибки вимірювання, пов'язаної з отриманою величиною, визначеною наступною моделлю вимірювання  ",
		Russian: "NIST машина неопределенности - это веб-программное приложение для оценки погрешности измерения, связанной с результативной величиной, определенной следующей моделью измерения",
		Spanish: "La Máquina de Incertidumbre del NIST es una aplicación de software basada en la web para evaluar la incertidumbre de medición asociada con una cantidad de salida definida por un modelo de medición de forma",
		Portuguese: "A Máquina de Incerteza do NIST é uma aplicação na World Wide Web para calcular a incerteza de medição associada com uma quantidade de saída definida num modelo de medição de forma",
		Japanese: "NIST不確かさマシンは，次の測定モデルによって定義される出力量の不確かさを評価するウェブベースのソフトウェアツールです:",

	},
	{
		English: "Introduction",
		French: "Introduction",
		German: "Einführung",
		Ukrainian: "Вступ",
		Russian: "Вступление",
		Spanish: "Introducción",
		Portuguese: "Introdução",
		Japanese: "概要",

	},
	{
		English: "1. Select Inputs & Choose Distributions",
		French: "1. Sélectionner les quantitées d'entrées et choisir leurs distributions",
		German: "1. Wählen Sie Eingänge und wählen Sie Verteilungen",
		Ukrainian: "1. Виберіть вхідні значення & Виберіть розподіли",
		Russian: "1. Выберите входные значения & Выберите распределения",
		Spanish: "1. Seleccionar entradas y elegir distribuciones",
		Portuguese: "1. Selecione Entradas e Escolha Distribuições",
		Japanese: "1. 入力量と分布を選択します",

	},
	{
		English: "2. Choose Options",
		French: "2. Choisissez les options",
		German: "2. Wählen Sie Optionen",
		Ukrainian: "2. Виберіть Опції",
		Russian: "2. Выберите Функции",
		Spanish: "2. Elegir opciones",
		Portuguese: "2. Escolha Opções",
		Japanese: "2. 計算オプションを選択します",

	},
	{
		English: "3. Write the Definition of Output Quantity",
		French: "3. Écrire la définition de la quantité de sortie",
		German: "3. Schreiben Sie die Definition des erhaltenen Wertes",
		Ukrainian: "3. Напишіть визначення отриманої величини",
		Russian: "3. Напишите определения полученной величины",
		Spanish: "3. Escriba la definición de cantidad de salida",
		Portuguese: "3. Escreva a definição da quantidade de saída",
		Japanese: "3. 出力量の定義を記述します",

	},
	{
		English: "here",
		French: "ici",
		German: "hier",
		Ukrainian: "тут",
		Russian: "здесь",
		Spanish: "aquí",
		Portuguese: "aqui",
		Japanese: "ここ",

	},
	{
		English: "Load examples",
		French: "Exemples",
		German: "Lade Beispiele",
		Ukrainian: "Перегляд прикладів/ Завантажте приклади",
		Russian: "Просмотр примеров/ Загрузить примеры",
		Spanish: "Cargar ejemplos",
		Portuguese: "Carregue os exemplos",
		Japanese: "実行例の読み込み",

	},
	{
		English: "Instructions:",
		French: "Instructions:",
		German: "Anleitung:",
		Ukrainian: "Інструкція:",
		Russian: "Инструкция:",
		Spanish: "Instrucciones:",
		Portuguese: "Instruções:",
		Japanese: "実行手順",

	},
	{
		English: "Select the number of input quantities.",
		French: "Sélectionnez le nombre de grandeurs d'entrée.",
		German: "Wählen Sie die Anzahl der Eingangsgrößen.",
		Ukrainian: "Виберіть кількість вхідних величин.",
		Russian: "Выберите количество вводимых значений.",
		Spanish: "Seleccione el número de cantidades de entrada.",
		Portuguese: "Selecione o numero das quantidades de entrada.",
		Japanese: "入力量の個数を選択します。",

	},
	{
		English: "Change the quantity names if necessary.",
		French: "Changez les noms des grandeurs si nécessaire.",
		German: "Ändern Sie ggf. die Namen der Eingangsgrößen.",
		Ukrainian: "При необхідності змініть назви величин.",
		Russian: "При необходимости измените названия значений.",
		Spanish: "Cambie los nombres de las cantidades si es necesario.",
		Portuguese: "Altere os nomes das quantidades se necessário.",
		Japanese: "必要に応じて変数名を変更します。",

	},
	{
		English: "For each input quantity choose its distribution and its parameters.",
		French: "Pour chaque grandeur d'entrée, choisissez sa distribution et ses paramètres.",
		German: "Wählen Sie für jede Eingangsgröße eine Verteilung und die Parameter aus.",
		Ukrainian: "Для кожної вхідної величини виберіть розподіл і його параметри.",
		Russian: "Для каждого вводимого значения выберите распределение и его параметры.",
		Spanish: "Para cada cantidad de entrada elija su distribución y sus parámetros.",
		Portuguese: "Escolha uma distribuição e os respectivos parâmetros para cada uma das quantidades de entrada.",
		Japanese: "各入力量に対して，分布の種類と分布パラメータを選びます。",

	},
	{
		English: "Choose the number of realizations.",
		French: "Choisissez le nombre de réalisations.",
		German: "Wählen Sie die Anzahl der Realisierungen.",
		Ukrainian: "Виберіть кількість реалізацій.",
		Russian: "Выберите количество реализаций.",
		Spanish: "Elija el número de realizaciones.",
		Portuguese: "Escolha o número de realizações.",
		Japanese: "反復計算の回数を指定します。",

	},
	{
		English: "Write the definition of the output quantity in a valid R expression.",
		French: "Exprimez la définition du mesurande à l'aide d'une expression R valide.",
		German: "Schreiben Sie die Definition der Ausgangsgröße in einem gültigen R-Ausdruck.",
		Ukrainian: "Напишіть вираз для отриманої величини у синтаксисі мови програмування R.",
		Russian: "Напишите выражение для полученного значения в синтаксисе языка программирования R.",
		Spanish: "Escriba la definición de la cantidad de salida en una expresión R válida.",
		Portuguese: "Escreva a definição da quantidade de saída na forma de uma expressão válida em R.",
		Japanese: "出力量の定義を，R言語の数式の形で記述します。",

	},
	{
		English: "Choose and set the correlations if necessary.",
		French: "Choisissez et spécifiez les corrélations si nécessaire.",
		German: "Wählen Sie die Korrelationen aus und legen Sie sie gegebenenfalls fest.",
		Ukrainian: "При необхідності задайте кореляції.",
		Russian: "При необходимости выберите и зафиксируйте корреляции.",
		Spanish: "Elija y establezca las correlaciones si es necesario.",
		Portuguese: "Escolha e atribua valores às correlações se necessário.",
		Japanese: "相関への考慮が必要な場合，相関係数をセットします。",

	},
	{
		English: "Run the computation.",
		French: "Lancer le calcul.",
		German: "Führen Sie die Berechnung aus.",
		Ukrainian: "Запустіть обчислення.",
		Russian: "Запустите вычисление.",
		Spanish: "Ejecute los cálculos",
		Portuguese: "Execute os cálculos",
		Japanese: "計算を実行します。",

	},
	{
		English: "Random number generator seed:",
		French: "Graine du générateur de nombres aléatoires:",
		German: "Zufallszahlengenerator's Seed(Startwert):",
		Ukrainian: "Cід генераторa випадкових чисел(Випадкове початкове значення):",
		Russian: "Сид генератора случайных чисел (Случайное исходное значение):",
		Spanish: "Semilla del generador de números aleatorios:",
		Portuguese: "Semente do gerador de números aleatórios:",
		Japanese: "乱数発生のシード値:",

	},
	{
		English: "Number of input quantities:",
		French: "Nombre de grandeurs d'entrée:",
		German: "Anzahl der Eingangsgrößen:",
		Ukrainian: "Kількість вхідних величин:",
		Russian: "Kоличество вводимых значений:",
		Spanish: "Número de cantidades de entrada:",
		Portuguese: "Número de quantidades de entrada:",
		Japanese: "入力量の数:",

	},
	{
		English: "Names of input quantities:",
		French: "Noms des grandeurs d'entrée:",
		German: "Namen der Eingangsgrößen:",
		Ukrainian: "Назви вхідних величин:",
		Russian: "Названия вводимых значений:",
		Spanish: "Nombres de las cantidades de entrada:",
		Portuguese: "Nomes das quantidades de entrada:",
		Japanese: "入力量の名前:",

	},
	{
		English: "Number of realizations of the output quantity:",
		French: "Nombre de réalisations du mesurande:",
		German: "Anzahl der Realisierungen der Ausgangsgröße:",
		Ukrainian: "Кількість реалізацій отриманої величини:",
		Russian: "Количество реализаций результативной величины",
		Spanish: "Número de realizaciones de la cantidad de salida:",
		Portuguese: "Número de realizações da quantidade de saída:",
		Japanese: "出力量の反復計算の回数:",

	},
	{
		English: "Definition of output quantity (R expression):",
		French: "Définition de la grandeur de sortie (expression R):",
		German: "Definition der Ausgangsgröße (R-Ausdruck):",
		Ukrainian: "Визначення отриманої величини (R-вираз):",
		Russian: "Определение результативной величины (R-выражение):",
		Spanish: "Definición de la cantidad de salida (expresión R):",
		Portuguese: "Definição da quantidade de saída (expressão R):",
		Japanese: "出力量の定義 (R言語の数式):",

	},
	{
		English: "Symmetrical coverage intervals",
		French: "Intervalles de couverture symétriques",
		German: "Symmetrische Überdeckungsintervalle",
		Ukrainian: "Симметричні інтервали покриття",
		Russian: "Симметричные интервалы охвата",
		Spanish: "Intervalos simétricos de cobertura",
		Portuguese: "Intervalos de cobertura simétricos",
		Japanese: "左右対称の包含区間",

	},
	{
		English: "Correlations",
		French: " Corrélations",
		German: "Korrelationen",
		Ukrainian: "Кореляції",
		Russian: "Корреляции",
		Spanish: "Correlaciones",
		Portuguese: "Correlações",
		Japanese: "相関あり",

	},
	{
		English: "Drop configuration file here or click to upload",
		French: "Déposez le fichier de configuration ici ou cliquez pour télécharger",
		German: "Ziehen Sie die Konfigurationsdatei hier hinein oder klicken Sie hier zum Hochladen",
		Ukrainian: "Скиньте конфігураційний файл сюди або клікніть, щоб завантажити",
		Russian: "Сбросьте конфигурационный файл сюда или кликните, чтобы загрузить",
		Spanish: "Suelte el archivo de configuración aquí o haga clic para cargar",
		Portuguese: "Arraste para aqui o ficheiro de configuração ou pressione para carregamento",
		Japanese: "計算構成ファイルをここにドロップするか，ここをクリックして選択します",

	},

	////distributions
	{
		English: "Rectangular (Mean, StdDev)",
		French: "Rectangulaire (Moyenne, StdDev)",
		German: "Rechteckverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Неперервний рівномірний розподіл (математичне сподівання, стандартне відхилення)",
		Russian: "Непрерывное равномерное распределение(математическое ожидание, стандартное отклонение) ",
		Spanish: "Rectangular (Mean, StdDev)",
		Portuguese: "Rectangular (Média, Desvio Padrão)",
		Japanese: "一様 (平均，標準偏差)",

	},
	{
		English: "Bernoulli (Prob. of success)",
		French: "Bernoulli (Prob. de succès)",
		German: "Bernoulli-Verteilung(Erfolgswahrscheinlichkeit) ",
		Ukrainian: "Розподіл Бернуллі (імовірність успіху)",
		Russian: "Распределение Бернулли (вероятность успеха)",
		Spanish: "Bernoulli (Probabilidad de éxito)",
		Portuguese: "Bernoulli (Probabilidade de sucesso)",
		Japanese: "ベルヌーイ (成功確率)",

	},
	{
		English: "Beta (Mean, StdDev)",
		French: "Beta (Moyenne, StdDev)",
		German: "Betaverteilung(Erwartungswert, Standardabweichung)",
		Ukrainian: "Бета-розподіл(математичне сподівання, стандартне відхилення)",
		Russian: "Бета-распределение(математическое ожидание, стандартное отклонение) ",
		Spanish: "Beta (Media, Desviación Estándar)",
		Portuguese: "Beta (Média, Desvio Padrão)",
		Japanese: "ベータ (平均，標準偏差)",

	},
	{
		English: "Beta (Shape1, Shape2)",
		French: "Beta (Forme1, Forme2)",
		German: "Betaverteilung (Formparameter1, Formparameter2)",
		Ukrainian: "Бета-розподіл(параметр форми1, параметр форми2)",
		Russian: "Бета-распределение(параметр формы1, параметр формы2)",
		Spanish: "Beta (Forma1, Forma2)",
		Portuguese: "Beta (Forma1, Forma2)",
		Japanese: "ベータ (形状パラメータ1, 形状パラメータ2)",

	},
	{
		English: "Chi-Squared (No. of degrees of freedom)",
		French: "Chi-Squared (Nb. de degrés de liberté)",
		German: "Chi-Quadrat-Verteilung(Freiheitsgrade) ",
		Ukrainian: "Розподіл Пірсона/хі-квадрат(число ступенів вільності)",
		Russian: "Распределение Пирсона/хи-квадрат(число степеней свободы)",
		Spanish: "Chi-cuadrado (número de grados de libertad)",
		Portuguese: "Qui-quadrado (Número de graus de liberdade)",
		Japanese: "カイ二乗 (自由度)",

	},
	{
		English: "Exponential (Mean)",
		French: "Exponential (Moyenne)",
		German: "Exponentialverteilung (Erwartungswert)",
		Ukrainian: "Експоненційний розподіл(Математичне сподівання)",
		Russian: "Экспоненциальное распределение (Математическое ожидание)",
		Spanish: "Exponencial (Media)",
		Portuguese: "Exponencial (Média)",
		Japanese: "指数 (平均)",

	},
	{
		English: "Gamma (Mean, StdDev)",
		French: "Gamma (Moyenne, StdDev)",
		German: "Gammaverteilung(Erwartungswert, Standardabweichung)",
		Ukrainian: "Гамма-розподіл (Mатематичне сподівання,Cтандартне відхилення)",
		Russian: "Гамма-распределение (Математическое ожидание, Cтандартное отклонение)",
		Spanish: "Gamma (Media, Desviación Estándar)",
		Portuguese: "Gama (Média, Desvio Padrão)",
		Japanese: "ガンマ (平均, 標準偏差)",

	},
	{
		English: "Gamma (Shape, Scale)",
		French: "Gamma (Forme, Echelle)",
		German: "Gammaverteilung(Formparameter,Skalenparameter)",
		Ukrainian: "Гамма-розподіл(Kоефіцієнт форми, Kоефіцієнт масштабу)",
		Russian: "Гамма-распределение(Kоэффициент формы,Kоэффициент масштаба)",
		Spanish: "Gama (Forma, Escala)",
		Portuguese: "Gama (Forma, Escala)",
		Japanese: "ガンマ (形状パラメータ, 尺度パラメータ)",

	},
	{
		English: "Gaussian (Mean, StdDev)",
		French: "Gauss (Moyenne, StdDev)",
		German: "Gauß-Verteilung(Erwartungswert, Standardabweichung)",
		Ukrainian: "Нормальний розподіл/розподіл Ґауса ( математичне сподівання, стандартне відхилення)",
		Russian: "Нормальное распределение/Гаусса( математическое ожидание, стандартное отклонение )",
		Spanish: "Gaussiana (Media, Desviación Estándar)",
		Portuguese: "Gaussiana (Média, Desvio Padrão)",
		Japanese: "正規 (平均, 標準偏差)",

	},
	{
		English: "Gaussian -- Truncated (Mean, StdDev, Left Endpoint, Right Endpoint)",
		French: "Gauss -- Truncated (Moyenne, StdDev, Extrémité gauche, Extrémité droite)",
		German: "Normal/Gauß-Verteilung -- abgeschnitten(Erwartungswert, Standardabweichung, linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Нормальний розподіл/розподіл Ґауса --усічений (математичне сподівання, стандартне відхилення, ліва гранична точка, права гранична точка)",
		Russian: "Нормальное распределение / распределение Гаусса --усечённое(математическое ожидание, стандартное отклонение, нижний предел, верхний предел)",
		Spanish: "Gaussian -- Truncada (Media, Desviación Estándar, Limite Izquierdo, Limite Derecho)",
		Portuguese: "Gaussiana -- Truncada (Média, Desvio Padrão, Limite Esquerdo, Limite Direito)",
		Japanese: "打ち切り正規 (平均，標準偏差, 左端点, 右端点)",

	},
	{
		English: "Rectangular (Mean, StdDev)",
		French: "Rectangulaire (Moyenne, StdDev)",
		German: "Rechteckverteilung/Stetige Gleichverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Неперервний рівномірний розподіл (математичне сподівання, стандартне відхилення)",
		Russian: "Непрерывное равномерное распределение (математическое ожидание, стандартное отклонение)",
		Spanish: "Rectangular (Media, Desviación Estándar)",
		Portuguese: "Rectangular (Média, Desvio Padrão)",
		Japanese: "一様 (平均, 標準偏差)",

	},
	{
		English: "Rectangular (Left Endpoint, Right Endpoint)",
		French: "Rectangulaire (Extrémité gauche, Extrémité droite)",
		German: "Rechteckverteilung/Stetige Gleichverteilung (linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Неперервний рівномірний розподіл(ліва гранична точка, права гранична точка)",
		Russian: "Непрерывное равномерное распределение (нижний предел, верхний предел)",
		Spanish: "Rectangular (Limite Izquierdo, Limite Derecho)",
		Portuguese: "Rectangular (Limite Esquerdo, Limite Direito)",
		Japanese: "一様 (左端点, 右端点)",

	},
	{
		English: "Student t (Mean, StdDev, No. of degrees of freedom)",
		French: "Student t (Rectangulaire, StdDev, Nb. de degrés de liberté)",
		German: "Student-t-Verteilung(Erwartungswert, Standardabweichung, Freiheitsgrade)",
		Ukrainian: "t-розподіл Стьюдента(математичне сподівання, стандартне відхилення,число ступенів вільності)",
		Russian: "Распределение Стьюдента/t-распределение(математическое ожидание, стандартное отклонение, число степеней свободы)",
		Spanish: "Student t (Media, Desviación Estándar, Número de grados de libertad)",
		Portuguese: "Student t (Média, Desvio Padrão, Número de graus de liberdade)",
		Japanese: "スチューデントのt (平均, 標準偏差, 自由度)",

	},
	{
		English: "Student t (Center, Scale, No. of degrees of freedom)",
		French: "Student t (Center, Scale, Nb. de degrés de liberté)",
		German: "Student-t-Verteilung(Center, Skalenparameter, Freiheitsgrade)",
		Ukrainian: "t-розподіл Стьюдента(Центр, коефіцієнт масштабу, число ступенів вільності)",
		Russian: "Распределение Стьюдента/t-распределение(Центр, коэффициент масштаба, число степеней свободы",
		Spanish: "Student t (Centro, Escala, Número de grados de libertad)",
		Portuguese: "Student t (Centro, Escala, Número de graus de liberdade)",
		Japanese: "スチューデントのt (中心値, 尺度パラメータ, 自由度)",

	},
	{
		English: "Triangular -- Symmetric (Mean, StdDev)",
		French: "Triangulaire -- Symmetric (Moyenne, StdDev)",
		German: "Dreiecksverteilung -- symmetrische (Erwartungswert, Standardabweichung)",
		Ukrainian: "Трикутний розподіл Сімпсона -- симетричний (математичне сподівання, стандартне відхилення)",
		Russian: "Треугольное распределение Симпсона -- симметричное (математическое ожидание, стандартное отклонение)",
		Spanish: "Triangular -- Symmetric (Media, Desviación Estándar)",
		Portuguese: "Triangular -- Simétrica (Média, Desvio Padrão)",
		Japanese: "三角 -- 対称 (平均, 標準偏差)",

	},
	{
		English: "Triangular -- Symmetric (Left Endpoint, Right Endpoint)",
		French: "Triangulaire -- Symmetric (Extrémité gauche, Extrémité droite)",
		German: "Dreiecksverteilung -- symmetrische (linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Трикутний розподіл Сімпсона -- симетричний (ліва гранична точка, права гранична точка)",
		Russian: "Треугольное распределение Симпсона -- симметричное (нижний предел, верхний предел)",
		Spanish: "Triangular -- Symmetric (Limite Izquierdo, Limite Derecho)",
		Portuguese: "Triangular -- Simétrica (Limite Esquerdo, Limite Direito)",
		Japanese: "三角 -- 対称 (左端点, 右端点)",

	},
	{
		English: "Triangular -- Asymmetric (Left Endpoint, Mode, Right Endpoint)",
		French: "Triangulaire -- Asymmetric (Extrémité gauche, Mode, Extrémité droite)",
		German: "Dreiecksverteilung -- asymmetrische (linker Endpunkt, Modalwert, rechter Endpunkt)",
		Ukrainian: "Трикутний розподіл Сімпсона --асиметричний (ліва гранична точка, мода, права гранична точка)",
		Russian: "Треугольное распределение Симпсона -- асимметричное (нижний предел, мода, верхний предел)",
		Spanish: "Triangular -- Asimétrica (Limite Izquierdo, Valor Modal, Limite Derecho)",
		Portuguese: "Triangular -- Assimétrica (Limite Esquerdo, Valor Modal, Limite Direito)",
		Japanese: "三角 -- 非対称 (左端点, 最頻値, 右端点)",

	},
	{
		English: "Uniform (Mean, StdDev)",
		French: "Uniform (Moyenne, StdDev)",
		Russian: "Непрерывное равномерное распределение (математическое ожидание, стандартное отклонение)",
		German: "Stetige Gleichverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Неперервний рівномірний розподіл (математичне сподівання, стандартне відхилення)",
		Spanish: "Uniforme (Media, Desviación Estándar)",
		Portuguese: "Uniforme (Média, Desvio Padrão)",
		Japanese: "一様 (平均, 標準偏差)",

	},
	{
		English: "Uniform (Left Endpoint, Right Endpoint)",
		French: "Uniform (Extrémité gauche, Extrémité droite)",
		German: "Stetige Gleichverteilung (linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Неперервний рівномірний розподіл (ліва гранична точка, права гранична точка)",
		Russian: "Непрерывное равномерное распределение (нижний предел, верхний предел)",
		Spanish: "Uniforme (Limite Izquierdo, Limite Derecho)",
		Portuguese: "Uniforme (Limite Esquerdo, Limite Direito)",
		Japanese: "一様 (左端点, 右端点)",

	},
	{
		English: "Weibull (Mean, StdDev)",
		French: "Weibull (Moyenne, StdDev)",
		German: "Weibull-Verteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Розподіл Вейбула (математичне сподівання, стандартне відхилення)",
		Russian: "Распределение Вейбулла (математическое ожидание, стандартное отклонение)",
		Spanish: "Weibull (Media, Desviación Estándar)",
		Portuguese: "Weibull (Média, Desvio Padrão)",
		Japanese: "ワイブル (平均, 標準偏差)",

	},
	{
		English: "Weibull (Shape, Scale)",
		French: "Weibull (Forme, Echelle)",
		German: "Weibull-Verteilung (Formparameter,Skalenparameter)",
		Ukrainian: "Розподіл Вейбула (Kоефіцієнт форми, Kоефіцієнт масштабу)",
		Russian: "Распределение Вейбулла (Kоэффициент формы, Kоэффициент масштаба)",
		Spanish: "Weibull (Forma, Escala)",
		Portuguese: "Weibull (Forma, Escala)",
		Japanese: "ワイブル (形状パラメータ, 尺度パラメータ)",

	},
	{
		English: "Constant (Value)",
		French: "Constante (Valeur)",
		German: "Konstant/Dirac-Delta",
		Ukrainian: "Kонстанта/Дельта-функція Дірака",
		Russian: "Kонстанта/Дельта-функция Дирака",
		Spanish: "Constante (Valor)",
		Portuguese: "Constante (Valor)",
		Japanese: "定数 (値)",

	},
	{
		English: "Beta -- Shifted & Rescaled (Mean, StdDev, Left, Right)",
		French: "Beta -- Shifted & Rescaled (Moyenne, StdDev, Extrémité gauche, Extrémité droite)",
		German: "Betaverteilung -- verschoben & reskaliert (Erwartungswert, Standardabweichung,linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Бета-розподіл-- зміщений & перемасштабований (математичне сподівання, стандартне відхилення, ліва гранична точка, права гранична точка)",
		Russian: "Бета-распределение -- смещенное & перемасштабированное (математическое ожидание, стандартное отклонение, нижний предел, верхний предел) ",
		Spanish: "Beta -- Desplazada y reescalada (Media, Desviación Estándar, Limite Izquierdo, Limite Derecho)",
		Portuguese: "Beta -- Deslocada & Reescalada (Média, Desvio Padrão, Limite Esquerdo, Limite Direito)",
		Japanese: "ベータ -- Shifted & Rescaled (平均, 標準偏差, 左端点, 右端点)",

	},
	{
		English: "Beta -- Shifted & Rescaled (Shape1, Shape2, Left, Right)",
		French: "Beta -- Shifted & Rescaled (Forme1, Forme2, Extrémité gauche, Extrémité droite)",
		German: "Betaverteilung -- verschoben & reskaliert (Formparameter1, Formparameter2, linker Endpunkt, rechter Endpunkt)",
		Ukrainian: "Бета-розподіл-- зміщений & перемасштабований (коефіцієнт форми1, коефіцієнт форми2, ліва гранична точка, права гранична точка)",
		Russian: "Бета-распределение -- смещенное & перемасштабированное (коэффициент формы1, коэффициент формы2, нижний предел, верхний предел) ",
		Spanish: "Beta -- Desplazada y reescalada (Forma1, Forma2, Limite Izquierdo, Limite Derecho)",
		Portuguese: "Beta -- Deslocada & Reescalada (Forma1, Forma2, Limite Esquerdo, Limite Direito)",
		Japanese: "ベータ -- Shifted & Rescaled (形状パラメータ1, 形状パラメータ2, 左端点, 右端点)",

	},
	{
		English: "Lognormal (Mean, StdDev)",
		French: "Lognormal (Moyenne, StdDev)",
		German: "Log-Normalverteilung (Erwartungswert, Standardabweichung)",
		Ukrainian: "Логнормальний розподіл(математичне сподівання, стандартне відхилення)",
		Russian: "Логнормальное распределение (математическое ожидание, стандартное отклонение)",
		Spanish: "Lognormal (Media, Desviación Estándar)",
		Portuguese: "Lognormal (Média, Desvio Padrão)",
		Japanese: "対数正規 (平均, 標準偏差)",

	},
	{
		English: "Sample values (between 30 and 100000)",
		French: "Sample values (entre 30 et 100000)",
		German: "Stichprobenwerte(zwischen 30 und 100000)",
		Ukrainian: "Значення вибірки (від 30 до 100000)",
		Russian: "Значения выборки (от 30 до 100000)",
		Spanish: "Valores en la muestra (entre 30 y 100000)",
		Portuguese: "Valores na amostra (entre 30 e 100000)",
		Japanese: "標本値 (30個から100000個)",

	},
	{
		English: "More choices",
		French: "Plus de choix",
		German: "Mehr Auswahl",
		Ukrainian: "Більший вибір",
		Russian: "Больший выбор",
		Spanish: "Más elecciones",
		Portuguese: "Mais escolhas",
		Japanese: "選択候補をさらに見る",

	},
	{
		English: "Asymmetric (Median, Left uncertainty, Right uncertainty, Coverage probability)",
		French: "Asymmetrique (Médiane, Extrémité gauche, Extrémité droite, Probabilité de couverture)",
		German: "(Asymmetrische Verteilung (Median, Unsicherheit links, Unsicherheit rechts, Überdeckungswahrscheinlichkeit)",
		Ukrainian: "Асиметричний розподіл (медіана, невизначеність ліворуч, невизначеність праворуч, довірча ймовірність)",
		Russian: "Асимметричное распределение (медиана, неопределенность слева, неопределенность справа, доверительная вероятность)",
		Spanish: "Asimétrica (Mediana, Incertidumbre izquierda, Incertidumbre derecha, Probabilidad de cobertura)",
		Portuguese: "Assimétrica (Mediana, Incerteza Esquerda, Incerteza Direita, Probabilidade de Cobertura)",
		Japanese: "非対称 (中央値, 左不確かさ, 右不確かさ, 包含確率)",

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
		Japanese: "計算結果",

	},
	{
		English: "Download binary R data file with Monte Carlo values of output quantity",
		French: "Télécharger le fichier R (Rdata) contenant les valeurs Monte Carlo du mesurande",
		German: "Herunterladen der binären R-Datei mit Monte-Carlo-Werten des resultierenden Werts",
		Ukrainian: "Завантажити бінарний R-файл з Монте-Карло значеннями отриманих даних",
		Russian: "Загрузить двоичный R-файл с Монте-Карло значениями результативных данных",
		Spanish: "Descargue el archivo de datos binarios R con los valores de Monte Carlo de la cantidad de salida",
		Portuguese: "Descarregue um ficheiro binário R com os valores de Monte Carlo da quantidade de saída",
		Japanese: "モンテカルロ出力の値をR言語のバイナリファイルとしてダウンロードします",

	},
	{
		English: "Download a text file with Monte Carlo values of output quantity",
		French: "Télécharger un fichier texte avec des valeurs Monte Carlo de la quantité de sortie",
		German: "Herunterladen einer Textdatei mit Monte-Carlo-Werten der Ausgabegröße",
		Ukrainian: "Завантажити текстовий файл з Монте-Карло значеннями отриманих даних",
		Russian: "Загрузить текстовый файл с Монте-Карло значениями результативных данных",
		Spanish: "Descargar un archivo de texto con valores de Monte Carlo de la cantidad de salida",
		Portuguese: "Descarregue um ficheiro de texto com os valores de Monte Carlo da quantidade de saída",
		Japanese: "モンテカルロ出力の値をテキストファイルとしてダウンロードします",

	},
	{
		English: "Download text file with numerical results shown on this page",
		French: "Télécharger un fichier texte avec les résultats numériques affichés sur cette page",
		German: "Herunterladen der Textdatei mit den auf dieser Seite angezeigten numerischen Ergebnissen",
		Ukrainian: "Завантажити текстовий файл з числовими результатами, показаними на цій сторінці",
		Russian: "Загрузить текстовый файл с числовыми результатами, показанными на этой странице",
		Spanish: "Descargue el archivo de texto con los resultados numéricos que se muestran en esta página",
		Portuguese: "Descarregue um ficheiro de texto com os resultados numéricos apresentados nesta página",
		Japanese: "この画面上の数値出力をテキストファイルとしてダウンロードします",

	},
	{
		English: "Download JPEG file with plot shown on this page",
		French: "Télécharger le fichier JPEG avec le graph affiché sur cette page",
		German: "Herunterladen der JPEG-Datei mit dem auf dieser Seite gezeigten graphischen Darstellungen",
		Ukrainian: "Завантажити JPEG файл з графічним зображенням, показаним на цій сторінці",
		Russian: "Загрузить JPEG  файл с графическим изображением, показанным на этой странице",
		Spanish: "Descargar el archivo JPEG con el gráfico que se muestra en esta página",
		Portuguese: "Descarregue um ficheiro JPEG com o gráfico apresentado nesta página",
		Japanese: "この画面上の分布プロットをJPEGファイルとしてダウンロードします",

	},
	{
		English: "Download configuration file",
		French: "Télécharger le fichier de configuration",
		German: "Herunterladen der Konfigurationsdatei",
		Ukrainian: "Завантажити конфігураційний файл",
		Russian: "Загрузить конфигурационный файл",
		Spanish: "Descargar archivo de configuracion",
		Portuguese: "Descarregue o ficheiro de configuração",
		Japanese: "計算構成ファイルをダウンロードします",

	},
	{
		English: "Shared Outputs",
		French: "Fichiers communs",
		German: "Geteilte Ausgaben",
		Ukrainian: "Спільні отримані дані",
		Russian: "Общие результативные данные",
		Spanish: "Salidas compartidas",
		Portuguese: "Saídas Comuns",
		Japanese: "共有出力",

	},
	{
		English: "Download binary R data file with Monte Carlo values all output quantities",
		French: "Fichier R (Rdata) contenant les valeurs Monte Carlo de toutes les mesurandes",
		German: "Herunterladen der binären R-Datei mit Monte-Carlo-Werten aller Ausgangsgrößen",
		Ukrainian: "Завантажити бінарний R-файл з Монте-Карло значеннями всіх отриманих даних",
		Russian: "Загрузить двоичный R-файл с Монте-Карло значениями всех результативных данных",
		Spanish: "Descargue el archivo de datos binarios R con los valores de Monte Carlo en todas las cantidades de salida",
		Portuguese: "Descarregue um ficheiro binário R com os valores de Monte Carlo de todas as quantidade de saída",
		Japanese: "すべての出力量に対するモンテカルロ出力の値をR言語のバイナリファイルとしてダウンロードします",

	},
	{
		English: "Download text file with numerical results",
		French: "Fichier texte contenant les résultats numériques",
		German: "Zum herunterladen einer Textdatei mit numerischen Ergebnissen bitte hier klicken",
		Ukrainian: "Завантажити текстовий файл з числовими результатами",
		Russian: "Загрузить текстовый файл с числовыми результатами",
		Spanish: "Descargar archivo de texto con los resultados numéricos.",
		Portuguese: "Descarregue um ficheiro de texto com os resultados numéricos",
		Japanese: "数値出力の結果をテキストファイルとしてダウンロードします",

	},
	{
		English: "Download a text file with Monte Carlo values of all output quantities",
		French: "Fichier texte contenant les valeurs Monte Carlo de toutes les mesurandes",
		German: "Herunterladen einer Textdatei mit Monte-Carlo-Werten aller Ausgangsgrößen",
		Ukrainian: "Завантажити текстовий файл з Монте-Карло значеннями всіх отриманих даних",
		Russian: "Загрузить текстовый файл с Монте-Карло значениями всех результативных данных",
		Spanish: "Descargue un archivo de texto con valores de Monte Carlo de todas las cantidades de salida",
		Portuguese: "Descarregue um ficheiro de texto com os valores de Monte Carlo de todas as quantidade de saída",
		Japanese: "すべての出力量に対するモンテカルロ出力の値をテキストファイルとしてダウンロードします",

	},
	{
		English: "Download JPEG file of this plot",
		French: "Télécharger le fichier JPEG de ce graphe",
		German: "Laden Sie die JPEG-Datei dieses Plots herunter",
		Ukrainian: "Завантажити файл у форматі JPEG цього графіка",
		Russian: "Скачать файл в формате JPEG этого графика",
		Spanish: "Descarga el archivo JPEG con esto gráfico.",
		Portuguese: "Descarregue um ficheiro JPEG com este gráfico",
		Japanese: "このプロットのJPEGファイルをダウンロードします",

	},

	////Error Messages in PHP
	{
		English: "The random number generator seed is not a valid number",
		French: "La graine du générateur de nombres aléatoires n'est pas un nombre valide",
		German: "Der Zufallszahlgenerator-Startwert ist keine gültige Zahl",
		Ukrainian: "Початкове число генератора випадкових чисел не є допустимим числом",
		Russian: "Начальное число генератора случайных чисел не является допустимым числом",
		Spanish: "La semilla del generador de números aleatorios no es un número válido",
		Portuguese: "O valor da semente do gerador de números aleatórios não é um número válido",
		Japanese: "乱数発生のシードが有効な値ではありません",

	},
	{
		English: "The quantity name",
		French: "Le nom de la grandeur",
		German: "Name der Variablen",
		Ukrainian: "Назва величини",
		Russian: "Название величины",
		Spanish: "El nombre de la cantidad",
		Portuguese: "O nome da quantidade",
		Japanese: "量の名前",

	},
	{
		English: "is not a valid name",
		French: "n'est pas un nom valide",
		German: "ist kein gültiger Name",
		Ukrainian: "хибна назва",
		Russian: "ошибка в названии",
		Spanish: "no es un nombre válido",
		Portuguese: "não é um nome válido",
		Japanese: "は有効な名前ではありません",

	},
	{
		English: "The parameter",
		French: "Le paramètre",
		German: "Der Parameter",
		Ukrainian: "Параметр",
		Russian: "Параметр",
		Spanish: "El parámetro",
		Portuguese: "O parâmetro",
		Japanese: "パラメータ",

	},
	{
		English: "of the quantity",
		French: "de la grandeur",
		German: "der Variablen",
		Ukrainian: "величини",
		Russian: "величины",
		Spanish: "de la cantidad",
		Portuguese: "da quantidade",
		Japanese: "　(量",

	},
	{
		English: "is not a valid number",
		French: "n'est pas un nombre valide",
		German: "ist keine gültige Zahl",
		Ukrainian: "неправильно вибране число",
		Russian: "неправильно выбраное число",
		Spanish: "no es un número válido",
		Portuguese: "não é um número válido",
		Japanese: "に対する) は有効な値ではありません",

	},
	{
		English: "The number of realizations field is not a valid number",
		French: "Le nombre de réalisations n'est pas un nombre valide",
		German: "Das Feld für die Anzahl der Realisierungen ist keine gültige Zahl",
		Ukrainian: "Помилка в виборі кількості реалізацій",
		Russian: "Ошибка в выборе количества реализаций",
		Spanish: "El número de realizaciones no es válido",
		Portuguese: "O número de realizações não válido",
		Japanese: "反復計算の回数が有効な値ではありません",

	},
	{
		English: "Number of realizations too big, it must be smaller than 5 000 000",
		French: "Le nombre de réalisations est trop grand, il doit être inférieur à 5 000 000",
		German: "Die Anzahl der Realisierungen ist zu groß, sie sollte kleiner als 5 000 000 sein",
		Ukrainian: "Завелике число реалізацій, має бути менше ніж 5 000 000",
		Russian: "Количество реализаций слишком велико, должно быть меньше 5 000 000",
		Spanish: "El número de realizaciones no es válido, debe ser menor que 5 000 000",
		Portuguese: "O número de realizações não válido, tem de ser menor do que 5 000 000",
		Japanese: "反復計算の回数が有効な値ではありません.",

	},
	{
		English: "Random number generator too big, it must be smaller than 5 000 000",
		French: "La graine du générateur de nombres aléatoires est trop grande, elle doit être inférieur à 5 000 000",
		German: "Der Zufallszahlgenerator ist zu groß, er sollte kleiner als 5 000 000 sein",
		Ukrainian: "Генератор випадкових чисел повинен бути менший ніж 5 000 000",
		Russian: "Генератор случайных чисел должен быть меньше 5000000",
		Spanish: "La semilla del generador de números aleatorios no es válido, debe ser menor que 5 000 000",
		Portuguese: "O valor da semente do gerador de números aleatórios não é um número válido, tem de ser menor do que 5 000 000",
		Japanese: "乱数ジェネレータシードは有効な値ではありません",

	},
	{
		English: "The number of degrees of freedom of the copula is not a valid number",
		French: "Le nombre de degrés de liberté de la copula n'est pas un nombre valide",
		German: "Die Anzahl der Freiheitsgrade der Copula ist keine gültige Zahl",
		Ukrainian: "Число ступенів свободи Копулa не є допустимим числом",
		Russian: "Число степеней свободы Копула не является допустимым числом",
		Spanish: "El número de grados de libertad de la cópula no es un número válido",
		Portuguese: "O número dos graus de liberdade da cópula não é válido",
		Japanese: "コピュラの自由度が有効な値ではありません",

	},
	{
		English: "The correlation value",
		French: "La valeur de corrélation",
		German: "Der Korrelationswert",
		Ukrainian: "Значення кореляції",
		Russian: "Значение корреляции",
		Spanish: "El valor de la correlacion",
		Portuguese: "O valor da correlação",
		Japanese: "相関値",

	},
	{
		English: "The output quantity",
		French: "La grandeur de sortie",
		German: "Der resultierende Wert",
		Ukrainian: "Отримане значення",
		Russian: "Результативное значение",
		Spanish: "La cantidad de salida",
		Portuguese: "A quantidade de saída",
		Japanese: "出力量",

	},
	{
		English: "is empty or not valid",
		French: "est vide ou non valide",
		German: "ist leer oder ungültig",
		Ukrainian: "порожнє або хибне",
		Russian: "пустое или ошибочное",
		Spanish: "está vacío o no es válido",
		Portuguese: "não tem valor ou o valor não é válido",
		Japanese: "が空，もしくは有効ではありません",

	}
];


////Strings for the results page
var MLstringsResults = [
	{
		English: "RESULTS",
		French: "RÉSULTATS",
		German: "ERGEBNISSE",
		Ukrainian: "РЕЗУЛЬТАТИ",
		Russian: "РЕЗУЛЬТАТЫ",
		Spanish: "RESULTADOS",
		Portuguese: "RESULTADOS",
		Japanese: "計算結果",

	},
	{
		English: "Monte Carlo Method",
		French: "Méthode de Monte Carlo ",
		German: "Monte-Carlo Methode",
		Ukrainian: "Метод Монте-Карло",
		Russian: "Метод Монте-Карло",
		Spanish: "Método de Monte Carlo",
		Portuguese: "Método de Monte Carlo",
		Japanese: "モンテカルロ法",

	},
	{
		English: "Summary statistics for sample of size",
		French: "Résultats pour un échantillon de taille ",
		German: "Zusammenfassende Statistik für die Stichprobe mit der Größe",
		Ukrainian: "Зведена статистика для вибірки розміру",
		Russian: "Сводная статистика для выборки размером",
		Spanish: "Estadísticas de resumen para muestra de tamaño",
		Portuguese: "Estatísticas de sumário para amostra de tamanho",
		Japanese: "要約統計量；ただしサンプルサイズ",

	},
	{
		English: "ave",
		French: "moyenne ",
		German: "Erwartungswert",
		Ukrainian: "математичне сподівання",
		Russian: "математическое ожидание",
		Spanish: "Media",
		Portuguese: "Média",
		Japanese: "平均",

	},
	{
		English: "sd",
		French: "sd",
		German: "Standartabweichung",
		Ukrainian: "Стандартне відхилення",
		Russian: "Стандартное отклонение",
		Spanish: "Desviación Estándar",
		Portuguese: "Desvio Padrão",
		Japanese: "標準偏差",

	},
	{
		English: "median",
		French: "mediane",
		German: "Median",
		Ukrainian: "медіана",
		Russian: "медиана",
		Spanish: "mediana",
		Portuguese: "mediana",
		Japanese: "中央値",

	},
	{
		English: "Coverage intervals",
		French: "Intervalles de couverture",
		German: "Überdeckungsintervalle",
		Ukrainian: "Інтервали покриття",
		Russian: "Интервалы охвата",
		Spanish: "Intervalos de cobertura",
		Portuguese: "Intervalos de cobertura",
		Japanese: "包含区間",

	},
	{
		English: "w/out Residual w/ Residual",
		French: "Avec Résiduelle Sans Résiduelle",
		German: "mit Ausgabe Residuen   ohne Residuen",
		Ukrainian: "з залишками   без залишків",
		Russian: "с остатками   без остатков",
		Spanish: "Sin Residual    Con Residual",
		Portuguese: "Sem Resíduo    Com Resíduo",
		Japanese: "残差含まず  残差含む",

	},
	{
		English: "Gauss's Formula (GUM's Linear Approximation)",
		French: "Formule de Gauss (Approximation lineaire du GUM)",
		German: "Gaußsche Formel (GUM lineare Approximation)",
		Ukrainian: "Формула Гаусса (лінійна апроксимація GUM)",
		Russian: "Формула Гаусса (линейное приближение GUM)",
		Spanish: "Fórmula de Gauss (Aproximación Linear del GUM)",
		Portuguese: "Fórmula de Gauss (Aproximação Linear do GUM)",
		Japanese: "ガウスの公式 (GUMにおける線形近似)",

	},
	{
		English: "SensitivityCoeffs Percent.u2",
		French: "SensibilitéCoeff Pourcent.u2",
		German: "SensibilitätsKoeffizient Prozent.u2",
		Ukrainian: "КоефіцієнтЧутливості Відсоток.u2",
		Russian: "КоэффициентЧувствительности Процент.u2",
		Spanish: "CoeficientesDeSensibilidad Percentage.u2",
		Portuguese: "CoeficientesDeSensitividade Percentagem.u2",
		Japanese: "感度係数 　寄与率 (%)",

	},

	//error messages in R
	{
		English: "In quantity",
		French: "Dans la grandeur",
		German: "In der Variablen",
		Ukrainian: "У змінній",
		Russian: "В переменной",
		Spanish: "En la cantidad",
		Portuguese: "Na quantidade",
		Japanese: "量",

	},
	{
		English: "StdDev must be positive",
		French: "StdDev doit être positif",
		German: "Die Standardabwichung sollte positiv sein",
		Ukrainian: "стандартне відхилення повинно бути позитивним",
		Russian: "стандартное отклонение должно быть положительным",
		Spanish: "Desviación Estándar debe ser positiva",
		Portuguese: "Desvio Padrão tem de ser positivo",
		Japanese: "標準偏差は正値でなければなりません",

	},
	{
		English: "Probability must be greater than 0 and smaller than 1",
		French: "Probabilité doit être supérieure à 0 et inférieure à 1",
		German: "Die Wahrscheinlichkeit sollte größer als 0 und kleiner als 1 sein",
		Ukrainian: "Імовірність повинна бути більшою від 0 і меншою від 1",
		Russian: "Вероятность должна быть больше 0 и меньше 1",
		Spanish: "Probabilidad debe ser mayor que 0 y menor que 1",
		Portuguese: "Probabilidade tem de ser maior do que 0 e menor do que 1",
		Japanese: "確率の値は0以上，1以下でなければなりません",

	},
	{
		English: "Mean must be greater than 0 and smaller than 1",
		French: "La moyenne doit être supérieure à 0 et inférieure à 1",
		German: "Der Mittelwert sollte größer als 0 und kleiner als 1 sein",
		Ukrainian: "Середнє значення має бути більшим від 0 і меншим від 1",
		Russian: "Среднее значение должно быть больше 0 и меньше 1",
		Spanish: "Media debe ser mayor que 0 y menor que 1",
		Portuguese: "Média tem de ser maior do que 0 e menor do que 1",
		Japanese: "平均は0以上，1以下でなければなりません",

	},
	{
		English: "StdDev must be greater than 0 and smaller than 1/2",
		French: "StdDev doit être supérieur à 0 et inférieur à 1/2",
		German: "Die Standardabweichung sollte größer als 0 und kleiner als 1/2 sein",
		Ukrainian: "Стандартне відхилення повинно бути більшим від 0 і меншим від 1/2",
		Russian: "Стандартное отклонение должно быть больше 0 и меньше 1/2",
		Spanish: "Desviación Estándar debe ser mayor que 0 y menor que 1/2",
		Portuguese: "Desvio Padrão tem de ser maior do que 0 e menor do que 1/2",
		Japanese: "標準偏差は0以上，1/2以下でなければなりません",

	},
	{
		English: "Illegal combination of Mean and StdDev",
		French: "Combinaison illégale de la moyenne et StdDev",
		German: "Illegale Kombination von Mittelwert und Standardabwichung",
		Ukrainian: "Недопустиме поєднання середнього та стандартного відхилення",
		Russian: "Недопустимое сочетание среднего и стандартного отклонения",
		Spanish: "Combinación ilegal de Media y Desviación Estándar",
		Portuguese: "Combinação ilegal dos valores da Média e do Desvio Padrão",
		Japanese: "平均と標準偏差の値の組合せが不正です",

	},
	{
		English: "StdDev must be between",
		French: "StdDev doit être compris entre",
		German: "Die Standardabweichung liegt zwischen ",
		Ukrainian: "Стандартне відхилення має бути між",
		Russian: "Стандартное отклонение должно быть между",
		Spanish: "Desviación Estándar debe estar entre",
		Portuguese: "Desvio Padrão tem de estar entre",
		Japanese: "標準偏差は次の値の間になければなりません",

	},
	{
		English: "StdDev must be less than",
		French: "StdDev doit être inférieur à",
		German: "Die Standardabweichung sollte kleiner sein als",
		Ukrainian: "Стандартне відхилення має бути меншим від",
		Russian: "Стандартное отклонение должно быть меньше чем",
		Spanish: "Desviación Estándar debe ser menor que",
		Portuguese: "Desvio Padrão tem de ser menor do que",
		Japanese: "標準偏差は次の値より小さくなくてはなりません",

	},
	{
		English: "Both shape parameters must be positive",
		French: "Les deux paramètres de forme doivent être positifs",
		German: "Beide Formparameter sollten positiv sein",
		Ukrainian: "Обидва параметри форми повинні бути позитивними",
		Russian: "Оба параметра формы должны быть положительными",
		Spanish: "Los dos parámetros de forma deben ser positivos",
		Portuguese: "Ambos os parâmetros de forma têm de ser positivos",
		Japanese: "いずれの形状パラメータも正値でなければなりません",

	},
	{
		English: "No. of degrees of freedom must be positive",
		French: "Le nombre de degrés de liberté doit être positif",
		German: "Die Anzahl der Freiheitsgrade sollte positiv sein",
		Ukrainian: "Кількість ступенів вільності має бути додатньою",
		Russian: "Число степеней свободы должно быть положительным",
		Spanish: "Los grados de libertad deben ser positivos",
		Portuguese: "O número de graus de liberdade tem de ser positivo",
		Japanese: "自由度は正値でなければなりません",

	},
	{
		English: "The mean must be positive",
		French: "La moyenne doit être positif",
		German: "Der Mittelwert sollte positiv sein",
		Ukrainian: "Середнє значення має бути позитивним",
		Russian: "Среднее значение должно быть положительным",
		Spanish: "La media debe ser positiva",
		Portuguese: "A média tem de ser positiva",
		Japanese: "平均は正値でなければなりません",

	},
	{
		English: "StdDev must be positive",
		French: "StdDev doit être positif",
		German: "Die Standardabweichung sollte positiv sein",
		Ukrainian: "Стандартне відхилення має бути позитивним",
		Russian: "Стандартное отклонение должно быть положительным",
		Spanish: "Desviación Estándar debe ser positiva",
		Portuguese: "Desvio Padrão tem de ser positivo",
		Japanese: "標準偏差は正値でなければなりません",

	},
	{
		English: "The shape and the scale must be positive",
		French: "La forme et l'échelle doivent être positifs",
		German: "Die Form und die Skalierung sollten positiv sein",
		Ukrainian: "Параметри форми та масштабу повинні бути позитивними",
		Russian: "Параметры формы и масштаба должны быть положительными",
		Spanish: "La forma y la escala deben ser positivas",
		Portuguese: "A forma e a escala têm de ser positivas",
		Japanese: "形状パラメータと尺度パラメータは正値でなければなりません",

	},
	{
		English: "Left must be less than Right",
		French: "L'extrémité gauche doit être inférieur à l'extrémité droite",
		German: "Der Wert links sollte kleiner als rechts sein",
		Ukrainian: "Значення ліворуч має бути меншим ніж праворуч",
		Russian: "Значение слева должно быть меньше чем справа",
		Spanish: "Izquerdo debe ser menor que el Derecho",
		Portuguese: "O limite esquerdo tem de ser menor do que o limite direito",
		Japanese: "左端点は右端点より小さくなくてはなりません",

	},
	{
		English: "No. of degrees of freedom must be greater than 2",
		French: "Le nombre de degrés de liberté doit être supérieur à 2",
		German: "Die Anzahl der Freiheitsgrade sollte größer als 2 sein",
		Ukrainian: "Число ступенів вільності має бути більшим ніж 2",
		Russian: "Число степеней свободы должно быть больше 2.",
		Spanish: "El número de grados de libertad debe ser mayor que 2",
		Portuguese: "O número de graus de liberdade tem de ser maior do que 2",
		Japanese: "自由度は2より大きくなくてはなりません",

	},
	{
		English: "Scale must be positive",
		French: "L'échelle doit être positif",
		German: "Der Skalierungsparameter sollte positiv sein",
		Ukrainian: "Параметр масштабу повинен бути позитивним",
		Russian: "Параметр масштаба должен быть положительным",
		Spanish: "Escala debe ser positiva",
		Portuguese: "A escala tem se ser positiva",
		Japanese: "尺度パラメータは正値でなければなりません",

	},
	{
		English: "Left must be less than or equal to Mode",
		French: "L'extrémité gauche doit être inférieur au Mode",
		German: "Der Wert links sollte kleiner oder gleich dem Modus sein",
		Ukrainian: "Значення ліворуч має бути меншим або дорівнювати значенню мода",
		Russian: "Значение слева должно быть меньше или равно значению мода",
		Spanish: "Izquierdo debe ser menor o igual al valor modal",
		Portuguese: "O limite esquerdo tem de ser menor ou igual ao valor modal",
		Japanese: "左端点は最頻値以下でなくてはなりません",

	},
	{
		English: "Mode must be less than or equal to Right",
		French: "Mode doit être inférieur à l'extrémité droite",
		German: "Der Modus sollte kleiner oder gleich dem Wert rechts sein",
		Ukrainian: "Значення мода має бути меншим або дорівнювати значенню праворуч",
		Russian: "Значение мода должно быть меньше или равно значению справа",
		Spanish: "El valor modal debe ser menor o igual al Derecho",
		Portuguese: "O valor modal tem de ser menor do que o limite direito",
		Japanese: "最頻値は右端点以下でなくてはなりません",

	},
	{
		English: "Left and Right must be different",
		French: "L'extrémité gauche et l'extrémité droite doivent être différents",
		German: "Der Wert links muss sich vom Wert rechts unterscheiden",
		Ukrainian: "Значення ліворуч повинно бути відмінним від значення праворуч",
		Russian: "Значение слева должно быть отличным от значения справа",
		Spanish: "Izquierdo y Derecho deben ser diferentes",
		Portuguese: "Os valores terminais esquerdo e direito têm de ser diferentes",
		Japanese: "左端点と右端点は違う値でなければなりません",

	},
	{
		English: "Mean must be greater than Left and smaller than Right",
		French: "La moyenne doit être supérieure à gauche et inférieure à droite",
		German: "Der Mittelwert sollte größer als der Wert links und kleiner als der Wert rechts sein",
		Ukrainian: "Середнє значення має бути більшим від значення ліворуч і меншим від значення праворуч",
		Russian: "Среднее значение должно быть больше значения слева и меньше значения справа",
		Spanish: "La media debe ser mayor que el Izquierdo y menor que el Derecho",
		Portuguese: "Média tem de ser maior do que o limite esquerdo e menor do que o limite direito",
		Japanese: "平均は左端点より大きく，右端点より小さくなくてはなりません",

	},
	{
		English: "StdDev must be greater than 0 and smaller than",
		French: "StdDev doit être supérieur à 0 et inférieur à",
		German: "Die Standardabweichung sollte größer als 0 sein und kleiner als",
		Ukrainian: "Стандартне відхилення має бути більшим від 0 і меншим від",
		Russian: "Стандартное отклонение должно быть больше 0 и меньше",
		Spanish: "Desviación Estándar debe ser mayor que 0 y menor que",
		Portuguese: "Desvio Padrão tem de ser maior do que 0 e menor do que",
		Japanese: "標準偏差は0より大きく次の値より小さくなくてはなりません",

	},
	{
		English: "Both shape parameters must be positive",
		French: "Les deux paramètres de forme doivent être positifs",
		German: "Beide Formparameter sollten positiv sein",
		Ukrainian: "Обидва параметри форми повинні бути позитивними",
		Russian: "Оба параметра формы должны быть положительными",
		Spanish: "Los dos parámetros de forma deben ser positivos",
		Portuguese: "Ambos os parâmetros de forma them de ser positivos",
		Japanese: "形状パラメータはいずれも正値でなければなりません",

	},
	{
		English: "Left must be strictly smaller than Right",
		French: "Left doit être strictement plus petit que Right",
		German: "Der Wert links sollte streng kleiner als rechts sein",
		Ukrainian: "Значення ліворуч має бути строго меншим, ніж значення праворуч",
		Russian: "Значение слева должно быть строго меньше, чем справа",
		Spanish: "El Izquierdo debe ser estrictamente menor que el Derecha",
		Portuguese: "O limite esquerdo tem de ser estritamente menor do que o limite direito",
		Japanese: "左端点は右端点より小さくなくてはなりません",

	},
	{
		English: "The number of sample must be bigger than 30",
		French: "Le nombre d'échantillon doit être supérieur à 30",
		German: "Die Stichprobengröße sollte größer als 30 sein",
		Ukrainian: "Розмір вибірки повинен бути більший ніж 30",
		Russian: "Размер выборки должен быть больше 30",
		Spanish: "El tamaño de la muestra debe ser superior a 30",
		Portuguese: "O tamanho da amostra tem de ser maior do que 30",
		Japanese: "標本数は30より大きくなくてはなりません",

	},
	{
		English: "The number of sample must be smaller than 100 000",
		French: "Le nombre d'échantillons doit être inférieur à 100 000",
		German: "Die Stichprobengröße sollte kleiner als 100 000 sein",
		Ukrainian: "Розмір вибірки повинен бути менший ніж 100 000",
		Russian: "Размер выборки не должен превышать 100 000",
		Spanish: "El tamaño de la muestra debe ser menor que 100 000",
		Portuguese: "O tamanho da amostra tem de ser menor do que 100 000",
		Japanese: "標本数は100 000より小さくなくてはなりません",

	},
	{
		English: "Error in the evaluation of the output expression:",
		French: "Erreur dans l'évaluation de la grandeur de sortie:",
		German: "Fehler in der Auswertung des Ausgabenausdrucks:",
		Ukrainian: "Помилка при обчисленні результуючого виразу:",
		Russian: "Ошибка при исчислении результирующего выражения:",
		Spanish: "Error en la evaluación de la expresión de salida.",
		Portuguese: "Erro na avaliação da espressão que define a quantidade de saída:",
		Japanese: "出力量に対する次式の評価エラー:",

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
	Japanese: "計算を開始します",

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

//// Change all the results of every tabs when the language is changed
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

//// Only change the result of the specified tab from english to the right language wgen a new result tab is created
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
