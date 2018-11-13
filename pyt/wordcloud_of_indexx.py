#！/usr/bin/python

#################
# Author : fingerecho
# Time :  10/24
# Function : generate a wordcloud picture
########################################

#####
## github:https://github.com/amueller/word_cloud 
##  官方地址:https://amueller.github.io/word_cloud/
#################################################


#####
## text if from https://benchmarksgame-team.pages.debian.net/benchmarksgame/dont-jump-to-conclusions.html
##########################################################################################################

import os
import numpy as np
from wordcloud import WordCloud, STOPWORDS
from PIL import Image
#import matplotlib.pyplot as plt

dd = os.path.dirname(__file__) if "__file__" in locals() else os.getcwd()

patt = os.path.join(dd,'..','jpg','notweb','wordcloud','mycloudpic.jpg')

text = open(os.path.join(dd,'txt','wd.txt')).read()

mask = np.array(Image.open(patt))

stopwords = set(STOPWORDS)

wc = WordCloud(background_color="white", max_words=2000, mask=mask,
               stopwords=stopwords, contour_width=3, contour_color='steelblue')

wc.generate(text)

wc.to_file(os.path.join(dd, "bg.png"))

"""
plt.imshow(wc, interpolation='bilinear')

plt.axis("off")

plt.figure()

plt.imshow(mask, cmap=plt.cm.gray, interpolation='bilinear')

plt.axis("off")

plt.show()
"""