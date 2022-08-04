export function mapDataHelper(infoValue) {
  const tempMapObj = {};
  const tempMapArray = [];

  if (infoValue && infoValue.length !== 0) {
    infoValue.map(
      ({
        place_id,
        address_components,
        formatted_address,
        geometry: { location },
      }) => {
        let id = '';
        let lat = '';
        let lng = '';
        let formattedAddress = '';
        let city = '';
        let state_long = '';
        let state_short = '';
        let zipcode = '';
        let country_long = '';
        let country_short = '';

        id = place_id;
        lat = location.lat();
        lng = location.lng();
        formattedAddress = formatted_address;
        if (address_components) {
          for (let i = 0; i < address_components.length; i++) {
            if (address_components[i].types.length) {
              switch (address_components[i].types[0]) {
                case 'locality':
                  city = address_components[i].long_name;
                  break;
                case 'administrative_area_level_1':
                  state_long = address_components[i].long_name;
                  state_short = address_components[i].short_name;
                  break;
                case 'country':
                  country_long = address_components[i].long_name;
                  country_short = address_components[i].short_name;
                  break;
                case 'postal_code':
                  zipcode = address_components[i].long_name;
                  break;
                default:
                  break;
              }
            }
          }
        }

        tempMapObj.id = id;
        tempMapObj.lat = lat;
        tempMapObj.lng = lng;
        tempMapObj.formattedAddress = formattedAddress;
        tempMapObj.city = city;
        tempMapObj.state_short = state_short;
        tempMapObj.state_long = state_long;
        tempMapObj.zipcode = zipcode;
        tempMapObj.country_short = country_short;
        tempMapObj.country_long = country_long;
        tempMapArray.push(tempMapObj);
        return tempMapArray;
      }
    );
  }

  return tempMapArray;
}
