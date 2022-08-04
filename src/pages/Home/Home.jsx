import SearchArea from 'components/Search/Search';
import { LuxaryHotelsGrid, TopHotelsGrid } from 'containers/Grid';
import LocationGrid from 'containers/Location/Location';
import { LayoutContext } from 'context/LayoutProvider';
import React, { useContext } from 'react';
import { Waypoint } from 'react-waypoint';

const Home = () => {
  // @ts-ignore
  const [, dispatch] = useContext(LayoutContext);
  return (
    <>
      <SearchArea />
      <Waypoint
        onEnter={() => dispatch({ type: 'HIDE_TOP_SEARCHBAR' })}
        onLeave={() => dispatch({ type: 'SHOW_TOP_SEARCHBAR' })}
      />
      <LocationGrid />
      <TopHotelsGrid />
      <LuxaryHotelsGrid />
    </>
  );
};

export default Home;
