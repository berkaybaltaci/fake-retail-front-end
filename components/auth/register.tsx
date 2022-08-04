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
import useShowNotification from '../../hooks/use-show-notification';
import { BUTTON_COLOR, TITLE_COLOR } from '../../lib/constants';

export function Register() {
  const { classes } = useAuthStyles();

  // If already logged in, redirect to home page
  const { isLoggedIn } = useCartContext();
  if (isLoggedIn) {
    Router.push('/');
  }

  const { displayNotification, isShowingNotification, runCallbacks } =
    useShowNotification(
      [() => Router.push('/login'), () => setInvalidUsernameError(undefined)],
      2000
    );

  // States
  const [invalidUsernameError, setInvalidUsernameError] = useState<
    string | undefined
  >();
  const [invalidPasswordError, setInvalidPasswordError] = useState<
    string | undefined
  >();

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  // Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerHandler = async () => {
    setInvalidPasswordError(undefined);
    setInvalidUsernameError(undefined);

    // Check for invalid username values
    if (!nameRef.current?.value || nameRef.current?.value.trim() === '') {
      setInvalidUsernameError('Username field cannot be empty.');
      return;
    }

    if (nameRef.current?.value.includes(' ')) {
      setInvalidUsernameError('Username cannot include empty spaces.');
      return;
    }

    if (
      nameRef.current?.value.length < 3 ||
      nameRef.current?.value.length > 15
    ) {
      setInvalidUsernameError(
        'Username length should be between 3 and 15 characters.'
      );
      return;
    }

    // Check for invalid password values
    if (
      !passwordRef.current?.value ||
      passwordRef.current?.value.trim() === ''
    ) {
      setInvalidUsernameError('Password field cannot be empty.');
      return;
    }

    if (passwordRef.current?.value.includes(' ')) {
      setInvalidUsernameError('Password cannot include empty spaces.');
      return;
    }

    if (
      passwordRef.current?.value.length < 6 ||
      passwordRef.current?.value.length > 15
    ) {
      setInvalidUsernameError(
        'Password length should be between 6 and 15 characters.'
      );
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

      // If registration is successful, show success notification and run callback functions
      displayNotification();
      runCallbacks();
      setInvalidPasswordError(undefined);
      setInvalidUsernameError(undefined);
    } catch (error: any) {
      setIsButtonDisabled(false);
      setInvalidUsernameError(error.message);
    }
  };
  return (
    <>
      {isShowingNotification && (
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
            style={{
              fontSize: '250%',
              fontFamily: 'Marcellus',
              color: TITLE_COLOR,
            }}
          >
            Register Here
          </Text>

          <TextInput
            label="Username"
            placeholder="Your username"
            size="md"
            ref={nameRef}
            error={invalidUsernameError}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            ref={passwordRef}
            error={invalidPasswordError}
          />
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button
            fullWidth
            mt="xl"
            size="md"
            onClick={registerHandler}
            disabled={isButtonDisabled}
            style={{ backgroundColor: BUTTON_COLOR }}
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
