# models/ets.py
from statsmodels.tsa.seasonal import seasonal_decompose
import matplotlib.pyplot as plt

def decompose_ets(data, metric):
    decomposition = seasonal_decompose(data[metric], model='additive', period=30)
    fig, ax = plt.subplots(4, 1, figsize=(8, 10))
    decomposition.observed.plot(ax=ax[0], title='Observed')
    decomposition.trend.plot(ax=ax[1], title='Trend')
    decomposition.seasonal.plot(ax=ax[2], title='Seasonal')
    decomposition.resid.plot(ax=ax[3], title='Residual')
    plt.tight_layout()
    return fig
