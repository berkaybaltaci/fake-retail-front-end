import React from 'react';
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
} from '@mantine/core';
import { GasStation, Gauge, ManualGearbox, Users } from 'tabler-icons-react';
import { useProductDetailStyles } from '../../styles/product/product-detail.styles';
import GppGoodIcon from '@mui/icons-material/GppGood';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import UpdateIcon from '@mui/icons-material/Update';

const mockData = [
  { label: 'Verified by experts', icon: GppGoodIcon },
  { label: 'Reduced price', icon: PriceCheckIcon },
  { label: 'Local offer', icon: LocalOfferIcon },
  { label: 'Limited product', icon: UpdateIcon },
];

export const ProductDetail: React.FC<{
  _id: string;
  product: string;
  price: number;
  imagePath: string;
  description: string;
  discount: number;
}> = ({ product, imagePath, description, price, discount }) => {
  const { classes } = useProductDetailStyles();

  const features = mockData.map((feature) => (
    <Center key={feature.label}>
      <feature.icon className={classes.icon} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card} shadow="xs">
      <Card.Section className={classes.imageSection}>
        <Image src={imagePath} height={200} alt="Product Image" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text size="lg" weight={500}>
            {product}
          </Text>
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        </div>
        <Badge variant="outline">{discount}% off</Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text size="sm" color="dimmed" className={classes.label}>
          FEATURES
        </Text>

        <Group spacing={20} mb={-8}>
          {features}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <div>
            <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
              £{price}
            </Text>
            <Text
              size="sm"
              color="dimmed"
              weight={500}
              sx={{ lineHeight: 1 }}
              mt={5}
            >
              tax included
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }}>
            Add to basket
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};
