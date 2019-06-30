source activate python36
python insert_article_nav.py  --unique-article-title     $1
python insert_article_nav.py  --update-nav  --unique-article   $2
python insert_article_nav.py  --check-nav   --unique-article   $2

git add ./*
git commit -m 'add an article about $1'
git push

