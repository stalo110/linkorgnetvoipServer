import mongoose, { Document, Schema } from "mongoose";

export interface IWishlistItem {
  product: mongoose.Types.ObjectId; 
  dateAdded: Date;
}

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId; 
  items: IWishlistItem[]; 
}

const wishlistSchema: Schema<IWishlist> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        dateAdded: {
          type: Date,
          default: Date.now, 
        },
        note: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);
export default Wishlist;
