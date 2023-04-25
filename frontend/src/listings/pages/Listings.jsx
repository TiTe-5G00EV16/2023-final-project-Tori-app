import React, {useEffect, useState} from "react";
import ListingsList from '../components/ListingsList';
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner'
import { useQuery } from 'react-query'
import { getListings } from "../api/listings";

const Listings = () => {
  const [value, setValue] = useState();
  const { isLoading, error, data } = useQuery("listingsData", () =>
    getListings()
  );

  useEffect(() => {
    setTimeout(() => {
      setValue({});
    }, 2000);
  }, []);

  if (isLoading) return (
    <div>
      <LoadingSpinner />
    </div>
  );

  if (error) return "An error has occured: " + error.message;

  return (
    <ListingsList items={data}/>
  )
};

export default Listings;