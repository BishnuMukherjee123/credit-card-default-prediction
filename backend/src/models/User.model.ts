// src/models/user.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  clerkId: string; // Clerk's user ID (sub)
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  updatedAt: Date;
  raw?: any; // optional store of raw clerk object for debugging (optional)
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    raw: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
