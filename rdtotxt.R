######################################################################
## SECTION (SPECIFICATION) ===========================================
######################################################################
## Script to convert the Rdata file into a readable text file
## =======================
args<-commandArgs(TRUE)
filename = args[1]

load(filename)
newfile= paste(substr(filename, 1, nchar(filename)-3),".txt",sep="")

if(substr(filename, nchar(filename)-12,nchar(filename)) == "All-values.Rd")
{
	output.file <- file(newfile, "wb")
	write.table(yList, row.names=FALSE, file = output.file, append=FALSE, eol="\r\n")
	close(output.file)
} else {
	output.file <- file(newfile, "wb")
	write.table(matrix(y,ncol=1), col.names=FALSE, row.names=FALSE, file = output.file, append=FALSE, eol="\r\n")
	close(output.file)
}
