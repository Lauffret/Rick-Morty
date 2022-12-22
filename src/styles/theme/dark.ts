import { lighten } from 'polished'
import { Theme } from '../../utils/styled'
import brandColors from '../colors/brandColors'

const lightTheme: Theme = {
  colors: {
    background: brandColors.bodyDark,
    body: brandColors.textDark,
    headings: brandColors.gray5,
    black: brandColors.black,
    white: brandColors.white,
    borders: brandColors.containerDark,
    tableOdd: brandColors.containerDark,
    brand: brandColors.red,
    attrs: {
      str: brandColors.textDark,
      agi: '#39d402',
      int: '#01a9f4'
    }
  },
  fonts: {
    headings:
      // eslint-disable-next-line max-len
      "'Poppins', sans-serif",
    body:
      // eslint-disable-next-line max-len
      "'Poppins', sans-serif",
    monospace: "'Poppins', sans-serif"
  },
  fontSizes: {
    h1: '2.441rem',
    h2: '1.953rem',
    h3: '1.563rem',
    h4: '1.25rem'
  },
  containerPadding: '1.5rem',
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  widths: {
    md: '720px',
    lg: '960px',
    xl: '1140px'
  },
  heights: {
    header: '60px'
  }
}

export default lightTheme
