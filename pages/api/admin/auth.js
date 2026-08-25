export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  const u = req.headers['x-admin-user'];
  const p = req.headers['x-admin-pass'];
  if (u && p && u === process.env.ADMIN_USER && p === process.env.ADMIN_PASS) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ ok: false, error: 'Unauthorized' });
}
