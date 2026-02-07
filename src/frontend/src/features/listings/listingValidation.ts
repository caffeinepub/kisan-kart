import { type ListingInput } from '../../backend';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateListingInput(input: ListingInput): ValidationResult {
  const errors: Record<string, string> = {};

  // Title validation
  if (!input.title.trim()) {
    errors.title = 'Title is required';
  } else if (input.title.length > 100) {
    errors.title = 'Title cannot be longer than 100 characters';
  }

  // Description validation
  if (!input.description.trim()) {
    errors.description = 'Description is required';
  } else if (input.description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }

  // Price validation
  if (input.price < 0) {
    errors.price = 'Price must be positive';
  } else if (input.price > 10000000) {
    errors.price = 'Price must not exceed 10,000,000';
  }

  // Category validation
  if (!input.category.trim()) {
    errors.category = 'Category is required';
  } else if (input.category.length > 50) {
    errors.category = 'Category cannot be longer than 50 characters';
  }

  // Unit validation
  if (!input.unit.trim()) {
    errors.unit = 'Unit is required';
  } else if (input.unit.length > 20) {
    errors.unit = 'Unit cannot be longer than 20 characters';
  }

  // Location validation
  if (!input.location.trim()) {
    errors.location = 'Location is required';
  } else if (input.location.length > 50) {
    errors.location = 'Location cannot be longer than 50 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
