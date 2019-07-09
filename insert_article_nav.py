import os
import sys
import glob
import pickle
from datetime import datetime
import yaml


sys.path.append("subcontent")
from produce import generate
sys.path.append("navcontent")
from producec import generate_one, handle_dict

def handle(title) -> None:
	if not title: 
		return
	dp_ob = {"html_file_name":""}
	for item in  os.listdir(os.path.join('temp')):
		if item.endswith(".pk"):
			continue
		f = open(os.path.join('temp',item),encoding='utf-8')
		text = f.read()
		html_file_name = item.rstrip(".md").rstrip(".txt").rstrip(".html").rstrip(".htm")
		f.close()
	with open(os.path.join("subcontent","pygenerate","templates","htm_base.htm"),encoding='utf-8') as ff:
		templates = ff.read()
		text_src = templates.format(title=title,content=text)
	with open(os.path.join("subcontent",html_file_name+".htm"),"a+",encoding='utf-8') as fl:
		fl.write(text_src)
	try:
		noww = datetime.now().strftime("%Y-%m-%d")
		dp_ob['html_file_name'] = html_file_name+".htm"
		dp_ob['title'] = title
		dp_ob['date'] = noww
		generate(html_file_name+".htm",title=title,date=noww)
	except Exception as e:
		print(e)
	else:
		f = open(os.path.join("temp","temp.pk"),"wb")
		pickle.dump(dp_ob,f)
		f.close()
def add_nav(subcont) -> None:
	try:
		with open(os.path.join("temp","temp.pk"),"rb") as fl:
			dp_ob = pickle.load(fl)
	except FileNotFoundError as e:
		print_help()
		print("maybe you should run \n \t\t--unique-article-title \n to generate html files\n\n")
		return 
	dp_ob['subcont'] = subcont
	with open(os.path.join("temp","temp.pk"),"wb") as ff:
		pickle.dump(dp_ob,ff)
	f = open(os.path.join('navcontent','config','nav.ini'),encoding='utf-8')
	config = yaml.load(f)
	print("config:",config)
	if not config[subcont].get('href'):
		config[subcont]['href'] = ['../subcontent/%s'%(dp_ob['html_file_name'])]
		config[subcont]['title'] = [dp_ob['title']]
		config[subcont]['date'] = [dp_ob['date']]
	else:		
		config[subcont]['href'].append('../subcontent/%sl'%(dp_ob['html_file_name']))
		config[subcont]['title'].append(dp_ob['title'])
		config[subcont]['date'].append(dp_ob['date'])
	f.close()
	f = open(os.path.join('navcontent','config','nav.ini'),'w',encoding='utf-8')
	yaml.dump(config,f)
	f.close()
	with open(os.path.join('navcontent','config','nav.ini'),'r',encoding='utf-8') as fll:
		dicc = yaml.load(fll);print("the nav dict lenght is ",len(dicc))
		try:
			#generate_one(dicc)
			...
		except Exception as e:
			print(e)
		else:
			print("adding the %s into navcontent html pages over!"%(config[subcont]['title']))
def check_nav() -> None:
	f = open(os.path.join("temp","temp.pk"),"rb")
	lod = pickle.load(f)
	f.close()
	if glob.glob(os.path.join('subcontent',lod['html_file_name'])) and glob.glob(os.path.join('subcontent',lod['html_file_name']+"l")):
		print("the %s is exists, the %s is exists too."%(lod['html_file_name'],lod['html_file_name']+'l'))
	else:
		print("error exixted on the %s or the %s"%(lod['html_file_name'],lod['html_file_name']+'l'))
	f = open(os.path.join('navcontent','config','nav.ini'),encoding='utf-8')
	config = yaml.load(f)
	f.close()
	try:
		#handle_dict(config)
		os.system("python navcontent/producec.py")
		os.remove(os.path.join("temp","temp.pk"))
	except Exception as e:
		print(e)
	else:
		print("check finished\n the temp.pk was deleted!")

def print_help() -> None:
	print("\n")
	print("author @fangself.com.cn")
	print("connections m13001282105@163.com")
	print("This is a command tool,help you format article from dir temp")
	print("====================================================================")
	print("--help				for help")
	print("--unique-article-title            input_title")
	print("--update-nav   ")
	print("				--unique-article       subcont_type")
	print("--check-nav   ")
	print("				--unique-article       #default the unique_article")
	print("====================================================================")
	print("sub module contains:")
	print("-go")
	print("-htmlcssjs")
	print("-web_secure")
	print("-sql")
	print("-linux")
	print("-python3")
	print("-web_0") 
	print("\n")
if __name__ == '__main__':
	if len(sys.argv) < 2:
		print_help()
	else:
		if sys.argv[1] == "--help":
			print_help()
		elif sys.argv[1] == "--unique-article-title":
			if len(sys.argv) < 3:
				print_help()
			else:
				handle(sys.argv[2])
		elif sys.argv[1] == "--update-nav":
			if len(sys.argv) < 3:
				print_help()
			elif sys.argv[2] == "--unique-article":
				if len(sys.argv) < 4:
					print_help()
				else:
					add_nav(sys.argv[3])
		elif sys.argv[1] == "--check-nav":
			if len(sys.argv) < 3:
				print_help()
			elif sys.argv[2] == "--unique-article":
				check_nav()
		else:
			print_help()
