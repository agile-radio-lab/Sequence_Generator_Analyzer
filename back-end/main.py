from fastapi import FastAPI
from sequences import *
from fft import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from models import *

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://192.168.11.30:3000",
    "http://192.168.11.61:3000",

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/get_seq")
async def get_seq(seq: Sequencs):
    result = type_of_sequence[seq.type_of_seq](n_samples=seq.n_samples,amp=seq.amp,T=seq.period,N=seq.zaddoff_chu_root,puls_width=seq.puls_width)
    seq.iq_samples.real = [float(x) for x in result.real ]
    seq.iq_samples.imag = [float(x) for x in result.imag ]
    return seq

@app.post("/calc_fft")
async def calculate_fft(calc_samples: FFT_Samples):
    samples = calc_fft_psd(calc_samples.iq_samples.real,calc_samples.iq_samples.imag,calc_samples.fft_size)
    calc_samples.fft_samples = list(samples)
    plot_water_fall(calc_samples.iq_samples.real,calc_samples.iq_samples.imag,calc_samples.fft_size)
    return calc_samples

@app.get("/get_waterfall")
async def get_waterfall ():
    return StreamingResponse(open("./plots/waterfall.png", "rb"), media_type="image/png")