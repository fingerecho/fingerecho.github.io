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
LLIS = [{"href":"program-language.html","title":"python3"},
		{"href":"htmlcssjs.html","title":"HTML/CSS/JS"},
		{"href":"sql.html","title":"数据库"},
		{"href":"linux.html","title":"Linux"},
		{"href":"web组件.html","title":"web组件"},
		{"href":"web框架.html","title":"web框架"},
		{'href':'websecure.html','title':'websecure'}
]
python3 = [{"href":"../subcontent/gitpushall.py.html","title":"GIT傻瓜式封装","intro":"git push 一键搞定"},
			{"href":"../subcontent/file_mdf_check_same.py.html","title":"python3重写的 diff 命令","intro":"python3 造轮子系列"},
			{"href":"../subcontent/handle_file.py.html","title":"python3遍历某目录下所有文件","intro":"系统文件操作基础-骇客(系统破坏者)必备"},
			{"href":"../subcontent/refresh.py.html","title":"python3-封装的GIT","intro":"python3造轮子系列"},
			{"href":"../subcontent/adding_log.py.html","title":"python3-给所有代码打上log","intro":"python3调试代码系列"},	
			{"href":"../subcontent/scpupdate_code_toserver.py.html","title":"python3-模仿merical 签出代码","intro":"python3造轮子系列之 hg "},
			{'href':'../subcontent/python3_closure_nonlocal.py.html','title':'python3-闭包-nonlocal关键字','intro':' '},
			{'href':'../subcontent/python3_encode_type.html','title':'python3编码类型汇总','intro':''},
			{'href':'../subcontent/shadowsock_in_python.html','title':'如何用Python番GREAT-FFFIIRE-EWLLL','intro':'更加人性化的技术'},
			{'href':'../subcontent/python3-with-stmt.html','title':'python3异步上下文管理器','intro':'改造python代码'},
			{'href':'../subcontent/python3_hanshi.html','title':'python3需要时常看看的代码','intro':'python3深入学习与进阶'},
			{'href':'../subcontent/python_threading_join_known.html','title':'python3线程join','intro':'python3深入学习与进阶'},						
]
go = [{"href":"../subcontent/1337leet.html","title":"1337密码","intro":"黑客使用的加密密码"}
]
htmlcssjs = [{"href":"../subcontent/data-src.html","title":"图片懒加载","intro":"img的data-src属性"},
{"href":"../subcontent/xxtea_code.html","title":"html的XXTEA加密技术","intro":"加密网页"},
{"href":"../subcontent/w3m_how_to_use.html","title":"如何使用w3m","intro":"w3m安全的浏览工具"}
]
sql = [{"href":"../subcontent/postgresql_installconfigoncentos7.html","title":"Postgresql 在centos7上的安装","intro":"Postgresl 的安装配置"},
{"href":"../subcontent/django_mysql_datatype.html","title":"mysql postgresql 在 django中的数据类型","intro":"django中mysql和pg的数据类型"},
{"href":"../subcontent/mysql_cmd_all.html","title":"mysql命令大全","intro":"mysql命令大全"},
]
linux = [{"href":"../subcontent/firewall_ctos7.html","title":"centos7防火墙配置","intro":"UFW Centos7防火墙"},
		{"href":"../subcontent/ip_long_2_ver.html","title":"IP 长整形转换","intro":"使用长整形的IP"},
		{"href":"../subcontent/selinux_learning.html","title":"selinux","intro":"Selinux配置"},
		{"href":"../subcontent/zabbix_install_on_centos_7.html","title":"Zabbix在centos7上的安装配置","intro":"使用Zabbix进行系统维护"},
		{"href":"../subcontent/rpm_open_fail.html","title":"rpm出现的错误","intro":"rpm出现错误"},
		{"href":"../subcontent/linux_software_cmd.html","title":"20款堪称神器的linux命令行软件","intro":"linux命令行神器"},
		{"href":"../subcontent/vim_plugin_config_and_vimrc.html","title":"vim插件的配置和.vimrc的编写","intro":"vim神器的配置与使用"},
		{"href":"../subcontent/fedora_software_package_install.html","title":"redhat的软件仓库","intro":"linux的便捷使用"},
		{"href":"../subcontent/git-server-config.html","title":"linux上git-server的搭建","intro":"linux的便捷使用"},
		{"href":"../subcontent/git-deny-current-branch.html","title":"git踩坑之 git-deny-current-branch","intro":"git踩坑之denyCurrentBranch配置"},
		{"href":"../subcontent/linux_windows_using_skills.html","title":"linux windows 使用习惯","intro":"linux windows差异"}
]
web_0 = [{"href":"../subcontent/pv_uv_visit.html","title":"网页的pageview","intro":"流量的统计方法"},
		{"href":"../subcontent/tengine_how_to_use.html","title":"关于tengine的一些使用心得","intro":"关于tengine的一些使用心得"}]
web_1 = [{"href":"../subcontent/kafka_distribute_system.html","title":"搭建一个kafka集群","intro":"用仅有的两台主机"},
		{"href":"../subcontent/about_h20_frameworkd.html","title":"About The Web Framework","intro":"About the H2o web framework"},
		{"href":"../subcontent/http_req_res_info.html","title":"About http request and response","intro":"about http request and response"},
] 

websecure = [{'href':'../subcontent/1337leet.html','title':'1337加密','intro':'黑客使用的加密方法'},
		{'href':'../subcontent/firefox_extentions.html','title':'火狐渗透插件','intro':'火狐渗透插件'},
		{'href':'../subcontent/basic_websecure_http_headers.html','title':'基本的web安全http首部','intro':'使用安全工具nikto得到的部分结果'}
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
	temp__ = [python3,go,htmlcssjs,sql,linux,web_0,web_1,websecure]
	for i in LLIS:
		tarLis.append(Lisnav(href=i['href'],title=i['title']))
	print(len(tarLis))
	for i in range(len(tarLis)):
		generate(navtitle=tarLis[i].title,navs=temp__[i],lis=LLIS,filename=tarLis[i].href)
	
	#print(len(tarNavs))
