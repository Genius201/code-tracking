from fastapi import APIRouter, Depends, HTTPException, status
from .recording_service import RecordingService, NotFoundException
from .models import (
    RecordingCreateRequest, RecordingPatchRequest, BombSaveRequest,
    RecordingResponse
)
from typing import List

router = APIRouter(prefix="/api/v1/recordings", tags=["recordings"])

# Placeholder for user authentication
class SecurityUtil:
    @staticmethod
    def uid():
        # TODO: Replace with real user ID extraction
        return "demo-uid"

service = RecordingService()

@router.post("", response_model=RecordingResponse)
def create_recording(req: RecordingCreateRequest):
    return service.create(SecurityUtil.uid(), req)

@router.get("", response_model=List[RecordingResponse])
def list_recordings():
    return service.list(SecurityUtil.uid())

@router.get("/{rec_id}", response_model=RecordingResponse)
def get_recording(rec_id: str):
    try:
        return service.get(SecurityUtil.uid(), rec_id)
    except NotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recording not found")

@router.patch("/{rec_id}", response_model=RecordingResponse)
def patch_recording(rec_id: str, req: RecordingPatchRequest):
    try:
        return service.patch(SecurityUtil.uid(), rec_id, req)
    except NotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recording not found")

@router.post("/{rec_id}/bomb", response_model=RecordingResponse)
def save_bomb(rec_id: str, req: BombSaveRequest):
    try:
        return service.save_bomb(SecurityUtil.uid(), rec_id, req)
    except NotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Recording not found")

@router.delete("/{rec_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_recording(rec_id: str):
... (truncated for brevity)