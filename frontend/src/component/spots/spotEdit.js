
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
// import * as sessionActions from "../../store/session";

import {useHistory} from 'react-router-dom'
import { updateSpot } from "../../store/spot";
// import './SignupForm.css';
import ErrorMessage from './ErrorMessage';

function SpotEditFormPage() {
  const history = useHistory();
  let spot = useSelector(state => Object.values(state.spot))
  console.log('editspot', spot)

  const {spotId} = useParams()
  // console.log('spotedit', ...spot)
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setImage] = useState('');
  const [errorMessages, setErrorMessages] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();

    // let spot = { address, city, state, country, lat, lng, name, description, price }
    let payload = {
      id: spotId,
      address, city, state, country, lat, lng, name, description, price, previewImage
    };
    let returnedSpot;
    try{
     returnedSpot = await dispatch(updateSpot(payload))
    } catch (error) {
      setErrorMessages({ overall: error.toString().slice(7) })
    }
    if(returnedSpot) {
      setErrorMessages({});
      history.push(`/spots/${returnedSpot.id}`)
    }
  }
    const handleCancelClick = (e) => {
        e.preventDefault();
        setErrorMessages({});
        // hideForm()
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
