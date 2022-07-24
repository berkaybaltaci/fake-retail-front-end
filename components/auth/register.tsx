import React, { useRef } from 'react';
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

import { useLoginStyles } from '../../styles/auth/login.styles';
import apolloClient from '../../lib/apollo';
import { gql } from '@apollo/client';
import Link from 'next/link';

export function Register() {
  const { classes } = useLoginStyles();

  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerHandler = async () => {
    // Create login query using input values
    const mutationStr = `createUser(input: { name: "${nameRef.current?.value}", password: "${passwordRef.current?.value}" })`;
    const query = gql`
      mutation {
        ${mutationStr}
      }
    `;

    // Send the request to register
    await apolloClient.mutate({
      mutation: query,
    });
    console.log('Successfully registered.');
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
        <Button fullWidth mt="xl" size="md" onClick={registerHandler}>
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
  );
}
