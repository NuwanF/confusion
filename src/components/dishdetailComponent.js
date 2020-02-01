import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle
} from 'reactstrap';

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderDish = (dish) => {
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

    formatDate(date){
        const normalDate = new Date(date);
        const day = normalDate.toString().split(' ')[2];
        const month = normalDate.toString().split(' ')[1];
        const year = normalDate.getFullYear();
        const displayDate = month + ' ' + day + ', ' + year;
        return displayDate;
    }

    renderComments(comments) {
        const commentList = comments.map((cmt) => {
            return (
                <ul className="list-unstyled">
                    <li>{cmt.comment}</li>
                    <li>-- {cmt.author} , {this.formatDate(cmt.date)}</li>
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

    render() {
        const comments = this.props.selectedDish ? this.props.selectedDish.comments :[];
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.selectedDish)}
                </div>
                <div className="col-12 col-md-5 m-1">                    
                    {this.renderComments(comments)}
                </div>
            </div>
        );
    }
}

export default Dishdetail;