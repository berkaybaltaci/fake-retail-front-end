import { Card, Text, Badge, Button, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '../../lib/context-store';
import Router from 'next/router';
import { BUTTON_COLOR, TITLE_COLOR } from '../../lib/constants';

const Product: React.FC<{
  _id: string;
  name: string;
  price: number;
  imagePath: string;
  description: string;
  isNew: boolean;
  isLimited: boolean;
  isLocalOffer: boolean;
  isReducedPrice: boolean;
  isVerified: boolean;
  addItemToCartHandler: () => void;
}> = ({
  _id,
  name,
  imagePath,
  description,
  price,
  isNew,
  isLimited,
  isLocalOffer,
  isReducedPrice,
  isVerified,
  addItemToCartHandler,
}) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const { addProductToCart, isLoggedIn } = useCartContext();

  const handleAddToBasket = async () => {
    if (isLoggedIn) {
      addProductToCart({
        _id,
        name,
        imagePath,
        description,
        price,
        isNew,
        isLimited,
        isLocalOffer,
        isReducedPrice,
        isVerified,
      });
      addItemToCartHandler();
    } else {
      Router.push('/login');
      console.log('Not authenticated');
    }
  };

  return (
    <div style={{ margin: '1%' }}>
      <Card shadow="sm" p="lg">
        <Link href={`/products/${name}`}>
          <a>
            <Card.Section>
              <Image
                src={imagePath}
                layout="intrinsic"
                width={300}
                height={200}
                alt="Product Image"
              />
            </Card.Section>

            <Card.Section
              style={{
                marginBottom: 5,
                marginTop: theme.spacing.sm,
                textAlign: 'center',
              }}
            >
              <Text weight={500} lineClamp={1}>
                {name}
              </Text>
            </Card.Section>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                height: '115px',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              {isNew && (
                <Badge color="pink" variant="light" style={{ marginBottom: 5 }}>
                  New!
                </Badge>
              )}

              <Text
                size="sm"
                lineClamp={3}
                style={{
                  color: secondaryColor,
                  lineHeight: 1.5,
                }}
              >
                {description}
              </Text>
            </div>

            <div
              style={{
                textAlign: 'center',
              }}
            >
              <Badge
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                mt={5}
              >
                <Text weight={700}>{price} £</Text>
              </Badge>
            </div>
          </a>
        </Link>

        <Button
          fullWidth
          style={{
            marginTop: 10,
            backgroundColor: BUTTON_COLOR,
          }}
          onClick={handleAddToBasket}
        >
          Add to basket
        </Button>
      </Card>
    </div>
  );
};

export default Product;
