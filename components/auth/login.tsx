import React, { useState } from 'react';
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
import { useForm } from '@mantine/form';
import { passwordValidator, usernameValidator } from '../../lib/util';
import AuthInput from '../../types/AuthInput';

export function Login() {
  const { classes } = useAuthStyles();
  const { isLoggedIn } = useCartContext();

  // If already logged in, redirect to home page
  if (isLoggedIn) {
    Router.push('/');
  }

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: usernameValidator,
      password: passwordValidator,
    },
  });

  const { displayNotification, isShowingNotification, runCallbacks } =
    useShowNotification([() => Router.push('/')], 2000);

  // States
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const loginHandler = async (values: AuthInput) => {
    setIsButtonDisabled(true);

    // Create login query using input values
    const mutationStr = `login(input: { name: "${values.username}", password: "${values.password}" })`;
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
      // Login failed, re-enable login button
      setIsButtonDisabled(false);

      // Set form errors
      form.setFieldError('username', ' ');
      form.setFieldError('password', 'Invalid username or password');
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

          <form onSubmit={form.onSubmit((values) => loginHandler(values))}>
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              size="md"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...form.getInputProps('password')}
            />
            <Button
              fullWidth
              mt="xl"
              size="md"
              disabled={isButtonDisabled}
              style={{ backgroundColor: BUTTON_COLOR }}
              type="submit"
            >
              Login
            </Button>
          </form>
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
