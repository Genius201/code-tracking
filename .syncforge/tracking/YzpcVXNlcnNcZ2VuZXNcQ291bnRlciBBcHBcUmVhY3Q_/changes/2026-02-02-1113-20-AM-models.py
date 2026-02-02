# RecordingResponse model
class RecordingResponse(BaseModel):
    id: str
    type: str
    setId: str
    storagePath: str
    createdAt: int
    durationSec: int
    markers: List[int]
    keep: bool
    note: str
    tags: List[str]
    bomb: Optional[BombResult] = None
# BombSaveRequest model
class BombSaveRequest(BaseModel):
    overall: int
    crowd: int
    timing: int
    delivery: int
    presence: Optional[int] = None
    confidence: Optional[str] = None
    heat: Optional[List[float]] = None
    insights: Optional[List[str]] = None
    generatedAt: Optional[int] = None
# RecordingPatchRequest model
class RecordingPatchRequest(BaseModel):
    keep: Optional[bool] = None
    note: Optional[constr(max_length=4000)] = None
    tags: Optional[List[constr(max_length=24)]] = Field(default=None, max_items=10)
# RecordingCreateRequest model
from pydantic import constr

class RecordingCreateRequest(BaseModel):
    type: constr(strip_whitespace=True, min_length=1)  # "audio"|"video"
    setId: str = None
    storagePath: constr(strip_whitespace=True, min_length=1)
    durationSec: int
    markers: List[int] = Field(default_factory=list)
# Recording model
from pydantic import Field

class Recording(BaseModel):
    id: str
    type: str  # "audio" | "video"
    setId: str
    storagePath: str
    createdAt: int
    durationSec: int
    markers: List[int] = Field(default_factory=list)
    keep: bool
... (truncated for brevity)