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
import { Check } from 'tabler-icons-react';

import { useLoginStyles } from '../../styles/auth/login.styles';
import apolloClient from '../../lib/apollo';
import { gql } from '@apollo/client';
import Router from 'next/router';
import Link from 'next/link';

export function Login() {
  const { classes } = useLoginStyles();

  const [showSuccessNotification, setShowSuccessNotification] =
    useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async () => {
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
      setTimeout(() => {
        setShowSuccessNotification(false);
        Router.push('/');
      }, 3000);
    } catch (error: any) {
      // TODO: Set invalid name or password error here
      setIsButtonDisabled(false);
      console.log(error.message);
    }
  };

  return (
    <>
      {showSuccessNotification && (
        <Notification
          icon={<Check size={18} />}
          color="teal"
          title="Successfully logged in!"
        >
          You are now being redirected...
        </Notification>
      )}
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Welcome back to E-Commerce!
          </Title>

          <TextInput
            label="Username"
            placeholder="Your username"
            size="md"
            ref={nameRef}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            ref={passwordRef}
          />
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
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
