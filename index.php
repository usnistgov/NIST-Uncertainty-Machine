<!DOCTYPE html>

<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
		<title>NIST Uncertainty Machine</title>
		<link rel="stylesheet" type="text/css" href="style.css?v1.3.5">
		<link rel="shortcut icon" href="Uncertainty.ico">
	</head>
	<body>
		<div class="nist-header">
			<div class="nist-header__logo">
						<a href="https://www.nist.gov/" title="National Institute of Standards and Technology" class="nist-header__logo-link" rel="home">
						  <img src="https://pages.nist.gov/nist-header-footer/images/svg/nist_logo_reverse.svg" onerror="this.src='https://pages.nist.gov/nist-header-footer/images/nist_logo_reverse.png'" alt="">
						</a>
			</div>
			<div class="nist-header__title">
				<h4 class="title" onClick="window.location.replace('./index.php');">Uncertainty Machine</h4>
				<h5 class="title" onClick="window.location.replace('./verification.php');">Version 1.3.5</h3>
			</div>
		</div>
		<div class="content">


			<div id="help">
				<div id="instruction">
					<br/>
					User's manual available <a  href="./NISTUncertaintyMachine-UserManual.pdf"> here.</a>
					<br/>
					<div class="dropdown">
					  <a href="#" class="dropbtn">Load examples</a>
					  <div class="dropdown-content">
					    <a href="./?example=Gauge">Gauge</a>
							<a href="./?example=Resistance">Resistance</a>
							<a href="./?example=Stefan">Stefan</a>
							<a href="./?example=Thermal">Thermal</a>
							<a href="./?example=Viscosity">Viscosity</a>
							<a href="./?example=Voltage">Voltage</a>
							<a href="./?example=Allende">Allende</a>

					  </div>
					</div>
					<br/>
					Instructions :
					<ul>
						<li>Select the number of input quantities.</li>
						<li>Change the quantity names if necessary.</li>
						<li>For each input quantity choose its distribution and its parameters.</li>
						<li>Choose the number of realizations.</li>
						<li>Write the definition of the output quantity in a valid R expression.</li>
						<li>Choose and set the correlations if necessary.</li>
						<li>Run the computation.</li>
					</ul>
				</div>
				<div id="load">

					<div id="drop_zone">Drop configuration file here or click to upload</div>
					<input type='file' title="No file selected" id="files" onchange="pressed()"><label id="fileLabel"> </label>
					<p>
						<input id="reset" type="button" value="Reset" onClick="window.location.replace(location.pathname);">
					</p>
				</div>
			</div>
			<div id="form">
			<form name="input" id="input"  method="POST" action="validation.php" target="_blank"  >
					<div>Random number generator seed:
						<input name='seed' id='seed' type='text' value='' size="4" >
					</div>
					<br/>
					<div>Number of input quantities:
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
				<p id="nameHeader">Names of input quantities:
					<div id="nameList">
					</div>
				</p>
					<div >
						<table id='distributions'>
						</table>
					</div>
					<br/>
				<div>Number of realizations of the output quantity:
					<input name='nReal' id='nReal' type='text' value='1000000'  >
				</div>
				<br/>
				<div id="container">
					Definition of output quantity (R expression):
					<textarea class='output'  name='output1' id='output1' height=51px ></textarea>
					<button id='dec' type="button" onclick=removeOutput()>-</button>
					<button id='inc' type="button" onclick=addOutput()>+</button>

				</div>
				<label><input type="checkbox"  name="symmetrical" id="symmetrical" value="bar" /> Symmetrical coverage intervals</label>
				<br/>
				<label><input type="checkbox"  name="correlation" id="correlation" value="bar" /> Correlations</label>
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


				<input type="submit" value="Run the computation"/>
				<div id="state"></div>
				<span id='error'></span>
				<span id='percent'></span><br/>
			</form>
			</div>
		</div>
		<script src="library/jquery.js"></script>
		<script src="script.js?v1.3.5"></script>




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
</body>

</html>
