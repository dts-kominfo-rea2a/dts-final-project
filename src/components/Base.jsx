/** This is our base component every components must be extend it. */
import {
  space,
  borders,
  borderColor,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  display,
  fontSize,
  flex,
  order,
  alignSelf,
  color,
  compose,
} from 'styled-system';

export const themed = (key) => (props) => props.theme[key];

export const base = compose(
  () => ({ boxSizing: 'border-box' }),
  space,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  borders,
  borderColor,
  display
);

// @ts-ignore
base.propTypes = {
  // @ts-ignore
  ...display.propTypes,
  // @ts-ignore
  ...space.propTypes,
  // @ts-ignore
  ...borders.propTypes,
  // @ts-ignore
  ...borderColor.propTypes,
  // @ts-ignore
  ...width.propTypes,
  // @ts-ignore
  ...height.propTypes,
  // @ts-ignore
  ...fontSize.propTypes,
  // @ts-ignore
  ...color.propTypes,
  // @ts-ignore
  ...flex.propTypes,
  // @ts-ignore
  ...order.propTypes,
  // @ts-ignore
  ...alignSelf.propTypes,
};
