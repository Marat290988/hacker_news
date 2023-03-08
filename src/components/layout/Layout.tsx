import { FC } from 'react';
import styles from './Layout.module.css';
import Navigation from './Navigation';

const Layout: FC<{children: JSX.Element}> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}

export default Layout;
