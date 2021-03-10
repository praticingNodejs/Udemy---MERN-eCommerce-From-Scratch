import React, { useEffect } from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cart.action';
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../components/Message';
const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;
    const { qty } = qs.parse(location.search);

    const { cartItems } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (productId) {
            // if exist productId, call action add to cart to add product to localStorage
            // the cart information will store in reducer (localStorage)
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {

    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to="/">Go back</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {
                            cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={2}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>${item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                )}
            </Col>
            <Col md={2}>

            </Col>
            <Col md={2}>

            </Col>
        </Row >
    );
};

export default CartScreen;
