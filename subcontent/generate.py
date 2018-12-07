import os
from shutil import copy
from jinja2 import Environment, PackageLoader

def generate(title,mainiframe,description="",\
	author="fingerecho,fangself.com.cn,",iconhref="./jpg/icon/favicon.gif"):
	print(mainiframe)
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('html_base.html')
	res = temp.render(title=title,\
		description=description,author=author,\
		iconhref=iconhref,mainiframe=mainiframe)
	if mainiframe.endswith(".htm"):
#		mainiframe = mainiframe+"l"
		mainiframe = mainiframe+"l"
	ff = open(os.path.join("./",mainiframe),"w",encoding="utf-8")
	ff.write(res)
	ff.close()
def copy_rewrite(x:str): #### fix the non space of html   using pre label
	if not x.endswith(".py"):
		return 
	envi = Environment(loader=PackageLoader('pygenerate'))
	temp = envi.get_template('python_format.htm')
	fd = open(x,"r",encoding="utf-8") 
	txt = fd.read()
	res = temp.render(all_code = txt)
	fd.close()
	fx = open(x+".htm","w+",encoding="utf-8") 
	fx.write(res)
	fx.close()	
if __name__=="__main__":
    files = [x for x in os.listdir() if x.endswith(".htm") and x=="linux_software_cmd.htm" ]
    #files = [ x for x in os.listdir() if x.endswith(".py") and x=="python3_closure_nonlocal.py"]
    #[copy_rewrite(xx) for xx in files if xx!= None and xx=="python3_closure_nonlocal.py"]
    files = [generate("fingerecho",x) for x in files]
    