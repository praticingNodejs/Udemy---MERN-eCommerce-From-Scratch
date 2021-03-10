import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import { listProducts } from '../actions/product.action';
const HomeScreen = () => {
    // declare to use
    const dispatch = useDispatch();

    // get from store
    const productList = useSelector(({ productList }) => productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        // call listProducts action
        dispatch(listProducts())
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {
                loading ? <Loader message="Loading..." /> :
                    error ? <Message variant="danger">{error}</Message> :
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
            }
        </>
    );
};

export default HomeScreen;
