<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
		<title>NIST Uncertainty Machine</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="shortcut icon" href="Uncertainty2.ico">
	</head>
	<body>
	<h3>NIST Uncertainty Machine</h3>
	<pre><br /></pre>
	</body>
</html>

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
				if($file!="." && $file!="..")
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
		$distrib = array( 0 =>1,2,2,1,1,2,2,2,4,2,2,3,3,2,2,3,2,2,2,2,1,4,4,2,1);

		foreach($_POST as $key => $value) {
		//	if (!is_array($value))
				$_POST[$key] = htmlentities($value, ENT_QUOTES);
		}

		if($debug)
			var_dump($_POST);


		$session = hash("sha256",session_id().date('h:i:s'));

 		$outputNb = 0;
		foreach($_POST as $key => $value)
		{
		   if(preg_match('/^output.*/', $key))
		   {
		     $outputNb = $outputNb +1;   // You can access $value or create a new array based off these values
		   }
		}
		if($debug)
			var_dump($outputNb);


		if($debug)
			echo "{$session}<br />";

		$inputs = intval($_POST["inputs"]);

		//Checking of the parameters
		if (!preg_match("/^[0-9]+?$/",preg_replace('/\s+/', '',$_POST["seed"])))
		{
			echo "<pre>The random number generator seed is not a valid number <br /></pre>";
			$validInputs=FALSE;
		}

		for ($i = 0; $i < $inputs; $i++)
		{
			if (!preg_match("/^[A-Za-z0-9_.]+$/",trim($_POST["name{$i}"])))
			{
				echo "<pre>The quantity name \"".trim($_POST["name{$i}"])."\" is not a valid name<br /></pre>";
				$validInputs=FALSE;
			}
		}
		for ($i = 0; $i < $inputs; $i++)
		{
			$type = $_POST["distChoice{$i}"];
			for ($k = 0; $k < $distrib[$type]; $k++)
			{

				if($type!=24)
				{

					if (!preg_match("/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/",preg_replace('/\s+/', '', $_POST["paramField{$i}-{$k}"])))
					{
						echo "<pre>The parameter \"".trim($_POST["paramField{$i}-{$k}"])."\" of the quantity \"".trim($_POST["name{$i}"])."\" is not a valid number<br /></pre>";
						$validInputs=FALSE;
					}
				}
			}
		}

		if (!preg_match("/^[+]?[0-9]+((\.[0-9]*)?[eE][+-]?[0-9]+)?$/",preg_replace('/\s+/', '',$_POST["nReal"])))
		{
			echo "<pre>The number of realizations field is not a valid number <br /></pre>";
			$validInputs=FALSE;
		}

		if(isset($_POST['correlation']))
		{
			if($_POST['copulaChoice']==1)
			{
				if (!preg_match("/^[+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/",preg_replace('/\s+/', '',$_POST['copulaField1'])))
				{
					echo "<pre>The number of degrees of freedom of the copula is not a valid number <br /></pre>";
					$validInputs=FALSE;
				}
			}
			for ($i = 0; $i < $inputs; $i++)
			{
				for ($j = $i+1; $j < $inputs; $j++)
				{
					if (!preg_match("/^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/",preg_replace('/\s+/', '', $_POST["correlField{$i}-{$j}"])))
					{
						echo "<pre>The correlation value \"".preg_replace('/\s+/', '', $_POST["correlField{$i}-{$j}"])."\" is not a valid number <br /></pre>";
						$validInputs=FALSE;
					}

				}
			}
		}

		for ($i = 1; $i <= $outputNb; $i++)
		{
			if(!isset($_POST["output{$i}"]) || trim($_POST["output{$i}"])==='')
			{
				echo "<pre>The output quantity {$i} is empty or not valid<br /></pre>";
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

			$inputs = intval($_POST["inputs"]);

			$array = array(
				"version=1.3\r\n",
				"seed=".preg_replace('/\s+/', '',$_POST["seed"])."\r\n",
				"nbVar={$inputs}\r\n",
				"nbReal=".preg_replace('/\s+/', '',$_POST["nReal"])."\r\n",
			);

			for ($i = 0; $i < $inputs; $i++)
			{
				$name = trim($_POST["name{$i}"]);
				$type = $_POST["distChoice{$i}"];
				$temp = "variable{$i}={$name};{$type}";
				for ($k = 0; $k < $distrib[$type]; $k++) {
					$paramK = preg_replace('/\s+/', '', $_POST["paramField{$i}-{$k}"]);
					$temp="{$temp};{$paramK}";
				}
				$temp="{$temp}\r\n";
				if($debug)
					echo "{$temp}<br />";
				$array[]=$temp;
			}

			for ($i = 1; $i <= $outputNb; $i++)
			{
				$outpuField = preg_replace('/[\r\n]+/', ';',$_POST["output{$i}"]);
				$temp ="expression={$outpuField}";
				$array[]="{$temp}\r\n";
			}


			$array[]= "outputFile={$UserData}/{$session}/results\r\n";

			if(isset($_POST['symmetrical']))
			{
				$array[]= "symmetrical=true\r\n";
			}
			else
			{
				$array[]= "symmetrical=false\r\n";
			}

			if(isset($_POST['correlation']))
			{
				$array[]= "correlation=true\r\n";
				$array[]= "copula={$_POST['copulaChoice']}\r\n";
				if($_POST['copulaChoice']==1)
					$array[]= "copulaValue=".preg_replace('/\s+/', '',$_POST['copulaField1'])."\r\n";
				$temp = "correlationValue";
				for ($i = 0; $i < $inputs; $i++)
				{
					for ($j = $i+1; $j < $inputs; $j++)
					{
						$correlValue = preg_replace('/\s+/', '',$_POST["correlField{$i}-{$j}"]);
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
				echo "<br />".$Rscript." --verbose launchscript.R ".$UserData."/".$session."/config.um<br />";
			exec($Rscript." --verbose launchscript.R ".$UserData."/".$session."/config.um ",$Routput);

			if($debug)
				var_dump($Routput);

			if($debug)
				echo "	<a  href=\"./results.php?id=$session&out=$outputNb\"> Go to the results Page</a> <br />";

			if(!$debug)
				header( "Location: ./results.php?id=$session&out=$outputNb" );
		}

	}
	else
	{
	    echo 'POST file error, no DATA was provided';
	}


?>
