import React, {Fragment} from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner,  }   from '../components';

const Home = ({products, banner}) => {
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

      <FooterBanner footerBanner={banner && banner[0]} />
    </Fragment>
  )
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: {products, banner}
  }
}

export default Home;