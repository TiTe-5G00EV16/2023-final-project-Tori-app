import { AuthContext } from '../../shared/context/auth-context';
import { useQuery } from 'react-query';
import { getListingsByUserId } from "../api/listings";
import LoadingSpinner from '../../shared/components/loadingspinner/LoadingSpinner';
import ListingsList from '../components/ListingsList';
import { useContext } from 'react';

const UserListings = () => {

    const auth = useContext(AuthContext);

    const { isLoading, error, data } = useQuery("userListingsData", () =>
        getListingsByUserId(auth)
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
}

export default UserListings;