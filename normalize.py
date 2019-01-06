import os, sys
import numpy as np
import pandas as pd

df = pd.read_csv('gaia_sample.csv',sep=',', decimal='.')
df = df[['ra', 'dec', 'parallax', 'radius_val', 'lum_val']]
A = df['ra']
B = df['dec']
p = df['parallax']/1000
C = 1/p
rad = df['radius_val']
lum = df['lum_val']

x = np.multiply(np.multiply(C,np.cos(B)),np.cos(A))
y = np.multiply(np.multiply(C,np.cos(B)),np.sin(A))
z = np.multiply(C,np.sin(B))
x = np.divide(x, np.abs(x).max(axis=0)) 
y = np.divide(y, np.abs(y).max(axis=0)) 
z = np.divide(z, np.abs(z).max(axis=0)) 
df2 = pd.DataFrame(np.column_stack((x,y,z,rad,lum)))
df2 = df2.dropna()
df2.to_csv('cc2.csv',mode='w',header=False,index=False)

