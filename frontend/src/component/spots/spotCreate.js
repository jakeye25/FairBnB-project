
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spot"
import {useHistory} from 'react-router-dom'
// import './SignupForm.css';
// import ErrorMessage from './ErrorMessage';

function SpotCreateFormPage() {
    const history = useHistory();

  const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setImageUrl] = useState("");
  // const [errorMessages, setErrorMessages] = useState({});
  const [errors, setErrors] = useState([]);
//   if (sessionUser) return <Redirect to="/api/spots" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let spot = { address, city, state, country, lat, lng, name, description, price, previewImage }
    let createdSpot;
    // try{
        createdSpot = await dispatch(spotActions.createSpot(spot))
    // } catch (error) {
    //     setErrorMessages({ overall: error.toString().slice(7) })
    // }
    if (!previewImage.includes('jpg') || !previewImage.includes('jpeg') || !previewImage.includes('png'))
    return setErrors(['Please enter a valid image url'])

    if (createdSpot) {
        // setErrorMessages({});
        history.push(`/spots/${createdSpot.id}`);
      }
    }
    const handleCancelClick = (e) => {
        e.preventDefault();
        // setErrorMessages({});
        setErrors([]);
    }

  return (
    <section className="new-form-holder centered middled">

      {/* <ErrorMessage message={errorMessages.overall} /> */}
        <form className="create-spot-form" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
        <input
          type="text"
          placeholder="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)} />
        {/* <ErrorMessage label={"Address"} message={errorMessages.address} /> */}
        <input
          type="text"
          placeholder="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)} />
        {/* <ErrorMessage label={"City"} message={errorMessages.city} /> */}
        <input
          type="text"
          placeholder="State"
          required
          value={state}
          onChange={(e) => setState(e.target.value)} />
        {/* <ErrorMessage label={"State"} message={errorMessages.state} /> */}
        <input
          type="text"
          placeholder="Country"
          required
          value={country}
          onChange={(e) => setCountry(e.target.value)} />
        {/* <ErrorMessage label={"Country"} message={errorMessages.country} /> */}
        <input
          type="number"
          placeholder="Lat"
          min="-90"
          max="90"
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)} />
        {/* <ErrorMessage label={"Lat"} message={errorMessages.lat} /> */}
        <input
          type="number"
          placeholder="Lng"
          min="-180"
          max="180"
          required
          value={lng}
          onChange={(e) => setLng(e.target.value)} />
        {/* <ErrorMessage label={"Lng"} message={errorMessages.lng} /> */}
        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)} />
        {/* <ErrorMessage label={"Name"} message={errorMessages.name} /> */}
        <input
          type="text"
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        {/* <ErrorMessage label={"Description"} message={errorMessages.description} /> */}
        <input
          type="number"
          placeholder="Price"
          min="1"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        {/* <ErrorMessage label={"Price"} message={errorMessages.price} /> */}
        <input
          type="url"
          placeholder="Only jpg, jpeg and png Image url valid"
          required
          value={previewImage}
          onChange={(e) => setImageUrl(e.target.value)} />
        {/* <ErrorMessage label={"Image Url"} message={errorMessages.previewImage} /> */}
            <button type="submit">Create New Spot</button>
            <button type="button" onClick={handleCancelClick}>Cancel</button>
        </form>
    </section>
  );
}

export default SpotCreateFormPage;
