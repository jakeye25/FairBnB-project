
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spot"
import {useHistory} from 'react-router-dom'
import './spotForm.css';


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
  const [previewImage, setpreviewImage] = useState("");
  // const [errorMessages, setErrorMessages] = useState({});
  const [errors, setErrors] = useState([]);
//   if (sessionUser) return <Redirect to="/api/spots" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let spot = { address, city, state, country, lat, lng, name, description, price, previewImage }
    // console.log('checkimageurl', spot.previewImage)
    if (!spot.previewImage.includes('jpg') && !spot.previewImage.includes('jpeg') && !spot.previewImage.includes('png'))
    return setErrors(['Please enter a valid image url'])

    let createdSpot;
    // try{
        createdSpot = await dispatch(spotActions.createSpot(spot))
    // } catch (error) {
    //     setErrorMessages({ overall: error.toString().slice(7) })
    // }
    // console.log('checkimageurl', createdSpot.previewImage.includes('jpeg'))
    // if (!createdSpot.previewImage.includes('jpg') && !createdSpot.previewImage.includes('jpeg') && !createdSpot.previewImage.includes('png'))
    // return setErrors(['Please enter a valid image url'])

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
    <section className="spotform__container">
      <div className="leftspotform">
        <h1 className="spotform__head">Where's your place located?</h1>
        </div>
      {/* <ErrorMessage message={errorMessages.overall} /> */}
      <div className="rightspotform">
          <form className="spotform__info" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li className="spotformerror" key={idx}>{error}</li>)}
        </ul>
          <input
            type="text"
            placeholder="Address"
            className="spotforminput"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)} />
          {/* <ErrorMessage label={"Address"} message={errorMessages.address} /> */}
          <input
            type="text"
            placeholder="City"
            className="spotforminput"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)} />
          {/* <ErrorMessage label={"City"} message={errorMessages.city} /> */}
          <input
            type="text"
            placeholder="State"
            className="spotforminput"
            required
            value={state}
            onChange={(e) => setState(e.target.value)} />
          {/* <ErrorMessage label={"State"} message={errorMessages.state} /> */}
          <input
            type="text"
            placeholder="Country"
            className="spotforminput"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)} />
          {/* <ErrorMessage label={"Country"} message={errorMessages.country} /> */}
          <input
            type="number"
            placeholder="Lat"
            className="spotforminput"
            min="-90"
            max="90"
            required
            value={lat}
            onChange={(e) => setLat(e.target.value)} />
          {/* <ErrorMessage label={"Lat"} message={errorMessages.lat} /> */}
          <input
            type="number"
            placeholder="Lng"
            className="spotforminput"
            min="-180"
            max="180"
            required
            value={lng}
            onChange={(e) => setLng(e.target.value)} />
          {/* <ErrorMessage label={"Lng"} message={errorMessages.lng} /> */}
          <input
            type="text"
            placeholder="Name"
            className="spotforminput"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} />
          {/* <ErrorMessage label={"Name"} message={errorMessages.name} /> */}
          <input
            type="text"
            placeholder="Description"
            className="spotforminput"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          {/* <ErrorMessage label={"Description"} message={errorMessages.description} /> */}
          <input
            type="number"
            placeholder="Price"
            className="spotforminput"
            min="1"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
          {/* <ErrorMessage label={"Price"} message={errorMessages.price} /> */}
          <input
            type="url"
            placeholder="Only jpg, jpeg and png Image url valid"
            className="spotforminput"
            required
            value={previewImage}
            onChange={(e) => setpreviewImage(e.target.value)} />
          {/* <ErrorMessage label={"Image Url"} message={errorMessages.previewImage} /> */}
              <button type="submit" className="spotformbutton">Create New Spot</button>
              <button type="button" className="spotformbutton" onClick={handleCancelClick}>Cancel</button>
          </form>
        </div>
    </section>
  );
}

export default SpotCreateFormPage;
