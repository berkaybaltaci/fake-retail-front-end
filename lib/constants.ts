export const LINKS = [
  { link: '/', label: 'Home Page' },
  { link: '/products/page/1', label: 'Products' },
  { link: '/login', label: 'Login' },
  { link: '/register', label: 'Register' },
];

export const PRODUCTS_PER_PAGE = 10;

// Dimension
export const HEADER_HEIGHT = '10vh';
export const MAIN_CONTENT_HEIGHT = '90vh';

// Colors
export const BACKGROUND_COLOR = '#CAF0F8';
export const HEADER_COLOR = '#90E0EF';
export const BUTTON_COLOR = '#00B4D8';
export const TITLE_COLOR = '#03045E';

// Cart
export const CART_ITEM_REMOVE_DELAY_MS = 400;
export const CART_ITEM_REMOVE_DELAY_SEC: string =
  CART_ITEM_REMOVE_DELAY_MS / 1000 + 's';

export const CART_ITEM_DECREASE_DELAY_MS = 100;
export const CART_ITEM_DECREASE_DELAY_SEC: string =
  CART_ITEM_REMOVE_DELAY_MS / 1000 + 's';

export const CART_ITEM_INCREASE_DELAY_MS = 100;
export const CART_ITEM_INCREASE_DELAY_SEC: string =
  CART_ITEM_REMOVE_DELAY_MS / 1000 + 's';
