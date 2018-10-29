######################################################################
## SECTION (SPECIFICATION) ===========================================
######################################################################
## Main script to read the configuration file and call the distrib function
## with the right  parameters
## =======================
args<-commandArgs(TRUE)
filename = args[1]

source("R/UncertaintyMachine.R")
source("R/resultsFormating.R")
source("R/drawDistrib.R")
source("R/checkParam.R")

ptm <- proc.time()

fh = file( filename, open='rt' )
line = readLines(fh, n=1 )

if(strsplit(line, "=")[[1]][1]=="version")
{
	version = strsplit(line, "=")[[1]][2]
}else
{
	version = "1.0.1"
}
cat(paste("Conf file version: " , version,"\n"))


if (version =="1.0.2" || version =="1.0.3" || version =="1.0.4" || version =="1.0.5" || version =="1.1" || version =="1.2"|| version =="1.3"|| version =="1.4")
{

	line = readLines(fh, n=1 )
	seed = as.integer(strsplit(line, "=")[[1]][2])
	set.seed( as.integer(strsplit(line, "=")[[1]][2]))
	line = readLines(fh, n=1 )
	nbVar = as.integer(strsplit(line, "=")[[1]][2])
	line = readLines(fh, n=1 )
	nbReal = as.integer(strsplit(line, "=")[[1]][2])
	varNames = NULL
	type=integer(nbVar)
	parameters=as.list(rep(NA,nbVar))

	for(ii in 1:nbVar)
	{
		line = strsplit(strsplit(readLines(fh, n=1 ), "=")[[1]][2],";")[[1]]
		varNames = c(varNames,line[1])
		type[ii]=as.integer(line[2])
		parameters[[ii]] = as.double(line[-(1:2)])
	}

	line = strsplit(substring(readLines(fh, n=1 ),12), ";")[[1]]
	line = line [nchar(line)>0]
	expression=line[length(line)]
	pretreatment=NA
	if(length(line)>1)
		pretreatment=paste(paste(line[1:(length(line)-1)], collapse = ';'),";",sep="")
	line = readLines(fh, n=1 )
	nbOut = 1;
	expressions = {};
	pretreatments = {}
	while( strsplit(line, "=")[[1]][1]=="expression")
	{
		if(nbOut ==1)
		{
			expressions = c(expressions ,expression)
			pretreatments = c(pretreatments ,pretreatment)
		}
		nbOut = nbOut +1;
		line = strsplit(substring(line,12), ";")[[1]]
		line = line [nchar(line)>0]
		expressions = c(expressions ,line[length(line)])
		pretreatment=NA
		if(length(line)>1)
			pretreatment=paste(paste(line[1:(length(line)-1)], collapse = ';'),";",sep="")
		pretreatments = c(pretreatments ,pretreatment)
		line = readLines(fh, n=1 )
	}

	outputFile = strsplit(line, "=")[[1]][2]
	line = readLines(fh, n=1 )
	symmetrical=FALSE
	if(strsplit(line, "=")[[1]][1]=="symmetrical")
	{
		if(strsplit(line, "=")[[1]][2]=="true")
			symmetrical=TRUE
		line = readLines(fh, n=1 )
	}

	correlation = strsplit(line, "=")[[1]][2]=="true"
	copulaType=NULL
	copulaDf=NULL
	if(correlation == TRUE)
	{
		line = readLines(fh, n=1 )
		copulaType=ifelse(strsplit(line, "=")[[1]][2]=="0", "Gaussian", "Student")
		if(copulaType=="Student")
		{
			line = readLines(fh, n=1 )
			copulaDf = as.double(strsplit(line, "=")[[1]][2])
		}
		line = readLines(fh, n=1 )
		line = as.double(strsplit(line, ";")[[1]][-1])
		correlation = diag(1,nbVar)
		if(nbVar > 1)
		{
			for(ii in 1:(nbVar-1))
			{
				for(ij in (ii+1):nbVar )
				{
					correlation[ii,ij]=line[1]
					correlation[ij,ii]=line[1]
					line=line[-1]
				}
			}
		}

	}
	close(fh)
	if (nbOut == 1)
		try(distrib(nbVar,nbReal,varNames,expression,type,parameters,symmetrical,correlation,outputFile,copulaType,copulaDf,pretreatment))

	if(nbOut > 1)
	{
		for (ii in 1:nbOut)
		{
			set.seed(seed)
			outputfileTemp =paste(outputFile,ii,sep = "")
			expressionTemp = expressions[ii]
			pretreatmentTemp = pretreatments[ii]
			try(distrib(nbVar,nbReal,varNames,expressionTemp,type,parameters,symmetrical,correlation,outputfileTemp,copulaType,copulaDf,pretreatmentTemp))
		}
		try(mergeOutput(outputFile,nbOut))
	}

}



#READ congif file for version 1.0.1 to ensure backward compatibility
if (version =="1.0.1")
{
	set.seed(5)
	nbVar = as.integer(strsplit(line, "=")[[1]][2])
	line = readLines(fh, n=1 )
	nbReal = as.integer(strsplit(line, "=")[[1]][2])
	varNames = NULL
	type=integer(nbVar)
	parameters=as.list(rep(NA,nbVar))
	for(ii in 1:nbVar)
	{
		line = strsplit(strsplit(readLines(fh, n=1 ), "=")[[1]][2],";")[[1]]
		varNames = c(varNames,line[1])
		type[ii]=as.integer(line[2])
		parameters[[ii]] = as.double(line[-(1:2)])
	}

	line = strsplit(substring(readLines(fh, n=1 ),12), ";")[[1]]
	expression=line[length(line)]
	pretreatment=NULL
	if(length(line)>1)
		pretreatment=paste(paste(line[1:(length(line)-1)], collapse = ';'),";",sep="")
	line = readLines(fh, n=1 )
	outputFile = strsplit(line, "=")[[1]][2]
	line = readLines(fh, n=1 )
	symmetrical=FALSE
	correlation = strsplit(line, "=")[[1]][2]=="true"
	copulaType=NULL
	copulaDf=NULL
	if(correlation == TRUE)
	{
		line = readLines(fh, n=1 )
		copulaType=ifelse(strsplit(line, "=")[[1]][2]=="0", "Gaussian", "Student")
		if(copulaType=="Student")
		{
			line = readLines(fh, n=1 )
			copulaDf = as.double(strsplit(line, "=")[[1]][2])
		}
		line = readLines(fh, n=1 )
		line = as.double(strsplit(line, ";")[[1]][-1])
		correlation = diag(1,nbVar)
		if(nbVar > 1)
		{
			for(ii in 1:(nbVar-1))
			{
				for(ij in (ii+1):nbVar )
				{
					correlation[ii,ij]=line[1]
					correlation[ij,ii]=line[1]
					line=line[-1]
				}
			}
		}

	}
	close(fh)

	try(distrib(nbVar,nbReal,varNames,expression,type,parameters,symmetrical,correlation,outputFile,copulaType,copulaDf,pretreatment))
}

ptm <- proc.time() - ptm
print(ptm)
