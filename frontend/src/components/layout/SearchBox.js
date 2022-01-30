import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { connectToEther } from '../../redux/actions/etherActions';

const SearchBox = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    // const connectEther = useSelector((state) => state.connectEther);
    // const { loading, error, etherDetails } = connectEther;
    const submitHandler = (e) => {
        e.preventDefault();
        // if (keyword.trim() && keyword.length === 42) {
        if (keyword.trim()) {
            let text = keyword.trim();
            // axios.get('/api/search', { params: { text } })
            dispatch(connectToEther(text));
            // axios.get(`${axios.baseUrl}/api/search?text=${text}`)
            // history.push(`/search/${keyword}`);
            // console.log(text);
        } else {
            alert('Please enter a valid address');
            // history.push('');
        }
    }
    return (
        <>
            <Form className="d-flex" onSubmit={submitHandler}>
                <Form.Control type="text" className="mr-sm-2 ml-sm-5" placeholder="Search by address" name="q" value={keyword} onChange={(e) => setKeyword(e.target.value)} ></Form.Control>
                <Button type="submit" variant="success" className="p-2">Search</Button>
            </Form>
        </>
    );
};

export default SearchBox;
