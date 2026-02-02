from .recording_repository import RecordingRepository
from .models import (
    RecordingCreateRequest, RecordingPatchRequest, BombSaveRequest,
    RecordingResponse, BombResult, Recording
)
from typing import List, Optional
import time

class NotFoundException(Exception):
    pass

class RecordingService:
    def __init__(self, repo: Optional[RecordingRepository] = None):
        self.repo = repo or RecordingRepository()

    def create(self, uid: str, req: RecordingCreateRequest) -> RecordingResponse:
        now = int(time.time() * 1000)
        rec_data = {
            'type': req.type,
            'setId': req.setId,
            'storagePath': req.storagePath,
            'durationSec': req.durationSec,
            'markers': req.markers or [],
            'createdAt': now,
            'keep': False,
            'note': '',
            'tags': [],
            'bomb': None
        }
        saved = self.repo.create(uid, rec_data)
        return self.to_response(saved)

    def list(self, uid: str) -> List[RecordingResponse]:
        recs = self.repo.list(uid)
        return [self.to_response(r) for r in recs]

    def get(self, uid: str, rec_id: str) -> RecordingResponse:
        rec = self.repo.get(uid, rec_id)
        if rec is None:
            raise NotFoundException("Recording not found")
        return self.to_response(rec)

    def patch(self, uid: str, rec_id: str, req: RecordingPatchRequest) -> RecordingResponse:
        rec = self.repo.get(uid, rec_id)
        if rec is None:
            raise NotFoundException("Recording not found")
        if req.keep is not None:
            rec['keep'] = req.keep
        if req.note is not None:
            rec['note'] = req.note
... (truncated for brevity)