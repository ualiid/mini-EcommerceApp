import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";
import {Link} from 'react-router-dom'
const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  
  const { image, title, price, category, description } = product;
 
  

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);
  return (
    <div className="ui grid container">
      {Object.keys(product).length === 0 ? (
        <div clasName='ui container'>
                  <i aria-hidden="true" class="circle notched loading icon"></i>

        </div>

       
      ) : (
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img className="ui fluid image" src={image} />
              </div>
              <div className="column rp">
                <h1>{title}</h1>
                <h2>
                  <a className="ui teal tag label">$ {price}</a>
                </h2>
                <h3 className="ui brown block header">{category}</h3>
                <p>{description}</p>
                
                <div className="ui vertical animated button" tabIndex="0">
                  <div className="hidden content">
                    <i className="shop icon"></i>
                  </div>
                  <div className="visible content">Add to Cart</div>
               
               

                </div>
                <Link to='/' > 
                  <button class="ui animated button" style={{marginTop:'5rem'}}>
                    <div class="visible content">Back</div>
                    <div class="hidden content">
                      <i aria-hidden="true" class="arrow left icon"></i>
                      </div>
                      </button>
                </Link> 


               
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
