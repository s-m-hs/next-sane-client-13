import React from 'react';
import { greatPlaceStyle } from './my_great_place_styles.js';

const MyGreatPlace = ({ text = '' }) => {
  return (
    <div style={greatPlaceStyle}>
      {text}
    </div>
  );
};

export default MyGreatPlace;
