import mongoose, { Document, Schema } from "mongoose";



export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  lastLogin: Date;
  resetToken?: string | null;
  resetExpires?: Date | null;

}

const userSchema: Schema<IUser> = new Schema({
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
    unique: true,
    required: true,
    index: true,
    lowercase: true,  
    validate: {
      validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: "Invalid email format",
    },
  },
  
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (phone: string) => /^\+?[1-9]\d{1,14}$/.test(phone), 
      message: "Invalid phone number format",
    },
  },  

  password: {
    type: String,
    required: true,
    validate: {
      validator: (password: string) =>
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\s]).{8,}$/.test(password),
      message: "Password must be at least 8 characters long and contain at least one capital letter, one small letter, one digit, and one special character.",
    },
  },

  address: {
    type: String,
    required: true,
  },

  resetToken: {
    type: String,
    default: null,
  },

  resetExpires: {
    type: Date,
    default: null,
  },
  
  lastLogin: {
    type: Date,
    default: null,
  },

}, {
  timestamps: true 

});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const bcrypt = await import("bcrypt"); 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.virtual("fullName").get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`;
});



const User = mongoose.model<IUser>("User", userSchema);
export default User;