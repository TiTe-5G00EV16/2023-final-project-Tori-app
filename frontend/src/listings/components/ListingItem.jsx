import React, { useContext, useState } from "react";
import { useMutation } from 'react-query';
import { useQuery } from 'react-query'

import './ListingItem.css';
import Card from '../../shared/components/card/Card';
import Modal from '../../shared/components/modal/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { deleteListing } from "../api/listings";
import { getOwner } from "../../users/api/users";

const ListingItem = props => {

  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const { isLoading, error, data } = useQuery("ownerData_" + props.userId, () =>
    getOwner(props.userId)
  );

  const deleteListingMutation = useMutation({
    mutationFn: deleteListing,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    console.log("Do we get here?");
    deleteListingMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <button onClick={cancelConfirmationHandler}>Cancel</button>
            <button className="delete" onClick={deleteConfirmedHandler}>Delete</button>
          </React.Fragment>
        }
      >
        <p>Are you sure you want to delete this?</p>
      </Modal>
      <li className="listing-item">
        <Card className="listing-item__content">
          <div className="listing-item__info">
            <div className="listing-item__left">
              <p className="name">{props.name} -</p>
              <h3 className="price">{props.price}€</h3>
              <p>{props.description}</p>
            </div>
            <div className="listing-item__right">
              <p>Created by: <b>{data?data[0].name:""}</b></p>
              <p>Email: <b>{data?data[0].email:""}</b></p>
            </div>
          </div>
          <div className="listing-item_actions">
            {auth.userId == props.userId &&
              <button> Edit</button>
            }
            {auth.userId == props.userId &&
              <button onClick={showConfirmationHandler} className="delete">Delete</button>
            }
          </div>
        </Card>
      </li>
    </>
  )
};

export default ListingItem;