import os

from jinja2 import Environment, PackageLoader

def generate(title,mainiframe,\
	description="",\
	author="fingerecho,fangself.com.cn,",\
	iconhref="./jpg/icon/favicon.gif")
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('base.htm')
	res = temp.render(title=title,\
		description=description,\
		author=author,\
		iconhref=iconhref,\
		mainiframe=mainiframeurl)

if __name__=="__main__":
	files = [x for x in os.listdir() if x.endswith(".htm") ]
	files = [generate("fingerecho",x) for x in files]

