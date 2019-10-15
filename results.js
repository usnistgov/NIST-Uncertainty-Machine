//######################################################################
//## SECTION (SPECIFICATION) ===========================================
//######################################################################
//## Javascript code to load and display the results
//##
//## ===================================================================


var UserData = "./UserData";



function resultsDisplay(resultTab,ID,outputNb) {
	var d = new Date();

	if (outputNb == 1 )
	{
		var density = UserData+"/"+ID+"/results-density.jpg?"+d.getTime();
		$("#tabs-"+resultTab ).find("#density").hide();
		var toInsert="<img src=\""+density+"\"  width=\"100%\" height=\"100%\"  onload=\"linksDisplay('"+resultTab+"','"+ID+"')\">  ";
		$("#tabs-"+resultTab ).find("#density").append($(toInsert));

		var text = UserData+"/"+ID+"/results-results.txt?"+d.getTime();
		$("#tabs-"+resultTab ).find("#resultsText").load(text, function(){
			if(langURL !="English")
				checkResultsLanguageTab(langURL,resultTab);
		});

	}
	else
	{
    $("#tabs-"+resultTab ).empty();

		var toInsert= "<fieldset class='mainFieldset' id='sharedOuputs'  style = 'display: none;'><legend class='mainLegend'><span data-mlr-text>Shared Outputs</span></legend> <div id='downloadAll'></div></fieldset>";
		$("#tabs-"+resultTab ).append($(toInsert));


    for(var i = 1; i <= outputNb; i++)
    {
      var toInsert= "<fieldset class='mainFieldset' id='Ouputs"+i+"'><legend class='mainLegend'>Ouput "+i+"</legend> <div class='results columnContainer'><pre class='resultsText columnLeft' id='resultsText" + i +"'>"+i+"</pre><div class='columnRight' id='columnRight"+i+"'><div id='density"+i+"'></div><div id='download"+i+"'></div></div></fieldset>";
      $("#tabs-"+resultTab ).append($(toInsert));
    }



    for(var i = 1; i <= outputNb; i++)
    {
			var resultloaded =0;
      var density = UserData+"/"+ID+"/results"+i+"-density.jpg?"+d.getTime();
      $("#tabs-"+resultTab ).find("#density"+i).hide();
      var toInsert="<img src=\""+density+"\"  width=\"100%\" height=\"100%\"  onload=\"linksTabDisplay("+resultTab+","+i+ ",'"+ID+"')\"> ";
      $("#tabs-"+resultTab ).find("#density"+i).append($(toInsert));
      var text = UserData+"/"+ID+"/results"+i+"-results.txt?"+d.getTime();
			$("#tabs-"+resultTab ).find("#resultsText"+i).load(text, function(){
				resultloaded = resultloaded+1;
				if(resultloaded == outputNb && langURL !="English")
	  			checkResultsLanguageTab(langURL,resultTab);
			});
    }

	}
}

function linksDisplay(resultTab,ID){
	$("#tabs-"+resultTab ).find("#density").show();
	var d = new Date();
	var density = UserData+"/"+ID+"/results-density.jpg?"+d.getTime();
	var values = UserData+"/"+ID+"/results-values.Rd";
	var config = UserData+"/"+ID+"/config.um?"+d.getTime();
	var text = UserData+"/"+ID+"/results-results.txt?"+d.getTime();

	var toInsert="<a download=\"values.Rd\" href=\""+values+"\" type=\"application/octet-stream\">  <span data-mlr-text>Download binary R data file with Monte Carlo values of output quantity</span>  </a><br/>     ";
	$("#tabs-"+resultTab ).find("#download").append($(toInsert));

	var toInsert="<a   href=\"rdtotxt.php?outFile="+values+" \"> <span data-mlr-text>Download a text file with Monte Carlo values of output quantity</span> </a> <br/>     ";
	$("#tabs-"+resultTab ).find("#download").append($(toInsert));

	var toInsert="<a download=\"results.txt\"  href=\""+text+"\" type=\"application/octet-stream\"> <span data-mlr-text>Download text file with numerical results shown on this page</span> </a>  <br/>  ";
	$("#tabs-"+resultTab ).find("#download").append($(toInsert));

	var toInsert="<a download=\"density.jpg\" href=\""+density+"\" type=\"application/octet-stream\"> <span data-mlr-text>Download JPEG file with plot shown on this page</span> </a> <br/>    ";
	$("#tabs-"+resultTab ).find("#download").append($(toInsert));

	var toInsert="<a  download=\"config.um\" href=\""+config+"\" type=\"application/octet-stream\"> <span data-mlr-text>Download configuration file</span> </a>   ";
	$("#tabs-"+resultTab ).find("#download").append($(toInsert));
	checkLanguage();
}


function linksTabDisplay(resultTab, i,ID){
	$("#tabs-"+resultTab ).find("#density"+i).show();
	$("#tabs-"+resultTab ).find('#sharedOuputs').show();


	var d = new Date();
	var density = UserData+"/"+ID+"/results"+i+"-density.jpg?"+d.getTime();

	var toInsert="<a download=\"density.jpg\" href=\""+density+"\" type=\"application/octet-stream\" style='margin-left: 19px;'> <span data-mlr-text>Download JPEG file of this plot</span> </a> <br/>    ";
	$("#tabs-"+resultTab ).find('#download'+(i)).append($(toInsert));

  var values = UserData+"/"+ID+"/resultsAll-values.Rd";
  var config = UserData+"/"+ID+"/config.um?"+d.getTime();
  var text = UserData+"/"+ID+"/resultsAll-results.txt?"+d.getTime();

  /*test if Shared outputs has not been populated yet*/
  if ($("#tabs-"+resultTab ).find('#downloadAll').html()=="" )
  {
    $("#tabs-"+resultTab ).find('#sharedOuputs').show();

    var toInsert="<a download=\"values.Rd\" href=\""+values+"\" type=\"application/octet-stream\"> <span data-mlr-text>Download binary R data file with Monte Carlo values all output quantities</span> </a> <br/>     ";
    $("#tabs-"+resultTab ).find('#downloadAll').append($(toInsert));

    var toInsert="<a   href=\"rdtotxt.php?outFile="+values+" \"> <span data-mlr-text>Download a text file with Monte Carlo values of all output quantities</span> </a> <br/>     ";
    $("#tabs-"+resultTab ).find('#downloadAll').append($(toInsert));

    var toInsert="<a download=\"results.txt\"  href=\""+text+"\" type=\"application/octet-stream\"> <span data-mlr-text>Download text file with numerical results</span> </a>  <br/>  ";
    $("#tabs-"+resultTab ).find('#downloadAll').append($(toInsert));

    var toInsert="<a  download=\"config.um\" href=\""+config+"\" type=\"application/octet-stream\"> <span data-mlr-text>Download configuration file</span> </a>   ";
    $("#tabs-"+resultTab ).find('#downloadAll').append($(toInsert));

  }


checkLanguage();
}
