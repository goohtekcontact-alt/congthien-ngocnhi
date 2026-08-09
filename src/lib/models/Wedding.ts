import mongoose from 'mongoose';

const BankInfoSchema = new mongoose.Schema({
  bankId: { type: String },
  accountNumber: { type: String },
  accountName: { type: String },
  type: { type: String },
  qrImage: { type: String }
});

const EventSchema = new mongoose.Schema({
  time: { type: String },
  title: { type: String }
});

const WeddingSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  editMode: { type: Boolean, default: false },
  weddingType: { type: String, default: 'bride' },
  groomName: { type: String },
  brideName: { type: String },
  groomShort: { type: String },
  brideShort: { type: String },
  date: {
    dayNumber: { type: String },
    month: { type: String },
    year: { type: String },
    time: { type: String }
  },
  location: {
    name: { type: String },
    address: { type: String },
    mapUrl: { type: String }
  },
  events: [EventSchema],
  invitationMsg: { type: String },
  parents: {
    groomFather: { type: String },
    groomMother: { type: String },
    brideFather: { type: String },
    brideMother: { type: String }
  },
  bankInfo: [BankInfoSchema],
  images: {
    heroImage: { type: String },
    groomImage: { type: String },
    brideImage: { type: String },
    gallery: [{ type: String }]
  }
}, { timestamps: true, strict: false });

export default mongoose.models.Wedding || mongoose.model('Wedding', WeddingSchema);
