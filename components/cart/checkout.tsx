import { gql } from '@apollo/client';
import {
  Button,
  Divider,
  Group,
  List,
  Space,
  Stack,
  Stepper,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import apolloClient from '../../lib/apollo-client';
import { MAIN_CONTENT_HEIGHT } from '../../lib/constants';
import { useCartContext } from '../../lib/context-store';
import {
  creditCardCVVValidator,
  creditCardExpValidator,
  creditCardNoValidator,
  emailValidator,
} from '../../lib/util';

const Checkout: React.FC = () => {
  const { products, clearCart } = useCartContext();
  const router = useRouter();

  const productsArray = Array.from(products.keys());
  const totalPrice = productsArray
    .reduce((total, item) => total + +item.price * products.get(item)!, 0)
    .toFixed(2);

  useEffect(() => {
    if (products.size === 0) {
      // No products, redirect
      router.push('/products');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placeOrderHandler = async () => {
    setIsButtonDisabled(true);

    let itemsStr = '[';

    products.forEach((value, key) => {
      itemsStr += `{ itemId: "${key._id}", quantity: "${value}"}, `;
    });

    itemsStr += ']';

    // Create login query using input values
    const mutationStr = `createOrder(
      input: {
        recipientName: "${form.values.name}"
        recipientLastName: "${form.values.lastName}"
        recipientAddress: "${form.values.address}"
        creditCardLastFourDigits: "${form.values.creditCardNo.slice(-4)}"
        items: ${itemsStr}
      }
    ) {
      userId
    }`;
    const query = gql`
      mutation {
        ${mutationStr}
      }
    `;

    // Send the request to place order
    await apolloClient.mutate({
      mutation: query,
    });
  };

  const [active, setActive] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      } else if (current < 3) {
        if (current === 2) {
          // Placing order
          setIsButtonDisabled(true);
          placeOrderHandler();
          clearCart();
        }
        return current + 1;
      } else {
        return current;
      }
    });
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      address: '',
      creditCardNo: '',
      creditCardExpiration: '',
      creditCardCVV: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          name: values.name.trim() === '' ? 'Name cannot be empty' : null,
          lastName:
            values.lastName.trim() === '' ? 'Last name cannot be empty' : null,
          email: emailValidator(values.email),
          address:
            values.address.trim() === '' ? 'Address cannot be empty' : null,
        };
      }
      if (active === 1) {
        return {
          creditCardNo: creditCardNoValidator(values.creditCardNo),
          creditCartExpiration: creditCardExpValidator(
            values.creditCardExpiration
          ),
          creditCardCVV: creditCardCVVValidator(values.creditCardCVV),
        };
      }
      return {};
    },
  });

  return (
    <div
      style={{
        paddingLeft: '12%',
        paddingRight: '12%',
        paddingTop: '3%',
        paddingBottom: '3%',
        height: MAIN_CONTENT_HEIGHT,
      }}
    >
      <Stepper active={active} onStepClick={setActive} breakpoint="xs">
        <Stepper.Step label="First step" description="Enter your contact info">
          <TextInput
            required
            label="Name"
            placeholder="Your name"
            size="md"
            {...form.getInputProps('name')}
          />
          <TextInput
            required
            label="Last name"
            placeholder="Your last name"
            size="md"
            {...form.getInputProps('lastName')}
          />
          <TextInput
            required
            label="Email"
            placeholder="Your email"
            size="md"
            {...form.getInputProps('email')}
          />
          <TextInput
            required
            label="Address"
            placeholder="Your address"
            size="md"
            {...form.getInputProps('address')}
          />
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Provide payment details">
          <TextInput
            required
            label="Credit card no"
            placeholder="Your credit card no"
            size="md"
            {...form.getInputProps('creditCardNo')}
          />
          <TextInput
            required
            label="Credit card CVV"
            placeholder="Your credit card CVV"
            size="md"
            {...form.getInputProps('creditCardCVV')}
          />
          <TextInput
            required
            label="Credit card expiration date"
            placeholder="Your credit card expiration date"
            size="md"
            {...form.getInputProps('creditCardExpiration')}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Final step"
          description="Review and place your order"
        >
          <Group
            style={{
              justifyContent: 'space-evenly',
              height: '65vh',
            }}
          >
            <Stack align="left">
              <Text weight={700}>Recipient name</Text>
              <Text>
                {form.values.name} {form.values.lastName}
              </Text>
              <Text weight={700}>Address</Text>
              <Text>{form.values.address}</Text>
              <Text weight={700}>Payment information</Text>
              <Text>
                Credit card no: **** **** ****{' '}
                {form.values.creditCardNo.slice(-4)}
              </Text>
              {/* <Text>Expiration date: {form.values.creditCardExpiration}</Text> */}
            </Stack>
            <Divider orientation="vertical" />
            <Stack>
              <Text weight={700}>Items</Text>
              <List>
                {productsArray.map((item) => (
                  <List.Item key={item._id}>
                    {products.get(item)}x {item.name}
                  </List.Item>
                ))}
              </List>
              <Space h={10} />
              <Text
                weight={700}
                style={{ fontSize: '135%', fontStyle: 'italic' }}
              >
                Total: £{totalPrice}
              </Text>
            </Stack>
          </Group>
        </Stepper.Step>
        <Stepper.Completed>
          Your have successfully placed your order.
        </Stepper.Completed>
      </Stepper>

      <div
        style={{
          position: 'fixed',
          bottom: '2%',
          left: '0',
          right: '0',
        }}
      >
        <Group mt="xl" position="center">
          <Button
            variant="default"
            onClick={prevStep}
            disabled={isButtonDisabled}
          >
            Back
          </Button>
          <Button onClick={nextStep} disabled={isButtonDisabled}>
            {active === 2 ? 'Place order' : 'Next step'}
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default Checkout;
