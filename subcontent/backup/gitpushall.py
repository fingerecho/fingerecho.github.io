#!/usr/bin/python3

PROGRAM_FILE_SUFFIX = [ '.py','.cpp','.c','.log','.go']
WEB_FILE_SUFFIX = ['.html','.htm','.js','.css','.md']
MEDIA_FILE_SUFFIX = ['.jpg','.png','.gif',]
SEPLINE = "======================================================"

cmd=['git', # 0
    'add',# 1
    'commit',#2
    'push',#3
    '-m',#4
    ]

from subprocess import call
from time import ctime
from os import path , walk
from sys import argv

###########
## Author:fingerecho
## Date:18/10
## Function:update git
######################

def add_file(path_:str):
    res_ = []
    all_LL = [ (xx[0],xx[2]) for xx in walk(path_)]
    all_ = []
    for ii in all_LL:
        all_.extend([ path.join(ii[0],xx) for xx in ii[1]])
    #print(all_)
    info_add = []
    for suf_MODE in [PROGRAM_FILE_SUFFIX , WEB_FILE_SUFFIX , MEDIA_FILE_SUFFIX]:
        for suf_ in suf_MODE:
            [ info_add.append(call([cmd[0],cmd[1],file_.strip()])) for file_ in all_ if file_.strip("\n").strip().endswith(suf_)]
    [print(xx) for xx in info_add]
    print("adding all the files that I need \n%s\n"%SEPLINE)
def main_process(path_:str,force=""):
    add_file(path_)
    res_ = call([cmd[0],cmd[2],cmd[4],ctime()])
    print(res_)
    print("commit finished \n%s\n"%SEPLINE)
    res_0 = call([cmd[0],cmd[3],force])
    print("%s\nAdding result\n%s\n"%(res_0,SEPLINE))



if __name__ == "__main__":
    print("starting push all \n%s\n"%SEPLINE)
    if len(argv) > 1 :
        main_process(path_=".",force=argv[1])
    else:
        main_process(path_=".")
