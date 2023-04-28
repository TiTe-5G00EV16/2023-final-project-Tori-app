
import React from "react";
import ListingItem from './ListingItem';
import './ListingsList.css';

const ListingsList = props => {

  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No listings found.</h2>
      </div>
    );
  }

  return(
    <ul className="listings-list">
      {props.items.map(listing =>
        <ListingItem
          key={listing.id}
          id={listing.id}
          name={listing.name}
          price={listing.price}
          description={listing.description}
          userId={listing.userId}
        />
      )}
    </ul>
)};

export default ListingsList;