
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spot"
import {useHistory} from 'react-router-dom'
// import './SignupForm.css';
import ErrorMessage from './ErrorMessage';

function SpotEditFormPage({spotId, hideForm}) {
  let spot = useSelector(state => Object.values(state.spot))

  const dispatch = useDispatch();
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [previewImage, setImage] = useState(spot.previewImage);
  const [errorMessages, setErrorMessages] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    // let spot = { address, city, state, country, lat, lng, name, description, price }
    let payload = {
      ...spot,
      address, city, state, country, lat, lng, name, description, price, previewImage
    };

    let returnedItem = await dispatch(spotActions.updateSpot(payload))

    if(returnedItem) {
      hideForm()
    }
  }
    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm()
    }

  return (
    <section className="edit-form-holder centered middled">
      <ErrorMessage message={errorMessages.overall} />
        <form className="edit-spot-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)} />
        <ErrorMessage label={"Address"} message={errorMessages.address} />
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)} />
        <ErrorMessage label={"City"} message={errorMessages.city} />
        <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={(e) => setState(e.target.value)} />
        <ErrorMessage label={"State"} message={errorMessages.state} />
        <input
          type="text"
          placeholder="Country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)} />
        <ErrorMessage label={"Country"} message={errorMessages.country} />
        <input
          type="number"
          placeholder="Lat"
          min="-180"
          max="180"
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)} />
        <ErrorMessage label={"Lat"} message={errorMessages.lat} />
        <input
          type="number"
          placeholder="Lng"
          min="-180"
          max="180"
          required
          value={lng}
          onChange={(e) => setLng(e.target.value)} />
        <ErrorMessage label={"Lng"} message={errorMessages.lng} />
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)} />
        <ErrorMessage label={"Name"} message={errorMessages.name} />
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        <ErrorMessage label={"Description"} message={errorMessages.description} />
        <input
          type="number"
          placeholder="Price"
          min="1"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <ErrorMessage label={"Price"} message={errorMessages.price} />
        <input
          type="url"
          placeholder="Image Url"
          required
          value={previewImage}
          onChange={(e) => setImage(e.target.value)} />
        <ErrorMessage label={"Image Url"} message={errorMessages.previewImage} />
            <button type="submit">Update Spot</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
  );
}

export default SpotEditFormPage;
