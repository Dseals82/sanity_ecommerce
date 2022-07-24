import React, {Fragment} from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner, NewProduct, CallToAction }   from '../components';


const Home = ({products, banner, newArrivals}) => {
  return (
    <Fragment>
      <HeroBanner heroBanner={banner.length && banner[0]} />

      <div className='products-heading'>
      <h2>Best selling Products</h2>
      <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {
          products.map((product) => (
            <Product key={product._id} product={product}/>
          ))
          }
      </div>

      <CallToAction />
      {/* New Arrivals     */}
      <div className='products-heading'>
      <h2>New Arrivals</h2>
      <p>Headsets for superior gaming experience</p>
      </div>

      <div className='products-container'>
        {
          newArrivals.map((product) => (
            <NewProduct key={product._id} newArrivals={product}/>
          ))
          }
      </div>

      <FooterBanner footerBanner={banner && banner[0]} />
    </Fragment>
  )
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const newArrivalQuery = '*[_type == "new-arrivals"]';
  const newArrivals = await client.fetch(newArrivalQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: {products, banner, newArrivals}
  }
}

export default Home;