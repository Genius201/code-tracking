from fastapi import APIRouter, Depends, HTTPException, status
from .set_service import SetService, NotFoundException
from .models import SetCreateRequest, SetUpdateRequest, ReorderRequest, SetResponse
from typing import List

router = APIRouter(prefix="/api/v1/sets", tags=["sets"])

# Placeholder for user authentication
# Replace with your actual authentication logic
class SecurityUtil:
    @staticmethod
    def uid():
        # TODO: Replace with real user ID extraction
        return "demo-uid"

service = SetService()

@router.post("", response_model=SetResponse)
def create_set(req: SetCreateRequest):
    return service.create(SecurityUtil.uid(), req)

@router.get("", response_model=List[SetResponse])
def list_sets():
    return service.list(SecurityUtil.uid())

@router.get("/{set_id}", response_model=SetResponse)
def get_set(set_id: str):
    try:
        return service.get(SecurityUtil.uid(), set_id)
    except NotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Set not found")

@router.put("/{set_id}", response_model=SetResponse)
def update_set(set_id: str, req: SetUpdateRequest):
    try:
        return service.update(SecurityUtil.uid(), set_id, req)
    except NotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Set not found")

@router.post("/{set_id}/reorder", response_model=SetResponse)
def reorder_set(set_id: str, req: ReorderRequest):
    try:
        return service.reorder(SecurityUtil.uid(), set_id, req)
    except NotFoundException:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Set not found")

@router.delete("/{set_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_set(set_id: str):
    try:
        service.delete(SecurityUtil.uid(), set_id)
... (truncated for brevity)