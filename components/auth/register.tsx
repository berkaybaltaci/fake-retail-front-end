import React, { useRef, useState } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Group,
  Space,
} from '@mantine/core';

import { useAuthStyles } from '../../styles/auth/auth.styles';
import apolloClient from '../../lib/apollo-client';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { useCartContext } from '../../lib/context-store';
import Router from 'next/router';
import CustomNotification from '../ui/custom-notification';

export function Register() {
  const { classes } = useAuthStyles();

  // If already logged in, redirect to home page
  const { isLoggedIn } = useCartContext();
  if (isLoggedIn) {
    Router.push('/');
  }

  // States
  const [isInvalidCredentials, setIsInvalidCredentials] =
    useState<boolean>(false);
  const [showSuccessNotification, setShowSuccessNotification] =
    useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerHandler = async () => {
    // Check for invalid input values
    if (
      !passwordRef.current?.value ||
      !nameRef.current?.value ||
      passwordRef.current?.value.trim() === '' ||
      nameRef.current?.value.trim() === ''
    ) {
      setIsInvalidCredentials(true);
      return;
    }

    setIsButtonDisabled(true);

    // Create registration query using input values
    const mutationStr = `createUser(input: {name: "${nameRef.current?.value}", password: "${passwordRef.current?.value}"}) {
      name
    }`;
    const query = gql`
      mutation {
        ${mutationStr}
      }
    `;

    try {
      // Send the request to register
      await apolloClient.mutate({
        mutation: query,
      });

      // If registration is successful, show success notification and redirect the user to login page
      setShowSuccessNotification(true);
      setIsInvalidCredentials(false);
      setTimeout(() => {
        setShowSuccessNotification(false);
        Router.push('/login');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {showSuccessNotification && (
        <CustomNotification
          title="Successfully registered!"
          message="You are now being redirected..."
        />
      )}
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Text
            align="center"
            mt="md"
            mb={50}
            color="blue"
            weight={800}
            style={{ fontSize: '250%', fontFamily: 'Marcellus' }}
          >
            Register Here
          </Text>

          <TextInput
            label="Username"
            placeholder="Your username"
            size="md"
            ref={nameRef}
            error={isInvalidCredentials}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            ref={passwordRef}
            error={isInvalidCredentials && 'Input fields cannot be empty.'}
          />
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button
            fullWidth
            mt="xl"
            size="md"
            onClick={registerHandler}
            disabled={isButtonDisabled}
          >
            Register
          </Button>
          <Space h="sm" />
          <Group>
            <Text>Already have an account?</Text>
            <Link href="/login">
              <Anchor weight={700}>Login</Anchor>
            </Link>
          </Group>
        </Paper>
      </div>
    </>
  );
}
