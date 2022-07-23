import { Card, Text, Badge, Button, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useCartContext } from '../../app/context-store';

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
}) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const { addProductToCart } = useCartContext();

  const handleAddToBasket = () => {
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
  };

  return (
    <div style={{ margin: '1%' }}>
      <Card shadow="sm" p="lg">
        <Link href={`/products/${name}`}>
          <a>
            <Card.Section>
              <Image
                src={imagePath}
                layout="fixed"
                width={300}
                height={200}
                // style={{ height: '50%' }}
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
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 10 }}
          onClick={handleAddToBasket}
        >
          Add to basket
        </Button>
      </Card>
    </div>
  );
};

export default Product;
