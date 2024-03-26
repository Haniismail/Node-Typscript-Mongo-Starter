import mongoose from 'mongoose';
import { NextFunction } from 'express';

export function preFindHook(
  schema: mongoose.Schema,
  fieldsToPopulate?: string[]
) {
  schema.pre(/^find/, function (next: NextFunction) {
    this.find({ deletedAt: null });
    if (fieldsToPopulate && fieldsToPopulate.length > 0) {
      this.populate(fieldsToPopulate.join(' '));
    }
    next();
  });
}
