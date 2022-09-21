
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
// import * as sessionActions from "../../store/session";

import {useHistory} from 'react-router-dom'
import { updateSpot } from "../../store/spot";
import './spotForm.css';


function SpotEditFormPage() {
  const history = useHistory();
  let spot = useSelector(state => Object.values(state.spot))
  // console.log('editspot', spot)

  const {spotId} = useParams()
  let editSpot= spot.find(ele => ele.id == spotId)
  // console.log('editspot', editSpot)
  const dispatch = useDispatch();

  const [address, setAddress] = useState(editSpot.address);
  const [city, setCity] = useState(editSpot.city);
  const [state, setState] = useState(editSpot.state);
  const [country, setCountry] = useState(editSpot.country);
  const [lat, setLat] = useState(editSpot.lat);
  const [lng, setLng] = useState(editSpot.lng);
  const [name, setName] = useState(editSpot.name);
  const [description, setDescription] = useState(editSpot.description);
  const [price, setPrice] = useState(editSpot.price);
  const [previewImage, setpreviewImage] = useState(editSpot.previewImage);
  // const [errorMessages, setErrorMessages] = useState({});
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // let spot = { address, city, state, country, lat, lng, name, description, price }
    let payload = {
      id: spotId,
      address, city, state, country, lat, lng, name, description, price, previewImage
    };
    // console.log('checkimageurl', payload.previewImage)
    // console.log('checkimageurl', payload.previewImage.includes('jpg'))
    if (!payload.previewImage.includes('jpg') && !payload.previewImage.includes('jpeg') && !payload.previewImage.includes('png'))
    return setErrors(['Only jpg, jpeg and png Image url valid'])

    let returnedSpot;
    // try{
     returnedSpot = await dispatch(updateSpot(payload))
    // } catch (error) {
    //   setErrorMessages({ overall: error.toString().slice(7) })
    // }
    // if (!returnedSpot.previewImage.includes('jpg') || !returnedSpot.previewImage.includes('jpeg') || !returnedSpot.previewImage.includes('png'))
    // return setErrors(['Only jpg, jpeg and png Image url valid'])

    if(returnedSpot) {
      // setErrorMessages({});
      history.push(`/spots/${returnedSpot.id}`)
    }
  }
    const handleCancelClick = (e) => {
        e.preventDefault();
        // setErrorMessages({});
        setErrors([]);
        history.push(`/spots/${spotId}`);
    }

  return (
    <section className="spotform__container">
      <div className="leftspotform">
        <h1 className="spotform__head">What do you want to update your spot?</h1>
        </div>
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
          <input
            type="text"
            placeholder="City"
            className="spotforminput"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)} />
          <input
            type="text"
            placeholder="State"
            className="spotforminput"
            required
            value={state}
            onChange={(e) => setState(e.target.value)} />
          <input
            type="text"
            placeholder="Country"
            className="spotforminput"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)} />
          <input
            type="number"
            placeholder="Lat"
            className="spotforminput"
            min="-90"
            max="90"
            required
            value={lat}
            onChange={(e) => setLat(e.target.value)} />
          <input
            type="number"
            placeholder="Lng"
            className="spotforminput"
            min="-180"
            max="180"
            required
            value={lng}
            onChange={(e) => setLng(e.target.value)} />
          <input
            type="text"
            placeholder="Name"
            className="spotforminput"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <input
            type="text"
            placeholder="Description"
            className="spotforminput"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <input
            type="number"
            placeholder="Price"
            className="spotforminput"
            min="1"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
          <input
            type="url"
            placeholder="Only jpg, jpeg and png Image url valid"
            className="spotforminput"
            required
            value={previewImage}
            onChange={(e) => setpreviewImage(e.target.value)} />
            <div className="spotformbutton">
              <button type="submit" className="spotformbutton__btn">Update Spot</button>
              <span></span>
              <button type="button"  className="spotformbutton__btn" onClick={handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
    </section>
  );
}

export default SpotEditFormPage;
