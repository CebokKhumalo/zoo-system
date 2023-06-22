import './globals.css';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import styles from './styles.module.css';

const { Header, Content, Sider } = Layout;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const handleLogout = () => {
        localStorage.clear();
    };

    return (
        <div className={styles.background}>
            <Layout style={{ minHeight: '100vh' }}>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    className={`${styles.menu} menu`}
                    // style={{ height: '50%' }}
                >
                    <Menu.Item key="/loginPage" className={styles.link}>
                        <Link href="/loginPage" onClick={handleLogout}>
                            Login
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={`/userPage?id=}`} className={styles.link}>
                        <Link href={`/userPage?id=`}>View Profile</Link>
                    </Menu.Item>

                    <Menu.Item key="/viewAllEnclosure" className={styles.link}>
                        <Link href="/viewAllEnclosure">View Enclosure</Link>
                    </Menu.Item>
                    <Menu.Item key="/viewAllAnimal" className={styles.link}>
                        <Link href="/viewAllAnimal">View Animal</Link>
                    </Menu.Item>
                    <Menu.Item key="/viewEmployee" className={styles.link}>
                        <Link href="/viewEmployee">View Employee</Link>
                    </Menu.Item>
                    <Menu.Item key="/viewAllSpecies" className={styles.link}>
                        <Link href="/viewAllSpecies">View Species</Link>
                    </Menu.Item>

                    {/* Add more menu items for other pages */}
                </Menu>
                <Content>{children}</Content>
            </Layout>
        </div>
    );
}
