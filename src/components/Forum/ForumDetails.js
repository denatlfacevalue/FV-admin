import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormData from "form-data";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Grid } from 'react-bootstrap';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Button from '@material-ui/core/Button';
import { map } from "lodash";
import Moment from 'react-moment';
import axios from 'axios';
import LeftSide from './../Home/dashboard/LeftSide'
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'
const ForumDetails = (props) => {
    const [imageUrl, setimageUrl] = useState([]);
    const [imageIncludes, setimageIncludes] = useState("");
    const [question, setquestion] = useState("");
    const [answer, setanswer] = useState("");
    const [id, setid] = useState("");
    const [creatorName, setcreatorName] = useState("");
    const [created_at, setcreated_at] = useState("");
    const [bookmark, setbookmark] = useState([]);
    const [likes, setlikes] = useState(0);
    const [comments, setcomments] = useState(0);
    const [forumcreatorId, setforumcreatorId] = useState("");
    const [likedUserid, setlikedUserid] = useState([]);

    useEffect(() => {
        fetchforumdetails()
    }, [])

    const fetchforumdetails = () => {
        const id = localStorage.getItem('forumid');
        if (id === null) {

            props.history.push('/ForumList');
        }
        else {

            fetch(API_URL + "/admin/forum/" + id, {

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            })

                .then((res) => res.json())
                .then((res) => {
                    console.log(res.data[0])
                    setimageUrl(res.data[0].imageUrl)
                    setimageIncludes(res.data[0].imageIncludes)
                    setquestion(res.data[0].question)
                    setanswer(res.data[0].answer)
                    setid(res.data[0].id)
                    setcreatorName(res.data[0].creatorName)
                    setcreated_at(res.data[0].created_at)
                    setbookmark(res.data[0].bookmark)
                    setlikes(res.data[0].likes)
                    setcomments(res.data[0].comments)
                    setforumcreatorId(res.data[0].forumcreatorId)
                    setlikedUserid(res.data[0].likedUserid)
                })
                .then((error) => {
                    console.log(error)
                })
        }
    }
    const comment = (id) => {
        localStorage.setItem('forumid', id);
        props.history.push('/ForumCommentList')
    }

    const liked = (id) => {

        localStorage.setItem('forumid', id);
        props.history.push('/ForumLikes')
    }

    const { classes } = props;
    return (
        <LeftSide mainsection={
            <div>
                <Breadcrumbs maxItems={2} style={{ marginLeft: 1 }} aria-label="breadcrumb">
                    <Link to="/ForumList" color="inherit">
                        Forum List
                    </Link>
                    <Link color="inherit" style={{ color: "gray", cursor: "none" }}>
                        Forum Details
                    </Link>
                </Breadcrumbs>
                <div className="white-box details_box">
                    <Container>
                        <Row>
                            <Col sm={8}>
                                <Row style={{ marginTop: 10 }}>

                                    <div className="col-sm-12">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-1 col-md-2 col-sm-2 col-2">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-11 col-md-10 col-sm-10 col-10">
                                                    <b> Question </b>
                                                    <p> {question} </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Row>

                                <Row style={{ marginTop: 10 }}>
                                    <div className="col-sm-12">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-1 col-md-2 col-sm-2 col-2">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-11 col-md-10 col-sm-10 col-10">
                                                    <b> Answer </b>
                                                    <p> {answer} </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Row>

                                <Row style={{ marginTop: 10 }}>
                                    <div className="col-sm-6">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                                                    <b> _Id </b>
                                                    <p> {id} </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                                                    <b> Bookmark </b>
                                                     <p> {bookmark.map((row) => {
                                                        return row + ","
                                                    })} </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Row>

                                <Row style={{ marginTop: 10 }}>
                                    <div className="col-sm-6">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                                                    <b> Likes </b>
                                                    <p> <Link onClick={() => liked(id)} style={{ cursor: "pointer" }}>

                                                        <Button type="button" className="danger-btn" variant="contained" color="primary" style={{ border: "none", minWidth: 25, marginLeft: 2 }} title="view Details">

                                                            {likes}
                                                        </Button> </Link></p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                                                    <b> Comments </b>
                                                    <p> <Link onClick={() => comment(id)} style={{ cursor: "pointer" }}>
                                                        <Button type="button" className="danger-btn" variant="contained" color="primary" style={{ border: "none", minWidth: 25, marginLeft: 2 }} title="view Details">

                                                            {comments === undefined ? <span> 0</span> : comments}
                                                        </Button>
                                                    </Link></p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Row>

                                <Row style={{ marginTop: 10 }}>
                                    <div className="col-sm-6">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                                                    <b> Creator Name </b>
                                                    <p> {creatorName} </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                                                    <b> imageIncludes </b>
                                                   {!imageIncludes ? <p> false </p> : <p> true </p> }
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Row>

                         <Row style={{ marginTop: 10 }}>
                                    <div className="col-sm-12">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-1 col-md-2 col-sm-2 col-2">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-11 col-md-10 col-sm-10 col-10">
                                                   <b> likedUserid </b>
                                                    <p> {likedUserid.map((row) => {
                                                        return row + ","
                                                    })} </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                

                                <Row style={{ marginTop: 10 }}>
                                   

                                    <div className="col-sm-6">
                                        <div className="details_item">
                                            <div className="row">
                                                <div className="col-xl-2 col-md-3 col-sm-3 col-3">
                                                    <i class="fa fa-check-circle-o details_icon" aria-hidden="true"></i>
                                                </div>
                                                <div className="col-xl-10 col-md-9 col-sm-9 col-9">
                                                    <b> CreatedDate </b>
                                                    <p> <Moment format="HH:MM:SS, DD:MM:YYYY">{created_at}</Moment>  </p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </Row>
                            </Col>

                            <Col sm={4}>
                                {imageUrl.map((row) => {
                                    return <img src={row} style={{ width: "100%", marginTop:10 }} />
                                })}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        } />
    );
}

const useStyles = (theme) => ({
    Container: {
        width: "100%",
        display: "flex",
        backgroundColor: "#DFDFDF",
        margin: 10
    },
    TextField: {
        margin: 10,
        width: "100%"
    },
    Typography: {
        margin: 20
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
})
export default withStyles(useStyles)(ForumDetails);