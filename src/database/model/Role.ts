import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export const enum RoleCode {
  ADMIN = "ADMIN",
  USER = "USER",
  SUPERADMIN = "SUPERADMIN",
}

export default interface IRole extends Document {
  code: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<IRole>(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [RoleCode.ADMIN, RoleCode.USER, RoleCode.SUPERADMIN],
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RoleModel = model<IRole>(DOCUMENT_NAME, schema, COLLECTION_NAME);
