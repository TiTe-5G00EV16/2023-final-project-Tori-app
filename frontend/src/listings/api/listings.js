export const getListings = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listings`
    );
    return await res.json();
  };

export const getListingsByUserId = async ({userId, token}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/listings/userlistings/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
  );
  return await res.json();
}

  export const createListing = async ({name, price, description, token}) => {
    console.log(name, price, description);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listings`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          name,
          price,
          description
        })
      }
    );
    return await res.json();
  }

  export const deleteListing = async ({id, token}) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listings/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    );

    return await res.json();
  };