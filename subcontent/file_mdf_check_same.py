#/usr/bin/python
"""
Author:fangself.com.cn
Date:20180808
Func:校验两个文件夹及其内容是否完全一致
"""
BYTES=64   #每次读文件缓存多少字节，默认64字节，根据当前机器执行任务的情况适当调整
THREADS=4  #设置为cpu的个数，使性能达到最佳
RESULTS_FILE="./mdf_hex_res.md"  #保存结果的文件

import hashlib
import os
import threading
import sys

def is_same_file(filename):
    mdf=hashlib.md5()
    f = open(filename,"r",encoding="utf-8")
    f.seek(0)
    chunk = f.read(1024*BYTES)
    while chunk:
        mdf.update(chunk.encode("utf-8"))
        chunk=f.read(1024*BYTES)
    f.close()
    return mdf.hexdigest()
    
class WalkThread(threading.Thread):
    def __init__(self,absp,arg):
        super(WalkThread,self).__init__()
        self.path=os.path.join(absp,arg)
    def run(self):
        with open(RESULTS_FILE,"a+",encoding="utf-8") as f:
            f.write(is_same_file(self.path))
        pass
    pass
def check_dir_ok(dir):
    if dir.isdigit():return False
    if not os.path.isdir(dir):return False
    if not os.path.exists(dir):return False
    return True
    pass
    
if __name__=="__main__":
    print(str(sys.argv[1]))
    if not  check_dir_ok(sys.argv[1]): print("Sorry it is not valid ")
    flag=0
    for i in os.walk(sys.argv[1]):
        if flag==0:flag=1;continue
        for j in i[len(i)-1]:
            print(type(j))
            thr= WalkThread(i[0],j)
            thr.start()
    