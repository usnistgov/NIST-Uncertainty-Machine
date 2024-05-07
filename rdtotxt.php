<?php
	// This file is used to hand the request to 
	//

    $debug=FALSE;
    $values=htmlspecialchars($_GET["outFile"]);
	$valuestxt = substr($values, 0, -3).".txt";

	error_log($values);
	error_log($valuestxt);

	//variable containing the path to Rscript executable
	$Rscript = "Rscript";

	// check for special characters
    $reg_exp_match = preg_match('/[|;&$><\!>#`{}()*=?\[\]\–~%+,\'\"]/',$values);

    if($reg_exp_match == 1) {
        http_response_code(400);
		error_log("Illegal charaacter detected in POST request.");
		exit();
    } 

	//if(!file_exists($valuestxt)) {
	error_log("Executing ".$Rscript." --verbose R/rdtotxt.R ".$values);
	exec($Rscript." --verbose R/rdtotxt.R ".$values ,$Routput2);
	//}
	
	error_log("Preparing text file for download...");
	header('Content-Type: application/octet-stream');
	header('Content-Disposition: attachment; filename='.basename('values.txt'));
	header('Expires: 0');
	header('Cache-Control: must-revalidate');
	header('Pragma: public');
	readfile($valuestxt);

	
	
?>
