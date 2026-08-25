import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE_PATH = path.join(DATA_DIR, "enquiries.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, "[]", "utf8");
}

export function appendEnquiry(record) {
  ensureStore();
  const existing = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  existing.push(record);
  fs.writeFileSync(FILE_PATH, JSON.stringify(existing, null, 2), "utf8");
}

export function getEnquiries() {
  ensureStore();
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
}

export const ENQUIRY_STORE_PATH = FILE_PATH;


