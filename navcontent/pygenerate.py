import os
import copy

from jinja2 import Environment, PackageLoader
class Navs(object):
	"""docstring for Navs"""
	def __init__(self, href,title,intro):
		self.href = href
		self.title = title
		self.intro = intro
class Lisnav(object):
	"""docstring for Lisnav"""
	def __init__(self, href,title):
		self.href = href
		self.title = title

TEST = True
TEST = False
def generate(navtitle,navs:Navs,lis:Lisnav,filename:str):
	global TEST
	testdir=""
	if TEST :
		testdir="testcontent.dir"
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('basenav.html')
	res = temp.render(navtitle=navtitle,\
		navs = navs,\
		lis = lis)
	ff = open(os.path.join("./"+testdir,filename),"w",encoding="utf-8")
	ff.write(res)
	ff.close()

ORIGIN = [{"href":"../subcontent/1337leet.html","title":"1337密码","intro":"黑客使用的加密密码"},
		{"href":"../subcontent/data-src.html","title":"图片懒加载","intro":"html图片加载的技术"}]
LLIS = [{"href":"python3.html","title":"python3"},
		{"href":"go.html","title":"mysql"},
		{"href":"htmlcssjs.html","title":"HTML/CSS/JS"},
		{"href":"sql.html","title":"SQL"},
		{"href":"linux.html","title":"Linux"},
		{"href":"web组件.html","title":"web组件"},
		{"href":"web框架.html","title":"web框架"},
		{'href':'webSecure.html','title':'WebSecure'}
]
python3 = [{"href":"../subcontent/1337leet.html","title":"1337密码","intro":"黑客使用的加密密码"}
]
Go = [{"href":"../subcontent/1337leet.html","title":"1337密码","intro":"黑客使用的加密密码"}
]
htmlcssjs = [{"href":"../subcontent/data-src.html","title":"图片懒加载","intro":"img的data-src属性"},
{"href":"../subcontent/xxtea_code.html","title":"html的XXTEA加密技术","intro":"加密网页"}
]
sql = [{"href":"../subcontent/postgresql_installconfigoncentos7.html","title":"Postgresql 在centos7上的安装","intro":"Postgresl 的安装配置"}
]
linux = [{"href":"../subcontent/firewall_ctos7.html","title":"centos7防火墙配置","intro":"UFW Centos7防火墙"},
		{"href":"../subcontent/ip_long_2_ver.html","title":"IP 长整形转换","intro":"使用长整形的IP"},
		{"href":"../subcontent/selinux_learning.html","title":"selinux","intro":"Selinux配置"},
		{"href":"../subcontent/zabbix_install_on_centos_7.html","title":"Zabbix在centos7上的安装配置","intro":"使用Zabbix进行系统维护"}
]
web_0 = [{"href":"../subcontent/pv_uv_visit.html","title":"网页的pageview","intro":"流量的统计方法"}
]
web_1 = [{"href":"../subcontent/1337leet.html","title":"1337密码","intro":"黑客使用的加密密码"}
] 
WebSecure = [{'href':'../subcontent/1337leet.html','title':'1337加密','intro':'黑客使用的加密方法'}
]

def convert(ori:list):
	tarNavs = []
	for i in ori:
		tarNavs.append(Navs(href=i['href'],\
			title=i['title'],\
			intro=i['intro']))
	return tarNavs

if __name__=="__main__":
	tarNavs = []
	tarLis = []
	temp__ = [python3,Go,htmlcssjs,sql,linux,web_0,web_1,WebSecure]
	for i in LLIS:
		tarLis.append(Lisnav(href=i['href'],title=i['title']))
	print(len(tarLis))
	for i in range(len(tarLis)):
		generate(navtitle=tarLis[i].title,navs=temp__[i],lis=LLIS,filename=tarLis[i].href)
	
	#print(len(tarNavs))