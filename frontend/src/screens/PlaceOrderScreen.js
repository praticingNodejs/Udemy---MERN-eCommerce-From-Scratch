import React, { useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import CheckoutStep from '../components/CheckoutStep';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/order.action';
import { addDecimals } from '../utils/number';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();

    const {
        shippingAddress: {
            address,
            city,
            postalCode,
            country,
        },
        paymentMethod,
        cartItems,
    } = useSelector(({ cart }) => cart);

    const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100); // free ship if budget > 100
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

    const totalPrice = addDecimals(Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice));

    const { loading, order, success, error } = useSelector(({ orderCreate }) => orderCreate);
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, order, success])
    const processOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: {
                address,
                city,
                postalCode,
                country,
            },
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        }))
    };

    return (
        <div>
            <CheckoutStep step1 step2 step3 step4 />
            {loading && <Loader />}
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address</strong>
                                {address}, {city}, {postalCode}, {country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? <Message>Cart is empty</Message> : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} * {item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && <ListGroup.Item>
                                <Message variant="danger">{error}</Message>
                            </ListGroup.Item>}

                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cartItems.length === 0}
                                    onClick={processOrderHandler}
                                >Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PlaceOrderScreen;
