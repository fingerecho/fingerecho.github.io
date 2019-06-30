import os
from subprocess import Popen
try:
	import yaml;print("imported yaml") 
except ImportError :
	try:
		Popen(['pip','install','PyYAML'])
		import yaml
	except Exception as e:
		print(e)



def get_html_information(ymlf,stream,old) -> None:
	"""
	在 navcontent/config/nav.ini中写入yaml 信息
	"""
	info = {'contents':[]}
	if old:
		info['contents'].extend(old['contents'])
	for f in os.listdir(os.path.join(os.path.dirname(__file__),'subcontent')):
		if os.path.isdir(f):
			continue
		if f.endswith("html"):
			info['contents'].append(os.path.join("..",os.path.dirname(__file__),"subcontent",f))
	yaml.dump(info,stream=stream)

if __name__ == '__main__':
	file_nav_h = open(os.path.join(os.path.dirname(__file__),'navcontent','config','nav.ini'),encoding='utf-8')
	try:
		config     = yaml.load(file_nav_h)
	except NameError:
		Popen(['pip','install','PyYAML'])
		import yaml
		config     = yaml.load(file_nav_h)
	finally:
		file_nav_h.close()
	file_nav_w = open(os.path.join(os.path.dirname(__file__),'navcontent','config','nav.ini'),"w",encoding='utf-8')
	get_html_information(config,stream=file_nav_w,old=config)

