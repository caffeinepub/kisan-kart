import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { type ListingInput, type Listing } from '../../backend';
import { validateListingInput } from '../../features/listings/listingValidation';
import ErrorAlert from '../feedback/ErrorAlert';

interface ListingFormProps {
  initialData?: Listing;
  onSubmit: (data: ListingInput) => Promise<void>;
  onCancel?: () => void;
  isSubmitting: boolean;
}

const CATEGORIES = [
  'Seeds',
  'Fertilizers',
  'Tools & Equipment',
  'Crops',
  'Livestock',
  'Dairy Products',
  'Organic Products',
  'Other'
];

export default function ListingForm({ initialData, onSubmit, onCancel, isSubmitting }: ListingFormProps) {
  const [formData, setFormData] = useState<ListingInput>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || '',
    unit: initialData?.unit || '',
    location: initialData?.location || '',
    images: initialData?.images || [],
    contactInfo: initialData?.contactInfo || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');

  const handleChange = (field: keyof ListingInput, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const validation = validateListingInput(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to save listing. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitError && <ErrorAlert message={submitError} />}

      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="e.g., Fresh Organic Tomatoes"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          disabled={isSubmitting}
          className={errors.title ? 'border-destructive' : ''}
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your product in detail..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          disabled={isSubmitting}
          rows={4}
          className={errors.description ? 'border-destructive' : ''}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹) *</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.price || ''}
            onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
            disabled={isSubmitting}
            className={errors.price ? 'border-destructive' : ''}
          />
          {errors.price && <p className="text-sm text-destructive">{errors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unit *</Label>
          <Input
            id="unit"
            placeholder="e.g., kg, quintal, piece"
            value={formData.unit}
            onChange={(e) => handleChange('unit', e.target.value)}
            disabled={isSubmitting}
            className={errors.unit ? 'border-destructive' : ''}
          />
          {errors.unit && <p className="text-sm text-destructive">{errors.unit}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            disabled={isSubmitting}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${errors.category ? 'border-destructive' : ''}`}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            placeholder="e.g., Village, District"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            disabled={isSubmitting}
            className={errors.location ? 'border-destructive' : ''}
          />
          {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contact Information (Optional)</Label>
        <Textarea
          id="contactInfo"
          placeholder="Phone number, WhatsApp, or other contact details..."
          value={formData.contactInfo}
          onChange={(e) => handleChange('contactInfo', e.target.value)}
          disabled={isSubmitting}
          rows={2}
        />
        <p className="text-xs text-muted-foreground">
          Provide your contact details so buyers can reach you
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Saving...' : initialData ? 'Update Listing' : 'Create Listing'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
