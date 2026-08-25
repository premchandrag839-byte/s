import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "notices.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, "[]", "utf8");
}

export function readNotices() {
  ensureStore();
  const raw = fs.readFileSync(FILE_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeNotices(notices) {
  ensureStore();
  fs.writeFileSync(FILE_PATH, JSON.stringify(notices, null, 2), "utf8");
}

function generateId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toLowerCase();
}

function normalizeDate(dateStr) {
  // Expect YYYY-MM-DD; fallback to today
  try {
    if (!dateStr) return new Date().toISOString().slice(0, 10);
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
    return d.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

export function listNotices({ offset = 0, limit = 10 } = {}) {
  const all = readNotices();
  const sorted = all.sort((a, b) => {
    const ad = a.date || a.createdAt || 0;
    const bd = b.date || b.createdAt || 0;
    return ad < bd ? 1 : ad > bd ? -1 : 0; // desc
  });
  const total = sorted.length;
  const items = sorted.slice(offset, offset + limit);
  return { items, total };
}

export function addNotice({ title, date, description = "" }) {
  const notices = readNotices();
  const trimmed = (title || "").trim().slice(0, 80);
  const record = {
    id: generateId(),
    title: trimmed,
    date: normalizeDate(date),
    description,
    createdAt: new Date().toISOString(),
  };
  notices.push(record);
  writeNotices(notices);
  return record;
}

export function updateNotice(id, patch) {
  const notices = readNotices();
  const idx = notices.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  const current = notices[idx];
  const next = {
    ...current,
    ...(patch.title != null ? { title: patch.title.slice(0, 80) } : {}),
    ...(patch.date != null ? { date: normalizeDate(patch.date) } : {}),
    ...(patch.description != null ? { description: patch.description } : {}),
  };
  notices[idx] = next;
  writeNotices(notices);
  return next;
}

export function deleteNotice(id) {
  const notices = readNotices();
  const next = notices.filter((n) => n.id !== id);
  writeNotices(next);
  return notices.length !== next.length;
}

export const NOTICES_STORE_PATH = FILE_PATH;


