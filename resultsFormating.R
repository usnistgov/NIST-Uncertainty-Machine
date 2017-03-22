######################################################################
## SECTION (SPECIFICATION) ===========================================
######################################################################
## Function mergeOutput:
## Function merging the different results file in one
## =======================
## SPECIFICATION -- INPUTS

## (outputFile) Base Name of the results files

## (nbOut) the number of outputs


mergeOutput = function (outputFile,nbOut)
{
	fileList = {};

	for (ii in 1:nbOut)
	{
		tempFile =paste(outputFile,ii,"-results.txt",sep="")
		fileList = c(fileList,tempFile)
	}

	outputList = paste(outputFile,"All-results.txt",sep="")

	file.create(outputList)

	for( ii in 1:nbOut)
	{
		write(paste("=====RESULTS OUTPUT",ii,"======================\n"), file = outputList, append = TRUE)
		fh = file( fileList[ii], open='rt' )
		lines = readLines(fh)
		lines = lines [-1:-2]
		write(lines, file = outputList, append = TRUE)
		close(fh)
	}

	fileList = {};

	for (ii in 1:nbOut)
	{
		tempFile =paste(outputFile,ii,"-values.Rd",sep="")
		fileList = c(fileList,tempFile)
	}


	outputList = paste(outputFile,"All-values.Rd",sep="")

	yList = list()
	outNames= NULL
	for( ii in 1:length(fileList))
	{
		if(file.exists(fileList[ii]))
		{
			load(fileList[ii])
			if(exists("y"))
			{
				yList =c(yList,list(y))
				outNames = c(outNames,paste("y",as.character(ii),sep=""))
			}
		}

	}

	yList = as.data.frame(yList)
	dimnames(yList)[[2]] = outNames

	save(yList,file = outputList)

}
