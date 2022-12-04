
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spot"
import { useHistory } from 'react-router-dom'
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
  const [imageUrl1, setimageUrl1] = useState("");
  const [imageUrl2, setimageUrl2] = useState("");
  const [imageUrl3, setimageUrl3] = useState("");
  const [imageUrl4, setimageUrl4] = useState("");
  // const [errorMessages, setErrorMessages] = useState({});
  const [errors, setErrors] = useState([]);
  //   if (sessionUser) return <Redirect to="/api/spots" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let spot = { address, city, state, country, lat, lng, name, description, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4 }
    // console.log('checkimageurl', spot.previewImage)
    if (!spot.previewImage.includes('.jpg') && !spot.previewImage.includes('.jpeg') && !spot.previewImage.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!spot.imageUrl1.includes('.jpg') && !spot.imageUrl1.includes('.jpeg') && !spot.imageUrl1.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!spot.imageUrl2.includes('.jpg') && !spot.imageUrl2.includes('.jpeg') && !spot.imageUrl2.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!spot.imageUrl3.includes('.jpg') && !spot.imageUrl3.includes('.jpeg') && !spot.imageUrl3.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!spot.imageUrl4.includes('.jpg') && !spot.imageUrl4.includes('.jpeg') && !spot.imageUrl4.includes('.png'))
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
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
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
          {/* <input
            type="text"
            placeholder="State"
            className="spotforminput"
            required
            value={state}
            onChange={(e) => setState(e.target.value)} /> */}
          <select
            className="spotforminput"
            required
            value={state}
            onChange={(e) => setState(e.target.value)}>
            <option disabled value=''></option>
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District Of Columbia">District Of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
          <select
            // placeholder="Country"
            className="spotforminput"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}>
            <option disabled value=''>Country</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="United States">United States</option>
          </select>
          {/* <input
            type="country"
            placeholder="Country"
            className="spotforminput"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)} /> */}
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
            type="textarea"
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
            placeholder="Preview Image"
            className="spotforminput"
            required
            value={previewImage}
            onChange={(e) => setpreviewImage(e.target.value)} />
          <input
            type="url"
            placeholder="Image for display"
            className="spotforminput"
            required
            value={imageUrl1}
            onChange={(e) => setimageUrl1(e.target.value)} />
          <input
            type="url"
            placeholder="Image for display"
            className="spotforminput"
            required
            value={imageUrl2}
            onChange={(e) => setimageUrl2(e.target.value)} />
          <input
            type="url"
            placeholder="Image for display"
            className="spotforminput"
            required
            value={imageUrl3}
            onChange={(e) => setimageUrl3(e.target.value)} />
          <input
            type="url"
            placeholder="Image for display"
            className="spotforminput"
            required
            value={imageUrl4}
            onChange={(e) => setimageUrl4(e.target.value)} />
          <div className="spotformbutton">
            <button type="submit" className="spotformbutton__btn">Create New Spot</button>
            <span></span>
            <button type="button" className="spotformbutton__btn" onClick={handleCancelClick}>Cancel</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SpotCreateFormPage;
