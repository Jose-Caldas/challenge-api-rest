import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  isbnNumber: number;
}

const BookSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbnNumber: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const BookModel = mongoose.model<IBook>("Book", BookSchema);

export default BookModel;
