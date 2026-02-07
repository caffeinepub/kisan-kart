import { type Listing } from '../../backend';

export function filterAndSortListings(
  listings: Listing[],
  searchQuery: string,
  category: string,
  sortBy: string
): Listing[] {
  let filtered = [...listings];

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.description.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (category) {
    filtered = filtered.filter((listing) => listing.category === category);
  }

  // Sort
  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => Number(b.createdAt - a.createdAt));
      break;
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
  }

  return filtered;
}
