import React from 'react';
import {
  Card,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
} from '@mantine/core';
import { useProductDetailStyles } from '../../styles/product/product-detail.styles';
import Image from 'next/image';
import GppGoodIcon from '@mui/icons-material/GppGood';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import UpdateIcon from '@mui/icons-material/Update';

export const ProductDetail: React.FC<{
  _id: string;
  name: string;
  price: number;
  imagePath: string;
  description: string;
  discount: number;
  isNew: boolean;
  isVerified: boolean;
  isReducedPrice: boolean;
  isLocalOffer: boolean;
  isLimited: boolean;
}> = ({
  name,
  imagePath,
  description,
  price,
  discount,
  isNew,
  isVerified,
  isReducedPrice,
  isLocalOffer,
  isLimited,
}) => {
  const { classes } = useProductDetailStyles();

  const featuresData = [];

  if (isVerified) {
    featuresData.push({ label: 'Verified by experts', icon: GppGoodIcon });
  }
  if (isReducedPrice) {
    featuresData.push({ label: 'Reduced price', icon: PriceCheckIcon });
  }
  if (isLocalOffer) {
    featuresData.push({ label: 'Local offer', icon: LocalOfferIcon });
  }
  if (isLimited) {
    featuresData.push({ label: 'Limited product', icon: UpdateIcon });
  }

  const features = featuresData.map((feature) => (
    <Center key={feature.label}>
      <feature.icon className={classes.icon} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card} shadow="xs">
      <Card.Section className={classes.imageSection}>
        <Image src={imagePath} width={700} height={400} alt="Product Image" />
      </Card.Section>

      <Group position="apart" mt="md">
        <div>
          <Text size="lg" weight={500}>
            {name}
          </Text>
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
      <Badge mt={7} variant="outline">
        {discount}% off
      </Badge>

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
