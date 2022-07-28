import { createStyles } from '@mantine/core';
import { BACKGROUND_COLOR, MAIN_CONTENT_HEIGHT } from '../../lib/constants';

export const useAuthStyles = createStyles((theme) => ({
  wrapper: {
    backgroundSize: `70% ${MAIN_CONTENT_HEIGHT}`,
    backgroundPositionX: '30vw',
    backgroundImage:
      'url(https://i2.milimaj.com/i/milliyet/75/0x410/62d514e886b24a2b3c93a6a2.jpg)',
    backgroundRepeat: 'no-repeat',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: MAIN_CONTENT_HEIGHT,
    maxWidth: '30%',
    paddingTop: 80,
    backgroundColor: BACKGROUND_COLOR,

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
}));
