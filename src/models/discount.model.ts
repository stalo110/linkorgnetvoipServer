import mongoose, { Document, Schema } from "mongoose";

export interface IDiscount extends Document {
    _id: mongoose.Types.ObjectId;
    code: string; 
    discountType: string; 
    amount: number; 
    expirationDate: Date; 
    isActive: boolean; 
}

const discountSchema: Schema<IDiscount> = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        discountType: {
            type: String,
            required: true,
            enum: ['percentage', 'fixed'],
        },
        amount: {
            type: Number,
            required: true,
            validate: {
                validator: (amount: number) => amount > 0,
                message: "Amount must be a positive number.",
            },
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Discount = mongoose.model<IDiscount>("Discount", discountSchema);
export default Discount;
