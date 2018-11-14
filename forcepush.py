#!/usr/bin/python3
import subprocess as sb
import time

cmd=['git add ./*',
'git commit -m "update  ',
'git push -f',
]

print(sb.call(cmd[0]));print("execute git adding ")
print(sb.call(cmd[1]+str(time.ctime())+" \""));print("commit finished");
print(sb.call(cmd[2]));print("pushed")
print("finished all executing shell")
