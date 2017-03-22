//######################################################################
//## SECTION (SPECIFICATION) ===========================================
//######################################################################
//## Javascript code to load and display the results 
//##
//## ===================================================================

var UserData = "./UserData";
resultsDisplay();
$( "#tabs" ).tabs();
var multiOut=true;

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function resultsDisplay() {
	var ID = getUrlVars()["id"];
	var outputNb =  parseInt(getUrlVars()["out"]);
	var d = new Date();
	if (outputNb == 1 )
	{
		var density = UserData+"/"+ID+"/results-density.jpg?"+d.getTime();
		$('#density').hide();
		var toInsert="<img src=\""+density+"\"  width=\"50%\" height=\"50%\"  onload=\"linksDisplay()\">  ";
		$('#density').append($(toInsert));

		var text = UserData+"/"+ID+"/results-results.txt?"+d.getTime();
		$('#resultsText').load(text);
	}
	else
	{
		$('#results').empty();
		var toInsert="<div class= 'gui'><div id='tabs' ><ul>";
		for(var i = 1; i <= outputNb; i++)
			toInsert += "<li><a href='#tabs-"+i+"'>Output "+ i +"</a></li>"

		toInsert +="</ul>"
		$('#results').append($(toInsert));
		for(var i = 1; i <= outputNb; i++)
		{
			var toInsert="<div id='tabs-"+ i +"'><div class='results'><pre class='resultsText' id='resultsText" + i +"'>"+i+"</pre><div class='columnRight' id='columnRight"+i+"'><div id='density"+i+"'></div><div id='download"+i+"'></div></div><br style='clear:both;'/></div></div>"
			$('#tabs').append($(toInsert));
		}
		var toInsert="</div></div>";
		$('#results').append($(toInsert));

		for(var i = 1; i <= outputNb; i++)
		{
			var density = UserData+"/"+ID+"/results"+i+"-density.jpg?"+d.getTime();
			$('#density'+(i)).hide();
			var toInsert="<img src=\""+density+"\"  width=\"50%\" height=\"50%\"  onload=\"linksTabDisplay("+i+")\">  ";
			$('#density'+(i)).append($(toInsert));

			var text = UserData+"/"+ID+"/results"+i+"-results.txt?"+d.getTime();
			$('#resultsText'+(i)).load(text);
		}


	}




}


function linksDisplay(){
	$('#density').show();
	var ID = getUrlVars()["id"];
	var d = new Date();
	var density = UserData+"/"+ID+"/results-density.jpg?"+d.getTime();
	var values = UserData+"/"+ID+"/results-values.Rd";
	var config = UserData+"/"+ID+"/config.um?"+d.getTime();
	var text = UserData+"/"+ID+"/results-results.txt?"+d.getTime();

	var toInsert="<a download=\"values.Rd\" href=\""+values+"\" type=\"application/octet-stream\">  Download binary R data file with Monte Carlo values of output quantity  </a><br/>     ";
	$('#download').append($(toInsert));

	var toInsert="<a   href=\"rdtotxt.php?outFile="+values+" \"> Download a text file with Monte Carlo values of output quantity </a> <br/>     ";
	$('#download').append($(toInsert));

	var toInsert="<a download=\"results.txt\"  href=\""+text+"\" type=\"application/octet-stream\"> Download text file with numerical results shown on this page </a>  <br/>  ";
	$('#download').append($(toInsert));

	var toInsert="<a download=\"density.jpg\" href=\""+density+"\" type=\"application/octet-stream\"> Download JPEG file with plot shown on this page </a> <br/>    ";
	$('#download').append($(toInsert));

	var toInsert="<a  download=\"config.um\" href=\""+config+"\" type=\"application/octet-stream\"> Download configuration file </a>   ";
	$('#download').append($(toInsert));

}


function linksTabDisplay(i){
	$('#density'+(i)).show();
	var ID = getUrlVars()["id"];
	var d = new Date();
	var density = UserData+"/"+ID+"/results"+i+"-density.jpg?"+d.getTime();

	var toInsert="<a download=\"density.jpg\" href=\""+density+"\" type=\"application/octet-stream\"> Download JPEG file with plot shown on this page </a> <br/>    ";
	$('#download'+(i)).append($(toInsert));

	if( multiOut==true )
	{
		multiOut = false;
		var d = new Date();
		var values = UserData+"/"+ID+"/resultsAll-values.Rd";
		var config = UserData+"/"+ID+"/config.um?"+d.getTime();
		var text = UserData+"/"+ID+"/resultsAll-results.txt?"+d.getTime();

		var toInsert="<a download=\"values.Rd\" href=\""+values+"\" type=\"application/octet-stream\"> Download binary R data file with Monte Carlo values of output quantity </a> <br/>     ";
		$('#downloadAll').append($(toInsert));

		var toInsert="<a   href=\"rdtotxt.php?outFile="+values+" \"> Download a text file with Monte Carlo values of output quantity </a> <br/>     ";
		$('#downloadAll').append($(toInsert));

		var toInsert="<a download=\"results.txt\"  href=\""+text+"\" type=\"application/octet-stream\"> Download text file with numerical results shown on this page </a>  <br/>  ";
		$('#downloadAll').append($(toInsert));


		var toInsert="<a  download=\"config.um\" href=\""+config+"\" type=\"application/octet-stream\"> Download configuration file </a>   ";
		$('#downloadAll').append($(toInsert));
	}

}
