import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
} from '@mantine/core';

const Product: React.FC<{
  _id: string;
  product: string;
  price: number;
  imagePath: string;
  description: string;
}> = ({ product, imagePath, description, price }) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ margin: '1%' }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image
            src={imagePath}
            alt="Chips"
            style={{
              objectFit: 'cover',
              maxHeight: '50%',
            }}
          />
        </Card.Section>

        <Card.Section
          style={{
            marginBottom: 5,
            marginTop: theme.spacing.sm,
            textAlign: 'center',
          }}
        >
          <Text weight={500}>{product}</Text>
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
          <Badge color="pink" variant="light" style={{ marginBottom: 5 }}>
            New!
          </Badge>

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

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 10 }}
        >
          Add to basket
        </Button>
      </Card>
    </div>
  );
};

export default Product;
