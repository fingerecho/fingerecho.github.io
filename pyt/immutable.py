#!/usr/bin/python3

a=1<<32;print(id(a))
print(id(1<<32))
def ch_(a:int):
    a=1<<32+1;print(id(a))
    print(id(1<<32+1))
    return a
ch_(a)
print(id(a))
print(a==1<<32)
a=ch_(a)
print(a==1<<32)

b=();print(id(b))
print(id(()))
def ch_t(b:tuple):
    b=('hello','world');print(id(b))
    return b
ch_t(b)
print(id(b))
print(b==())
b=ch_t(b)
print(b==())

c=[];print(id(c))
print(id([]))
def ch_l(c:list):
    c=['hello','world'];print(id(c))
    print(id(['hello','world']))
    return c
ch_l(c)
print(id(c))
print(c==[])
c=ch_l(c)
print(c==[])

d={};print(id(d))
print(id({}))
def ch_d(d:dict):
    d={"hello":"world"};print(id(d))
    print(id({"hello":"world"}))
    return d
ch_d(d)
print(id(d))
print(d=={})
d=ch_d(d)
print(d=={})

