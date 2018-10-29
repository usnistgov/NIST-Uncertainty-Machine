<?php
	$debug=FALSE;
 	$values=htmlspecialchars($_GET["outFile"]);
	$valuestxt = substr($values, 0, -3).".txt";

	//variable containing the path to Rscript executable
	$Rscript = "Rscript";

	if(!file_exists($valuestxt))
		exec($Rscript." --verbose R/rdtotxt.R ".$values ,$Routput2);

	if(file_exists($valuestxt))
	{
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename='.basename('values.txt'));
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		readfile($valuestxt);
	}
?>
