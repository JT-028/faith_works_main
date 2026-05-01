import mongoose from 'mongoose';

export interface ITestimonial extends mongoose.Document {
  reviewerName: string;
  reviewText: string;
  rating?: number;
  date?: string;
  sourceUrl?: string;
  approved?: boolean;
}

const TestimonialSchema = new mongoose.Schema<ITestimonial>(
  {
    reviewerName: {
      type: String,
      required: [true, 'Please provide the reviewer name'],
    },
    reviewText: {
      type: String,
      required: [true, 'Please provide the review text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    date: {
      type: String,
    },
    sourceUrl: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);