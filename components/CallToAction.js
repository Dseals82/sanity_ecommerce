import React from 'react'
import Link from 'next/link';

const CallToAction = () => {
  return (
    <div className='call-to-action-container'>
    <h2>Act Now!!!</h2>
    <h1>Up to <span className='call-to-action-red'>70% Off</span> - All Earbuds & Headphones</h1>
        <Link href='/'>
            <button type="button" >
                Explore More
            </button>
        </Link>
    </div>
  )
}

export default CallToAction