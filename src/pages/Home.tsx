import TopBar from "../components/TopBar";
import {Layout} from "antd";
const Home = () => (
    <Layout
        style={{
            width: '100vw',
            minHeight: '100vh',
        }}
    >
        <Layout.Header style={{
            height: '200px',
            width: '100%',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            padding: '10px 20px',
        }}>
            <TopBar />
        </Layout.Header>

        <Layout.Content>
            <h1>Home</h1>
        </Layout.Content>
    </Layout>
)

export default Home
