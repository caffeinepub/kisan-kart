import { useParams, useNavigate } from '@tanstack/react-router';
import { useGetListing } from '../features/listings/listingsQueries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, MapPin, Package, Phone, Calendar } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function ListingDetailPage() {
  const { listingId } = useParams({ from: '/listing/$listingId' });
  const navigate = useNavigate();
  const { data: listing, isLoading, error } = useGetListing(BigInt(listingId));

  if (isLoading) {
    return (
      <div className="container-custom py-12 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-destructive text-lg mb-4">Failed to load listing details.</p>
          <Button onClick={() => navigate({ to: '/browse' })}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  const createdDate = new Date(Number(listing.createdAt) / 1000000);

  return (
    <div className="container-custom py-8">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: '/browse' })}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Browse
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{listing.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{listing.category}</Badge>
                    {!listing.isActive && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    ₹{listing.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">per {listing.unit}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{listing.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Unit</p>
                    <p className="text-sm text-muted-foreground">{listing.unit}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Listed On</p>
                    <p className="text-sm text-muted-foreground">
                      {createdDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {listing.contactInfo ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {listing.contactInfo}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Contact information not provided
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
