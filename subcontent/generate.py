import os

from jinja2 import Environment, PackageLoader

def generate(title,mainiframe,description="",\
	author="fingerecho,fangself.com.cn,",iconhref="./jpg/icon/favicon.gif"):
	print(mainiframe)
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('base.html')
	res = temp.render(title=title,\
		description=description,author=author,\
		iconhref=iconhref,mainiframe=mainiframe)
	ff = open(os.path.join("./",mainiframe+"l"),"w",encoding="utf-8")
	ff.write(res)
	ff.close()
if __name__=="__main__":
	files = [x for x in os.listdir() if x.endswith(".htm") ]
	files = [generate("fingerecho",x) for x in files]

