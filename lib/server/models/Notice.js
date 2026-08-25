import mongoose from 'mongoose';

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // Make description optional to match UI where it's optional
  notice: { type: String, default: "" },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);


