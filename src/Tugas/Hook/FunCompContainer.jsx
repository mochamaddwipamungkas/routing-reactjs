import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Col, Card } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';

const FunCompContainer = () => {

    let [user, setUser] = useState([]);
    let [valueSearch, setValueSearch] = useState('');
    let [loading, setLoading] = useState(false)
    const getApi = (inputKey) => {

        setLoading(true)

        try {
            let url = 'https://newsapi.org/v2/top-headlines?country=id&apiKey=237862ee55f1472db0725d019903c9d0'
            if (inputKey !== '') {
                url = 'https://newsapi.org/v2/everything?apiKey=237862ee55f1472db0725d019903c9d0&q=' + inputKey
            }
            axios.get(url)
                .then(usersx => {
                    const gab = usersx.data.articles
                    setUser(gab)
                    setLoading(false)
                })

            // fetch(url)
            //     .then(res => res.json())
            //     .then(res => {
            //         const gab = res.articles
            //         setUser(gab)
            //         setLoading(false)
            //     })


        } catch (error) {
            setLoading(true)
            console.log(error.message);
        }


    }

    useEffect(() => {

        getApi(valueSearch);

    }, [valueSearch])

    return (

        <div className="row" style={{ padding: '40px 30px' }}>
            <div className="row-md text-center">
                <Form className="d-flex">
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        className="me-2 xxx"
                        aria-label="Search"
                        onChange={e => setValueSearch(e.target.value)}
                    />
                </Form>
            </div>
            <div className="row" style={{ paddingTop: '50px' }}>

                {

                    loading ? <div> Loading.... </div> :
                        user.map((user, idx) => {
                            return (

                                < Col key={idx} className="col-md-4 col-sm-6 mb-5" >
                                    <Card >
                                        <Card.Img variant="top" src={user.urlToImage} />
                                        <Card.Body>
                                            <Card.Title>{user.title}</Card.Title>
                                            <br /><p style={{ color: "grey" }}>{user.author}, {user.publishedAt}</p>

                                            <p>{user.description}</p>

                                            <Button href={user.url} target="blank" variant="primary">Selanjutnya</Button>
                                        </Card.Body>
                                    </Card>

                                </Col>

                            )


                        })
                }

            </div>

        </div >



    )
}

export default FunCompContainer;