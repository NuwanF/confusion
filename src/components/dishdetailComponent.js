import React, {Component} from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Row, Col, Label, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import {LocalForm, Control, Errors} from 'react-redux-form';

const RenderDish = ({dish}) => {
    if (dish != null) return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    ); else return (
        <div></div>
    );
}

const RenderComments = ({comments}) => {
    const commentList = comments.map((cmt) => {
        return (
            <ul className="list-unstyled">
                <li>{cmt.comment}</li>
                <li>-- {cmt.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmt.date)))}</li>
            </ul>                
        )
    });
    const heading = comments.length > 0 ? <h4>Comments</h4> : "";
    return (
        <div>
            {heading}
            {commentList}
        </div>            
    );
}

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

const DishDetail = (props) => {
    const comments = props.comments ? props.comments :[];
    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>      
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={comments}/>   
                    <CommentForm/>        
                </div>
                
            </div>                        
        </div>            
    );
}

export default DishDetail;