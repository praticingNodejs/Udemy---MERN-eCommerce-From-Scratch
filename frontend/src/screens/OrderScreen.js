import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDecimals, formatTimeZone } from '../utils';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getOrderDetail, payOrder } from '../actions/order.action';
import { ORDER_PAY_RESET } from '../constants/order.constant';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const { order, loading, error } = useSelector(({ orderDetail }) => orderDetail);
    const { loading: loadingPay, success: successPay } = useSelector(({ orderPay }) => orderPay);

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true
            script.onload = () => {
                setSdkReady(true);
            };

            document.body.appendChild(script);
        };

        // re-render the order detail when having the order
        // or after success payment
        if (!order || successPay || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetail(orderId));
        } else if (!order.isPaid) {
            // if the order did not pay, add the script to the screen
            // the script paypal = window.paypal
            // if exist, default set sdkReady to true in case it always keep spinner: !sdkReady ? <Loader /> : ...
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, order])

    // if loading not finished, the order wil be undefined
    if (!loading) {
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    return (
        <>
            {loading ? <Loader /> :
                error ? <Message variant="danger">{error}</Message> :
                    <>
                        <h1>Order {order._id}</h1>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong> {order.user.name}
                                        </p>
                                        <p>
                                            <strong>Email: </strong> <a href={`mailto:${order.user.email}`} style={{ color: "blue" }}>{order.user.email}</a>
                                        </p>
                                        <p>
                                            <strong>Address</strong>
                                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ? (
                                            <Message variant="success">Deliver on {order.deliveredAt}</Message>
                                        ) : (
                                            <Message variant="danger">Not Deliver</Message>
                                        )}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Payment Method</h2>
                                        <p>
                                            <strong>Method: </strong>
                                            {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (
                                            <Message variant="success">Paid on {formatTimeZone(order.paidAt)}</Message>
                                        ) : (
                                            <Message variant="danger">Not paid</Message>
                                        )}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h2>Order Items</h2>
                                        {order.orderItems.length === 0 ? <Message>Cart is empty</Message> : (
                                            <ListGroup variant="flush">
                                                {order.orderItems.map((item, index) => (
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
                                                <Col>${order.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Shipping</Col>
                                                <Col>${order.shippingPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Tax</Col>
                                                <Col>${order.taxPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total</Col>
                                                <Col>${order.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {/**
                                         * 1. if order.isPaid = false showing the list.item
                                         * 2. if the sdkReady = false, the screen will load until
                                         * useEffect check not exist window.paypal to set sdkReady to true
                                         * then showing the PayPalButton
                                         */}
                                        {!order.isPaid && (
                                            <ListGroup.Item>
                                                {loadingPay && <Loader />}
                                                {!sdkReady ? <Loader /> : (
                                                    <PayPalButton
                                                        amount={order.totalPrice}
                                                        onSuccess={successPaymentHandler}
                                                    />
                                                )}
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </>
            }
        </>
    );
};

export default OrderScreen;
