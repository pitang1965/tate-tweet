import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell, Title } from '@mantine/core';
import '@mantine/core/styles.css';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

import Navbar from './components/Navbar';
import AsidePane from './components/AsidePane';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <Router>
      <AppShell
        navbar={{
          width: { sm: 200, lg: 300 },
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        aside={{
          width: { sm: 200, lg: 300 },
          breakpoint: 'sm',
        }}
        header={{
          height: 70,
        }}
        footer={{
          height: 60,
        }}
        padding="md"
      >
        <Navbar opened={opened} />
        <AsidePane />
        <Header opened={opened} setOpened={setOpened} />
        <Footer />
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}

export default App;
