#!/usr/bin/python
# coding=utf8
# author: Sun yang


a = ['00:00:01','01:00:01','00:00:02','00:01:01','03:00:01']


import re

for i in a:
  c = re.findall(r'00:\d\d:\d\d',i)
  if c:
    print(c)
