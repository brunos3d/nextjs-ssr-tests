import { ReactNode } from 'react';
import styles from './title.module.css';

/* eslint-disable-next-line */
export interface TitleProps {
  children: ReactNode;
}

export function Title({ children }: TitleProps) {
  return <h1 className={styles.title}>{children}</h1>;
}

export default Title;
