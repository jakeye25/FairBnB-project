import usePlaceAutocomplete, {
  getGeocode, getLatLng
} from "use-places-autocomplete";

import useOnclickOutside from "react-cool-onclickoutside";


// type PlaceProps = {
//     setOffice: (position: google.maps.LatLng) => void
// };

export default function Places({ setOffice }
  // { setOffice }: PlaceProps
) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlaceAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ val }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(val, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: val }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setOffice({ lat, lng })
        console.log("===================hit selection")
        console.log("📍 Coordinates: ", { lat, lng });
      });

    }
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (

        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search house address"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
