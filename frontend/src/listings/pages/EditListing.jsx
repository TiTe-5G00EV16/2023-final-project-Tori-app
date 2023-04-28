import React, {useRef, useContext, useEffect, useState} from "react";
import { useMutation } from "react-query";
import { AuthContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";

import Input from "../../shared/components/input/Input";
import { updateListing } from "../api/listings";

const EditListing = props => {
    const {id} = useParams();
    console.log(id);

    const nameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [listingData, setListingData] = useState({});

    const getListingData = async (id) => {
        const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/listings/${id}`
        );
        let lData = await res.json();
        setListingData(lData);
        //console.log(lData)
    }

    useEffect(() => {
        getListingData(id);
    }, []);

    const updateListingMutation = useMutation({
        mutationFn: updateListing
      });

      const listingSubmitHandler = async event => {
        event.preventDefault();
        updateListingMutation.mutate({
          id: id,
          name: nameRef.current.value,
          price: priceRef.current.value,
          description: descriptionRef.current.value,
          token: auth.token
        })
        history.push('/');
      };

    return(
    <form onSubmit={listingSubmitHandler} className="listing-form">
      <Input id="name" type="text" label="Header" ref={nameRef} value={listingData.name}/>
      <Input id="price" type="number" label="Price" ref={priceRef} min="0" step="0.01" value={listingData?listingData.price : 0}/>
      <Input id="description" type="text" label="Description" ref={descriptionRef} value={listingData?listingData.description : ""}/>
      <button type="submit">
        Edit listing
      </button>
      <button onClick={() =>{ history.push('/') }}>
        Cancel
      </button>
    </form>
    )
}

export default EditListing;