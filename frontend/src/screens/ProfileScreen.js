import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetail, updateUserProfile } from '../actions/user.action';

const ProfileScreen = ({ history }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState();

    const dispatch = useDispatch();

    const { loading, error: userDetailError, user } = useSelector(({ userDetail }) => userDetail);
    const { userInfo } = useSelector(({ userLogin }) => userLogin);
    const { success, error: userUpdateError } = useSelector(({ userUpdateProfile }) => userUpdateProfile)
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            // First it will check if the user profile is exist
            if (!user.name) {
                // If not, call the getUserDetail action to get the user Detail
                // and set it as user in storage
                dispatch(getUserDetail('profile'));
            } else {
                // If the user profile is existed, fill it in
                setEmail(user.email);
                setName(user.name);
            }
        }
    }, [dispatch, history, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ _id: user._id, email, name }));
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {success && <Message variant="success">Profile Updated</Message>}
                {userDetailError && <Message variant="danger">{userDetailError}</Message>}
                {userUpdateError && <Message variant="danger">{userUpdateError}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required={true}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};

export default ProfileScreen;
