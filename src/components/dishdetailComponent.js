import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import {Link} from 'react-router-dom';

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
                </div>
            </div>
        </div>            
    );
}


export default DishDetail;