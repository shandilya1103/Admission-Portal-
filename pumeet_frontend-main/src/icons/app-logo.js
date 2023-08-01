import { styled } from '@mui/material/styles';
import NextLink from 'next/link';

export const AppLogo = styled((props) => {
  return (
    <NextLink
      href="/"
      passHref
    >
      <a>
        <svg width="121" height="30" viewBox="0 0 121 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        </svg>
      </a>
    </NextLink>
  );
})``;
