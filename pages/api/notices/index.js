import { connectDb } from "../../../lib/server/db";
import Notice from "../../../lib/server/models/Notice";

function isAdmin(req) {
  try {
    const u = req.headers['x-admin-user'];
    const p = req.headers['x-admin-pass'];
    return Boolean(u) && Boolean(p) && u === process.env.ADMIN_USER && p === process.env.ADMIN_PASS;
  } catch (_) {
    return false;
  }
}

export default async function handler(req, res) {
  await connectDb();
  if (req.method === "GET") {
    const { page = "1", limit = "10" } = req.query;
    const p = Math.max(parseInt(page, 10) || 1, 1);
    const l = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);
    const total = await Notice.countDocuments();
    const docs = await Notice.find({})
      .sort({ date: -1, createdAt: -1 })
      .skip((p - 1) * l)
      .limit(l)
      .lean();
    // Map to public shape (keep existing front-end expectations)
    const toYmdUTC = (input) => {
      const d = new Date(input);
      const y = d.getUTCFullYear();
      const m = String(d.getUTCMonth() + 1).padStart(2, "0");
      const day = String(d.getUTCDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };
    const items = docs.map((d) => ({
      id: d._id.toString(),
      title: d.title,
      date: toYmdUTC(d.date),
      description: d.notice || "",
    }));
    return res.status(200).json({ ok: true, items, total, page: p, limit: l });
  }
  if (req.method === "POST") {
    if (!isAdmin(req)) return res.status(401).json({ ok: false, error: "Unauthorized" });
    const { title, date, description, notice } = req.body || {};
    if (!title || !date) return res.status(400).json({ ok: false, error: "Title and date required" });
    const toUtcMidnight = (ymd) => new Date(`${String(ymd).slice(0, 10)}T00:00:00.000Z`);
    const payload = {
      title: String(title).slice(0, 80),
      notice: (notice ?? description ?? '').toString(),
      date: toUtcMidnight(date),
    };
    const doc = await Notice.create(payload);
    const y = doc.date.getUTCFullYear();
    const m = String(doc.date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(doc.date.getUTCDate()).padStart(2, '0');
    return res.status(201).json({ ok: true, item: { id: doc._id.toString(), title: doc.title, date: `${y}-${m}-${d}`, description: doc.notice } });
  }
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}


