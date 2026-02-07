import { useState, useMemo } from 'react';
import { useGetActiveListings } from '../features/listings/listingsQueries';
import ListingCard from '../components/listings/ListingCard';
import BrowseControls from '../components/listings/BrowseControls';
import { filterAndSortListings } from '../features/listings/listingsFiltering';
import { Loader2 } from 'lucide-react';

export default function BrowseListingsPage() {
  const { data: listings, isLoading, error } = useGetActiveListings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = useMemo(() => {
    if (!listings) return [];
    const cats = new Set(listings.map((l) => l.category));
    return Array.from(cats).sort();
  }, [listings]);

  const filteredListings = useMemo(() => {
    if (!listings) return [];
    return filterAndSortListings(listings, searchQuery, selectedCategory, sortBy);
  }, [listings, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Listings</h1>
        <p className="text-muted-foreground">
          Discover fresh products from local farmers
        </p>
      </div>

      <div className="mb-6">
        <BrowseControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading listings...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-destructive">Failed to load listings. Please try again.</p>
        </div>
      )}

      {!isLoading && !error && filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {listings && listings.length > 0
              ? 'No listings match your search criteria.'
              : 'No listings available yet. Be the first to create one!'}
          </p>
        </div>
      )}

      {!isLoading && !error && filteredListings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id.toString()} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
