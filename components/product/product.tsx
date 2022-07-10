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
  imagePath: string;
  description: string;
}> = ({ product, imagePath, description }) => {
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

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>{product}</Text>

          <Badge color="pink" variant="light">
            New!
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {description}
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
        >
          Add to basket
        </Button>
      </Card>
    </div>
  );
};

export default Product;
