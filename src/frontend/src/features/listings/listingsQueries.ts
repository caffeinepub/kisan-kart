import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { type Listing, type ListingInput, type ListingId } from '../../backend';

export function useGetActiveListings() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Listing[]>({
    queryKey: ['activeListings'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveListings();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetListing(id: ListingId) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Listing>({
    queryKey: ['listing', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getListing(id);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetMyListings() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<Listing[]>({
    queryKey: ['myListings', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor || !identity) return [];
      return actor.getListingsByOwner(identity.getPrincipal());
    },
    enabled: !!actor && !actorFetching && !!identity,
  });
}

export function useCreateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ListingInput) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createListing(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeListings'] });
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
    },
  });
}

export function useUpdateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, input }: { id: ListingId; input: ListingInput }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateListing(id, input);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['activeListings'] });
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
      queryClient.invalidateQueries({ queryKey: ['listing', variables.id.toString()] });
    },
  });
}

export function useDeactivateListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: ListingId) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deactivateListing(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeListings'] });
      queryClient.invalidateQueries({ queryKey: ['myListings'] });
    },
  });
}
