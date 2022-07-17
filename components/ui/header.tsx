import React, { useState } from 'react';
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Modal,
  Button,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string; label: string }[];
}

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const { asPath } = useRouter();

  const [opened, toggleOpened] = useBooleanToggle(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [active, setActive] = useState(asPath);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={() => {
          setActive(link.link);
          toggleOpened(false);
        }}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={0} className={classes.root}>
      <Container className={classes.header}>
        <Link href="/">
          <a>
            <Image
              src="/images/app-logo.svg"
              alt="App Logo"
              width={90}
              height={90}
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

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
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
        Cart items fetched from the redux store should appear here.
      </Modal>
    </Header>
  );
}
