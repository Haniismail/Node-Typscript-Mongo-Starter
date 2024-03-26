import { model, Schema, Document } from 'mongoose';
import Role from './Role';
import User from './User';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import bcrypt from 'bcryptjs';
import { preFindHook } from '../../helpers/databaseHooks';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'users';

export default interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  userName?: string;
  name?: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: User;
  profilePicUrl?: string;
  roles: Role[];
  verified?: boolean;
  documentVerified?: boolean;
  token?: string | null;
  resetCode?: string | null;
  deletedAt?: Date;
}

const schema = new Schema<IUser>(
  {
    firstName: {
      type: Schema.Types.String,
      trim: true,
    },
    lastName: {
      type: Schema.Types.String,
      trim: true,
    },
    userName: {
      type: Schema.Types.String,
      trim: true,
    },
    name: {
      type: Schema.Types.String,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: Schema.Types.String,
      trim: true,
      nullable: true,
    },
    password: {
      type: Schema.Types.String,
      trim: true,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Role',
        },
      ],
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    documentVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    token: {
      type: Schema.Types.String,
      nullable: true,
    },
    resetCode: {
      type: Schema.Types.String,
      nullable: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
preFindHook(schema);
schema.plugin(mongoosePagination);
schema.pre('save', async function (this: IUser, next) {
  if (this.isModified('email')) this.email = this.email?.toLocaleLowerCase();
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

schema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model<IUser, Pagination<IUser>>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
