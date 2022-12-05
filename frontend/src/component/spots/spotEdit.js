
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import * as sessionActions from "../../store/session";

import { useHistory } from 'react-router-dom'
import { updateSpot } from "../../store/spot";
import './spotForm.css';


function SpotEditFormPage() {
  const history = useHistory();
  let spot = useSelector(state => Object.values(state.spot))
  // console.log('editspot', spot)

  const { spotId } = useParams()
  let editSpot = spot.find(ele => ele.id == spotId)
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
  const [imageUrl1, setimageUrl1] = useState(editSpot.imageUrl1);
  const [imageUrl2, setimageUrl2] = useState(editSpot.imageUrl2);
  const [imageUrl3, setimageUrl3] = useState(editSpot.imageUrl3);
  const [imageUrl4, setimageUrl4] = useState(editSpot.imageUrl4);
  // const [errorMessages, setErrorMessages] = useState({});
  const [errors, setErrors] = useState([]);

  const [nameChar, setNameChar] = useState(0);
  useEffect(() => {
    setNameChar(name.length);
  }, [name]);

  const [descriptionChar, setDescriptionChar] = useState(0);
  useEffect(() => {
    setDescriptionChar(description.length);
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    // let spot = { address, city, state, country, lat, lng, name, description, price }
    let payload = {
      id: spotId,
      address, city, state, country, lat, lng, name, description, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4
    };
    // console.log('checkimageurl', payload.previewImage)
    // console.log('checkimageurl', payload.previewImage.includes('jpg'))
    if (!payload.previewImage.includes('.jpg') && !payload.previewImage.includes('.jpeg') && !payload.previewImage.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!payload.imageUrl1.includes('.jpg') && !payload.imageUrl1.includes('.jpeg') && !payload.imageUrl1.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!payload.imageUrl2.includes('.jpg') && !payload.imageUrl2.includes('.jpeg') && !payload.imageUrl2.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!payload.imageUrl3.includes('.jpg') && !payload.imageUrl3.includes('.jpeg') && !payload.imageUrl3.includes('.png'))
      return setErrors(['Please enter a valid image url'])
    if (!payload.imageUrl4.includes('.jpg') && !payload.imageUrl4.includes('.jpeg') && !payload.imageUrl4.includes('.png'))
      return setErrors(['Please enter a valid image url'])

    let returnedSpot;
    // try{
    returnedSpot = await dispatch(updateSpot(payload))
    // } catch (error) {
    //   setErrorMessages({ overall: error.toString().slice(7) })
    // }
    // if (!returnedSpot.previewImage.includes('jpg') || !returnedSpot.previewImage.includes('jpeg') || !returnedSpot.previewImage.includes('png'))
    // return setErrors(['Only jpg, jpeg and png Image url valid'])

    if (returnedSpot) {
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
    {/* <div className="leftspotform">

      <h1 className="spotform__head"
      // style={{backgroundColor: "lightblue",}}
      >Where's your place located?</h1>
    </div> */}
    {/* <div className="middlespotform"> */}
    <form
      // className="spotform__info"
      className="spotform"
      onSubmit={handleSubmit}>
      <div className="spotform-left">
        <div className="spotform-name-container" >
          <div className="spotform-name-toptext">Now, let's give your house a title</div>
          <div className="spotform-name-middletext">Short titles work best. Have fun with it—you can always change it later.</div>
          <textarea
            type="text"
            // placeholder="Name"
            minLength='3'
            maxLength='49'

            className="spotform-textarea"
            required
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <div className="spotform-name-bottomtext">{nameChar}/49</div>
        </div>
        <div className="spotform-name-container">
          <div className="spotform-name-toptext">Create your description</div>
          <div className="spotform-name-middletext">Share what makes your place special.</div>
          <textarea
            type="text"
            placeholder="Description"
            minLength='20'
            maxLength='500'
            required
            className="spotform-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
          <div className="spotform-name-bottomtext">{descriptionChar}/500</div>
        </div>
        <div className="spotform-name-container">
          <div className="spotform-name-toptext">Now, set your price</div>
          <div className="spotform-name-middletext">You can change it anytime.</div>
          <input
            type="number"
            // placeholder="Price per night"
            className="spotforminput"
            min="1"
            max="10000"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)} />
          <div className="spotform-name-middletext">Places like yours in your area usually range from $75 to $258 per night</div>
        </div>
      </div>
      <div className="spotform-right">
        <div>
          <div className="spotform-name-toptext">Choose at least 5 photos</div>
          <div className="spotform-coverimage-container">
            <input
              type="url"
              placeholder="Cover Photo"
              value={previewImage}
              // type="file"
              // accept="image/*"
              // name="previewImage"
              className="spotformimageinput"
              required
              onChange={(e) => setpreviewImage(e.target.value)}
            />
            <input
              type="url"
              placeholder="Add more"
              className="spotformimageinput"
              required
              value={imageUrl1}
              onChange={(e) => setimageUrl1(e.target.value)}
            />
            <input
              type="url"
              placeholder="Add more"
              className="spotformimageinput"
              required
              value={imageUrl2}
              onChange={(e) => setimageUrl2(e.target.value)}
            />
            <input
              type="url"
              placeholder="Add more"
              className="spotformimageinput"
              required
              value={imageUrl3}
              onChange={(e) => setimageUrl3(e.target.value)}
            />
            <input
              type="url"
              placeholder="Add more"
              className="spotformimageinput"
              required
              value={imageUrl4}
              onChange={(e) => setimageUrl4(e.target.value)}
            />

          </div>
          <div className="spotform-image-container">


          </div>
          <div className="spotform-image-container">
            {previewImage ?
              <img src={previewImage}
                className='spotform-preview'
                alt="pic"
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}></img> : <div></div>}
            <div className="spotform-image12">

            {imageUrl1 ?
              <img src={imageUrl1}
                className='spotform-preview1'
                alt="pic"
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}></img> : <div></div>}
            {imageUrl2 ?
              <img src={imageUrl2}
                className='spotform-preview1'
                alt="pic"
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}></img> : <div></div>}
                </div>
                <div className="spotform-image12">

            {imageUrl3 ?
              <img src={imageUrl3}
                className='spotform-preview1'
                alt="pic"
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}></img> : <div></div>}
            {imageUrl4 ?
              <img src={imageUrl4}
                className='spotform-preview1'
                alt="pic"
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}></img> : <div></div>}
          </div>
                </div>
        </div>
      </div>
      <div className="spotform-button">
        <div className="spotform-name-toptext">Where's your place located?</div>
        <div className="spotform-name-middletext">Your address is only shared with guests after they’ve made a reservation.</div>
        <div className="addressform" >
          <div className="addressform-street" id="addressform-top">
            <label className="addressform-label">Street</label>
            <input
              type="text"

              className="addressforminput"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="addressform-street">

            <label className="addressform-label">City</label>
            <input
              type="text"

              className="addressforminput"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="addressform-state-container">
            <div className="addressform-state" id="addressform-inputleft">

              <label className="addressform-label">State</label>
              <select
                className="addressforminput"

                required

                value={state}
                onChange={(e) => setState(e.target.value)}>
                <option disabled value=''>State</option>
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
            </div>
            <div className="addressform-state">
              <label className="addressform-label">Country</label>
              <select
                // placeholder="Country"
                className="addressforminput"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}>
                <option disabled value=''></option>
                <option value="Canada">Canada</option>
                <option value="Mexico">Mexico</option>
                <option value="Puerto Rico">Puerto Rico</option>
                <option value="United States">United States</option>
              </select>
            </div>
          </div>
          <div className="addressform-lat-container">
            <div className="addressform-state" id="addressform-inputleft">

              <label className="addressform-label">Latitude</label>
              <input
                type="number"
                step="any"

                className="addressforminput"
                min="-90"
                max="90"
                required
                value={lat}
                onChange={(e) => setLat(e.target.value)} />
            </div>
            <div className="addressform-state">

              <label className="addressform-label">Longitude</label>
              <input
                type="number"
                step="any"

                className="addressforminput"
                min="-180"
                max="180"
                required
                value={lng}
                onChange={(e) => setLng(e.target.value)} />
            </div>
          </div>

        </div>
        <button type="submit"
        className="spotformbtn"
        >Update Spot</button>
        <span></span>
        <button type="button"
          className="spotformbtn"
          onClick={handleCancelClick}>Cancel</button>

        <ul className="spotformerror">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    </form>
    {/* </div> */}
    {/* <div className="rightspotform">

    </div> */}
  </section>
  );
}

export default SpotEditFormPage;


    // <section className="spotform__container">
    //   <div className="leftspotform">
    //     <h1 className="spotform__head">What do you want to update your spot?</h1>
    //   </div>
    //   <div className="rightspotform">
    //     <form className="spotform__info" onSubmit={handleSubmit}>
    //       <ul className="spotformerror">
    //         {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //       </ul>
    //       <input
    //         type="text"
    //         placeholder="Address"
    //         className="spotforminput"
    //         required
    //         value={address}
    //         onChange={(e) => setAddress(e.target.value)} />
    //       <input
    //         type="text"
    //         placeholder="City"
    //         className="spotforminput"
    //         required
    //         value={city}
    //         onChange={(e) => setCity(e.target.value)} />
    //       <input
    //         type="text"
    //         placeholder="State"
    //         className="spotforminput"
    //         required
    //         value={state}
    //         onChange={(e) => setState(e.target.value)} />
    //       <input
    //         type="text"
    //         placeholder="Country"
    //         className="spotforminput"
    //         required
    //         value={country}
    //         onChange={(e) => setCountry(e.target.value)} />
    //       <input
    //         type="number"
    //         placeholder="Lat"
    //         step="any"
    //         className="spotforminput"
    //         min="-90"
    //         max="90"
    //         required
    //         value={lat}
    //         onChange={(e) => setLat(e.target.value)} />
    //       <input
    //         type="number"
    //         step="any"
    //         placeholder="Lng"
    //         className="spotforminput"
    //         min="-180"
    //         max="180"
    //         required
    //         value={lng}
    //         onChange={(e) => setLng(e.target.value)} />
    //       <input
    //         type="text"
    //         placeholder="Name"
    //         className="spotforminput"
    //         required
    //         value={name}
    //         onChange={(e) => setName(e.target.value)} />
    //       <input
    //         type="text"
    //         placeholder="Description"
    //         className="spotforminput"
    //         required
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)} />
    //       <input
    //         type="number"
    //         placeholder="Price"
    //         className="spotforminput"
    //         min="1"
    //         required
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)} />
    //       <input
    //         type="url"
    //         placeholder="Only jpg, jpeg and png Image url valid"
    //         className="spotforminput"
    //         required
    //         value={previewImage}
    //         onChange={(e) => setpreviewImage(e.target.value)} />
    //       <div className="spotformbutton">
    //         <button type="submit" className="spotformbutton__btn">Update Spot</button>
    //         <span></span>
    //         <button type="button" className="spotformbutton__btn" onClick={handleCancelClick}>Cancel</button>
    //       </div>
    //     </form>
    //   </div>
    // </section>
