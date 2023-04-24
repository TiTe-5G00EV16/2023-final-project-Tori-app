import React, {useRef, useContext} from "react";
import { useMutation } from "react-query";
import { AuthContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

import './AddListing.css'

import Input from "../../shared/components/input/Input";
import { createListing } from "../api/listings";


const AddListing = () => {

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const createListingMutation = useMutation({
    mutationFn: createListing
  });

  const listingSubmitHandler = async event => {
    event.preventDefault();
    createListingMutation.mutate({
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      token: auth.token
    })
    history.push('/');
  };

  return (
    <form onSubmit={listingSubmitHandler} className="listing-form">
      <Input id="name" type="text" label="Header" ref={nameRef}/>
      <Input id="price" type="number" label="Price" ref={priceRef} min="0"/>
      <Input id="description" type="text" label="Description" ref={descriptionRef} />
      <button type="submit">
        Add listing
      </button>
    </form>
  )
};

export default AddListing;