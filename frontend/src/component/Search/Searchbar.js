import {useState, useEffect, cloneElement} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './Searchbar.css';
import { getSpots } from '../../store/spot';



function Searchbar(){
  const spot = useSelector((state) => state.spot)
  const spots = Object.values(spot);


  const [searchWord, setSearchWord] =useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const[searchResult, setSearchResult] =useState([]);
  const dispatch = useDispatch();

  const results = (word) =>{
    const str =[];
    for (let i =0; i<spots.length; i++){
      let spot = spots[i];
      if (spot.address.toLowerCase().includes(word.toLowerCase())||
         spot.city.toLowerCase().includes(word.toLowerCase()) ||
         spot.state.toLowerCase().includes(word.toLowerCase()) ||
         spot.country.toLowerCase().includes(word.toLowerCase())
      ){
        str.push(spot)
      }
    }
    // console.log(str);
    return str;
  }
  const resultstore = results;
  //console.log(resultstore);

  useEffect(() =>{
    if(searchWord.length){
      setShowDropdown(true);
      setSearchResult(results(searchWord))
    } else {
      setShowDropdown(false);
      setSearchResult([]);
    }
  }, [searchWord])

  useEffect(()=>{
    dispatch(getSpots())
  }, [dispatch]);
  useEffect(()=>{
    //console.log('prodcuts----------', products)
  },[spot])

  return(
   <>
   <div className='searchbar'>

   <input
      type = 'text'
      className='searchinput'
      placeholder='Search for anything'
      onChange={(e)=>setSearchWord(e.target.value)}
      value={searchWord}
   />
   <div type="submit" className='search_btn'>
    <i className="fa-solid fa-magnifying-glass fa-lg "></i>
   </div>

   </div>

   {(showDropdown && searchResult.length > 0 ) && (
    <div className='search_dropdown'>
    { searchResult.map((spot)=>(

      <NavLink to={`/spots/${spot.id}`} className='search_dropdown_navlink' onClick={()=>setSearchWord("")}>
      <div className='search_dropdown_info'>

      <div className='dropdown_image_container'>
      <img src={spot?.previewImage} alt="product" className='search_dropdown_img'/>
      </div>

        <div className='search_dropdown_text' >{spot.name.slice(0,270)}</div>

      </div>
      </NavLink>
    ))
    }
    </div>
   )}

   {(showDropdown && !searchResult.length) && (
     <div className='search_dropdown'>
      <h2>We couldn't find any results for "{searchWord}"</h2>
     </div>
    )
   }

  </>
 );
}
export default Searchbar
