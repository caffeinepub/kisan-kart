import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone } from 'lucide-react';
import { type Listing } from '../../backend';
import { useNavigate } from '@tanstack/react-router';

interface ListingCardProps {
  listing: Listing;
  showActions?: boolean;
  onEdit?: () => void;
  onDeactivate?: () => void;
}

export default function ListingCard({ listing, showActions, onEdit, onDeactivate }: ListingCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate({ to: '/listing/$listingId', params: { listingId: listing.id.toString() } });
  };

  return (
    <Card className="hover:shadow-soft transition-shadow cursor-pointer" onClick={handleViewDetails}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{listing.title}</CardTitle>
          {!listing.isActive && (
            <Badge variant="secondary" className="shrink-0">Inactive</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">{listing.category}</Badge>
          {listing.contactInfo && (
            <Badge variant="outline" className="gap-1">
              <Phone className="h-3 w-3" />
              Contact available
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {listing.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              ₹{listing.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">per {listing.unit}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="gap-2" onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={onDeactivate} className="flex-1">
            {listing.isActive ? 'Deactivate' : 'Reactivate'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
