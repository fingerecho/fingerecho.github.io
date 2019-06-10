import os
from subprocess import Popen
import yaml
import copy
from jinja2 import Environment, PackageLoader

class Navs(dict):
	"""docstring for Navs"""
	def __init__(self, href,title,date):
		self.href = href
		self.title = title
		self.date = date
class Lisnav(dict):
	"""docstring for Lisnav"""
	def __init__(self, href,title):
		self.href = href
		self.title = title

def generate(navtitle,navs:Navs,lis:Lisnav,filename:str) -> None:
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('basenav.html')
	res = temp.render(navtitle=navtitle,\
		navs = navs,\
		lis = lis)
	ff = open(os.path.join(filename),"w",encoding="utf-8")
	ff.write(res)
	ff.close()

def generate_one(navtitle,navs:Navs,lis:Lisnav,filename:str) -> None:
	with open(os.path.join(os.path.dirname(__file__),"navcontent","pygenerate","templates","basenav.html"),"r") as f:
		html = f.read()
		print(html)
def handle_dict(config:dict,unique=False) -> None:
	nnvs = []
	nlvs = []
	files = []
	filesdescs = []
	for k in config.keys():
		try:
			npvs = []
			for itd in range(len(config[k]['href']) if config[k]['href'] else 0):
				npvs.append(Navs(href=config[k]['href'][itd],
									title=config[k]['title'][itd],
									date=config[k]['date'][itd]))
			files.append(k+".html")
			filesdescs.append(config[k]['navtitle'])
			nnvs.append(npvs)
			nlvs.append(Lisnav(k+".html",config[k]['navtitle']))
		except Exception as e:
			print(k,'--',e)
			continue
	try:
		for item in range(len(nnvs)):
			print(type(nnvs[item]),nnvs[item])
			if not unique:
				generate(
					filesdescs[item],
					navs = nnvs[item],
					lis  = nlvs[item],
					filename=files[item])
			else:
				... #generate_one()
	except Exception as e:
		print(item)
		print("exits error of ",e)

if __name__ == '__main__':
	file_nav_h = open(os.path.join(os.path.dirname(__file__),'config','nav.ini'),encoding='utf-8')
	config     = yaml.safe_load(file_nav_h);print(len(config))
	handle_dict(config)
	