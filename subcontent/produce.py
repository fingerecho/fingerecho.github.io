import os
import yaml

from jinja2 import Environment, PackageLoader

from glob import glob

def generate(mainiframe,title="",description="",
	author="fingerecho,fangself.com.cn,",date="",iconhref="./jpg/icon/favicon.gif"):
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('html_base.html')
	res = temp.render(title=title,
		description=description,author=author,
		iconhref=iconhref,mainiframe=mainiframe,date=date)
	page = mainiframe + "l"
	#path = os.path.join(TEST_DIR,page)
	ff = open(os.path.join(os.path.dirname(__file__),page),"w",encoding="utf-8")
	ff.write(res)
	ff.close()
def init() -> dict:
	f = open(os.path.join(os.path.dirname(__file__),"..","navcontent","config","nav.ini"),encoding='utf-8')
	config = yaml.load(f)
	return config

def handle(config:dict) -> None:
	for k in config.keys():
		for id_ in range(len(config[k]['href']) if config[k]['href'] else 0):
			generate(mainiframe=config[k]['href'][id_].split("/")[-1].rstrip("l"),
				title=config[k]['title'][id_],
				description=config[k]['title'][id_],
				date=config[k]['date'][id_],)
	return None
if __name__=="__main__":
	
	config = init()
	handle(config)
	#files = [x for x in os.listdir() if x.endswith(".htm") or x.endswith(".py") ]
	#files = [generate("fingerecho",x) for x in files]
    
