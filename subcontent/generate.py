import os

from jinja2 import Environment, PackageLoader
DEBUG = True
TEST_DIR = "test.dir"
counts = 0 
from glob import glob

def generate(mainiframe,title="",description="",\
	author="fingerecho,fangself.com.cn,",iconhref="./jpg/icon/favicon.gif"):
	global counts
	counts = counts + 1
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('html_base.min.html')
	res = temp.render(title=title,\
		description=description,author=author,\
		iconhref=iconhref,mainiframe=mainiframe)
	page = mainiframe + "l"
	#path = os.path.join(TEST_DIR,page)
	if DEBUG:
		path = os.path.join("pygenerate",TEST_DIR,page)
	ff = open(path,"w",encoding="utf-8")
	ff.write(res)
	ff.close()

if __name__=="__main__":
	
	files = [ generate(x) for x in os.listdir() if x.endswith(".htm")]
	print("finished %d pages"%(counts))
	#files = [x for x in os.listdir() if x.endswith(".htm") or x.endswith(".py") ]
	#files = [generate("fingerecho",x) for x in files]
    
