import numpy as np
import matplotlib.pyplot as plt
from sequences import *
import math

FFT_SIZE = 1024
plt.rcParams.update({'font.size': 14})

def psd(samples,fft_size=FFT_SIZE):
    window = np.hamming(fft_size)
    result = np.multiply(window, samples)
    result = np.fft.fft(result, fft_size)
    result = np.fft.fftshift(result)
    result = np.square(np.abs(result))
    result = np.nan_to_num(10.0 * np.log10(result))
    # result = np.abs(result)
    return result

def calc_fft_psd(real,imag,fft_size):
    samples = [complex(real[x],imag[x]) for x in range(len(real))]
    n_fft_steps = int(np.floor(len(samples)/fft_size))
    freq_result = np.zeros([n_fft_steps, fft_size])
    for i in range(n_fft_steps):
        bins = psd(samples[i*fft_size:(i+1)*fft_size],fft_size)
        freq_result[i] = bins
    return np.mean(freq_result, axis=0)

def calc_water_fall(samples,fft_size):
    n_fft_steps = int(np.floor(len(samples)/fft_size))
    freq_result = np.zeros([n_fft_steps, fft_size])
    for i in range(n_fft_steps):
        bins = psd(samples[i*fft_size:(i+1)*fft_size],fft_size)
        freq_result[i] = bins
    return freq_result


def plot_water_fall(real,imag,fft_size):
    samples = [complex(real[x],imag[x]) for x in range(len(real))]
    freq_result = calc_water_fall(samples,fft_size)
    fig, ax = plt.subplots(1,1,figsize=(16, 8))
    cmap = plt.get_cmap("inferno")
    im = ax.pcolormesh(freq_result,cmap=cmap,vmax=0, vmin=-120)
    cbar = fig.colorbar(im, ax=ax)
    cbytick_obj = plt.getp(cbar.ax.axes, 'yticklabels')                #tricky
    plt.setp(cbytick_obj, color='white')
    cbar.set_label('Power [dBm]',color="white")
    ax.set_xlabel("Frequency [bins]")
    ax.set_ylabel("Time")
    xticks = calc_ticks(fft_size)
    plt.xticks(np.arange(0,fft_size+1,fft_size/5),xticks )
    ax.xaxis.label.set_color('white')
    ax.yaxis.label.set_color('white')
    ax.tick_params(colors='white')
    plt.savefig('./plots/waterfall.png',bbox_inches='tight',transparent=True)

def calc_ticks(fft_size):
    ticks = np.arange(-fft_size/2,fft_size/2+1,fft_size/5)
    ticks = [math.floor(i) for i in ticks ]
    return ticks
# # test waterfall
# samples = shape_signal(pss(), 1,100)
# freq_result = calc_water_fall(samples,FFT_SIZE)
# fig, ax = plt.subplots(4,1,figsize=(16, 8))
# cmap = plt.get_cmap("inferno")

# # IQ Samples 
# ax[0].set_title('IQ')
# ax[0].plot(samples.real,samples.imag,".")
# ax[0].grid()
# ax[0].set_xlabel("I [real]")
# ax[0].set_ylabel("Q [Img]")

# # Time domain representation
# ax[1].set_title('Time domain')
# ax[1].plot(samples.real)
# ax[1].grid()
# ax[1].set_xlabel("Time")
# ax[1].set_ylabel("Amplitude")

# # Frequency domain representation
# ax[2].plot(np.mean(freq_result, axis=0))
# ax[2].grid()
# ax[2].set_xlabel("Frequency")
# ax[2].set_ylabel("Power")

# ax[3].set_title('Water Fall ')
# ax[3].pcolormesh(freq_result, cmap=cmap,vmax=0, vmin=-45)
# ax[3].set_xlabel("Frequency")
# ax[3].set_ylabel("Time")

# plt.show()