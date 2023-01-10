
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";
import * as spotActions from "../../store/spot"
import { NavLink, useHistory } from 'react-router-dom'
import './spotForm.css';
import MapContainercs from "../Maps/index_createspot";


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
  const [validation5, setValidation5] = useState([])
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
    if (!address || !city || !state || !lat || !lng)
      setIsDisable(true)
  }, [address, city, state, lat, lng])

  useEffect(() => {
    if (page === 2 && (!name))
      setIsDisable(true)
  }, [name, page])

  const [descriptionChar, setDescriptionChar] = useState(0);
  useEffect(() => {
    setDescriptionChar(description.length);
  }, [description]);

  useEffect(() => {
    if (city == 'Los Angeles') { setLat(34.0522); setLng(-118.2437); setState('California') }
    if (city == 'San Francisco') { setLat(37.7749); setLng(-122.4194); setState('California')}
    if (city == 'New York') { setLat(40.7128); setLng(-74.0060); setState('New York') }
    if (city == 'Dallas') { setLat(32.7767); setLng(-96.7970); setState('Texas') }
    if (city == 'San Diego') { setLat(32.7157); setLng(-117.1611); setState('California')}
    if (city == 'Oakland') { setLat(37.8044); setLng(-122.2712); setState('California') }
  }, [city])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([]);
    let spot = { address, city, state, country, lat, lng, name, description, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4 }
    // console.log('checkimageurl', spot.previewImage)
    // if (!spot.previewImage.includes('.jpg') && !spot.previewImage.includes('.jpeg') && !spot.previewImage.includes('.png'))
    //   return setErrors(['Please enter a valid image url'])
    // if (!spot.imageUrl1.includes('.jpg') && !spot.imageUrl1.includes('.jpeg') && !spot.imageUrl1.includes('.png'))
    //   return setErrors(['Please enter a valid image url'])
    // if (!spot.imageUrl2.includes('.jpg') && !spot.imageUrl2.includes('.jpeg') && !spot.imageUrl2.includes('.png'))
    //   return setErrors(['Please enter a valid image url'])
    // if (!spot.imageUrl3.includes('.jpg') && !spot.imageUrl3.includes('.jpeg') && !spot.imageUrl3.includes('.png'))
    //   return setErrors(['Please enter a valid image url'])
    // if (!spot.imageUrl4.includes('.jpg') && !spot.imageUrl4.includes('.jpeg') && !spot.imageUrl4.includes('.png'))
    //   return setErrors(['Please enter a valid image url'])

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

  const Increment = () => {
    setPrice(price + 5)
  }

  const Decrement = () => {
    let val = 1
    if (price <= val) { val = 1 }
    else (val = price)

    setPrice(val - 5)
  }

  const spotFormPage1 = () => {

    let errors1 = []
    if (!address) { errors1.push("address is required") }
    if (!city) { errors1.push("city is required") }
    if (!lat) { errors1.push("latitude is required") }
    if (!lng) { errors1.push("longitude is required") }
    if (!state) { errors1.push("Please select a state") }
    if (!country) { errors1.push("Please select a country") }
    // console.log('page 1===================== address', address)
    // console.log('page1 errors', errors1)
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

  const spotFormPage5 = () => {
    let errors5 = [];
    if (!previewImage.includes('.jpg') && !previewImage.includes('.jpeg') && !previewImage.includes('.png'))
      errors5.push('Please enter a valid image url')
    if (!imageUrl1.includes('.jpg') && !imageUrl1.includes('.jpeg') && !imageUrl1.includes('.png'))
      errors5.push('Please enter a valid image url')
    if (!imageUrl2.includes('.jpg') && !imageUrl2.includes('.jpeg') && !imageUrl2.includes('.png'))
      errors5.push('Please enter a valid image url')
    if (!imageUrl3.includes('.jpg') && !imageUrl3.includes('.jpeg') && !imageUrl3.includes('.png'))
      errors5.push('Please enter a valid image url')
    if (!imageUrl4.includes('.jpg') && !imageUrl4.includes('.jpeg') && !imageUrl4.includes('.png'))
      errors5.push('Please enter a valid image url')
    if (errors5.length > 0) {
      setIsDisable(true)
      return setValidation5(errors5)
    }
    else {
      setIsDisable(false)
      setValidation5([])
      setPage(6)
    }
  }


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
                {/* <input
                  type="text"
                  minLength='6'
                  maxLength='50'
                  className="addressforminput"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value.trimStart())} /> */}
                <select
                  className="addressforminput"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}>
                    <option disabled value=''>City</option>
                    <option value="Dallas">Dallas</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="New York">New York</option>
                    <option value="Oakland">Oakland</option>
                    <option value="San Diego">San Diego</option>
                    <option value="San Francisco">San Francisco</option>
                </select>
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
                    <option disabled value=''>Country</option>
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
                    readOnly
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
                    readOnly
                    className="addressforminput"
                    min="-180"
                    max="180"
                    required
                    value={lng}
                    onChange={(e) => setLng(e.target.value)} />
                </div>
              </div>
              {/* <div>
                <MapContainercs lat={lat? lat : 34.0522} lng={lng ? lng : -118.2437}/>
              </div> */}
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
            <div className="spotform-price-container">
              <div className="spotform-price-container-1">
                <button onClick={() => Decrement()} type='button' className="price-minus"><i class="fa-solid fa-minus"></i></button>
                <input
                  type="number"
                  // placeholder="Price per night"
                  className="spotforminput-price"
                  min="1"
                  max="10000"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)} />
                <button onClick={() => Increment()} type='button' className="price-minus"><i class="fa-solid fa-plus"></i></button>
              </div>
              <div className="sf-price-btm-text1">per night</div>
              <div className="sf-price-btm-text2">Places like yours in your area usually range from $75 to $258 per night</div>
            </div>
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

              <div>
                <button onClick={spotFormPage5} disabled={isdisable} className="spotform-page1-next">Next</button>
              </div>
              <div>
                <button onClick={() => setPage(4)} className="spotform-page1-back">Back</button>
              </div>

            </div>
            <ul className="spotformerror">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>

            : <></>}
          {page === 6 ? <div className="spotform-name-container">
            <div className="spotform-name-toptext">Review your listing</div>
            <div className="spotform-name-middletext">Here's what we'll show to guests. Make sure everything looks good.</div>
            <div className="spotform-preview-container">
              <div className='image__container'>
                <img
                  className="card__image"
                  alt=''
                  src={previewImage}
                  onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                />
              </div>
              <div className='card__des'>
                <div id='card__des_1container'>
                  <div className='card__city'>{city}, {state}</div>
                  <div className='card__rating'>
                    <i className="fa-solid fa-star "></i>
                    <span id='card__ratingnum'>
                      New
                    </span>
                  </div>
                </div>
                <div id='card__des_2container'>
                  <span>{country}</span>
                </div>
                <div id='card__des_3container'>
                  <div className="card__price">${price} </div>

                  <span> night</span>
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="spotform-page1-next">Create New Listing</button>
              {/* </div><button
                className="spotformbtn"
              >Create New Spot</button> */}
            </div>
            <div>
              <button onClick={() => setPage(5)} className="spotform-page1-back">Back</button>
            </div>
          </div>
            : <></>}

        </form>

        {/* </div> */}
        {/* <div className="rightspotform">

      </div> */}
      </section>
      {page === 1 && <div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-2-page1"></div>
        <div className="spotform-btmbar-3-page1"></div>
        <div className="spotform-btmbar-4-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page === 2 && <div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-3-page1"></div>
        <div className="spotform-btmbar-4-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page === 3 && <div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-4-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page === 4 && <div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-5-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page === 5 && <div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-6-page1"></div>
      </div>}
      {page === 6 && <div className="spotform-btmbar">
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
        <div className="spotform-btmbar-1-page1"></div>
      </div>}
    </>
  );
}

export default SpotCreateFormPage2;
