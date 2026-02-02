from google.cloud import firestore
from .firestore_paths import sets_collection
from .models import SetItem, SetResponse
from typing import List, Optional

class SetRepository:
    def __init__(self):
        self.db = firestore.Client()

    def create(self, uid: str, set_data: dict) -> dict:
        col_ref = self.db.collection(sets_collection(uid))
        doc_ref = col_ref.document()  # auto id
        set_data['id'] = doc_ref.id
        doc_ref.set(set_data)
        return set_data

    def get(self, uid: str, set_id: str) -> Optional[dict]:
        doc_ref = self.db.collection(sets_collection(uid)).document(set_id)
        snap = doc_ref.get()
        if not snap.exists:
            return None
        return snap.to_dict()

    def list(self, uid: str) -> List[dict]:
        col_ref = self.db.collection(sets_collection(uid))
        snaps = col_ref.order_by('updatedAt', direction=firestore.Query.DESCENDING).stream()
        return [doc.to_dict() for doc in snaps]

    def upsert(self, uid: str, set_id: str, set_data: dict) -> dict:
        doc_ref = self.db.collection(sets_collection(uid)).document(set_id)
        doc_ref.set(set_data)
        return set_data

    def delete(self, uid: str, set_id: str) -> None:
        doc_ref = self.db.collection(sets_collection(uid)).document(set_id)
        doc_ref.delete()