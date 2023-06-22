import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'antd';
import styles from './styles.module.css';
import RootLayout from '@/app/layout';

const ViewAllSpecies = () => {
    const [allAnimal, setAllAnimal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    'https://localhost:44311/api/services/app/Species/GetAllSpecies',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Extract enclosure data from the response and update the state
                const data = response.data;
                setAllAnimal(data.result);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        //     console.log(allAnimal);
        fetchData();
    }, []);

    const columns = [
        {
            title: 'Animal Name',
            dataIndex: 'speciesName',
            key: 'speciesName',
        },
        {
            title: 'Enclosure',
            dataIndex: 'enclosureName',
            key: 'enclosureName',
        },
        {
            title: 'Number',
            dataIndex: 'numberAlive',
            key: 'numberAlive',
        },
        /* {
            title: 'Details',
            key: 'details',
            render: (record: any) => (
                <Link href={`/viewAnimal?id=${record.id}`}>
                    <Button>View Details</Button>
                </Link>
            ),
        },*/
    ];

    return (
        <div
            style={{
                backgroundColor: 'rgba(185, 198, 72, 0.589)',
            }}
        >
            <h1>Animal List</h1>
            <div className={styles.container}>
                <Table dataSource={allAnimal} columns={columns} />
            </div>
            <Link href="/createSpecies">
                <Button>Create New Species</Button>
            </Link>
        </div>
    );
};

export default function WrappedLoginPage() {
    return (
        <RootLayout>
            <ViewAllSpecies />
        </RootLayout>
    );
}
