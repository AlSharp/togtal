import React from 'react';

const Place = ({place}) =>
  <div className="tile" key={place._id} >
    <h4>{place.name}</h4>
    <h5>{place._id}</h5>
    <p>LONG: {place.loc[0]}</p>
    <p>LAT: {place.loc[1]}</p>
    {
      place.products.map((product) => {
        return(
          <p>
            {product.product_id.slice(product.product_id.length - 4)}: {product.price_histories[0].price} RUB - Date: {product.price_histories[0].date}
          </p>
        )
      })
    } 
  </div>
  
export default Place;