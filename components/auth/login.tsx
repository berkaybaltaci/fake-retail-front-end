import React, { useEffect, useRef, useState } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
  Group,
  Space,
} from '@mantine/core';
import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons';

import { useLoginStyles } from '../../styles/auth/login.styles';
import apolloClient from '../../lib/apollo';
import { gql } from '@apollo/client';
import Router from 'next/router';
import Link from 'next/link';
import { useCartContext } from '../../lib/context-store';

export function Login() {
  const { isLoggedIn, setIsLoggedIn } = useCartContext();

  // If already logged in, redirect to home page
  if (isLoggedIn) {
    Router.push('/');
  }

  const { classes } = useLoginStyles();

  const [showSuccessNotification, setShowSuccessNotification] =
    useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isInvalidCredentials, setIsInvalidCredentials] =
    useState<boolean>(false);
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
      await apolloClient.mutate({
        mutation: query,
      });

      // If login is successful, show success notification and redirect the user
      setShowSuccessNotification(true);
      setIsInvalidCredentials(false);
      setTimeout(() => {
        setShowSuccessNotification(false);
        Router.push('/');
      }, 3000);
    } catch (error: any) {
      setIsButtonDisabled(false);
      setIsInvalidCredentials(true);
      console.log(error.message);
    }
  };

  return (
    <>
      {showSuccessNotification && (
        <div className={classes.alertContainer}>
          <Notification
            icon={<IconCheck size={20} />}
            color="teal"
            title="Successfully logged in!"
            className={classes.alert}
            disallowClose
          >
            You are now being redirected...
          </Notification>
        </div>
      )}
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Text
            // order={2}
            // className={classes.title}
            align="center"
            mt="md"
            mb={50}
            color="blue"
            weight={800}
            style={{ fontSize: '250%', fontFamily: 'Marcellus' }}
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
