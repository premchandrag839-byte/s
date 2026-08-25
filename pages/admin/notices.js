import { useEffect, useState } from "react";
import Section from "../../components/Section";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer";

// Admin credentials are validated on the server via environment variables.
// This page collects username/password and sends them as headers to API routes.

export default function AdminNoticesPage() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [form, setForm] = useState({ title: "", date: "", description: "" });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/notices?page=1&limit=100", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || "Failed to load notices");
      }
      setItems(json.items || []);
    } catch (err) {
      setError(err.message || "Failed to load notices");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('admin-notices-authed') === '1') {
        setAuthed(true);
      }
      const su = sessionStorage.getItem('admin-notices-user') || '';
      const sp = sessionStorage.getItem('admin-notices-pass') || '';
      if (su || sp) { setUser(su); setPw(sp); }
    }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed]);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const u = user.trim();
    const p = pw;
    try {
      const res = await fetch('/api/admin/auth', { method: 'POST', headers: { 'x-admin-user': u, 'x-admin-pass': p } });
      if (!res.ok) throw new Error('Invalid credentials');
      setAuthed(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin-notices-authed', '1');
        sessionStorage.setItem('admin-notices-user', u);
        sessionStorage.setItem('admin-notices-pass', p);
      }
    } catch (_) {
      setError('Invalid credentials');
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (!authed) return;
    const payload = { ...form };
    const method = editingId ? "PATCH" : "POST";
    const url = editingId ? `/api/notices/${editingId}` : "/api/notices";
    setError("");
    setSuccess("");
    const headers = { "Content-Type": "application/json", "x-admin-user": user.trim(), "x-admin-pass": pw };
    const res = await fetch(url, { method, headers, body: JSON.stringify(payload) });
    if (res.ok) {
      setForm({ title: "", date: "", description: "" });
      setEditingId(null);
      setSuccess(editingId ? "Notice updated" : "Notice added");
      await load();
    } else {
      try {
        const data = await res.json();
        setError(data?.error || "Failed to save notice");
      } catch (err) {
        setError("Failed to save notice");
      }
    }
  }

  async function edit(item) {
    setForm({ title: item.title, date: item.date, description: item.description || "" });
    setEditingId(item.id);
  }

  async function remove(id) {
    if (!confirm("Delete this notice?")) return;
    const res = await fetch(`/api/notices/${id}`, { method: "DELETE", headers: { "x-admin-user": user.trim(), "x-admin-pass": pw } });
    if (res.ok) await load();
  }

  if (!authed) {
    return (
      <div className="font-inter">
        <SEO title="Admin - Notices" description="Manage notices" />
        <Section title="Admin Login">
          <form onSubmit={handleLogin} className="max-w-sm grid gap-3">
            <input name="username" type="email" placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} className="rounded border border-blue-200 px-3 py-2" required />
            <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} className="rounded border border-blue-200 px-3 py-2" required />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="px-4 py-2 rounded bg-primary text-white">Login</button>
          </form>
        </Section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter">
      <SEO title="Admin - Notices" description="Manage notices" />
      <Section title="Manage Notices">
        <form onSubmit={submit} className="grid gap-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value.slice(0, 80) })} className="mt-1 w-full rounded border border-blue-200 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="mt-1 w-full rounded border border-blue-200 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
            <textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded border border-blue-200 px-3 py-2" />
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" className="px-4 py-2 rounded bg-primary text-white">{editingId ? "Update" : "Add"} Notice</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", date: "", description: "" }); }} className="px-4 py-2 rounded border">Cancel</button>
            )}
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-700 text-sm">{success}</p>}
        </form>

        <h3 className="mt-10 mb-2 font-semibold text-gray-800">Edit & Update Notices</h3>
        <div className="grid gap-4">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            items.map((n) => (
              <div key={n.id} className="rounded-lg border border-blue-100 p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-800">{n.title}</h3>
                    <span className="text-sm text-gray-500">{n.date}</span>
                  </div>
                  {n.description && <p className="text-gray-700 mt-1 max-w-3xl">{n.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => edit(n)} className="px-3 py-2 rounded border">Edit</button>
                  <button onClick={() => remove(n.id)} className="px-3 py-2 rounded bg-red-600 text-white">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </Section>
      <Footer />
    </div>
  );
}


