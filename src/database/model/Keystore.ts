/* eslint-disable prettier/prettier */
import { Schema, model, Document } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Keystore';
export const COLLECTION_NAME = 'keystores';

export default interface IKeystore extends Document {
  client: User;
  primaryKey: string;
  secondaryKey: string;
}

const schema = new Schema<IKeystore>(
  {
    client: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    primaryKey: {
      type: Schema.Types.String,
      required: true,
    },
    secondaryKey: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.index({ client: 1, primaryKey: 1 });
schema.index({ client: 1, primaryKey: 1, secondaryKey: 1 });

export const KeystoreModel = model<IKeystore>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
