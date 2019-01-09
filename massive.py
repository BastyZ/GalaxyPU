import csv, os
import numpy as np
import pandas as pd

def wavelength_to_rgb(wavelength, gamma=0.8):

    '''This converts a given wavelength of light to an
    approximate RGB color value. The wavelength must be given
    in nanometers in the range from 380 nm through 750 nm
    (789 THz through 400 THz).

    Based on code by Dan Bruton
    http://www.physics.sfasu.edu/astro/color/spectra.html
    '''

    wavelength = float(wavelength)
    if wavelength >= 380 and wavelength <= 440:
        attenuation = 0.3 + 0.7 * (wavelength - 380) / (440 - 380)
        R = ((-(wavelength - 440) / (440 - 380)) * attenuation) ** gamma
        G = 0.0
        B = (1.0 * attenuation) ** gamma
    elif wavelength >= 440 and wavelength <= 490:
        R = 0.0
        G = ((wavelength - 440) / (490 - 440)) ** gamma
        B = 1.0
    elif wavelength >= 490 and wavelength <= 510:
        R = 0.0
        G = 1.0
        B = (-(wavelength - 510) / (510 - 490)) ** gamma
    elif wavelength >= 510 and wavelength <= 580:
        R = ((wavelength - 510) / (580 - 510)) ** gamma
        G = 1.0
        B = 0.0
    elif wavelength >= 580 and wavelength <= 645:
        R = 1.0
        G = (-(wavelength - 645) / (645 - 580)) ** gamma
        B = 0.0
    elif wavelength >= 645 and wavelength <= 750:
        attenuation = 0.3 + 0.7 * (750 - wavelength) / (750 - 645)
        R = (1.0 * attenuation) ** gamma
        G = 0.0
        B = 0.0
    else:
        R = 0.0
        G = 0.0
        B = 0.0
    R *= 255
    G *= 255
    B *= 255
    return (int(R), int(G), int(B))

pathgaia = '/data/binostro/csv_unleashed/csv/'
migaia = os.listdir(pathgaia)
n = 0
for i in migaia:
    df = pd.read_csv(pathgaia+i,sep=',', decimal='.')
    df = df[['ra', 'dec', 'parallax', 'radius_val', 'lum_val']]
    A = df['ra']
    B = df['dec']
    p = df['parallax']/1000
    col = 1000/df['astrometric_pseudo_colour']
    col1,col2,col3 = [wavelength_to_rgb(x) for x in col]
    print(col[0])
    C = 1/p
    rad = df['radius_val']
    lum = df['lum_val']

    x = np.multiply(np.multiply(C,np.cos(B)),np.cos(A)).astype(float)
    y = np.multiply(np.multiply(C,np.cos(B)),np.sin(A)).astype(float)
    z = np.multiply(C,np.sin(B)).astype(float)
    df2 = pd.DataFrame(np.column_stack((x,y,z,rad,lum)))
    df2 = df2.dropna()
    df2.to_csv(pathgaia+'../'+'filtered/'+i,mode='w+',header=False,index=False)
    print(n)
    n+=1
