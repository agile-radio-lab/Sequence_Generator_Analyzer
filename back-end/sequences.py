import numpy as np

N_SAMPLES =     1000
PERIOD = 10
Zaddoff_Chu_root = [25,29,34]

def ones(n_samples=N_SAMPLES,T=PERIOD,amp=0.5,N=0,puls_width=N_SAMPLES/2):
    return amp * np.ones(n_samples, dtype=np.complex64)

def exp(n_samples=N_SAMPLES,T=PERIOD,amp=0.5,N=0,puls_width=N_SAMPLES/2):
    t = np.arange(0,n_samples,dtype=np.complex64)
    freq = 1/T
    return amp*np.exp(2j*np.pi*freq*t)

def neg_exp(n_samples=N_SAMPLES,T=PERIOD,amp=0.5,N=0,puls_width=N_SAMPLES/2):
    t = np.arange(0,n_samples,dtype=np.complex64)
    freq = 1/T
    return amp*np.exp(-2j*np.pi*freq*t)

def cos(n_samples=N_SAMPLES,T=PERIOD,amp=0.5,N=0,puls_width=N_SAMPLES/2):
    t = np.arange(0,n_samples,dtype=np.complex64)
    freq = 1/T
    return amp*np.cos(2*np.pi*freq*t)

def pss(n_samples=61,N=0,amp=.5,T=PERIOD,puls_width=N_SAMPLES/2):
    pss_seq = []
    for n in  range(0,31):
        pss_seq.append(np.exp((-1j*np.pi*Zaddoff_Chu_root[N]*n*(n+1))/63))
    for n in range(31,62):
        pss_seq.append(np.exp((-1j*np.pi*Zaddoff_Chu_root[N]*(n+1)*(n+2))/63))
    return amp * np.array(pss_seq,dtype=np.complex64)

def cos_squared(n_samples=N_SAMPLES,T=PERIOD,amp=.5,N=0,puls_width=N_SAMPLES/2):
    return cos(n_samples,T,amp,N,puls_width) **2

def rect(n_samples=61,N=0,amp=.5,T=PERIOD,puls_width=N_SAMPLES/2):
    rect = np.arange(n_samples) % T < puls_width
    return amp * np.array([float(sample) for sample in rect],dtype=np.complex64)

def shape_signal(sig_seq=pss(), stretch_factor=10, repetition_factor= 10):
    s = np.kron(sig_seq, np.ones(stretch_factor))
    return np.kron(np.ones(repetition_factor), s)

# List of sequences
type_of_sequence = {"ones":ones,"exp":exp,"neg_exp":neg_exp,"cos":cos,"pss":pss,"cos^":cos_squared,"rect":rect}
