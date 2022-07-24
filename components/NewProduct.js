import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import {AiFillStar, AiOutlineStar } from 'react-icons/ai';

const NewProduct = ({newArrivals: {image, name, slug, price}}) => {
  return (
    <div>
      <Link href={`/new-arrivals/${slug.current}`}>
        <div className='product-card'>
          <img 
            src={urlFor(image && image[0])}
            alt={name}
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
          <div className='reviews'>
              <div>
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiFillStar />
                  <AiOutlineStar />
              </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NewProduct