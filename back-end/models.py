
from typing import Optional
from pydantic import BaseModel

class Waterfall_Samples(BaseModel):
    fft_samples:list
    fft_size:int

class IQ_Samples(BaseModel):
    real:list
    imag:list

class FFT_Samples(BaseModel):
    iq_samples:IQ_Samples
    fft_size:int
    fft_samples:list

class Sequencs(BaseModel):
    type_of_seq:str
    n_samples:int
    amp:float
    period:float
    puls_width:Optional[int] = 0
    zaddoff_chu_root:Optional[int] = 0
    iq_samples:IQ_Samples
