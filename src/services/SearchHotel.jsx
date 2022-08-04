import axios from 'axios';

const { CancelToken } = axios;

const api_token = 'e941318f9fmsh98f1e37732610e4p13fc36jsndbba69375b04';
const api_host =
  'https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=2022-08-06&units=metric&dest_id=-2671576&dest_type=city&locale=en-gb&adults_number=2&order_by=popularity&filter_by_currency=IDR&checkin_date=2022-08-04&room_number=1&page_number=0';
// 'https://booking-com.p.rapidapi.com/v1';
const api_endpoint = '/hotels/locations?locale=id&name=';

const SearchHotel = () => {
  try {
    const source = CancelToken.source();
    const request = axios.get(api_host, {
      cancelToken: source.token,
      headers: {
        'X-RapidAPI-Key': api_token,
      },
    });

    return {
      async process(callback) {
        request.then((response) => {
          const json = response.data;

          if (json) {
            callback(
              json.map((item) => {
                console.log(item);
                return {
                  //   city: address.city_name,
                  //   code: address.dest_id,
                  //   // country: address.country,
                  //   label: address.label,
                };
              })
            );
          }
        });
      },
    };
  } catch (e) {
    console.error(e);
  }
};

export default SearchHotel;
