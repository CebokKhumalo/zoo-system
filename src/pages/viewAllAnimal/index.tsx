import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'antd';
import styles from './viewAnimal.module.css';
import RootLayout from '@/app/layout';
import Card from 'antd/es/card/Card';

const ViewAllAnimal = () => {
    const [allAnimal, setAllAnimal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'https://localhost:44311/api/services/app/Animal/GetAll',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Extract enclosure data from the response and update the state
                const data = response.data;
                setAllAnimal(data.result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: 'Animal Name',
            dataIndex: 'animalName',
            key: 'animalName',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Species Name',
            dataIndex: 'species.speciesName',
            key: 'species.speciesName',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: any) => {
                let genderString = '';

                if (gender === 1) {
                    genderString = 'Male';
                } else if (gender === 2) {
                    genderString = 'Female';
                }

                return genderString;
            },
        },
        {
            title: 'Health Status',
            dataIndex: 'healthStatus',
            key: 'healthStatus',
            render: (health: any) => {
                let healthString = '';

                if (health === 1) {
                    healthString = 'healthy';
                } else if (health === 2) {
                    healthString = 'sick';
                }

                return healthString;
            },
        },
        {
            title: 'Details',
            key: 'details',
            render: (record: any) => (
                <Link href={`/viewAnimal?id=${record.id}`}>
                    <Button>View Details</Button>
                </Link>
            ),
        },
    ];

    return (
        <div
            style={{
                backgroundColor: 'rgba(185, 198, 72, 0.589)',
            }}
        >
            <div className={styles.container}>
                <Card className={styles.card}>
                    <h1>Animal List</h1>
                    <Table dataSource={allAnimal} columns={columns} />
                    <Link href="/createAnimal">
                        <Button className={styles.button}>
                            Create New Animal
                        </Button>
                    </Link>
                </Card>
            </div>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <ViewAllAnimal />
        </RootLayout>
    );
}
