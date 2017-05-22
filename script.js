//######################################################################
//## SECTION (SPECIFICATION) ===========================================
//######################################################################
//## Javascript code to dynamicaly populate the form and create the
//## associated config file.
//## Also can read from a previous config or load one from the examples
//## ===================================================================


//variable containing the path to the User temporary data must match the $UserData in validation.php
var UserData = "./UserData";


var seed = Math.floor((Math.random() * 100) + 1);
$('#seed').val(seed.toString());

var distribInfo =[];

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
	,"More choices"];
distribInfo[2] = [ 1,2,2,1,1,2,2,2,4,2,2,3,3,2,2,3,2,2,2,2,1,4,4,2,1,0];

var distribAdvance = [1,2,3,5,6,8,12,18,19,22,23]
var nbDistrib = distribInfo[1].length;
var outputNb = 1;


$( "#inputs" ).change(changeNumberInput).change();
$('#correlation').change(correlationChange).change();;
$('#validateNames').on('click',updateNames);

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
	var text = "conf/config-"+exampleFile+".um";
	$.get(text, function( lines ) {
		loadData(lines);
	});
}


function changeNumberInput(){
	n=$('#inputs').val();
	$('.nameField').remove();
	for (var i=0;i<n;i++)
	{
		var toInsert="<input type='text'  class='nameField'  value=x"+(i)+" name='name"+(i)+"' > ";
		$('#nameList').append($(toInsert));
	}
	plotDistribLine();
	if($('#correlation').prop('checked')==true)
		plotCorrelationTable();
	 $('#output1').val("x0");
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
		}
	}
	if(newOut < oldOut && newOut >=1)
	{
		while(newOut < oldOut)
		{
			oldOut=outputNb -1;
			outputNb = oldOut;
			($('#container textarea').last()).remove()
		}
	}

	var toInsert="<button id='dec' type='button' onclick=removeOutput()>-</button><button id='inc' type='button' onclick=addOutput()>+</button>";
	$('#container').append($(toInsert));

}




function updateNames(){
	n=$('#inputs').val();
	for (var i=0;i<n;i++)
	{
		$( '#label'+(i)).text($("input[name=name"+i+"]").val());
	}
	if($('#correlation').prop('checked')==true)
		plotCorrelationTable();
	 $('#output1').val($("input[name=name"+0+"]").val());
	 $('#output1').autoResize();
}

function sortSelect(i) {

 		var elem = document.getElementById( 'distChoice'+(i) );
		for (var j=0;j<nbDistrib;j++)
		{
			var toInserto="<option value="+j+">"+distribInfo[1][j]+"</option>";
			if (distribAdvance.indexOf(j) == -1)
				$('#distChoice'+(i)).append($(toInserto));
		}
    var tmpAry = [];
    // Grab all existing entries
    for (var i=0;i<elem.options.length;i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute
		var tempElem = tmpAry.pop();
		var tempElem2 = tmpAry.pop();
    tmpAry.sort(function(a,b){ return (a.text < b.text)?-1:1; });
		tmpAry.push(tempElem2);
		tmpAry.push(tempElem);

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
			var toInserto="<option value="+j+">"+distribInfo[1][j]+"</option>";
			$('#distChoice'+(i)).append($(toInserto));
		}
    var tmpAry = [];
    // Grab all existing entries
    for (var i=0;i<elem.options.length;i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute
		var tempElem = tmpAry.pop();
		var tempElem2 = tmpAry.pop();
    tmpAry.sort(function(a,b){ return (a.text < b.text)?-1:1; });
		tmpAry.push(tempElem2);

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
	n=$('#inputs').val();
	$('.distrib').remove();
	for (var i=0;i<n;i++)
	{
		var toInsert="<tr class='distrib'><th id='label"+(i)+"'>"+$("input[name=name"+i+"]").val()+"</th><td><select id='distChoice"+(i)+"' name='distChoice"+(i)+"' onchange='plotParamLine("+(i)+")' ></select></td><td><div class='paramLine' id='param"+(i)+"' ></div></td> </tr>";
		$('#distributions').append($(toInsert));
		sortSelect(i);
		$( '#distChoice'+(i) ).val(7);
		plotParamLine(i);
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
			var toInsertp="<input type='text'  class='paramField"+(index)+"' size=10 value=1 name='paramField"+(index)+"-"+(i)+ "' id='paramField"+(index)+"-"+(i)+ "' > ";
			$('#param'+(index)).append($(toInsertp));
		}
	}
	else
	{
		var toInsertp="<input type='hidden'  class='paramField"+(index)+"' size=10 value=1 name='paramField"+(index)+"-"+(0)+ "' id='paramField"+(index)+"-"+(0)+ "' > ";
		$('#param'+(index)).append($(toInsertp));
	}

	setDefault(index ,$('#distChoice'+(index)).val());
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



}


function correlationChange(){
	if($('#correlation').prop('checked')==true)
	{
		plotCorrelationTable();
	}
	else
	{
		$('#correlationTable').empty();
		$('#copula').empty();
		$('#copulaParam').empty();
	}
}

function plotCorrelationTable(){
	$('#correlationTable').empty();
	$('#copula').empty();
	$('#copulaParam').empty();
	n=$('#inputs').val();
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
				var toInsert="<td><input type='text' disabled  class='correlField"+i+"' size=10 value='' name='correlField"+i+"-"+j+ "' ></td> ";
			if (i==j)
				var toInsert="<td><input type='text' disabled class='correlField"+i+"' size=10 value=1 name='correlField"+i+"-"+j+ "' ></td> ";
			if (i<j)
				var toInsert="<td><input type='text'  class='correlField"+i+"' size=10  value=0  name='correlField"+i+"-"+j+ "' id='correlField"+i+"-"+j+ "' ></td> ";


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
	$('#container').find( 'textarea' ).keyup();

	index++;
	while( lines[index].split("=")[0]=="expression")
	{
		addOutput()
		var Out=outputNb ;
		line = lines[index].split("expression=");
		value = line[1].replace(/;/g,"\r\n");
		$('#output'+(Out)).val(value);
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
}
