import { useNavigate } from '@tanstack/react-router';
import { useCreateListing } from '../features/listings/listingsQueries';
import ListingForm from '../components/listings/ListingForm';
import AuthGate from '../components/auth/AuthGate';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { type ListingInput } from '../backend';

export default function CreateListingPage() {
  const navigate = useNavigate();
  const createListing = useCreateListing();

  const handleSubmit = async (data: ListingInput) => {
    try {
      await createListing.mutateAsync(data);
      toast.success('Listing created successfully!');
      navigate({ to: '/my-listings' });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create listing');
    }
  };

  return (
    <AuthGate>
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create New Listing</CardTitle>
              <CardDescription>
                Fill in the details below to list your product on the marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ListingForm
                onSubmit={handleSubmit}
                onCancel={() => navigate({ to: '/browse' })}
                isSubmitting={createListing.isPending}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGate>
  );
}
