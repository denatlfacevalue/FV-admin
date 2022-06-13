import React from 'react';
import PropTypes from "prop-types"
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Link } from 'react-router-dom';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ForumIcon from '@material-ui/icons/Forum';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AirlineSeatReclineExtraIcon from '@material-ui/icons/AirlineSeatReclineExtra';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
class MainListItems extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            isEventClicked: false,
            isPmsClicked: false,
            isServicesClicked: false,
            isConsultationClicked: false,
            isDoctorsClicked: false,
            isHospitalClicked: false,
            isLaborderClicked: false,
            isForumClicked: false,
            isTransactionsClicked: false,
            getTabnumberClicker: 1
        }

    }

    render() {
        return (

            <div>
                {/* <div>
                    <Link style={{textDecoration:"none", color:"black"}} >
                    <ListItem button >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    </Link>
                </div> */}
                <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isEventClicked: !prevState.isEventClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <EventAvailableIcon />
                        </ListItemIcon>
                        <ListItemText primary="Events" />
                    </ListItem>
                    {this.state.isEventClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/CreateEvent">
                                <ListItem button>
                                    <ListItemIcon>
                                        <EventAvailableIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Event" />
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/EventList">
                                <ListItem button>
                                    <ListItemIcon>
                                        <EventAvailableIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Event" />
                                </ListItem>
                            </Link>
                        </div>
                    }
                </div>


                <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isLaborderClicked: !prevState.isLaborderClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <EventAvailableIcon />
                        </ListItemIcon>
                        <ListItemText primary="Laborder" />
                    </ListItem>
                    {this.state.isLaborderClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/CreateLaborderVariant">
                                <ListItem button>
                                    <ListItemIcon>
                                        <RoomServiceIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Laborder Variant" />
                                </ListItem>
                            </Link>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/LaborderList">
                                <ListItem button>
                                    <ListItemIcon>
                                        <EventAvailableIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Laborder" />
                                </ListItem>

                            </Link>

                        </div>
                    }
                </div>


                <div>
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isPmsClicked: !prevState.isPmsClicked

                        }))
                    }}>
                        <ListItemIcon>
                            <PeopleOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="PMS" />


                    </ListItem>
                    {this.state.isPmsClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            {/* <Link style={{textDecoration:"none", color:"black"}} to="/PatientList">
                            <ListItem button >
                                <ListItemIcon>
                                    <PeopleOutlineIcon />
                                </ListItemIcon>
                                <ListItemText primary="View Patient" />
                            </ListItem>
                            </Link> */}
                            <Link style={{ textDecoration: "none", color: "black" }} to="/HospitalList">
                                <ListItem button >
                                    <ListItemIcon>
                                        <PeopleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Hospitals" />
                                </ListItem>
                            </Link>
                        </div>
                    }
                </div>

                <div>
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isDoctorsClicked: !prevState.isDoctorsClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <AccessibilityIcon />
                        </ListItemIcon>
                        <ListItemText primary="Doctors" />
                    </ListItem>
                    {this.state.isDoctorsClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/DoctorList">
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccessibilityIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Doctors" />
                                </ListItem>
                            </Link>
                            {/* <Link style={{textDecoration:"none", color:"black"}} to="/VerifyDoctorList">
                            <ListItem button >
                                <ListItemIcon>
                                    <AccessibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Verify Doctors" />
                            </ListItem>
                            </Link> */}
                        </div>
                    }
                </div>

                <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isHospitalClicked: !prevState.isHospitalClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <AirlineSeatReclineExtraIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clinics" />


                    </ListItem>
                    {this.state.isHospitalClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/ClinicList">
                                <ListItem button>
                                    <ListItemIcon>
                                        <AirlineSeatReclineExtraIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Clinics" />
                                </ListItem>
                            </Link>
                            {/* <Link style={{textDecoration:"none", color:"black"}} to="/CreateEvent">
                            <ListItem button >
                                <ListItemIcon>
                                    <AirlineSeatReclineExtraIcon />
                                </ListItemIcon>
                                <ListItemText primary="Add Clinics" />
                            </ListItem>
                            </Link> */}
                        </div>
                    }
                </div>

                {/* <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isLaborderClicked: !prevState.isLaborderClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <BathtubIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lab Orders" />


                    </ListItem>
                    {this.state.isLaborderClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                             <Link style={{textDecoration:"none", color:"black"}} to="/CreateEvent">
                            <ListItem button >
                                <ListItemIcon>
                                    <BathtubIcon />
                                </ListItemIcon>
                                <ListItemText primary="View Patient" />
                            </ListItem>
                            </Link>
                            <Link style={{textDecoration:"none", color:"black"}} to="/CreateEvent">
                            <ListItem button >
                                <ListItemIcon>
                                    <BathtubIcon />
                                </ListItemIcon>
                                <ListItemText primary="View Hospitals" />
                            </ListItem>
                            </Link>
                        </div>
                    }
                </div> */}
                <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isServicesClicked: !prevState.isServicesClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <RoomServiceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Services" />


                    </ListItem>
                    {this.state.isServicesClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/ServiceTypeList">
                                <ListItem button >
                                    <ListItemIcon>
                                        <RoomServiceIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Service Types" />
                                </ListItem>
                            </Link>

                            <Link style={{ textDecoration: "none", color: "black" }} to="/ServiceList">
                                <ListItem button >
                                    <ListItemIcon>
                                        <RoomServiceIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Services" />
                                </ListItem>
                            </Link>
                        </div>
                    }
                </div>
                <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isConsultationClicked: !prevState.isConsultationClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <EmojiPeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Consultation" />


                    </ListItem>
                    {this.state.isConsultationClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/CreateConsultation">
                                <ListItem button>
                                    <ListItemIcon>
                                        <EmojiPeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Add Consultant" />
                                </ListItem>
                            </Link>

                            <Link style={{ textDecoration: "none", color: "black" }} to="/ConsultationList">
                                <ListItem button >
                                    <ListItemIcon>
                                        <EmojiPeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Consultations" />
                                </ListItem>
                            </Link>

                            <Link style={{ textDecoration: "none", color: "black" }} to="/AllConsultationList">
                                <ListItem button >
                                    <ListItemIcon>
                                        <EmojiPeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Consultant" />
                                </ListItem>
                            </Link>
                        </div>
                    }
                </div>
                <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isForumClicked: !prevState.isForumClicked
                        }))
                    }}>
                        <ListItemIcon >
                            <ForumIcon />
                        </ListItemIcon>
                        <ListItemText primary="Forum" />


                    </ListItem>
                    {this.state.isForumClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/ForumList">
                                <ListItem button>
                                    <ListItemIcon>
                                        <ForumIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Forum" />
                                </ListItem>
                            </Link>
                        </div>
                    }
                </div>
                <div >
                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isTransactionsClicked: !prevState.isTransactionsClicked
                        }))
                    }}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />

                    </ListItem>
                    {this.state.isTransactionsClicked &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/TransactionList">
                                <ListItem button>
                                    <ListItemIcon>
                                        <ReceiptIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="View Transactions" />
                                </ListItem>
                            </Link>
                        </div>
                    }


                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isSupport: !prevState.isSupport
                        }))
                    }}>
                        <ListItemIcon>
                            <ReceiptIcon />
                        </ListItemIcon>
                        <ListItemText primary="Support" />

                    </ListItem>
                    {this.state.isSupport &&
                        <div style={{ marginTop: 10, paddingLeft: 25 }}>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/SupportList">
                                <ListItem button>
                                    <ListItemIcon>
                                        <ReceiptIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Support List" />
                                </ListItem>
                            </Link>
                        </div>
                    }




                    <ListItem button onClick={() => {
                        this.setState(prevState => ({
                            isTransactionsClicked: !prevState.isTransactionsClicked
                        }))
                    }}>
                    </ListItem>
                </div>
            </div>
        )
    }
}
MainListItems.propTypes = {
    sendData: PropTypes.func,
};
export default MainListItems;


