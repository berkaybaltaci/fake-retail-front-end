import React, { useRef } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';

import { useLoginStyles } from '../../styles/auth/login.styles';
import apolloClient from '../../lib/apollo';
import { ApolloError, gql } from '@apollo/client';

export function Login() {
  const { classes } = useLoginStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = async () => {
    const mutationStr = `login(input: { name: "${nameRef.current?.value}", password: "${passwordRef.current?.value}" })`;

    const query = gql`
      mutation {
        ${mutationStr}
      }
    `;

    try {
      const { data } = await apolloClient.mutate({
        mutation: query,
      });
      console.log('Successfully logged in. Here is your jwt: ' + data.login);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
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
        <Button fullWidth mt="xl" size="md" onClick={loginHandler}>
          Login
        </Button>

        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Anchor<'a'>
            href="#"
            weight={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
