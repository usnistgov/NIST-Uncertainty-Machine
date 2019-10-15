<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
	<meta name="description" content="The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty">

	<title>NIST Uncertainty Machine</title>
	<link rel="stylesheet" type="text/css" href="./library/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="./library/codemirror.css">
	<link rel="stylesheet" type="text/css" href="./style.css?v1.4.1">

	<script src="./library/codemirror.js"></script>
	<script src="./library/matchbrackets.js"></script>
	<script src="./library/r.js"></script>

	<link rel="shortcut icon" href="favicon.ico">
	<style id="antiClickjack">body{display:none !important;}</style>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-114254568-1"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-114254568-1');
	</script>

</head>
<body>
	<div class="nist-header">
		<div class="nist-header__logo">
			<a href="https://www.nist.gov/" title="National Institute of Standards and Technology" class="nist-header__logo-link" rel="home">
				<img src="./nist_logo_reverse.svg"  alt="">
			</a>
		</div>
		<div class="nist-header__title">
			<h4 class="title" >Uncertainty Machine</h4>
			<h5 class="title" ><select id="mbPOCControlsLangDrop"></select>Version 1.4.1</h5>
		</div>
	</div>
	<div class="content">

		<div id="tabs">
			<ul id="tabsul">
				<li><a href="#tabs-1">About</a></li>
				<li><a href="#tabs-2">App</a></li>
			</ul>
			<div id="tabs-1">

			</div>
			<div id="tabs-2">
				<div id="form">
					<form name="input" id="input"   action="validation.php"   >

						<fieldset  class="mainFieldset" >
							<legend class="mainLegend"><span data-mlr-text>Introduction</span></legend>
							<div class="columnContainer">
								<div class="columnLeft">

									<p><span data-mlr-text>The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty associated with an	output quantity defined by a measurement model of the form</span> <code>y = f(x<sub>0</sub>,...,x<sub>n</sub>)</code>.
									</p>
									<p>
									<span data-mlr-text>User's manual available</span> <a  href="./NISTUncertaintyMachine-UserManual.pdf"> <span data-mlr-text>here</span>.</a>
								</p>
									<div class="dropdown">
										<a href="#" class="dropbtn"><span data-mlr-text>Load examples</span></a>
										<div class="dropdown-content">
											<a href="#" onClick="loadServerConfigFile('./conf/config-Gauge.txt')">Gauge</a>
											<a href="#" onClick="loadServerConfigFile('./conf/config-Resistance.txt')">Resistance</a>
											<a href="#" onClick="loadServerConfigFile('./conf/config-Stefan.txt')">Stefan</a>
											<a href="#" onClick="loadServerConfigFile('./conf/config-Thermal.txt')">Thermal</a>
											<a href="#" onClick="loadServerConfigFile('./conf/config-Viscosity.txt')">Viscosity</a>
											<a href="#" onClick="loadServerConfigFile('./conf/config-Voltage.txt')">Voltage</a>
											<a href="#" onClick="loadServerConfigFile('./conf/config-Allende.txt')">Allende</a>

										</div>
									</div>
								</div>
								<div class = "columnRight" id="load">

									<div id="drop_zone" data-mlr-text>Drop configuration file here or click to upload</div>
									<input type='file' title="No file selected" id="files" onchange="pressed()"><label id="fileLabel"> </label>
									<p>
										<input id="reset" type="button" value="Reset" onClick="loadServerConfigFile('./conf/config-Reset.txt')">
									</p>
								</div>
							</div>

						</fieldset>
						<fieldset  class="mainFieldset" id="mainDistrib">
							<legend class="mainLegend"><span data-mlr-text>1. Select Inputs & Choose Distributions</span></legend>
							<div><span data-mlr-text>Number of input quantities:</span>
								<select id="inputs" name="inputs">
									<option value="1" selected> 1</option>
									<option value="2"> 2</option>
									<option value="3"> 3</option>
									<option value="4"> 4</option>
									<option value="5"> 5</option>
									<option value="6"> 6</option>
									<option value="7"> 7</option>
									<option value="8"> 8</option>
									<option value="9"> 9</option>
									<option value="10"> 10</option>
									<option value="11"> 11</option>
									<option value="12"> 12</option>
									<option value="13"> 13</option>
									<option value="14"> 14</option>
									<option value="15"> 15</option>
								</select>
							</div>
							<p id="nameHeader"><span data-mlr-text>Names of input quantities:</span>
								<div id="nameList">
								</div>
							</p>
							<div >
								<table id='distributions'>
								</table>
							</div>

							<span data-mlr-text>Correlations</span>
							<label class="switch">
										<input type="checkbox"  name="correlation" id="correlation" value="bar" />
										<span class="slider round" id="correlation"></span>

							</label>

							<div id='correlationClass'>
								<table id='correlationTable'>
								</table>
								<table >
									<tr>
										<td>
											<div id="copula">
											</div>
										</td>
										<td>
											<div id="copulaParam">
											</div>
										</td>
									</tr>
								</table>
							</div>
						</fieldset>
						<fieldset  class="mainFieldset" >
							<legend class="mainLegend"><span data-mlr-text>2. Choose Options</span></legend>
							<div><span data-mlr-text>Number of realizations of the output quantity:</span>
								<input name='nReal' id='nReal' type='text' value='1000000'  >
							</div>
							<div><span data-mlr-text>Random number generator seed:</span>

								<input name='seed' id='seed' type='text' value='' size="4" >
							</div>
							<span data-mlr-text>Symmetrical coverage intervals</span>
							<label class="switch">
										<input type="checkbox"  name="symmetrical" id="symmetrical" value="bar" />
										<span class="slider round" id="symmetrical"></span>

							</label>
							<br/>
						</fieldset>
						<fieldset  class="mainFieldset" >
							<legend class="mainLegend"><span data-mlr-text>3. Write the Definition of Output Quantity</span></legend>
							<div id="container">
								<span data-mlr-text>Definition of output quantity (R expression):</span>
								<textarea class='output'  name='output1' id='output1' height=51px ></textarea>
								<button class='buttonOut' id='dec' type="button" onclick=removeOutput()>-</button>
								<button class='buttonOut' id='inc' type="button" onclick=addOutput()>+</button>
							</div>
						</fieldset>
						<input type="submit" id = "submit" value="Run the computation"/>
					</form>
				</div>
			</div>
		</div>
	</div>

	<footer id="footer" class="nist-footer">
		<div class="nist-footer__inner">
			<div class="nist-footer__menu" role="navigation">
				<ul>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/privacy-policy">Privacy Statement</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/privacy-policy#privpolicy">Privacy Policy</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/privacy-policy#secnot">Security Notice</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/privacy-policy#accesstate">Accessibility Statement</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/privacy">NIST Privacy Program</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/no-fear-act-policy">No Fear Act Policy</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/disclaimer">Disclaimer</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/office-director/freedom-information-act">FOIA</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/environmental-policy-statement">Environmental Policy Statement</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.nist.gov/privacy-policy#cookie">Cookie Disclaimer</a>
					</li>
					<li class="nist-footer__menu-item ">
						<a href="https://www.nist.gov/summary-report-scientific-integrity">Scientific Integrity Summary</a>
					</li>
					<li class="nist-footer__menu-item ">
						<a href="https://www.nist.gov/nist-information-quality-standards">NIST Information Quality Standards</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://business.usa.gov/">Business USA</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.commerce.gov/">Commerce.gov</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="https://www.healthcare.gov/">Healthcare.gov</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="http://www.science.gov/">Science.gov</a>
					</li>
					<li class="nist-footer__menu-item">
						<a href="http://www.usa.gov/">USA.gov</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>

	<script src="library/jquery.js"></script>
	<script src="library/jquery-ui.min.js"></script>
	<script src="language.js?v1.4.1"></script>
	<script src="results.js?v1.4.1"></script>
	<script src="script.js?v1.4.1"></script>




</body>
</html>
