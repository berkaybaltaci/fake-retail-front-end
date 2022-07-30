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
import Router from 'next/router';
import Link from 'next/link';
import { useCartContext } from '../../lib/context-store';
import CustomNotification from '../ui/custom-notification';
import useShowNotification from '../../hooks/use-show-notification';
import { BUTTON_COLOR, TITLE_COLOR } from '../../lib/constants';

export function Login() {
  const { isLoggedIn } = useCartContext();

  // If already logged in, redirect to home page
  if (isLoggedIn) {
    Router.push('/');
  }

  const { classes } = useAuthStyles();
  const { displayNotification, isShowingNotification, runCallbacks } =
    useShowNotification(
      [() => Router.push('/'), () => setIsInvalidCredentials(false)],
      2000
    );

  // States
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isInvalidCredentials, setIsInvalidCredentials] =
    useState<boolean>(false);

  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async () => {
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

    // Create login query using input values
    const mutationStr = `login(input: { name: "${nameRef.current?.value}", password: "${passwordRef.current?.value}" })`;
    const query = gql`
      mutation {
        ${mutationStr}
      }
    `;

    try {
      // Send the request to login
      await apolloClient.mutate({
        mutation: query,
      });

      // If login is successful, show success notification and run callback functions
      displayNotification();
      runCallbacks();
    } catch (error: any) {
      setIsButtonDisabled(false);
      setIsInvalidCredentials(true);
      console.log(error.message);
    }
  };

  return (
    <>
      {isShowingNotification && (
        <CustomNotification
          title="Successfully logged in!"
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
            style={{
              fontSize: '250%',
              fontFamily: 'Marcellus',
              color: TITLE_COLOR,
            }}
          >
            Login Here
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
            error={isInvalidCredentials && 'Invalid name or password'}
          />
          <Button
            fullWidth
            mt="xl"
            size="md"
            onClick={loginHandler}
            disabled={isButtonDisabled}
            style={{ backgroundColor: BUTTON_COLOR }}
          >
            Login
          </Button>
          <Space h="sm" />
          <Group>
            <Text>Don&apos;t have an account?</Text>
            <Link href="/register">
              <Anchor weight={700}>Register</Anchor>
            </Link>
          </Group>
        </Paper>
      </div>
    </>
  );
}
