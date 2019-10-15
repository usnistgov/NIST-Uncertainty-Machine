//######################################################################
//## SECTION (SPECIFICATION) ===========================================
//######################################################################
//## Javascript code to dynamicaly populate the form and create the
//## associated config file.
//## Also can read from a previous config or load one from the examples
//## ===================================================================


//antiClickjack
if (self === top) {
       var antiClickjack = document.getElementById("antiClickjack");
       antiClickjack.parentNode.removeChild(antiClickjack);
   } else {
       top.location = self.location;
   }



// Initial settings
var seed = Math.floor((Math.random() * 100) + 1);
$('#seed').val(seed.toString());
var viewer = null;
var resultTab=3;
$("#tabs-1").load("about/about_English.md.html");
$( "#tabs" ).tabs();
$("#tabs").tabs("option", "active", 1);
$("#tabs").fadeIn(200);

var distribInfo =[];

var paramBackup = null;

distribInfo[1] = [
	 "Bernoulli (Prob. of success)"
	,"Beta (Mean, StdDev)"
	,"Beta (Shape1, Shape2)"
	,"Chi-Squared (No. of degrees of freedom)"
	,"Exponential (Mean)"
	,"Gamma (Mean, StdDev)"
	,"Gamma (Shape, Scale)"
	,"Gaussian (Mean, StdDev)"
	,"Gaussian -- Truncated (Mean, StdDev, Left Endpoint, Right Endpoint)"
	,"Rectangular (Mean, StdDev)"
	,"Rectangular (Left Endpoint, Right Endpoint)"
	,"Student t (Mean, StdDev, No. of degrees of freedom)"
	,"Student t (Center, Scale, No. of degrees of freedom)"
	,"Triangular -- Symmetric (Mean, StdDev)"
	,"Triangular -- Symmetric (Left Endpoint, Right Endpoint)"
	,"Triangular -- Asymmetric (Left Endpoint, Mode, Right Endpoint)"
	,"Uniform (Mean, StdDev)"
	,"Uniform (Left Endpoint, Right Endpoint)"
	,"Weibull (Mean, StdDev)"
	,"Weibull (Shape, Scale)"
	,"Constant (Value)"
	,"Beta -- Shifted & Rescaled (Mean, StdDev, Left, Right)"
	,"Beta -- Shifted & Rescaled (Shape1, Shape2, Left, Right)"
	,"Lognormal (Mean, StdDev)"
	,"Sample values (between 30 and 100000)"
	,"More choices"
	,"Asymmetric (Median, Left uncertainty, Right uncertainty, Coverage probability)"];
//number of parameters of each distributions
distribInfo[2] = [ 1,2,2,1,1,2,2,2,4,2,2,3,3,2,2,3,2,2,2,2,1,4,4,2,1,0,4];

//type of parameters for each distribution 0=mean 1=stddev 2=left 3=right 4=dof 5=shape 6=scale 7=others
var distribParamType = [
  [8],
	[0,1],
	[5,6],
	[4],
	[0],
	[0,1],
	[5,7],
	[0,1],
	[0,1,2,3],
	[0,1],
	[2,3],
	[0,1,4],
	[0,7,4],
	[0,1],
	[2,3],
	[2,0,3],
	[0,1],
	[2,3],
	[0,1],
	[5,7],
	[0],
	[0,1,2,3],
	[5,6,2,3],
	[0,1],
	[8],
	[8],
	[0,2,3,8],
];

var distribAdvance = [1,2,3,5,6,8,12,18,19,22,23,26]
var nbDistrib = distribInfo[1].length;
var outputNb = 1;
var inputNb = 0;
 $('#output1').val("x0");

var editor = {};

editor[1] = CodeMirror.fromTextArea(document.getElementById("output1"), {
				matchBrackets: true,
			});
editor[1].setSize("50rem","10rem");
$(editor[1].getWrapperElement()).resizable({
  resize: function() {
    editor.setSize($(this).width(), $(this).height());
  }
});

$( "#inputs" ).change(changeNumberInput).change();
$('#correlation').change(correlationChange).change();;

$('#container').on( 'keyup', 'textarea', function (e){
    $(this).css('height', 'auto' );
    $(this).height( this.scrollHeight );
});
$('#container').find( 'textarea' ).keyup();

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var exampleFile = getUrlParameter('example');
if (exampleFile!=undefined)
{
	var text = "./conf/config-"+exampleFile+".txt";
  loadServerConfigFile(text);
}


function changeNumberInput(){
	newInputNb=parseInt($('#inputs').val());
	for (var i=inputNb;i<newInputNb;i++)
	{
		var toInsert="<input type='text' oninput='updateNames()' maxlength='20' size='10' class='nameField'  value=x"+(i)+" id='name"+(i)+"' name='name"+(i)+"' > ";
		$('#nameList').append($(toInsert));
	}

	for (var i=inputNb;i>=newInputNb;i--)
	{
			$("#name"+(i)).remove();
	}
	updateNames();

	plotDistribLine();
	if($('#correlation').prop('checked')==true)
		plotCorrelationTable();
	 inputNb = newInputNb;
}

function removeOutput(){
	changeNumberOutput(outputNb -1 );
}

function addOutput(){
	changeNumberOutput(outputNb +1 );
}

function changeNumberOutput(newOut){
	var oldOut=outputNb ;

	$('#dec').remove();
	$('#inc').remove();

	if(newOut > oldOut && newOut < 11)
	{
		while(newOut > oldOut )
		{
			oldOut=outputNb +1;
			outputNb = oldOut;
			var toInsert="<textarea class='output' name='output"+(oldOut)+"' id='output"+(oldOut)+"' height=51px ></textarea>";
			$('#container').append($(toInsert));
      $('#output'+(oldOut)).val($('#output'+(oldOut-1)).val());
			editor[oldOut] = CodeMirror.fromTextArea(document.getElementById("output"+(oldOut)), {
				matchBrackets: true,
			});
			editor[oldOut].setSize("50rem","10rem");
			$(editor[oldOut].getWrapperElement()).resizable({
			  resize: function() {
			    editor.setSize($(this).width(), $(this).height());
			  }
			});

			var keywordOverlay = {
				token: function (stream, state) {

					for (var i=0;i<n;i++)
					{
						stream.eatWhile(/[\w.]/);
						if (stream.current() == $("input[name=name"+i+"]").val())
							return "style1";

					}

					stream.next();
					return null;


				}

			};
			editor[oldOut].addOverlay(keywordOverlay);
			editor[oldOut].refresh();
		}
	}
	if(newOut < oldOut && newOut >=1)
	{
		while(newOut < oldOut)
		{
			oldOut=outputNb -1;
			outputNb = oldOut;
			editor[outputNb+1].toTextArea();
			($('#container textarea').last()).remove()
		}
	}

	var toInsert="<button class='buttonOut' id='dec' type='button' onclick=removeOutput()>-</button> <button class='buttonOut' id='inc' type='button' onclick=addOutput()>+</button>";
	$('#container').append($(toInsert));

}




function updateNames(){
	n=parseInt($('#inputs').val());
	for (var i=0;i<n;i++)
	{
		$( '#label'+(i)).text($("input[name=name"+i+"]").val());
	}
	if($('#correlation').prop('checked')==true)
		plotCorrelationTable();


	var keywordOverlay = {
        token: function (stream, state) {

			for (var i=0;i<n;i++)
			{
				stream.eatWhile(/[\w.]/);
				if (stream.current() == $("input[name=name"+i+"]").val())
					return "style1";

			}

			stream.next();
			return null;


        }

    };
	for (var i=1;i<=outputNb;i++)
	{
		editor[i].addOverlay(keywordOverlay);
		editor[i].refresh();
	}

}

function sortSelect(i) {

 		var elem = document.getElementById( 'distChoice'+(i) );
		for (var j=0;j<nbDistrib;j++)
		{
			var toInserto="<option value="+j+" data-mlr-text>"+distribInfo[1][j]+"</option>";
			if (distribAdvance.indexOf(j) == -1)
				$('#distChoice'+(i)).append($(toInserto));
		}
    var tmpAry = [];
    // Grab all existing entries
    for (var i=0;i<elem.options.length;i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute


		var tmpMoreChoice = tmpAry[14]; // get more choice
		tmpAry.splice(14,1);
		var tmpSample = tmpAry[13]; // get samples
		tmpAry.splice(13,1);


    tmpAry.sort(function(a,b){ return (a.text < b.text)?-1:1; });
		tmpAry.push(tmpSample);
		tmpAry.push(tmpMoreChoice);



		// Wipe out existing elements
    while (elem.options.length > 0) elem.options[0] = null;
    // Restore sorted elements
    var newSelectedIndex = 0;
    for (var i=0;i<tmpAry.length;i++) {
        elem.options[i] = tmpAry[i];
    }
    return;
}

function sortSelectAdvance(i) {

		var elem = document.getElementById( 'distChoice'+(i) );

		// Wipe out existing elements
    while (elem.options.length > 0) elem.options[0] = null;

		for (var j=0;j<nbDistrib;j++)
		{
			var toInserto="<option value="+j+" data-mlr-text>"+distribInfo[1][j]+"</option>";
			$('#distChoice'+(i)).append($(toInserto));
		}
    var tmpAry = [];
    // Grab all existing entries
    for (var i=0;i<elem.options.length;i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute
		var tmpAsym = tmpAry[26]; // get asymmetric
		tmpAry.splice(26,1);
		var tmpMoreChoice = tmpAry[25]; // get more choice
		tmpAry.splice(25,1);
		var tmpSample = tmpAry[24]; // get samples
		tmpAry.splice(24,1);

    tmpAry.sort(function(a,b){ return (a.text < b.text)?-1:1; });
		tmpAry.push(tmpAsym);
		tmpAry.push(tmpSample);


		// Wipe out existing elements
    while (elem.options.length > 0) elem.options[0] = null;
    // Restore sorted elements
    var newSelectedIndex = 0;
    for (var i=0;i<tmpAry.length;i++) {
        elem.options[i] = tmpAry[i];
    }
    return;
}


function plotDistribLine(){
	newInputNb=parseInt($('#inputs').val());

	for (var i=inputNb;i<newInputNb;i++)
	{
		var toInsert="<tr class='distrib' id='distrib"+(i)+"' ><th id='label"+(i)+"'>"+$("input[name=name"+i+"]").val()+"</th><td><select class='distChoice' id='distChoice"+(i)+"' name='distChoice"+(i)+"' onchange='plotParamLine("+(i)+")' ></select></td><td><div class='paramLine' id='param"+(i)+"' ></div></td> </tr>";
		$('#distributions').append($(toInsert));
		sortSelect(i);
		$( '#distChoice'+(i) ).val(7);
		plotParamLine(i);
	}

	for (var i=inputNb;i>=newInputNb;i--)
	{
			$("#distrib"+(i)).remove();
	}



}



function plotParamLine(index){
	//$('.paramField'+(index)).remove();
	$('#param'+(index)).empty();
	if($('#distChoice'+(index)).val()!=24)
	{
		nbParam =  distribInfo[2][$('#distChoice'+(index)).val()];
		for (var i=0;i<nbParam;i++)
		{
			var toInsertp="<input type='text'  class='paramField"+(index)+"' oninput='backupParameters()' size=10 value=1 name='paramField"+(index)+"-"+(i)+ "' id='paramField"+(index)+"-"+(i)+ "' > ";
			$('#param'+(index)).append($(toInsertp));
		}
	}
	else
	{
		var toInsertp="<input type='hidden'  class='paramField"+(index)+"' size=10 value=1 name='paramField"+(index)+"-"+(0)+ "' id='paramField"+(index)+"-"+(0)+ "' > ";
		$('#param'+(index)).append($(toInsertp));
	}
	setDefault(index ,$('#distChoice'+(index)).val());

	if(paramBackup!=null && (paramBackup.length -1) >= index)	{
		setBackup(index ,$('#distChoice'+(index)).val());
	}
  if (langURL!=undefined)
  {
    checkLanguage();
  }
}

function setDefault(index,typeDist){
		if(typeDist==0)  // Bernoulli (Prob. of success)
		{
			$('#paramField'+(index)+'-0').val("0.5")
		}
		if(typeDist==1)  // Beta (Mean, StdDev)
		{
			$('#paramField'+(index)+'-0').val("0.5")
			$('#paramField'+(index)+'-1').val("0.2")
		}
		if(typeDist==2) // Beta (Shape1, Shape2)
		{

		}
		if(typeDist==3) // Chi-Squared (DF)
		{

		}
		if(typeDist==4) // Exponential (Mean)
		{

		}
		if(typeDist==5) // Gamma (Mean, StdDev)
		{

		}
		if(typeDist==6) // Gamma (Shape, Scale)
		{

		}
		if(typeDist==7) // Gaussian (Mean, StdDev)
		{
			$('#paramField'+(index)+'-0').val("0")
			$('#paramField'+(index)+'-1').val("1")
		}
		if(typeDist==8) // Gaussian -- Truncated (Mean, StdDev, Left, Right)
		{
			$('#paramField'+(index)+'-0').val("0")
			$('#paramField'+(index)+'-1').val("1")
			$('#paramField'+(index)+'-2').val("-1")
			$('#paramField'+(index)+'-3').val("1")
		}
		if(typeDist==9) // Rectangular -- Continuous (Mean, StdDev)
		{
			$('#paramField'+(index)+'-0').val("0")
			$('#paramField'+(index)+'-1').val("1")
		}
		if(typeDist==10) // Rectangular -- Continuous (Left, Right)
		{
			$('#paramField'+(index)+'-0').val("-1")
			$('#paramField'+(index)+'-1').val("1")
		}
		if(typeDist==11) // Student t (Mean, StdDev, DF)
		{
			$('#paramField'+(index)+'-0').val("1")
			$('#paramField'+(index)+'-1').val("2")
			$('#paramField'+(index)+'-2').val("3")
		}

		if(typeDist==12) // Student t (Center, Scale, DF)
		{
			$('#paramField'+(index)+'-0').val("1")
			$('#paramField'+(index)+'-1').val("1")
			$('#paramField'+(index)+'-2').val("2")
		}
		if(typeDist==13) // Triangular -- Symmetric (Mean, StdDev)
		{
			$('#paramField'+(index)+'-0').val("0")
			$('#paramField'+(index)+'-1').val("1")
		}

		if(typeDist==14) // Triangular -- Symmetric (Left, Right)
		{
			$('#paramField'+(index)+'-0').val("-1")
			$('#paramField'+(index)+'-1').val("1")
		}
		if(typeDist==15) // Triangular -- Asymmetric (Left, Mode, Right)
		{
			$('#paramField'+(index)+'-0').val("0")
			$('#paramField'+(index)+'-1').val("0.2")
			$('#paramField'+(index)+'-2').val("1")
		}
		if(typeDist==16) // Uniform -- Continuous (Mean, StdDev)
		{
			$('#paramField'+(index)+'-0').val("0")
			$('#paramField'+(index)+'-1').val("1")
		}
		if(typeDist==17) // Uniform -- Continuous (Left, Right)
		{
			$('#paramField'+(index)+'-0').val("-1")
			$('#paramField'+(index)+'-1').val("1")
		}
		if(typeDist==18) // Weibull (Mean, StdDev)
		{


		}
		if(typeDist==19) // Weibull (Shape, Scale)
		{

		}
		if(typeDist==19) // Weibull (Shape, Scale)
		{

		}
		if(typeDist==20) // Constant (Value)
		{

		}
		if(typeDist==21) // Beta (Mean, StdDev, Left, Right)
		{
			$('#paramField'+(index)+'-0').val("0.5")
			$('#paramField'+(index)+'-1').val("0.2")
			$('#paramField'+(index)+'-2').val("0")
			$('#paramField'+(index)+'-3').val("1")
		}
		if(typeDist==22) // Beta (Shape1, Shape2, Left, Right)
		{
			$('#paramField'+(index)+'-0').val("0.5")
			$('#paramField'+(index)+'-1').val("0.7")
			$('#paramField'+(index)+'-2').val("0")
			$('#paramField'+(index)+'-3').val("1")
		}

		if(typeDist==24) // Sample
		{
			var toInsertp="<div class='labelSample' id='labeltext"+(index)+"'></div><div  id='loadField"+(index)+"'>			<div id='drop_zone"+(index)+"' class='drop_zone2'>Drop sample file here or click to upload</div>	</div><div>		<input type='file' title='No file selected' id='files"+(index)+"' onchange='pressedI("+(index)+")'><label id='fileLabel"+(index)+"'> </label>					</div>";
			$('#param'+(index)).append($(toInsertp));
			// Setup the dnd listeners.
			$('#paramField'+(index)+'-0').val("");

			var dropZone = document.getElementById('drop_zone'+(index));
			$('#drop_zone'+(index)).click(function(event) {
				$('#files'+(index)).click();
			});
			dropZone.addEventListener('dragover', handleDragOver, false);
			dropZone.addEventListener('drop', handleFileSelect3, false);
			document.getElementById('files'+(index)).addEventListener('change', handleFileSelect4, false);

		}


		if(typeDist==25) // Advance distrib
		{
			sortSelectAdvance(index);
			$( '#distChoice'+(index) ).val(7);
			plotParamLine(index);
		}
		if(typeDist==26) //Asymmetric (Median, Left uncertainty, Right uncertainty, Coverage probability)
		{
			$('#paramField'+(index)+'-0').val("2277")
			$('#paramField'+(index)+'-1').val("1041")
			$('#paramField'+(index)+'-2').val("3988")
			$('#paramField'+(index)+'-3').val("0.95")
		}




}
function setBackup(index,typeDist){
	for (var j = 0; j < distribParamType[$('#distChoice'+(index)).val()].length; j++) {
		if(!isNaN(paramBackup[index][distribParamType[$('#distChoice'+(index)).val()][j]] ))
		{
			$('#paramField'+(index)+'-'+(j)).val(paramBackup[index][distribParamType[$('#distChoice'+(index)).val()][j]]);
		}

	}
}


function correlationChange(){
	if($('#correlation').prop('checked')==true)
	{
		plotCorrelationTable();
    $('#correlationClass').show(200);
	}
	else
	{
    $('#correlationClass').hide(200);
		$('#correlationTable').empty();
		$('#copula').empty();
		$('#copulaParam').empty();
	}
}

function plotCorrelationTable(){
	$('#correlationTable').empty();
	$('#copula').empty();
	$('#copulaParam').empty();
	n=parseInt($('#inputs').val());
	var toInsert="<tr id='headerCorrel'><th></th> </tr>";
	$('#correlationTable').append($(toInsert));
	for (var i=0;i<n;i++)
	{
		var toInsert="<th>"+$("input[name=name"+i+"]").val()+"</th>";
		$('#headerCorrel').append($(toInsert));
		var toInsert="<tr id='lineCorrel"+(i)+"'><th>"+$("input[name=name"+i+"]").val()+"</th></tr>" ;
		$('#correlationTable').append($(toInsert));
		for (var j=0;j<n;j++)
		{
			if (i>j)
				var toInsert="<td><input type='text' disabled  class='correlField' size=10 value='' name='correlField"+i+"-"+j+ "' ></td> ";
			if (i==j)
				var toInsert="<td><input type='text' disabled class='correlField' size=10 value=1 name='correlField"+i+"-"+j+ "' ></td> ";
			if (i<j)
				var toInsert="<td><input type='text'  class='correlField' size=10  value=0  name='correlField"+i+"-"+j+ "' id='correlField"+i+"-"+j+ "' ></td> ";


			$('#lineCorrel'+(i)).append($(toInsert));

		}
	}
	var toInsert="<select id='copulaChoice' name='copulaChoice' onchange=copulaChanged() ><option value=0>Gaussian Copula</option><option value=1>Student Copula (No. of degrees of freedom)</option></select>" ;
	$('#copula').append($(toInsert));

}

function copulaChanged() {
	if($('#copulaChoice').val()==0)
		$('#copulaParam').empty();
	else
		{
			var toInsert="<input type='text'  class='copulaField'  value=30 name='copulaField1' > ";
			$('#copulaParam').append($(toInsert));
		}
}


window.pressed = function(){
    var a = document.getElementById('files');
    if(a.value == "")
    {
        fileLabel.innerHTML = "No file selected";
    }
    else
    {
        var theSplit = a.value.split('\\');
        fileLabel.innerHTML = theSplit[theSplit.length-1];
    }
};

window.pressedI = function(index){
    var a = document.getElementById('files'+(index));
    if(a.value == "")
    {
        fileLabel.innerHTML = "No file selected";
    }
    else
    {
        var theSplit = a.value.split('\\');
				$('#fileLabel'+(index)).html(theSplit[theSplit.length-1]);
    }
};

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
		fileLabel.innerHTML = files[0].name;

	readConfigFile(files[0]);
}


function handleFileSelect2(evt) {
    evt.stopPropagation();
    evt.preventDefault();

	var files = evt.target.files;
	readConfigFile(files[0]);
}
function handleFileSelect3(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
		var dropId = evt.currentTarget.id;
		var index = dropId.slice(9);
		$('#fileLabel'+(index)).html(files[0].name)

		readSampleFile(files[0],dropId);
}


function handleFileSelect4(evt) {
    evt.stopPropagation();
    evt.preventDefault();

		var files = evt.target.files;
		var dropId = evt.currentTarget.id;
		readSampleFile(files[0],dropId);
}


function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function handleFileSelectStop(evt) {
  evt.stopPropagation();
  evt.preventDefault();
}

function handleDragOverStop(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'none'; // Explicitly show this is a copy.
}

document.body.addEventListener('dragover', handleDragOverStop, false);
document.body.addEventListener('drop', handleFileSelectStop, false);

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');

$('#drop_zone').click(function(event) {
	$('#files').click();
});

dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
document.getElementById('files').addEventListener('change', handleFileSelect2, false);






function readConfigFile(file) {
	var ext = (file.name).split('.').pop();
	if(ext=="txt" | ext=="um")
	{
		var fr = new FileReader();
		fr.onload = function(e) {
			loadData(e.target.result)
		};
		fr.readAsText(file);
	}
	else if(ext=="lnk")
	{
		alert("Shortcut (symbolic link) are not supported, please provide the original file.");
	}
	else
	{
		alert("Only txt and um files are supported.");
	}

	return;
}

function loadServerConfigFile(file) {
  $.get(file, dataType = "text",function( lines ) {
		loadData(lines);
	});
}

function readSampleFile(file,dropId) {
	var ext = (file.name).split('.').pop();
	if(ext=="xls" | ext=="xlsx" | ext=="pdf")
	{
		alert("This feature only accepts text files, try exporting as a csv file.");
	}
	else {
		var fr = new FileReader();
		fr.onload = function(e) {
			loadSample(e.target.result,dropId)
		};
		fr.readAsText(file);
	}

	return;
}

function loadSample(lines,dropId) {
	var res1=lines.match(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/g);
	var samplesize =res1.length;
	res1=res1.join(separator=";")
	var lengthstr =res1.length;
	var dropIdNumber = 		parseInt(dropId.match(/[0-9]+/g))
		$('#paramField'+(dropIdNumber)+'-'+(0)).val(res1);

	$('#labeltext'+(dropIdNumber)).text(" " + samplesize + " Samples loaded ");
	return;
}

function loadData(lines) {
	$('input[name=correlation]').prop('checked', false);
	$('input[name=symmetrical]').prop('checked', false);
	correlationChange();
	var version = "1.0.1";
	lines = lines.split(/\r\n|\r|\n/g);
	var index=0;
	var line = lines[index].split("=");
	if("nbVar"!=line[0] && "version"!=line[0])
	{
		alert("Error in the provided configuration file");
		return;
	}
	if( "version"==line[0])
	{
		version = line[1];
	}


	if(version=="1.0.1")
	{
		$('#seed').val("5");
	}
	else
	{
		index++;
		line = lines[index].split("=");
		$('#seed').val(line[1]);
		index++;
		line = lines[index].split("=");
	}

	$('#inputs').val(line[1]);
	changeNumberInput();

	index++;
	line = lines[index].split("=");
	$('#nReal').val(line[1]);

	for (var ii=0;ii<n;ii++)
	{
		index++;
		line = lines[index].split("=");
		var value = line[1].split(";");
		$("input[name=name"+ii+"]").val(value[0]);
		$( '#label'+(ii)).text(value[0]);
		var distType = parseInt(value[1]);
		if(distribAdvance.indexOf(distType) != -1)
			sortSelectAdvance(ii);
		$( '#distChoice'+(ii) ).val(distType);
		plotParamLine(ii);
		var nbParam =  distribInfo[2][$('#distChoice'+(ii)).val()];
		if(distType == 24)
		{
			value.shift();
			value.shift();
			var samplesize =value.length;
			$('#paramField'+(ii)+'-'+(0)).val(value.join(separator=";"));
			$('#labeltext'+(ii)).text(" " + samplesize + " Samples loaded ");
		}
		else {
			for (var j=0;j<nbParam;j++)
			{
				$('#paramField'+(ii)+'-'+(j)).val(value[j+2]);
			}
		}


	}
	index++;
	line = lines[index].split("expression=");
	changeNumberOutput(1);
	var value = line[1].replace(/;/g,"\r\n");
	$('#output1').val(value);
	editor[1].getDoc().setValue(value);

	$('#container').find( 'textarea' ).keyup();

	index++;
	while( lines[index].split("=")[0]=="expression")
	{
		addOutput()
		var Out=outputNb ;
		line = lines[index].split("expression=");
		value = line[1].replace(/;/g,"\r\n");
		$('#output'+(Out)).val(value);
		editor[Out].getDoc().setValue(value);
		$('#container').find( 'textarea' ).keyup();
		index++;
	}


	line = lines[index].split("=");
	var outputFile = line[1];
	index++;
	line = lines[index].split("=");

	if(line[0]=="symmetrical")
	{
		if(line[1]=="true")
		{
			$('input[name=symmetrical]').prop('checked', true);
		}
		index++;
		line = lines[index].split("=");
	}

	if(line[1]=="true")
	{
		$('input[name=correlation]').prop('checked', true);
		correlationChange();
		index++;
		line = lines[index].split("=");
		var copulaType = parseInt(line[1]);
		$('#copulaChoice').prop('selectedIndex', copulaType);
		if($('#copulaChoice').val()==0)
			$('#copulaParam').empty();
		else
		{
			index++;
			line = lines[index].split("=");
			var toInsert="<input type='text'  class='copulaField'  value="+line[1]+" name='copulaField1' > ";
			$('#copulaParam').append($(toInsert));
		}
		index++;
		line = lines[index].split(";");
		var value=1;
		for (var ii=0;ii<n;ii++)
		{
			for (var ij=ii+1;ij<n;ij++)
			{
				$('#correlField'+ii+"-"+ij).val(line[value])
				value=value+1;
			}

		}
	}
	backupParameters();
}


function backupParameters() {

	paramBackup = new Array(inputNb);
	for (var i = 0; i < inputNb; i++) {
		paramBackup[i] = new Array(9);
		for (var j = 0; j < distribParamType[$('#distChoice'+(i)).val()].length; j++) {
			paramBackup[i][distribParamType[$('#distChoice'+(i)).val()][j]] = $('#paramField'+(i)+'-'+(j)).val();

		}
	}
}



function formSubmited() {
	backupParameters();
	return true;
}


/* attach a submit handler to the form */
$("#input").submit(function(event) {

  /* stop form from submitting normally */
  event.preventDefault();

  /* get some values from elements on the page: */

  /*refresh the codemirror textarea*/
  for (var i=1;i<=outputNb;i++)
	{
		editor[i].save();
	}

  var $form = $(this),
  url = $form.attr('action');
  dataString = $("#input").serialize();

  /*Prepare result tab*/
  var toInsert="<div id=\"tabs-"+resultTab+"\"></div>";
  $('#tabs').append($(toInsert));


  var toInsert=" <li><a href='#tabs-"+resultTab+"'><span data-mlr-text>Results</span>"+" "+(resultTab-2)+"</a><span class='ui-closable-tab'>&#10006;</span></li> ";
  $('#tabsul').append($(toInsert));

  $( "#tabs" ).tabs("refresh");
  if (langURL!=undefined)
  {
    checkLanguage();
  }
  $(function() {
    $(".ui-closable-tab").on( "click", function() {
      var tabContainerDiv=$(this).closest(".ui-tabs").attr("id");
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      $("#"+tabContainerDiv).tabs("refresh");

    });
  });
  $("#tabs").tabs("option", "active", $(".ui-tabs-nav").children().size() - 1);

  var toInsert=" <div class='loader' id='loader'></div> ";
  $("#tabs-"+resultTab).append($(toInsert));

  $("input[type=submit]").attr("disabled", "disabled");
  $("input[type=submit]").css({"opacity":"0.65","cursor":"not-allowed"});


  /* Send the data using post */
  var posting = $.post(url, {
    data: dataString
  });

  /* Put the results in a div */
  posting.done(function(data) {
    $("input[type=submit]").removeAttr("disabled");
    $("input[type=submit]").css({"opacity":"1","cursor":"pointer"});

    $("#tabs-"+resultTab).empty().append(data);

    var ID = $("#tabs-"+resultTab ).find("#resultsData").data("id");
    var outputNb = $("#tabs-"+resultTab ).find("#resultsData").data("output");
    if(ID != undefined)
    {
      resultsDisplay(resultTab,ID,outputNb);

    }
    checkLanguage();

    resultTab = resultTab+1;
  });
});

var langURL = getUrlParameter('lang');
var oldLangURL = getUrlParameter('lang');

createMLDrop();
if (langURL!=undefined)
{
	mlrLangInUse = langURL;
	checkLanguage();
}
