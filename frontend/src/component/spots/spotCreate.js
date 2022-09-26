
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
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
    if (!spot.previewImage.includes('.jpg') && !spot.previewImage.includes('.jpeg') && !spot.previewImage.includes('.png'))
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
        history.push(`/`);
    }

  return (
    <section className="spotform__container">
      <div className="leftspotform">

        <h1 className="spotform__head"
        // style={{backgroundColor: "lightblue",}}
        >Where's your place located?</h1>
        </div>
      <div className="rightspotform">
          <form className="spotform__info" onSubmit={handleSubmit}>
        <ul className="spotformerror">
          {errors.map((error, idx) => <li  key={idx}>{error}</li>)}
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
            type="country"
            placeholder="Country"
            className="spotforminput"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)} />
          {/* <select
            className="spotforminput"
            required
          >
            <option value="Afghanistan">United States</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
          </select> */}
          <input
            type="number"
            step="any"
            placeholder="Lat"
            className="spotforminput"
            min="-90"
            max="90"
            required
            value={lat}
            onChange={(e) => setLat(e.target.value)} />
          <input
            type="number"
            step="any"
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
            placeholder="Price per night"
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
              <button type="submit" className="spotformbutton__btn">Create New Spot</button>
              <span></span>
              <button type="button"  className="spotformbutton__btn" onClick={handleCancelClick}>Cancel</button>
            </div>
          </form>
        </div>
    </section>
  );
}

export default SpotCreateFormPage;
