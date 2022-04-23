import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  AppShell,
  Aside,
  Burger,
  Header,
  MediaQuery,
  Title,
  useMantineTheme,
} from '@mantine/core';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import Navbar from './components/Navbar';
import AsidePane from './components/AsidePane';
import Footer from './components/Footer';

const title = <Title order={1}>たてツイート</Title>;

function App(): JSX.Element {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <Router>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint='sm'
        asideOffsetBreakpoint='sm'
        fixed
        navbar={<Navbar opened={opened} />}
        aside={
          <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
            <Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
              <AsidePane />
            </Aside>
          </MediaQuery>
        }
        footer={<Footer />}
        header={
          <Header height={70} p='md'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size='sm'
                  color={theme.colors.gray[6]}
                  mr='xl'
                />
              </MediaQuery>
              {title}
            </div>
          </Header>
        }
      >
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
