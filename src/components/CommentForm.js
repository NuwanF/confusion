import React, {Component} from 'react';
import { Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form';

class CommentForm extends Component{

    constructor(props){

        super(props);

        this.state={
            isModalOpen: false,
            touched: {
                yourName: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.RenderComments = this.RenderComments.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    } 

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    RenderComments = () => {

        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);

        return(
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Rating</ModalHeader>
                <ModalBody>                        
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>                        
                        <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, 
                                        minLength: minLength(3), 
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>                                                     
                    </LocalForm>
                </ModalBody>
            </Modal>
        );
    }

    render(){
        return(
            <React.Fragment>
                <Button 
                    type="submit" 
                    color="light"
                    onClick={this.toggleModal}>
                    <i className="fa fa-pencil text-black"></i>
                    &nbsp;
                    Submit Comment
                </Button>
                {this.RenderComments()}
            </React.Fragment>
        );
    }
}

export default CommentForm;

