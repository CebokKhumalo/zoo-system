import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import styles from './styles.module.css';
import RootLayout from '@/app/layout';

const { Title } = Typography;

interface User {
    enclosureName: string;
    speciesName: string;
    numberAlive: number;
}

const CreateSpecies = () => {
    const [animalData, setAnimalData] = useState<User | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAnimalData({
            enclosureName: '',
            speciesName: '',
            numberAlive: 0,
        });
    };

    const handleCreate = async (e: React.FormEvent) => {
        try {
            const response = await axios.post(
                `https://localhost:44311/api/services/app/Species/CreateSpecies`,
                animalData
            );
            const newEmployee: User = response.data.result;
            setAnimalData({
                enclosureName: '',
                speciesName: '',
                numberAlive: 0,
            });
            console.log('New animal created:', newEmployee);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <Card className={styles.card}>
                    <Title>Create New Species</Title>
                    <Form onFinish={handleCreate}>
                        <Form.Item label="Species Name" name="speciesName">
                            <Input type="text" onChange={handleInputChange} />
                        </Form.Item>
                        <Form.Item label="Enclosure Name" name="enclosureName">
                            <Input type="text" onChange={handleInputChange} />
                        </Form.Item>

                        <Form.Item label="numberAlive" name="numberAlive">
                            <Input type="number" onChange={handleInputChange} />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit">Create Animal</Button>
                            <Link href="/createSpecies">
                                <Button>Create Species</Button>
                            </Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <CreateSpecies />
        </RootLayout>
    );
}
