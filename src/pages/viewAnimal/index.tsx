import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button, Card, Space, Typography } from 'antd';
import styles from './styles.module.css';

const { Text, Title } = Typography;
import { Animal } from 'interface';
import RootLayout from '@/app/layout';

const ViewAnimal = () => {
    const [animal, setAnimal] = useState<Animal | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const response = await axios.get(
                    `https://localhost:44311/api/services/app/Animal/Get?id=${id}`
                );
                setAnimal(response.data.result);
            } catch (error) {
                console.log(error);
            }
        };

        if (id) {
            fetchAnimal();
        }
    }, [id]);

    const genderMap: { [key: number]: string } = {
        1: 'Male',
        2: 'Female',
        // Add more mappings if needed
    };

    const HealthMap: { [key: number]: string } = {
        1: 'Healthy',
        2: 'Sick',
        // Add more mappings if needed
    };

    return (
        <div className={styles.background}>
            <div
                /* style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}*/
                className={styles.container}
            >
                {animal && (
                    <Card className={styles.card}>
                        <div className={styles.cardInformation}>
                            <Space direction="vertical">
                                <Title>Animal Details</Title>
                                <Text>
                                    ID:{' '}
                                    <Text
                                        style={{
                                            color: ' rgba(189, 185, 185, 0.727)',
                                        }}
                                    >
                                        {animal.id}
                                    </Text>
                                </Text>{' '}
                                <Text>
                                    Name:{' '}
                                    <Text
                                        style={{
                                            color: ' rgba(189, 185, 185, 0.727)',
                                        }}
                                    >
                                        {animal.animalName}
                                    </Text>
                                </Text>{' '}
                                <Text>
                                    Age:{' '}
                                    <Text
                                        style={{
                                            color: ' rgba(189, 185, 185, 0.727)',
                                        }}
                                    >
                                        {animal.age}
                                    </Text>
                                </Text>{' '}
                                <Text>
                                    Gender:{' '}
                                    <Text
                                        style={{
                                            color: ' rgba(189, 185, 185, 0.727)',
                                        }}
                                    >
                                        {genderMap[animal.gender]}
                                    </Text>
                                </Text>{' '}
                                <Text>
                                    Health:{' '}
                                    <Text
                                        style={{
                                            color: ' rgba(189, 185, 185, 0.727)',
                                        }}
                                    >
                                        {HealthMap[animal.healthStatus]}
                                    </Text>
                                </Text>{' '}
                            </Space>
                            <Link href="/viewAllAnimal">
                                <Button className={styles.button}>
                                    View All Animals
                                </Button>
                            </Link>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <ViewAnimal />
        </RootLayout>
    );
}
