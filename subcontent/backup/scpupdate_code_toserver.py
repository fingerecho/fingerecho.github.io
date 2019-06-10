#!/usr/bin/python3
from os import walk , chdir ,path  
from subprocess import call
from os import sep as SEP

#######################
### Author:fingerecho
### Date:20181117
### Func: the function of mericials , hg  code  upload to server
################################################################

##########
### Params:
## PORT : server sshd port
## HOST : server domain name or IP
## RSA_FILE : rsa file name 
## POR_NAME : the name of your project
######################################

PORT = 22
HOST = "hello.fyping.cn"
USER = "root"
RSA_FILE = "hello.rsa"
PRO_NAME = "world_hello_zol"

def handle(path:str):
    global PORT,HOST,USER,RSA_FILE
    #print("<<<<<<<<",path,">>>>>>>")
    origin_file = path.strip("..{SEP}..{SEP}".format(SEP=SEP))
    origin_linux = "/".join(origin_file.split(SEP))
    cm_meta = "scp -i ..{SEP}..{SEP}..{SEP}..{SEP}administrator{SEP}.ssh{SEP}{RSA} \
    	-P {PORT} -r ..{SEP}..{SEP}{ORIGIN}\
    	 {USERNAME}@{HOST}:{SEP}srv{SEP}{PRO_NAME}{SEP}{ORIGIN_LINUX}".format(\
    		SEP=SEP,PORT=PORT,ORIGIN=origin_file,\
    		USERNAME=USER,HOST=HOST,\
    		RSA=RSA_FILE,PRO_NAME=PRO_NAME,\
            ORIGIN_LINUX=origin_linux)
    if 0==call(cm_meta):
    	print("execute success")
    else:
    	print("execute failed , please check process code")
    	
def run_all(path:str):
    tr = walk(path)
    for t in tr:
        for file_ in t[2]:
            handle(file_)
def run_all_opt(path:str):
    ZZ = [ [t[0],t[2]] for t in walk(path)]
    res_ = []
    for xx in ZZ:
  	    for yy in xx[1]:
  	    	res_.append("%s%s%s"%(xx[0],SEP,yy))
  	        #res_.append(path.join(xx[0],yy))
    [handle(file_) for file_ in res_]
if __name__ == "__main__":
    run_all_opt("..%s..%s"%(SEP,SEP))

        
