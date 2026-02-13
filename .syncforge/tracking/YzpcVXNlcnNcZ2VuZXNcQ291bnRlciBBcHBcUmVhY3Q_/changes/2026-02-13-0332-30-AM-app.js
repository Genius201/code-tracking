/* Com/peish! — Vanilla SPA Prototype
   - localStorage: user + app data
   - IndexedDB: media blobs (audio/video)
   - BombMeter: demo heuristic (audio energy envelope)
*/

const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => [...el.querySelectorAll(sel)];
const uid = () => crypto.randomUUID ? crypto.randomUUID() : (Date.now()+"-"+Math.random().toString(16).slice(2));
const now = () => Date.now();

const STORAGE_KEY = "compeish_v1";
const appEl = $("#app");
const toastEl = $("#toast");
const authModal = $("#authModal");

const state = {
  user: null,
  sets: [],
  notes: [],
  recordings: [],   // meta
  showtime: [],     // entries
  session: {
    currentRecordingId: null,
    activeSetId: null,
    timer: null,
    recorder: null,
    stream: null,
    chunks: [],
    isRecording: false,
    isPaused: false,
    startedAt: null,
    durationSec: 300,
    remainingSec: 300,
    markerTimes: [],
    highlightedItemId: null,
    notesExpanded: false,
    recType: "audio",
  }
};

/* -------------------- Toast -------------------- */
function toast(msg, ms=1800){
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(()=> toastEl.classList.remove("show"), ms);
}

/* -------------------- Persistence -------------------- */
... (truncated for brevity)