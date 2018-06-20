/**
 *
 * SanitizedFormattedNumber
 *
 */

import React from 'react';
import { FormattedNumber } from 'react-intl';
import { DEFAULT_NOT_NUMBER } from 'containers/App/constants';

function SanitizedFormattedNumber(props) {
// eslint-disable-next-line no-restricted-globals
  const isNumeric = (data) => (!isNaN(parseFloat(data)) && isFinite(data) && data.constructor !== Array);
  const value = parseFloat(props.value, 10).toString();
  const hasDecimals = props.value.indexOf && props.value.indexOf('.') !== -1;
  const decimaldigits = (
    (hasDecimals && value % 1 === 0) || props.forceDecimals ?
      `.${new Array(3).join('0')}` :
      ''
  );
  const fractionDigits = (
    decimaldigits ?
      3 :
      props.fractionDigits || (props.value < 8 ? value.slice(props.value.indexOf('.') + 1).length : 8)
  );
  const number = (isNumeric(value) ?
    (
      <span>
        <FormattedNumber
          value={value}
          minimunFractionDigits={fractionDigits}
          maximumFractionDigits={fractionDigits}
        />
        {!!fractionDigits && decimaldigits}
      </span>
    ) :
    <span>{DEFAULT_NOT_NUMBER}</span>
  );

  return number;
}

SanitizedFormattedNumber.propTypes = {};

export default SanitizedFormattedNumber;
