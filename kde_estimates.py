"""
Learning kernel density estimation (KDE) for crime data
"""

import pandas as pd
import numpy as np
import overpass
import geopandas as gpd
import matplotlib.pyplot as plt
from ast import literal_eval as make_tuple
import psycopg2
import ipdb
import sys
import cost_models
from sklearn.neighbors.kde import KernelDensity
from sklearn.grid_search import GridSearchCV


# Do KDE on a precinct
# get dataframe by a precinct
fname = 'data/NYPD_7_Major_Felony_Incidents_2010--2016_with_roads'
print('Initial loading from {0}'.format(fname + '.csv'))
df = pd.read_csv(fname + '.csv')
sys.exit()

df_76 = df.groupby('Precinct').get_group(76)
df_76_coords = df_76.loc[:, ['XCoordinate', 'YCoordinate']]
# rescale [a,b] --> [0,1] in each dimension
(a, b) = (df_76_coords.XCoordinate.min(), df_76_coords.XCoordinate.max())
df_76_coords.loc[:, 'XCoordinate_norm'] = (df_76_coords.XCoordinate - a)/(b-a)

(a, b) = (df_76_coords.YCoordinate.min(), df_76_coords.YCoordinate.max())
df_76_coords.loc[:, 'YCoordinate_norm'] = (df_76_coords.YCoordinate - a)/(b-a)
plt.figure()
plt.scatter(df_76_coords.XCoordinate_norm, df_76_coords.YCoordinate_norm, alpha=0.3)



def optimal_bandwidth(data, params, cv_value=10):
    """
    Choose best bandwidth using cross validation
    """
    # params = {'bandwidth': np.linspace(0.0001,0.3,20)}
    # data = np.array(df_76_coords.loc[:,['XCoordinate_norm', 'YCoordinate_norm']])
    grid = GridSearchCV(KernelDensity(), param_grid=params , cv=cv_value)
    grid.fit(data)
    print(grid.best_params_)
    return grid.best_estimator_

def kde_fit(data, bandwidth=1.0):
    kde = KernelDensity()
    kde.bandwidth = bandwidth
    kde.kernel='gaussian'
    # kde.fit(df_76_coords)
    # data = df_76_coords.loc[:,['XCoordinate_norm', 'YCoordinate_norm']]
    kde.fit(data)
    return kde


# add in appropriate parameters
def plot_kde(kde, x_points, y_points):
    # plot the PDF
    # samples = kde.sample(100)
    # pdf = np.exp(kde.score_samples(samples))
    # x_points = np.linspace(df_76_coords.XCoordinate_norm.min(), df_76_coords.XCoordinate_norm.max(), 200)
    # y_points = np.linspace(df_76_coords.YCoordinate_norm.min(), df_76_coords.YCoordinate_norm.max(), 200)
    x_mesh, y_mesh = np.meshgrid(x_points, y_points)
    # took this from sklearn's sire
    # xy = np.vstack([y_mesh.ravel(), x_mesh.ravel()]).transpose()
    xy = np.vstack([x_mesh.ravel(), y_mesh.ravel()]).transpose()
    log_pdf = kde.score_samples(xy)
    pdf = np.exp(log_pdf)
    z_mesh = pdf.reshape(x_mesh.shape)
    plt.figure()
    # plt.scatter(df_76_coords.XCoordinate, df_76_coords.YCoordinate, alpha=0.3)
    # plt.pcolormesh(x_mesh, y_mesh, z_mesh, cmap='OrRd', alpha=0.5)
    plt.pcolormesh(x_mesh, y_mesh, z_mesh, cmap='OrRd', alpha=1.0)
    plt.colorbar()
    plt.title('Bandwidth {0}'.format(kde.bandwidth))
# plt.contourf(X, Y, Z)





# # 1D KDE
# kde = KernelDensity()
# kde.bandwidth = 0.5
# kde.kernel='gaussian'
# kde.fit(df_76_coords.XCoordinate)
# x_points = np.linspace(df_76_coords.XCoordinate.min(), df_76_coords.XCoordinate.max(), 200)
# log_pdf = kde.score_samples(x_points)
# pdf = np.exp(log_pdf)
# plt.figure()
# plt.plot(x_points, pdf)
