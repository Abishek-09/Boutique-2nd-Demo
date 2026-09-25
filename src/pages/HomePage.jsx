import React from 'react';
import Hero from '../components/Hero';
import FeaturesBar from '../components/FeaturesBar';
import Collections from '../components/Collections';
import OurStory from '../components/OurStory';
import Newsletter from '../components/Newsletter';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Bar (Trust Badges) with hover lift */}
      <FeaturesBar />

      {/* Our Collections Section */}
      <Collections />

      {/* Our Story Split Section */}
      <OurStory />

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
};

export default HomePage;
