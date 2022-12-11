import Head from 'next/head';
import Image from 'next/image';
import Cart from '../components/cart/Cart';
import Navigation from '../components/navigation';
import FeatureProducts from '../components/sections/FeatureProducts';
import Footer from '../components/sections/Footer';
import Header from '../components/sections/Header';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ORX Clothing</title>
        <meta name="description" content="ORX Clothing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      
      <main className='px-4 pt-20 sm:px-8 lg:px-20'>
        <Header/>
        <FeatureProducts/>
      </main>
      <Footer/>
    </div>
  );
}
