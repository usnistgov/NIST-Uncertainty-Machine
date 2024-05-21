<!DOCTYPE html>

<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
	<meta name="description" content="The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty">

	<title>NIST Uncertainty Machine</title>
	<link rel="stylesheet" type="text/css" href="./library/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="./library/codemirror.css">
	<link rel="stylesheet" type="text/css" href="./style.css?v1.5">

    <link rel="stylesheet" href="./nist-style.css">
    <!--<script src="https://pages.nist.gov/nist-header-footer/js/jquery-1.9.0.min.js" type="text/javascript" defer="defer"></script>
    <script src="/nist-header-footer.js" type="text/javascript" defer="defer"></script>-->

	<script src="./library/codemirror.js"></script>
	<script src="./library/matchbrackets.js"></script>
	<script src="./library/r.js"></script>

	<link rel="shortcut icon" href="favicon.ico">
	<style id="antiClickjack">body{display:none !important;}</style>
    
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-WFDMH2EC4H"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-WFDMH2EC4H');
    </script>


</head>
<body>

<header class="nist-header" id="nist-header" role="banner">

<a href="https://www.nist.gov/" title="National Institute of Standards and Technology" class="nist-header__logo-link" rel="home">
  <svg aria-hidden="true" class="nist-header__logo-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
    <path d="M20.911 5.375l-9.482 9.482 9.482 9.482c0.446 0.446 0.446 1.161 0 1.607l-2.964 2.964c-0.446 0.446-1.161 0.446-1.607 0l-13.25-13.25c-0.446-0.446-0.446-1.161 0-1.607l13.25-13.25c0.446-0.446 1.161-0.446 1.607 0l2.964 2.964c0.446 0.446 0.446 1.161 0 1.607z"></path>
  </svg>
  <svg class="nist-header__logo-image" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-237 385.7 109.7 29.3">
    <title>National Institute of Standards and Technology</title>
    <g>
      <path class="st0" d="M-231,415h-6v-23.1c0,0,0-4.4,4.4-5.8c4-1.3,6.6,1.3,6.6,1.3l19.7,21.3c1,0.6,1.4,0,1.4-0.6v-22h6.1V409
        c0,1.9-1.6,4.4-4,5.3c-2.4,0.9-4.9,0.9-7.9-1.7l-18.5-20c-0.5-0.5-1.8-0.6-1.8,0.4L-231,415L-231,415z"/>
      <path class="st0" d="M-195,386.1h6.1v20.7c0,2.2,1.9,2.2,3.6,2.2h26.8c1.1,0,2.4-1.3,2.4-2.7c0-1.4-1.3-2.8-2.5-2.8H-176
        c-3,0.1-9.2-2.7-9.2-8.5c0-7.1,5.9-8.8,8.6-9h49.4v6.1h-12.3V415h-6v-22.9h-30.2c-2.9-0.2-4.9,4.7-0.2,5.4h18.6
        c2.8,0,7.4,2.4,7.5,8.4c0,6.1-3.6,9-7.5,9H-185c-4.5,0-6.2-1.1-7.8-2.5c-1.5-1.5-1.7-2.3-2.2-5.3L-195,386.1
        C-194.9,386.1-195,386.1-195,386.1z"/>
    </g>
  </svg>
</a>

</header>


	<div class="content">
        <br>
        <h1 style="font-family:Computer Modern;">NIST Uncertainty Machine</h1> 
		<h5 id="versionNumber" style="font-family:Computer Modern;">Version 1.6.2</h5>
        <h5><select id="mbPOCControlsLangDrop"></select></h5>
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

									<p><span data-mlr-text>The NIST Uncertainty Machine is a Web-based software application to evaluate the measurement uncertainty associated with an output quantity defined by a measurement model of the form</span> <code>y = f(x<sub>0</sub>,...,x<sub>n</sub>)</code>.
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

    <footer class="nist-footer">
  <div class="nist-footer__inner">
    <div class="nist-footer__menu" role="navigation">
      <ul>
        <li class="nist-footer__menu-item">
          <a href="https://www.nist.gov/privacy-policy">Site Privacy</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.nist.gov/oism/accessibility">Accessibility</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.nist.gov/privacy">Privacy Program</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.nist.gov/oism/copyrights">Copyrights</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.commerce.gov/vulnerability-disclosure-policy">Vulnerability Disclosure</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.nist.gov/no-fear-act-policy">No Fear Act Policy</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.nist.gov/foia">FOIA</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.nist.gov/environmental-policy-statement">Environmental Policy</a>
        </li>
        <li class="nist-footer__menu-item ">
          <a href="https://www.nist.gov/summary-report-scientific-integrity">Scientific Integrity</a>
        </li>
        <li class="nist-footer__menu-item ">
          <a href="https://www.nist.gov/nist-information-quality-standards">Information Quality Standards</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.commerce.gov/">Commerce.gov</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.science.gov/">Science.gov</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://www.usa.gov/">USA.gov</a>
        </li>
        <li class="nist-footer__menu-item">
          <a href="https://vote.gov/">Vote.gov</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="nist-footer__logo">
    <a href="https://www.nist.gov/" title="National Institute of Standards and Technology" class="nist-footer__logo-link" rel="home">
      <img src="./nist_logo_brand_white.svg" alt="National Institute of Standards and Technology logo" />
    </a>
  </div>
</footer>


	<script src="library/jquery.js"></script>
	<script src="library/jquery-ui.min.js"></script>
	<script src="language.js?v1.5.1"></script>
	<script src="results.js?v1.5.1"></script>
	<script src="script.js?v1.5.1"></script>

</body>
</html>
