
<?php
$debug=FALSE;
$autoClean=TRUE;
set_time_limit(200);

//variable containing the path to the User temporary data must mach the UserData in script.js
$UserData = "./UserData";

//variable containing the path to Rscript executable
$Rscript = "Rscript";


if (!empty($_POST))
{
	//Clean the UserData Folder
	if ($autoClean && $handle = opendir($UserData))
	{
		while (false !== ($file = readdir($handle)))
		{
			if($file!="." && $file!=".." && $file!=".gitignore")
			{
				$filelastmodified = filemtime("$UserData/$file");
				if((time() - $filelastmodified) > 600)
				{
					//echo " This file is going to be deleted $UserData/$file <br />";
					if ($handle2 = opendir("$UserData/$file"))
					{
						while (false !== ($file2 = readdir($handle2)))
						{
							if($file2!="." && $file2!="..")
							{
								unlink("$UserData/$file/$file2");
							}
						}
						closedir($handle2);
					}
					rmdir("$UserData/$file");
				}
			}
		}
		closedir($handle);
	}

	$validInputs=TRUE;

	//Hard coded number of parameters for each distribution
	$distrib = array( 0 =>1,2,2,1,1,2,2,2,4,2,2,3,3,2,2,3,2,2,2,2,1,4,4,2,1,0,4,2,2,1);


	$params = array();
	parse_str($_POST["data"], $params);

	// check for special characters
	foreach($params as $t_param) {

		$reg_exp_match = preg_match('/[|;&$><\!>#`{}()*=?\[\]\–~%+,\'\"]/',$t_param);

		if($reg_exp_match == 1) {
			http_response_code(400);
			error_log("Illegal charaacter detected in POST request.");
			exit();
		} 

	}



	//Trim and remove whitespace from post data
	foreach($params as $key => $value) {
		$params[$key] = htmlentities($value, ENT_QUOTES);
	}

	if($debug)
	var_dump($params);

	$session = substr(hash("sha256",session_id().date('h:i:s')), 0, 8);
	if($debug)
	echo "{$session}<br />";

	$outputNb = 0;
	foreach($params as $key => $value)
	{
		if(preg_match('/^output.*/', $key))
		{
			$outputNb = $outputNb +1;
		}
	}
	if($debug)
	var_dump($outputNb);


	$inputs = intval($params["inputs"]);

	//Checking of the parameters
	if (!preg_match("/^[0-9]+?$/",preg_replace('/\s+/', '',$params["seed"])))
	{
		echo "<pre><span data-mlr-text>The random number generator seed is not a valid number</span> <br /></pre>";
		$validInputs=FALSE;
	}elseif (intval(preg_replace('/\s+/', '',$params["seed"]))>5000000)
	{
		echo "<pre><span data-mlr-text>Random number generator too big, it must be smaller than 5 000 000</span> <br /></pre>";
		$validInputs=FALSE;
	}

	for ($i = 0; $i < $inputs; $i++)
	{
		if (!preg_match("/^[A-Za-z]+[A-Za-z0-9_.]*$/",trim($params["name{$i}"])))
		{
			echo "<pre><span data-mlr-text>The quantity name</span> \"".trim($params["name{$i}"])."\" <span data-mlr-text>is not a valid name</span><br /></pre>";
			$validInputs=FALSE;
		}
	}
	for ($i = 0; $i < $inputs; $i++)
	{
		$type = $params["distChoice{$i}"];
		for ($k = 0; $k < $distrib[$type]; $k++)
		{

			if($type!=24)
			{

				if (!preg_match("/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/",preg_replace('/\s+/', '', $params["paramField{$i}-{$k}"])))
				{
					echo "<pre><span data-mlr-text>The parameter</span> \"".trim($params["paramField{$i}-{$k}"])."\" <span data-mlr-text>of the quantity</span> \"".trim($params["name{$i}"])."\" <span data-mlr-text>is not a valid number</span><br /></pre>";
					$validInputs=FALSE;
				}
			}
		}
	}

	if (!preg_match("/^[+]?[0-9]+((\.[0-9]*)?[eE][+-]?[0-9]+)?$/",preg_replace('/\s+/', '',$params["nReal"])))
	{
		echo "<pre><span data-mlr-text>The number of realizations field is not a valid number</span> <br /></pre>";
		$validInputs=FALSE;
	}elseif (intval(preg_replace('/\s+/', '',$params["nReal"]))>5000000)
	{
		echo "<pre><span data-mlr-text>Number of realizations too big, it must be smaller than 5 000 000</span> <br /></pre>";
		$validInputs=FALSE;
	}

	if(isset($params['correlation']))
	{
		if($params['copulaChoice']==1)
		{
			if (!preg_match("/^[+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/",preg_replace('/\s+/', '',$params['copulaField1'])))
			{
				echo "<pre><pre><span data-mlr-text>The number of degrees of freedom of the copula is not a valid number</span> <br /></pre>";
				$validInputs=FALSE;
			}
		}
		for ($i = 0; $i < $inputs; $i++)
		{
			for ($j = $i+1; $j < $inputs; $j++)
			{
				if (!preg_match("/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/",preg_replace('/\s+/', '', $params["correlField{$i}-{$j}"])))
				{
					echo "<pre><span data-mlr-text>The correlation value</span> \"".preg_replace('/\s+/', '', $params["correlField{$i}-{$j}"])."\" <span data-mlr-text>is not a valid number</span> <br /></pre>";
					$validInputs=FALSE;
				}

			}
		}
	}

	for ($i = 1; $i <= $outputNb; $i++)
	{
		if(!isset($params["output{$i}"]) || trim($params["output{$i}"])==='')
		{
			echo "<pre><span data-mlr-text>The output quantity</span> {$i} <span data-mlr-text>is empty or not valid</span><br /></pre>";
			$validInputs=FALSE;
		}
	}
	//If valid inputs we create user folder and config.um
	if($validInputs)
	{
		$folder = "{$UserData}/{$session}";
		$oldmask=umask(0);
		if(!file_exists ( $folder ))
		mkdir($folder, 0755);
		umask($oldmask);

		$array = array(
			"version=1.5\r\n",
			"seed=".preg_replace('/\s+/', '',$params["seed"])."\r\n",
			"nbVar={$inputs}\r\n",
			"nbReal=".preg_replace('/\s+/', '',$params["nReal"])."\r\n",
		);

		for ($i = 0; $i < $inputs; $i++)
		{
			$name = trim($params["name{$i}"]);
			$type = $params["distChoice{$i}"];
			$temp = "variable{$i}={$name};{$type}";
			for ($k = 0; $k < $distrib[$type]; $k++) {
				$paramK = preg_replace('/\s+/', '', $params["paramField{$i}-{$k}"]);
				$temp="{$temp};{$paramK}";
			}
			$temp="{$temp}\r\n";
			if($debug)
			echo "{$temp}<br />";
			$array[]=$temp;
		}

		for ($i = 1; $i <= $outputNb; $i++)
		{
			$outpuField = preg_replace('/[\r\n]+/', ';',$params["output{$i}"]);
			$temp ="expression={$outpuField}";
			$array[]="{$temp}\r\n";
		}


		$array[]= "outputFile={$UserData}/{$session}/results\r\n";

		if(isset($params['symmetrical']))
		{
			$array[]= "symmetrical=true\r\n";
		}
		else
		{
			$array[]= "symmetrical=false\r\n";
		}

		if(isset($params['correlation']))
		{
			$array[]= "correlation=true\r\n";
			$array[]= "copula={$params['copulaChoice']}\r\n";
			if($params['copulaChoice']==1)
			$array[]= "copulaValue=".preg_replace('/\s+/', '',$params['copulaField1'])."\r\n";
			$temp = "correlationValue";
			for ($i = 0; $i < $inputs; $i++)
			{
				for ($j = $i+1; $j < $inputs; $j++)
				{
					$correlValue = preg_replace('/\s+/', '',$params["correlField{$i}-{$j}"]);
					$temp = "{$temp};{$correlValue}";
				}
			}
			$temp = "{$temp}\r\n";
			$array[]=$temp;
		}
		else
		{
			$array[]= "correlation=false\r\n";
		}


		if($debug)
		var_dump($array);


		file_put_contents ( "$folder/config.um" , $array );
		if($debug)
		echo "<br />".$Rscript." --verbose R/launchscript.R ".$UserData."/".$session."/config.um<br />";
		exec($Rscript." --verbose R/launchscript.R ".$UserData."/".$session."/config.um ",$Routput);

		if($debug)
		var_dump($Routput);

		echo '<div class="results" id="resultsData" data-ID ='.$session.' data-output ='.$outputNb.'>
				<div class="results columnContainer">
					<div class="columnLeft">
						<pre id="resultsText" class="resultsText">
						</pre>
					</div>
					<div id="columnRight" class="columnRight">
						<div id="density">
						</div>
						<div id="download">
						</div>
					</div>
				</div>
			</div>';

	}
}
else
{
	echo 'POST file error, no DATA was provided';
}


?>
