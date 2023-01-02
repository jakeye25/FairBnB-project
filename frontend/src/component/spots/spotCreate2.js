
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spot"
import { NavLink, useHistory } from 'react-router-dom'
import './spotForm.css';


function SpotCreateFormPage2() {
  const history = useHistory();

  const dispatch = useDispatch();
  //   const sessionUser = useSelector((state) => state.session.user);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("United States");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("Give your house a title");
  const [description, setDescription] = useState("Take it easy at this unique and tranquil getaway.");
  const [price, setPrice] = useState(150);
  const [previewImage, setpreviewImage] = useState("");
  const [imageUrl1, setimageUrl1] = useState("");
  const [imageUrl2, setimageUrl2] = useState("");
  const [imageUrl3, setimageUrl3] = useState("");
  const [imageUrl4, setimageUrl4] = useState("");
  const [page, setPage] = useState(1)
  // const [errorMessages, setErrorMessages] = useState({});
  const [errors, setErrors] = useState([]);
  const [validation1, setValidation1] = useState([])
  const [validation2, setValidation2] = useState([])
  const [validation3, setValidation3] = useState([])
  const [validation4, setValidation4] = useState([])
  const [isdisable, setIsDisable] = useState(true)
  //   if (sessionUser) return <Redirect to="/api/spots" />;

  useEffect(() => {
    document.title = "Make your place stand out"
  }, [])

  useEffect(() => {
    setIsDisable(false)
  }, [address, city, state, name, lat, lng, description, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4])

  const [nameChar, setNameChar] = useState(0);
  useEffect(() => {
    setNameChar(name.length);
  }, [name]);

  useEffect(() => {
    if(!address || !city || !state || !lat || !lng)
    setIsDisable(true)
  }, [address, city, state, lat, lng])

  useEffect(() => {
    if(page===2 && (!name))
    setIsDisable(true)
  }, [])

  const [descriptionChar, setDescriptionChar] = useState(0);
  useEffect(() => {
    setDescriptionChar(description.length);
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
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


  const spotFormPage1 = () => {
    console.log('hit page 1=====================')
    let errors1 = []
    if (!address) { errors1.push("address is required") }
    if (!city) { errors1.push("city is required") }
    if (!lat) { errors1.push("latitude is required") }
    if (!lng) { errors1.push("longitude is required") }
    if (!state) { errors1.push("Please select a state") }
    if (!country) { errors1.push("Please select a country") }
    console.log('page 1===================== address', address)
    console.log('page1 errors', errors1)
    if (errors1?.length > 0) {
      setIsDisable(true)
      return setValidation1(errors1)
    }
    else {
      setIsDisable(false)
      setValidation1([])
      setPage(2)
    }
  }

  const spotFormPage2 = () => {
    console.log('hit page 2=====================')
    let errors2 = []
    if (!name) { errors2.push("title is required") }

    if (errors2.length > 0) {
      setIsDisable(true)
      return setValidation2(errors2)
    }
    else {
      setIsDisable(false)
      setValidation2([])
      setPage(3)
    }
  }
  const spotFormPage3 = () => {
    console.log('hit page 3++++++++++++++++++++++++++++++')
    let errors3 = [];
    if (!description) { errors3.push('description is required') }
    if (errors3.length > 0) {
      setIsDisable(true)
      return setValidation3(errors3)
    }
    else {
      setIsDisable(false)
      setValidation3([])
      setPage(4)
    }
  }

  const spotFormPage4 = () => {
    console.log('hit page 4++++++++++++++++++++++++++++++')
    let errors4 = [];
    if (!price) { errors4.push('price is required') }
    if (errors4.length > 0) {
      setIsDisable(true)
      return setValidation4(errors4)
    }
    else {
      setIsDisable(false)
      setValidation4([])
      setPage(5)
    }
  }
  console.log('you are on page', page)

  return (
    <>
      <section className="spotform__container">
        <div className="spotform-topbar">
          <NavLink exact to="/">
            {/* Home */}
            <img
              className="spotform_icon"
              src="https://user-images.githubusercontent.com/77218939/192109460-9d6b0966-9190-4b02-beb0-8deeafca0257.PNG"
              alt='logo'
            />
          </NavLink>
          <NavLink exact to="/" className="spotform-exit">
            Exit
          </NavLink>
        </div>
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
          {page === 1 ? <div className="spotform-page1">
            <div className="spotform-name-toptext">Where's your place located?</div>
            <div className="spotform-name-middletext">Your address is only shared with guests after they’ve made a reservation.</div>
            <div className="addressform" >
              <div className="addressform-street" id="addressform-top">
                <label className="addressform-label">Street</label>
                <input
                  type="text"
                  minLength='6'
                  maxLength='100'
                  className="addressforminput"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value.trimStart())} />
              </div>
              <div className="addressform-street">

                <label className="addressform-label">City</label>
                <input
                  type="text"
                  minLength='6'
                  maxLength='50'
                  className="addressforminput"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value.trimStart())} />
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
                    {/* <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Puerto Rico">Puerto Rico</option> */}
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
              {/* {validation1?.length > 0 ? <div>
            <div>testing page 1</div>
            <ul>
              {validation1?.map(error => <li key={error}>{error}</li>)}
            </ul>
          </div> : <div>teesting errors</div>} */}
            </div>
            {/* <div className="spotform-btmbar-page1">
            <button onClick={spotFormPage1} disabled={isdisable}>Next</button>
          </div> */}
          </div>
            : null}
          {page === 1 ?
            <div className="spotform-btmbar-page1">
              <button onClick={spotFormPage1}
                disabled={isdisable}
                className="spotform-page1-next">Next</button>
            </div>
            : null
          }
          {page === 2 ? <div className="spotform-name-container" >
            <div className="spotform-name-toptext">Now, let's give your house a title</div>
            <div className="spotform-name-middletext">Short titles work best. Have fun with it—you can always change it later.</div>
            <textarea
              type="text"
              // placeholder="Name"
              // minLength='3'
              maxLength='49'

              className="spotform-textarea"
              required
              value={name}
              onChange={(e) => setName(e.target.value.trimStart())} />
            <div className="spotform-name-bottomtext">{nameChar}/49</div>
            {/* {validation2?.length > 0 ? <div>
            <div>testing page 2</div>
            <ul>
              {validation2?.map(error => <li key={error}>{error}</li>)}
            </ul>
          </div> : <div>teesting errors2</div>} */}
            <div>
              <button onClick={() => setPage(1)} className="spotform-page1-back">Back</button>
            </div>
            <div className="spotform-btmbar-page1">
              <button onClick={spotFormPage2}
                disabled={isdisable}
                className="spotform-page1-next">Next</button>
            </div>
          </div> : null
          }


          {page === 3 ? <div className="spotform-name-container">
            <div className="spotform-name-toptext">Create your description</div>
            <div className="spotform-name-middletext">Share what makes your place special, </div>
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
            <div>
              <button onClick={() => setPage(2)} className="spotform-page1-back">Back</button>
            </div>
            <div>
              <button onClick={spotFormPage3} disabled={isdisable} className="spotform-page1-next">Next</button>
            </div>
          </div> : null}
          {page === 4 ? <div className="spotform-name-container">
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
            <div>
              <button onClick={() => setPage(3)} className="spotform-page1-back">Back</button>
            </div>
            <div>
              <button onClick={spotFormPage4} disabled={isdisable} className="spotform-page1-next">Next</button>
            </div>
          </div>

            : <></>
          }
          {page === 5 ? <div className="spotform-right">
            <div>
              <div className="spotform-name-toptext">Choose at least 5 photos</div>
              <div className="spotform-name-middletext">The image url you input must be JPEG, JPG or PNG files.</div>
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
            <div>
              <button type="submit"
                className="spotformbtn"
              >Create New Spot</button>
              <span></span>
              <div>
                <button onClick={() => setPage(4)} className="spotform-page1-back">Back</button>
              </div>
              <button type="button"
                className="spotformbtn"
                onClick={handleCancelClick}>Cancel</button>
            </div>
            <ul className="spotformerror">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>

            : <></>}
          {/* <div className="spotform-left">
          {page ===1 ? <div className="spotform-name-container" >
            <div className="spotform-name-toptext">Now, let's give your house a title</div>
            <div className="spotform-name-middletext">Short titles work best. Have fun with it—you can always change it later.</div>
            <textarea
              type="text"
              // placeholder="Name"
              minLength='3'
              maxLength='50'

              className="spotform-textarea"
              required
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <div className="spotform-name-bottomtext">{nameChar}/49</div>
            <div>
              <button onClick={spotFormPage1}>Next</button>
            </div>
          </div> : null}
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
            <div className="spotform-name-middletext">The image url you input must be JPEG, JPG or PNG files.</div>
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
                minLength='6'
                maxLength='100'
                className="addressforminput"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="addressform-street">

              <label className="addressform-label">City</label>
              <input
                type="text"
                minLength='6'
                maxLength='50'
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
          >Create New Spot</button>
          <span></span>
          <button type="button"
            className="spotformbtn"
            onClick={handleCancelClick}>Cancel</button>

          <ul className="spotformerror">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        </div> */}
        </form>

        {/* </div> */}
        {/* <div className="rightspotform">

      </div> */}
      </section>
      {page ===1 &&<div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-2-page1"></div>
        <div className="spotform-btmbar-3-page1"></div>
        <div className="spotform-btmbar-4-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page ===2 &&<div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-3-page1"></div>
        <div className="spotform-btmbar-4-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page ===3 &&<div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-4-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page ===4 &&<div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page ===5 &&<div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page ===6 &&<div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-2-page2"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
      </div>}
    </>
  );
}

export default SpotCreateFormPage2;
