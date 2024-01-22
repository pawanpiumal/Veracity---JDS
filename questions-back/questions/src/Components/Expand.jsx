import React, { Component } from 'react';
import './datatable.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'

class Expand extends Component {

    getShortAnswers = (item) => {
        var keyList = Object.keys(item)
        var shortKeyArray = keyList.filter(e => e.includes('short_answer'))
        var shortAnsArray = []
        shortKeyArray.forEach(e => {
            if (item[e] !== "") {
                shortAnsArray.push(item[e])
            }
        })
        return shortAnsArray
    }

    render() {

        return (
            <Container>
                {
                    this.getShortAnswers(this.props.data).length !== 0 ?
                        <div>
                            <Row style={{ margin: '20px' }}>
                                <Col style={{ textAlign: 'left' }}>
                                    <h6>{this.props.data.question_text[0].toUpperCase() + this.props.data.question_text.slice(1) + ' ?'}</h6>
                                </Col>
                            </Row>
                            {
                                this.getShortAnswers(this.props.data).map((e, index) => {
                                    return (
                                        <Row>
                                            <Col xs={1}>
                                                <p>{index + 1}</p>
                                            </Col>
                                            <Col style={{ textAlign: 'left' }}>
                                                <p>{e.slice(1,-1)}</p>
                                            </Col>
                                        </Row>
                                    )
                                })}
                        </div>
                        :
                        null
                }
                {
                    JSON.parse(this.props.data.yes_no_answer.replace(/'/g, '"')).filter(e => e === 'YES' || e === 'NO').length !== 0 ?
                        <div style={{ marginBottom: '10px' }}>
                            <Row style={{ margin: '20px' }}>
                                <Col style={{ textAlign: 'left' }}>
                                    <h6>Yes No Answer : </h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        JSON.parse(this.props.data.yes_no_answer.replace(/'/g, '"')).map(e => {
                                            if (e.toLowerCase() === "yes") {
                                                return (<h4 style={{ display: 'inline', margin: '5px' }}><Badge bg="success" >✔</Badge></h4>)
                                            } else if (e.toLowerCase() === "no") {
                                                return (<h4 style={{ display: 'inline', margin: '5px' }}><Badge bg="danger">✘</Badge></h4>)
                                            } else {
                                                return (<h4 style={{ display: 'inline', margin: '5px' }}><Badge bg="warning">/</Badge></h4>)
                                            }
                                        })

                                    }
                                </Col>
                            </Row>
                        </div> :
                        null
                }
                {
                    JSON.parse(this.props.data.yes_no_answer.replace(/'/g, '"')).filter(e => e === 'YES' || e === 'NO').length === 0 && this.getShortAnswers(this.props.data).length === 0 ?
                        <div>
                            <Row style={{ margin: '15px' }}>
                                <Col>
                                    <p>No Answers.</p>
                                </Col>
                            </Row>
                        </div> :
                        null
                }
            </Container>
        );
    }
}

export default Expand;