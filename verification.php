<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
		<title>NIST Uncertainty Machine</title>
		<link rel="stylesheet" type="text/css" href="style.css?v1.3.5">
		<link rel="shortcut icon" href="Uncertainty2.ico">
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
		<h2>Validation & Verification R Script </h2>

		<p>
			<tt>FullScriptNUM.R</tt> is an R script intended to be run locally when the
			user feels the need to validate, verify, or reproduce results obtained by
			the "NIST Uncertainty Machine" (NUM).
			<br />
			More detailed information is available in the <a  href="./NISTUncertaintyMachine-UserManual.pdf#page=17"> User's manual Chapter 6.</a>
			<br />
			<br />
			Passing a configuration file produced by the NUM as an argument to
			<tt>FullScriptNUM.R</tt>, produces the same results as when the same
			configuration file is loaded into the web application and run there.
			<br />
			<br />
			Suppose the configuration file is called <tt>NUMConfigExample.um</tt>.
			The script can be run with the following command:
			<pre>$ Rscript FullScriptNUM.R NUMConfigExample.um</pre>

			The script will generate 3 files with the same prefix as the configuration
			file. In the case of the example above, the output files would be:

			<ul>
				<li >
					<tt>NUMConfigExample-result.txt</tt>, a plain text file with the same
					results and layout of the numerical results shown on the NUM's output
					Web page;
				</li>
				<li >
					<tt>NUMConfigExample-density.jpg</tt>, a JPEG file with the same plot
					that is displayed on the NUM's output Web page, showing the graphs of
					two probability densities;
				</li>
				<li >
					<tt>NUMConfigExample-value.Rd</tt>, a binary R data file with the
					replicates of the input quantities, and with the corresponding values
					of the output quantity, corresponding to the Monte Carlo method of the
					GUM Supplement 1. In R, the command
					<tt>load('NUMConfigExample-values.Rd')</tt> will create as many vectors as
					there are input quantities, with their names as specified in the
					configuration file, and a vector named "y" with the values of the
					output quantity.
				</li>
			</ul>

				The script will install any necessary R packages that may not have been
				previously installed in the local version of the R system. The script
				first writes its version number onto the terminal window, which should
				be matched to the version of the NUM displayed at the top of the page
				of the web application.
		</p>

			<h2>Download </h2>
			<ul>
				<li >
					<a download="FullScriptNUM.R" href="./FullScriptNUM/FullScriptNUM_1.3.5.R" type="application/octet-stream"> NIST Validation & Verification Script Version 1.3.5</a>
				</li>
				<li >
					<a download="FullScriptNUM.R" href="./FullScriptNUM/FullScriptNUM_1.3.4.R" type="application/octet-stream"> NIST Validation & Verification Script Version 1.3.4</a>
				</li>

			</ul>

			<script src="../library/jquery.js"></script>
			<script src="../library/jquery-ui.min.js"></script>
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
	</body>
</html>
