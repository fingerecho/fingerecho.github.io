#!/usr/bin/python3

from os import walk , chdir ,path

###############################
### Time :18/11/15
### Function: os.walk(__file__)
### Author:fingerecho
#####################


def handle(path:str):
    print("<<<<<<<<",path,">>>>>>>")
def run_all(path:str):
    tr = walk(path)
    for t in tr:
        for file_ in t[2]:
            handle(file_)
def run_all_opt(path:str):
    ZZ = [ t[2] for t in walk(path)]
    [handle(file_) for file_ in ZZ]

def test_doc_():
    """() - > int
        return the numbers of this directory.
        
        >>>test_doc_()
        >>>30
    """
    import subprocess as subb
    res = subb.call(['python',__file__,'|','wc','-l'])
    return int(res)

if __name__ == "__main__":
    run_all_opt(path.join(__file__ , "../../"))

        
