
import time
import pandas as pd

start_time = time.time()

size = 5
df = []
url = f'http://localhost:3000/pageData/'
df = pd.read_json(url)


print("just", len(df))
print("--- %s seconds ---" % (time.time() - start_time))
print("last", len(df))
final_df = pd.DataFrame(df)
print(final_df.head())

df = final_df

### Data is obtained above
### Now we will serve with panel


import pandas as pd
import numpy as np
import datashader as ds
import datashader.transfer_functions as tf

import holoviews as hv

from holoviews.operation.datashader import datashade, dynspread

hv.extension('bokeh')
import colorcet as cc


totalarray = df['TOTAL'].to_numpy()
regqarray = df['REGQ'].to_numpy()
regclkarray = df['REGCLK'].to_numpy()
regqplusregclkarray = regqarray + regclkarray
memoryarray = df['MEMORY'].to_numpy()
regqplusregclkplusmem_array = regqplusregclkarray + memoryarray
combarray = df['COMB'].to_numpy()

opts1     = hv.opts.RGB(width=3000, height=800)
scatter = hv.Scatter((df['TIME'], df['TOTAL']), kdims=['TIME'], vdims=['PE in nW'], label='PE plot for instance top.dut.GPU0.core0').opts(height=300, width=900,tools=['hover'])
scatter_ds = datashade(scatter, normalization='eq_hist',aggregator=ds.count(), cmap=cc.fire, min_alpha=0.3 ).opts(height=300, width=900,tools=['hover'])
import panel as pn
pn.panel(scatter_ds).servable()