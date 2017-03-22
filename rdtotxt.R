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
	write.table(yList, row.names=FALSE, file = newfile, append = FALSE)
} else {
	write(t(matrix(y,ncol=1)), file = newfile,	append = FALSE, sep = "\n")

}
