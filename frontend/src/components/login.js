import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Container, Card } from 'react-bootstrap';


const Login = props => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const onChangeName = e => {
        const name = e.target.value
        setName(name)
    }
    const onChangeEmail = e => {
        const email = e.target.value
        setEmail(email)
    }

    const navigate = useNavigate()

    const login = () => {
        if (!name || !email) {
            alert('Please enter both name and email!');
            return;
        }
        props.login({ name: name, email: email });
        navigate("/");
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '400px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Welcome Back!</Card.Title>

                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                value={name}
                                onChange={onChangeName}
                                // onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={onChangeEmail}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            onClick={login}
                            className="w-100"
                        >
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )


}

export default Login;