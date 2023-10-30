#!/opt/homebrew/bin/python3
from PIL import Image
import numpy as np
import sys
import os
import math
import time

if not len(sys.argv) == 2:
	print('Usage: python3 dbv.py <target>')
	print('       <target> file to visualize.')
	sys.exit(1)

if not os.path.isfile(sys.argv[-1]):
	print(sys.argv[-1], 'is not a file.')
	print('Usage: python3 dbv.py <target>')
	print('       <target> file to visualize.')
	sys.exit(1)

field = np.zeros((256, 256), dtype=int)
temp = np.zeros_like(field, dtype=np.float32)
dist = np.zeros(field.shape, dtype=np.uint32)

fd = open(sys.argv[-1], 'rb')
content = fd.read()
fd.close()

buffer = []
sector = 0
t1 = time.time_ns()/10E9
for i in range(len(content)-1):
	if len(buffer) == 16:
		print('{:08x}'.format(sector), '|' , ' '.join(buffer[:len(buffer)//2]), '|' , ' '.join(buffer[len(buffer)//2:]), '|')
		buffer = []
		sector += 16

	x = content[i]
	y = content[i+1]

	field[y][x] += 1
	buffer.append('{:02x}'.format(content[i]))

t2 = time.time_ns()/10E9
t = round((t2-t1), 10)
print('Read', len(content), 'B in', round(t, 6) , f's ({(len(content)/t)/10E6} MB/s)')

np.log(field, out=temp)
temp[temp < 0] = 0
m = temp.max()

for x in range(len(temp)):
	for y in range(len(temp)):
		f = np.uint32((temp[y, x]/m)*255)
		dist[y, x] = 0xFF000000 | (f<<16) | (f<<8) | f

im = Image.fromarray(dist, 'RGBA')
im.show()
