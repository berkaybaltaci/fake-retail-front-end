export default interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  imagePath: string;
  isNew: boolean;
  isVerified: boolean;
  isReducedPrice: boolean;
  isLocalOffer: boolean;
  isLimited: boolean;
}
