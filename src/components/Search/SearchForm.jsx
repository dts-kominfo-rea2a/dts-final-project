import React, { useEffect, useState } from 'react';
// import { useNavigate, createSearchParams } from 'react-router-dom';
// import isEmpty from 'lodash/isEmpty';
import { FaRegCalendar, FaUserFriends } from 'react-icons/fa';
import { Button } from 'antd';
import DateRangePickerBox from 'components/DatePicker/ReactDates';
// import Autocomplete from '@koliseoapi/react-autocomplete';
import { Autocomplete } from '@material-ui/lab';
// import MapAutoComplete from 'components/Map/MapAutoComplete';
// import { mapDataHelper } from 'components/Map/mapDataHelper';
import ViewWithPopup from 'components/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/InputIncDec/InputIncDec';
import { setStateToUrl } from 'helpers/url_handler';
// import { LISTING_POSTS_PAGE } from 'settings/constant';
import clsx from 'clsx';
import { SearchLocation as search } from 'services/SearchLocation';
import {
  FormWrapper,
  ComponentWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Search.style';
import {
  Grid,
  TextField,
  Typography,
  InputAdornment,
  makeStyles,
} from '@material-ui/core';

import {
  LocationOn as PinIcon,
  Search as MagnifierIcon,
} from '@material-ui/icons';

const calendarItem = {
  separator: '-',
  format: 'DD-MM-YYYY',
  locale: 'en',
};

const useStyles = makeStyles((theme) => ({
  cityName: {
    fontWeight: 400,
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  optionIcon: {
    marginRight: theme.spacing(2),
  },
  searchIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function SearchForm() {
  // let navigate = '';
  // useNavigate();
  const [searchDate, setSearchDate] = useState({
    setStartDate: null,
    setEndDate: null,
  });
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [locationCode, setLocationCode] = useState();

  // Room guest state
  const [roomGuest, setRoomGuest] = useState({
    room: 0,
    guest: 0,
  });
  const handleIncrement = (type) => {
    setRoomGuest({
      ...roomGuest,
      [type]: roomGuest[type] + 1,
    });
  };
  const handleDecrement = (type) => {
    if (roomGuest[type] <= 0) {
      return false;
    }
    setRoomGuest({
      ...roomGuest,
      [type]: roomGuest[type] - 1,
    });
  };
  const handleIncDecOnChange = (e, type) => {
    let currentValue = e.target.value;
    setRoomGuest({
      ...roomGuest,
      [type]: currentValue,
    });
  };

  // navigate to the search page
  const goToSearchPage = () => {
    const query = {
      date_range: searchDate,
      room: roomGuest.room,
      guest: roomGuest.guest,
      location_code: locationCode,
    };
    console.log(query);
    // console.log(locationCode);
    // let tempLocation = [];
    // const mapData = [];
    // //  mapValue ? mapDataHelper(mapValue) : [];
    // mapData &&
    //   mapData.map((singleMapData, i) => {
    //     return tempLocation.push({
    //       formattedAddress: singleMapData ? singleMapData.formattedAddress : '',
    //       lat: singleMapData ? singleMapData.lat.toFixed(3) : null,
    //       lng: singleMapData ? singleMapData.lng.toFixed(3) : null,
    //     });
    //   });
    // const location = tempLocation ? tempLocation[0] : {};

    const search = setStateToUrl(query);
    console.log(search);
    // navigate({
    //   pathname: '',
    //   LISTING_POSTS_PAGE,
    //   search: `?${createSearchParams(search)}`,
    // });
  };

  useEffect(() => {
    const { process } = search(inputValue); //cancel
    process((options) => {
      setOptions(options);
    });
    // return () => cancel();
  }, [inputValue]);
  const classes = useStyles();

  return (
    <FormWrapper>
      <ComponentWrapper>
        <Autocomplete
          style={{ width: 350, paddingLeft: 8 }}
          id="location"
          freeSolo
          disableClearable
          blurOnSelect
          clearOnBlur
          size="small"
          autoComplete
          autoHighlight
          options={options}
          onChange={(event, newValue) => {
            // setCityCode(newValue.code);
            setLocationCode(newValue.code);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          getOptionLabel={(option) => option.city || ''}
          renderOption={(option) => {
            return (
              <Grid container alignItems="center">
                <Grid item>
                  <PinIcon className={clsx(classes.icon, classes.optionIcon)} />
                </Grid>
                <Grid item xs>
                  <span className={classes.cityName}>{option.city}</span>
                  <Typography variant="body2" color="textSecondary">
                    {option.label}
                    {/* {option.country} */}
                    {/* {option.state ? `, ${option.state}` : ''} */}
                  </Typography>
                </Grid>
              </Grid>
            );
          }}
          renderInput={(props) => (
            <TextField
              {...props}
              label="City"
              placeholder="Search Location"
              margin="normal"
              variant="outlined"
              InputProps={{
                ...props.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <MagnifierIcon
                      className={clsx(classes.icon, classes.searchIcon)}
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </ComponentWrapper>

      <ComponentWrapper>
        <FaRegCalendar className="calendar" />
        <DateRangePickerBox
          item={calendarItem}
          startDateId="startDateId-id-home"
          endDateId="endDateId-id-home"
          updateSearchData={(setDateValue) => setSearchDate(setDateValue)}
          showClearDates={true}
          small={true}
          numberOfMonths={1}
        />
      </ComponentWrapper>

      <ComponentWrapper>
        <FaUserFriends className="user-friends" />
        <ViewWithPopup
          key={200}
          style={{ border: '' }}
          noView={true}
          className="room_guest"
          view={
            <Button type="default">
              <span>Room {roomGuest.room > 0 && `: ${roomGuest.room}`}</span>
              <span>-</span>
              <span>Guest{roomGuest.guest > 0 && `: ${roomGuest.guest}`}</span>
            </Button>
          }
          popup={
            <RoomGuestWrapper>
              <ItemWrapper>
                <strong>Room</strong>
                <InputIncDec
                  id="room"
                  className={{}}
                  increment={() => handleIncrement('room')}
                  decrement={() => handleDecrement('room')}
                  onChange={(e) => handleIncDecOnChange(e, 'room')}
                  value={roomGuest.room}
                />
              </ItemWrapper>
              <ItemWrapper>
                <strong>Guest</strong>
                <InputIncDec
                  className={{}}
                  id="guest"
                  increment={() => handleIncrement('guest')}
                  decrement={() => handleDecrement('guest')}
                  onChange={(e) => handleIncDecOnChange(e, 'guest')}
                  value={roomGuest.guest}
                />
              </ItemWrapper>
            </RoomGuestWrapper>
          }
        />
      </ComponentWrapper>

      <Button
        type="primary"
        htmlType="submit"
        size="large"
        // @ts-ignore
        onClick={goToSearchPage}
        //
      >
        Find Hotels
      </Button>
    </FormWrapper>
  );
}
