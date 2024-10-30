import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    createdAt: Date;
}

const adminSchema: Schema<IAdmin> = new Schema(
    {
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
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const bcrypt = await import("bcrypt");
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
