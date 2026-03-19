import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
}

const CategorySchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure uniqueness per user
CategorySchema.index({ name: 1, user: 1 }, { unique: true });

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
