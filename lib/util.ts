export const isProductsPageActive = (link: string) => {
  return (
    link.length > 1 && link.substring(0, link.length - 1) == '/products/page/'
  );
};
