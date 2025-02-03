import { h } from 'preact';

import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import Draw from './components/functional/Draw'


export function App() {
  

  useEffect(() => {
      
  }, []);
  return (
    <>
    <Header />
    <Draw />
    <Footer />
    </>
  );
}
