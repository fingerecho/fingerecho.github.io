#/usr/bin/python3
"""
Author:fingerkc
date:20180729
func:refresh all files to a contents on html  then push to git 
"""

import os
from os.path import getsize,join
DIR_MAX_SIZE=1024*1024*10   ###10 M
REMOVE_LIST=[".git"]    ##移除的文件夹
DONAME=""   #https://coding.fyping.cn
hrefs=[]
names=[]
for root , dirs , files in os.walk("./"):
    dir_files_size=0
    #print([str(getsize(join(root,name)))+"bytes" for name in files],[name for name in files])
    for i in [getsize(join(root,name)) for name in files]:
        dir_files_size+=i
    if(dir_files_size>DIR_MAX_SIZE):
        print("-------Warning: %s is over %f M"%(root,dir_files_size))
    #print(["root is %s"%("/".join(str(join(root,name)).split("\\") ) )[1:]for name in files])
    hrefs = hrefs+[("/".join(str(join(root,name)).split("\\") ) )[1:]for name in files]
    names=names+files
    for i in REMOVE_LIST:
        if i in dirs:
            dirs.remove(i)
print(len(names),len(hrefs),names,hrefs)
head=["<html>","<head>","<meta charset=\"utf-8\">","<title>目录</title>","</head>","<body>"]
bottom=["</body></html>"]
with open("./index.html","w",encoding="utf-8") as f:
    for i in head:
        f.write(i)
    f.write("<ul>")
    for i in range(len(hrefs)):
        f.write("<li><a href=\"%s\">%s{dirs:%s}</li>"%(hrefs[i],names[i],hrefs[i]))
    f.write("</ul>")
    for i in bottom:
        f.write(i)
args=["git pull","git add .","git commit -m'200'","git push -f"]
for i in args:
    os.system(i)
    