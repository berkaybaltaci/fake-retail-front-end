import React, { useEffect, useState } from 'react';
import {
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Modal,
  Button,
  Notification,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import Cart from '../cart/cart';
import { useCartContext } from '../../lib/context-store';
import { gql } from '@apollo/client';
import apolloClient from '../../lib/apollo-client';
import { IconCheck } from '@tabler/icons';
import { HEADER_HEIGHT, useHeaderStyles } from '../../styles/ui/header.styles';
import { isProductsPageActive } from '../../lib/util';
import HeaderResponsiveProps from '../../types/HeaderResponsiveProps';

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const { asPath } = useRouter();
  const { classes, cx } = useHeaderStyles();

  // States
  const { isLoggedIn, setIsLoggedIn, activeLink, setActiveLink } =
    useCartContext();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] =
    useState<boolean>(false);
  const [isLogoutButtonDisabled, setIsLogoutButtonDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes('dummyAccessToken'));
    setActiveLink(asPath);
  }, [asPath, setActiveLink, setIsLoggedIn]);

  const items = links
    .filter(
      (link) =>
        !(isLoggedIn && (link.label === 'Login' || link.label === 'Register'))
    )
    .map((link) => (
      <Link key={link.label} href={link.link}>
        <a
          className={cx(classes.link, {
            [classes.linkActive]:
              activeLink === link.link ||
              (link.link.includes('products') &&
                isProductsPageActive(activeLink)),
          })}
          onClick={() => {
            setActiveLink(link.link);
            toggleOpened(false);
          }}
        >
          {link.label}
        </a>
      </Link>
    ));

  const logoutHandler = async () => {
    setIsLogoutButtonDisabled(true);

    // Create logout query
    const mutationStr = `logout`;
    const query = gql`
        mutation {
          ${mutationStr}
        }
      `;

    try {
      await apolloClient.mutate({
        mutation: query,
      });

      // If logout is successful, show success notification and redirect the user
      setShowSuccessNotification(true);
      setTimeout(() => {
        setShowSuccessNotification(false);
        setIsLogoutButtonDisabled(false);

        // Need to set the logout global state here
        // since Router.push might not actually change the current url
        // This way authentication status always updates
        setIsLoggedIn(false);
        Router.push('/');
      }, 3000);
    } catch (error: any) {
      setIsLogoutButtonDisabled(false);
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
            title="Successfully logged out!"
            className={classes.alert}
            disallowClose
          >
            You are now being redirected...
          </Notification>
        </div>
      )}
      <Header height={HEADER_HEIGHT} mb={0} className={classes.root}>
        {isLoggedIn && (
          <div className={classes.logoutContainer}>
            <Button
              variant="gradient"
              gradient={{ from: 'orange', to: 'red' }}
              className={classes.logout}
              disabled={isLogoutButtonDisabled}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        )}
        <Container className={classes.header}>
          <Link href="/">
            <a>
              <Image
                src="/images/app-logo.svg"
                alt="App Logo"
                width={90}
                height={90}
                onClick={() => setActiveLink('/')}
              />
            </a>
          </Link>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              cursor: 'pointer',
            }}
          >
            <Image
              src="/images/cart-icon.svg"
              alt="Cart Icon"
              width={90}
              height={50}
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>

        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Your Cart"
        >
          <Cart />
        </Modal>
      </Header>
    </>
  );
}
