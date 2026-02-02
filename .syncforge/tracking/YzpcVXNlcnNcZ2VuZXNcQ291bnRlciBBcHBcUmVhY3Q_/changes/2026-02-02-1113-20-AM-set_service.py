from .set_repository import SetRepository
from .models import SetCreateRequest, SetUpdateRequest, ReorderRequest, SetItem, SetResponse
from typing import List, Optional
import time

class NotFoundException(Exception):
    pass

class SetService:
    def __init__(self, repo: Optional[SetRepository] = None):
        self.repo = repo or SetRepository()

    def create(self, uid: str, req: SetCreateRequest) -> SetResponse:
        now = int(time.time() * 1000)
        set_data = {
            'title': req.title.strip(),
            'tags': req.tags or [],
            'items': [],
            'createdAt': now,
            'updatedAt': now
        }
        saved = self.repo.create(uid, set_data)
        return self.to_response(saved)

    def list(self, uid: str) -> List[SetResponse]:
        sets = self.repo.list(uid)
        return [self.to_response(s) for s in sets]

    def get(self, uid: str, set_id: str) -> SetResponse:
        set_data = self.repo.get(uid, set_id)
        if set_data is None:
            raise NotFoundException("Set not found")
        return self.to_response(set_data)

    def update(self, uid: str, set_id: str, req: SetUpdateRequest) -> SetResponse:
        set_data = self.repo.get(uid, set_id)
        if set_data is None:
            raise NotFoundException("Set not found")
        if req.title is not None:
            set_data['title'] = req.title.strip()
        if req.tags is not None:
            set_data['tags'] = req.tags
        if req.items is not None:
            set_data['items'] = [item.dict() for item in req.items]
        set_data['updatedAt'] = int(time.time() * 1000)
        self.repo.upsert(uid, set_id, set_data)
        return self.to_response(set_data)

    def delete(self, uid: str, set_id: str) -> None:
        set_data = self.repo.get(uid, set_id)
... (truncated for brevity)