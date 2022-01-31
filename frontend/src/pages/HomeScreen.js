import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useSelector } from 'react-redux'
import Message from '../components/layout/Message';
import Loader from '../components/layout/Loader'

const HomeScreen = () => {

    const connectEther = useSelector((state) => state.connectEther);
    const { loading, error, etherDetails } = connectEther;
    let tx = etherDetails?.tx?.split(',') || [];
    return (
        <>
            <Header />
            <main className="py-3">
                <Container>
                    <h1>Etherscan Clone</h1>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <>
                            {/* {Object.entries(etherDetails).forEach((ether, index) => (
                                <div key={index} className="mb-3">
                                    console.log(index, ether)
                                    <h3>{ether.balance}</h3>
                                    <p>{ether.gasPrice}</p>
                                    <p>{ether.blocknum}</p>
                                </div>
                            ))} */}
                            <p>Address: {etherDetails?.address}</p>
                            <p>Balance: {etherDetails?.balance}</p>
                            <p>Gas Price: {etherDetails?.gasPrice}</p>
                            <p>Block Number: {etherDetails?.blocknum}</p>
                            <p>Transactions:</p>
                            <div>

                                {Object.entries(tx).forEach((t) => (
                                    <ul className="mb-3">
                                        {/* <p>{t[1]}</p> */}
                                        <li>Hello</li>
                                    </ul>
                                ))}
                            </div>
                        </>
                    )}
                </Container>
                <Footer />
            </main>
        </>
    );
};

export default HomeScreen;
