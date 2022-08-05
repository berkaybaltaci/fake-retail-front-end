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
  Text,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';
import Cart from '../cart/cart';
import { useCartContext } from '../../lib/context-store';
import { gql } from '@apollo/client';
import apolloClient from '../../lib/apollo-client';
import { useHeaderStyles } from '../../styles/ui/header.styles';
import { isProductsPageActive } from '../../lib/util';
import HeaderResponsiveProps from '../../types/HeaderResponsiveProps';
import { HEADER_HEIGHT, TITLE_COLOR } from '../../lib/constants';
import CustomNotification from './custom-notification';
import useShowNotification from '../../hooks/use-show-notification';

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const { asPath } = useRouter();
  const { classes, cx } = useHeaderStyles();

  // States
  const { isLoggedIn, setIsLoggedIn, activeLink, setActiveLink, clearCart } =
    useCartContext();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutButtonDisabled, setIsLogoutButtonDisabled] =
    useState<boolean>(false);

  const { displayNotification, isShowingNotification, runCallbacks } =
    useShowNotification(
      [
        () => setIsLoggedIn(false),
        () => Router.push('/'),
        () => setIsLogoutButtonDisabled(false),
      ],
      2000
    );

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

      // If logout is successful; clear cart, show success notification and run callback functions
      clearCart();
      displayNotification();
      runCallbacks();
    } catch (error: any) {
      setIsLogoutButtonDisabled(false);
      console.log(error.message);
    }
  };

  return (
    <>
      {isShowingNotification && (
        <CustomNotification
          title="Successfully logged out!"
          message="You are now being redirected..."
        />
      )}
      <Header height={HEADER_HEIGHT} className={classes.root}>
        <Container className={classes.header}>
          <Link href="/">
            <a>
              <Image
                src="/images/app-logo.svg"
                alt="App Logo"
                width={100}
                height={90}
                onClick={() => setActiveLink('/')}
                className={classes.headerIcon}
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
          <Group>
            <Image
              src="/images/cart-icon.svg"
              alt="Cart Icon"
              width={90}
              height={50}
              onClick={() => setIsModalOpen(true)}
              className={classes.headerIcon}
            />
            {isLoggedIn && (
              <Button
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                disabled={isLogoutButtonDisabled}
                onClick={logoutHandler}
                className={classes.logout}
              >
                Logout
              </Button>
            )}
          </Group>

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
          title={
            <div>
              <Text weight={750} size="xl" color={TITLE_COLOR}>
                YOUR CART
              </Text>
            </div>
          }
        >
          <Cart />
        </Modal>
      </Header>
    </>
  );
}
