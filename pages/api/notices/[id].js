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
  const { id } = req.query;
  if (!id) return res.status(400).json({ ok: false, error: "Missing id" });

  if (req.method === "PATCH") {
    if (!isAdmin(req)) return res.status(401).json({ ok: false, error: "Unauthorized" });
    const patch = req.body || {};
    const update = {};
    if (patch.title != null) update.title = String(patch.title).slice(0, 80);
    if (patch.description != null || patch.notice != null) update.notice = (patch.notice ?? patch.description ?? '').toString();
    if (patch.date != null) update.date = new Date(`${String(patch.date).slice(0,10)}T00:00:00.000Z`);
    const updated = await Notice.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!updated) return res.status(404).json({ ok: false, error: "Not found" });
    const y = new Date(updated.date).getUTCFullYear();
    const m = String(new Date(updated.date).getUTCMonth() + 1).padStart(2,'0');
    const d = String(new Date(updated.date).getUTCDate()).padStart(2,'0');
    return res.status(200).json({ ok: true, item: { id: updated._id.toString(), title: updated.title, date: `${y}-${m}-${d}`, description: updated.notice } });
  }
  if (req.method === "DELETE") {
    if (!isAdmin(req)) return res.status(401).json({ ok: false, error: "Unauthorized" });
    const del = await Notice.findByIdAndDelete(id);
    if (!del) return res.status(404).json({ ok: false, error: "Not found" });
    return res.status(200).json({ ok: true });
  }
  res.setHeader("Allow", ["PATCH", "DELETE"]);
  return res.status(405).json({ ok: false, error: "Method not allowed" });
}


