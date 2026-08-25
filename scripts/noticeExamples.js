// Example usage script (Node): add and fetch notices
// Run with: node scripts/noticeExamples.js (after setting MONGODB_URI)

import { connectDb } from '../lib/server/db.js';
import Notice from '../lib/server/models/Notice.js';

async function main() {
  await connectDb();

  // Add a new notice
  const created = await Notice.create({
    title: 'Unit Test Notice',
    notice: 'This is a sample notice created from the example script.',
  });
  console.log('Created notice:', created._id.toString());

  // Fetch all notices
  const all = await Notice.find({}).sort({ date: -1 }).lean();
  console.log('All notices count:', all.length);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


