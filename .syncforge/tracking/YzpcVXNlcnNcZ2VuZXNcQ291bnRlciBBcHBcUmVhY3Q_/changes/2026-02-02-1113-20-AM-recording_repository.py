from google.cloud import firestore
from .firestore_paths import recordings_collection
from .models import Recording
from typing import List, Optional

class RecordingRepository:
    def __init__(self):
        self.db = firestore.Client()

    def create(self, uid: str, rec_data: dict) -> dict:
        col_ref = self.db.collection(recordings_collection(uid))
        doc_ref = col_ref.document()
        rec_data['id'] = doc_ref.id
        doc_ref.set(rec_data)
        return rec_data

    def get(self, uid: str, rec_id: str) -> Optional[dict]:
        doc_ref = self.db.collection(recordings_collection(uid)).document(rec_id)
        snap = doc_ref.get()
        if not snap.exists:
            return None
        return snap.to_dict()

    def list(self, uid: str) -> List[dict]:
        col_ref = self.db.collection(recordings_collection(uid))
        snaps = col_ref.order_by('createdAt', direction=firestore.Query.DESCENDING).stream()
        return [doc.to_dict() for doc in snaps]

    def upsert(self, uid: str, rec_id: str, rec_data: dict) -> dict:
        doc_ref = self.db.collection(recordings_collection(uid)).document(rec_id)
        doc_ref.set(rec_data)
        return rec_data

    def delete(self, uid: str, rec_id: str) -> None:
        doc_ref = self.db.collection(recordings_collection(uid)).document(rec_id)
        doc_ref.delete()