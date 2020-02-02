import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle
} from 'reactstrap';

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

const FormatDate = (date) =>{
    const normalDate = new Date(date);
    const day = normalDate.toString().split(' ')[2];
    const month = normalDate.toString().split(' ')[1];
    const year = normalDate.getFullYear();
    const displayDate = month + ' ' + day + ', ' + year;
    return displayDate;
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
    const comments = props.selectedDish ? props.selectedDish.comments :[];
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.selectedDish}/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={comments}/>           
                </div>
            </div>
        </div>            
    );
}


export default DishDetail;