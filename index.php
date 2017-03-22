<!DOCTYPE html>

<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
		<title>NIST Uncertainty Machine</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="shortcut icon" href="Uncertainty.ico">
	</head>
	<body>
		<div>
			<h3>NIST Uncertainty Machine</h3>
			<div id="help">
				<div id="instruction">
					<br/>
					User's manual available <a  href="./NISTUncertaintyMachine-UserManual.pdf"> here.</a>
					<br/>
					Instructions :
					<ul>
						<li>Select the number of input quantities.</li>
						<li>Change the quantity names and update them if necessary.</li>
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
						<input type="hidden" name='outputNb' id='outputNb' value = "1"	>
					</div>
				<p id="nameHeader">Names of input quantities: </p>
					<div id="nameList">
					</div>
					<button type="button" id="validateNames">Update       quantity names</button>
					<div >
						<table id='distributions'>
						</table>
					</div>
				<p>Number of realizations of the output quantity:  	</p>
				<input name='nReal' id='nReal' type='text' value='1000000'  >

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
		<script src="script.js"></script>


	<footer id="footer">
	  <p>This software was developed at NIST. This software is not subject to copyright protection and is
	in the public domain. This software is an experimental system. NIST assumes
	no responsibility whatsoever for its use by other parties, and makes no
	guarantees, expressed or implied, about its quality, reliability, or
	any other characteristic. We would appreciate acknowledgement if the
	software is used.
	<br/>
	Version 1.3
	</p>
	</footer>

	</body>
</html>
