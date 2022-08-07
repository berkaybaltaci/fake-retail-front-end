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
import { passwordValidator, usernameValidator } from '../../lib/util';
import { useForm } from '@mantine/form';
import AuthInput from '../../types/AuthInput';

export function Register() {
  // If already logged in, redirect to home page
  if (useCartContext().isLoggedIn) {
    Router.push('/');
  }
  const { classes } = useAuthStyles();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const { displayNotification, isShowingNotification, runCallbacks } =
    useShowNotification([() => Router.push('/login')], 2000);

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

  const registerHandler = async (values: AuthInput) => {
    setIsButtonDisabled(true);

    // Create registration query using input values
    const mutationStr = `createUser(input: {name: "${values.username}", password: "${values.password}"}) {
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
    } catch (error: any) {
      setIsButtonDisabled(false);
      form.setFieldError('username', ' ');
      form.setFieldError('password', 'Something went wrong');
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

          <form onSubmit={form.onSubmit((values) => registerHandler(values))}>
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
              type="submit"
              disabled={isButtonDisabled}
              style={{ backgroundColor: BUTTON_COLOR }}
            >
              Register
            </Button>
          </form>
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
