import { createStyles } from '@mantine/core';

export const useLoginStyles = createStyles((theme) => ({
  wrapper: {
    height: '90vh',
    backgroundSize: '70% 90vh',
    backgroundPositionX: '30vw',
    backgroundImage:
      'url(https://i2.milimaj.com/i/milliyet/75/0x410/62d514e886b24a2b3c93a6a2.jpg)',
    backgroundRepeat: 'no-repeat',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: '90vh',
    maxWidth: '30%',
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  alertContainer: {
    color: 'white',
    // opacity: 1,
    bottom: '2%',
    left: '2%',
    position: 'fixed',
    zIndex: 99999999,
  },

  alert: {
    position: 'relative',
  },
}));
