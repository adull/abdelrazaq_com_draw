import { h } from 'preact';

import { useState, useEffect } from 'preact/hooks';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';


export function App() {
  

  useEffect(() => {
      console.log(`yerr`)
  }, []);
  return (
    <>
    <Header />
    <Footer />
    </>
  );
}
