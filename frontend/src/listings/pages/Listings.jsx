import React from "react";
import ListingsList from '../components/ListingsList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { useQuery } from 'react-query'
import { getListings } from "../api/listings";

const Listings = () => {
  const { isLoading, error, data } = useQuery("listingsData", () =>
    getListings()
  );

  if (isLoading) return (
    <div>
      <LoadingSpinner />
    </div>
  );

  if (error) return "An error has occured: " + error.message;

  return (
    <ListingsList items={data} />
  )
};

export default Listings;