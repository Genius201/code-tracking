# Firestore path utilities for Python backend

def user_doc(uid: str) -> str:
    return f"users/{uid}"

def notes_doc(uid: str) -> str:
    return f"{user_doc(uid)}/notes/me"

def sets_collection(uid: str) -> str:
    return f"{user_doc(uid)}/sets"

def recordings_collection(uid: str) -> str:
    return f"{user_doc(uid)}/recordings"