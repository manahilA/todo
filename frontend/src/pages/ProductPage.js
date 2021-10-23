import React from 'react';
import Navigation from '../components/Navigation';
import Product from '../components/Product';


const ProductPage = () => 
{
    return(
        <div id='home' className="pageSolid">
            <Navigation />
            <Product />
        </div>
    );
}

export default ProductPage;