import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    msg: string;
}

const contactSchema: Schema<IContact> = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,  
            validate: {
                validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
                message: "Invalid email format",
            },
        },

        subject: {
            type: String,
            required: true,
        },

        msg: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model<IContact>("Contact", contactSchema);
export default Contact;
