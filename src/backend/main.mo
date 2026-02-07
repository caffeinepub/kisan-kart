import List "mo:core/List";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Char "mo:core/Char";
import Iter "mo:core/Iter";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Data Model
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Listing Data Model
  type ListingId = Nat;

  type ListingInput = {
    title : Text;
    description : Text;
    price : Float;
    category : Text;
    unit : Text;
    location : Text;
    images : [Text];
    contactInfo : Text;
  };

  type Listing = {
    id : ListingId;
    title : Text;
    description : Text;
    owner : Principal;
    price : Float;
    category : Text;
    unit : Text;
    location : Text;
    images : [Text];
    createdAt : Int;
    contactInfo : Text;
    isActive : Bool;
  };

  module Listing {
    public func compareByTitle(listing1 : Listing, listing2 : Listing) : Order.Order {
      Text.compare(listing1.title, listing2.title);
    };
  };

  var nextListingId : ListingId = 1;
  let listings = Map.empty<ListingId, Listing>();

  func validateListingInput(input : ListingInput) {
    let titleLength = input.title.chars().size();
    switch (titleLength) {
      case (0) { Runtime.trap("Title is required") };
      case (size) if (size > 100) { Runtime.trap("Title cannot be longer than 100 characters") };
      case (_) {};
    };

    let descriptionLength = input.description.chars().size();
    if (descriptionLength < 10) { Runtime.trap("Description must be at least 10 characters") };

    if (input.price < 0) { Runtime.trap("Price must be positive") };
    if (input.price > 10_000_000) { Runtime.trap("Price must not exceed 10,000,000 units") };

    let categoryLength = input.category.chars().size();
    if (categoryLength > 50) { Runtime.trap("Category cannot be longer than 50 characters") };

    let unitLength = input.unit.chars().size();
    if (unitLength > 20) { Runtime.trap("Unit cannot be longer than 20 characters") };

    let maxLocationLength = 50;
    let hasLongLocation = input.location.chars().foldLeft(false, func(acc, _) { acc or input.location.chars().size() > maxLocationLength });
    if (hasLongLocation) {
      Runtime.trap("Location cannot be longer than 50 characters. Your location string contains " # input.location.chars().size().toText() # " characters. ");
    };
  };

  public shared ({ caller }) func createListing(input : ListingInput) : async Listing {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can create listings");
    };

    validateListingInput(input);

    let id = nextListingId;
    nextListingId += 1;

    let listing : Listing = {
      id;
      title = input.title;
      description = input.description;
      price = input.price;
      category = input.category;
      unit = input.unit;
      location = input.location;
      images = input.images;
      contactInfo = input.contactInfo;
      owner = caller;
      createdAt = Time.now();
      isActive = true;
    };

    listings.add(id, listing);
    listing;
  };

  public query func getListing(id : ListingId) : async Listing {
    switch (listings.get(id)) {
      case (null) { Runtime.trap("Listing with id " # id.toText() # " does not exist") };
      case (?listing) { listing };
    };
  };

  public query func getAllListings() : async [Listing] {
    listings.values().toArray().sort(Listing.compareByTitle);
  };

  public query func getActiveListings() : async [Listing] {
    let activeIter = listings.values().filter(
      func(listing) { listing.isActive }
    );
    activeIter.toArray().sort(Listing.compareByTitle);
  };

  public query func getListingsByOwner(owner : Principal) : async [Listing] {
    let ownerIter = listings.values().filter(
      func(listing) { listing.owner == owner }
    );
    ownerIter.toArray().sort(Listing.compareByTitle);
  };

  public shared ({ caller }) func updateListing(id : ListingId, input : ListingInput) : async Listing {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can update listings");
    };

    let existingListing = switch (listings.get(id)) {
      case (null) { Runtime.trap("Listing with id " # id.toText() # " does not exist") };
      case (?listing) { listing };
    };

    if (existingListing.owner != caller) {
      Runtime.trap("Unauthorized: You can only update your own listings");
    };

    validateListingInput(input);

    let updatedListing : Listing = {
      id;
      title = input.title;
      description = input.description;
      price = input.price;
      category = input.category;
      unit = input.unit;
      location = input.location;
      images = input.images;
      contactInfo = input.contactInfo;
      owner = caller;
      createdAt = existingListing.createdAt;
      isActive = true;
    };

    listings.add(id, updatedListing);
    updatedListing;
  };

  public shared ({ caller }) func deactivateListing(id : ListingId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can deactivate listings");
    };

    let existingListing = switch (listings.get(id)) {
      case (null) { Runtime.trap("Listing with id " # id.toText() # " does not exist") };
      case (?listing) { listing };
    };

    if (existingListing.owner == caller) {
      let updatedListing = {
        existingListing with isActive = false
      };
      listings.add(id, updatedListing);
    } else if (AccessControl.isAdmin(accessControlState, caller)) {
      let updatedListing = {
        existingListing with isActive = false
      };
      listings.add(id, updatedListing);
    } else {
      Runtime.trap("Unauthorized: Only the listing owner or an admin can deactivate a listing");
    };
  };

  public shared ({ caller }) func deleteListing(id : ListingId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only registered users can delete listings");
    };

    let existingListing = switch (listings.get(id)) {
      case (null) { Runtime.trap("Listing with id " # id.toText() # " does not exist") };
      case (?listing) { listing };
    };

    if (existingListing.owner == caller) {
      listings.remove(id);
    } else if (AccessControl.isAdmin(accessControlState, caller)) {
      listings.remove(id);
    } else {
      Runtime.trap("Unauthorized: Only the listing owner or an admin can delete a listing");
    };
  };

  system func preupgrade() { () };
  system func postupgrade() { () };
};
