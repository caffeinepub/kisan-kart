import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMyListings, useUpdateListing, useDeactivateListing } from '../features/listings/listingsQueries';
import ListingCard from '../components/listings/ListingCard';
import ListingForm from '../components/listings/ListingForm';
import AuthGate from '../components/auth/AuthGate';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { type Listing, type ListingInput } from '../backend';

export default function MyListingsPage() {
  const { identity } = useInternetIdentity();
  const { data: listings, isLoading, error } = useGetMyListings();
  const updateListing = useUpdateListing();
  const deactivateListing = useDeactivateListing();
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const handleEdit = (listing: Listing) => {
    setEditingListing(listing);
  };

  const handleUpdate = async (data: ListingInput) => {
    if (!editingListing) return;

    try {
      await updateListing.mutateAsync({ id: editingListing.id, input: data });
      toast.success('Listing updated successfully!');
      setEditingListing(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update listing');
    }
  };

  const handleDeactivate = async (listing: Listing) => {
    try {
      await deactivateListing.mutateAsync(listing.id);
      toast.success(listing.isActive ? 'Listing deactivated' : 'Listing reactivated');
    } catch (error: any) {
      toast.error('Failed to update listing status');
    }
  };

  return (
    <AuthGate>
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Listings</h1>
          <p className="text-muted-foreground">
            Manage your products and listings
          </p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your listings...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load your listings. Please try again.</p>
          </div>
        )}

        {!isLoading && !error && listings && listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              You haven't created any listings yet. Create your first listing to get started!
            </p>
          </div>
        )}

        {!isLoading && !error && listings && listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id.toString()}
                listing={listing}
                showActions
                onEdit={() => handleEdit(listing)}
                onDeactivate={() => handleDeactivate(listing)}
              />
            ))}
          </div>
        )}

        <Dialog open={!!editingListing} onOpenChange={() => setEditingListing(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Listing</DialogTitle>
            </DialogHeader>
            {editingListing && (
              <ListingForm
                initialData={editingListing}
                onSubmit={handleUpdate}
                onCancel={() => setEditingListing(null)}
                isSubmitting={updateListing.isPending}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AuthGate>
  );
}
