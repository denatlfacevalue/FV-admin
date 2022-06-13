import React, { useContext, createContext, useMemo, useEffect } from 'react';
import './App.css';
import SignupComponent from "./components/Signup/SignupComponent"
import Signin from "./components/Signup/Signin"
import Home from "./components/Home/dashboard/Home"
import UpdateEvent from "./components/Events/UpdateEvent"
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AuthContext from './components/Signup/AuthContext';

import EditEvent from './components/Events/EditEvent'
import CreateEvent from './components/Events/CreateEvent'
import EventList from './components/Events/EventList'
import EventDetails from './components/Events/EventDetails';

import Services from './components/Services/Services'
import CreateServiceType from './components/Services/CreateServiceType'
import ServiceTypeList from './components/Services/ServiceTypeList'
import ServiceDetails from './components/Services/ServicesDetails'

import ForumList from './components/Forum/ForumList'
import ForumDetails from './components/Forum/ForumDetails'

import PatientList from './components/PMS/PatientList';
import PatientDetails from './components/PMS/PatientDetails';
import TreatmentList from './components/PMS/TreatmentList';
import TreatmentDetails from './components/PMS/TreatmentDetails';
import TreatmentDetailsList from './components/PMS/TreatmentDetailsList';
import HospitalList from './components/PMS/HospitalList';
import HospitalDetails from './components/PMS/HospitalDetails';


import ForumCommentList from './components/Forum/ForumCommentList';
import ForumLikes from './components/Forum/ForumLikes';

import CreateConsultation from './components/Consultation/CreateConsultation';
import ConsultationList from './components/Consultation/ConsultationList';
import AllConsultationList from './components/Consultation/AllConsultationList';
import EditConsultation from './components/Consultation/EditConsultation';
import ConsultationDetails from './components/Consultation/ConsultationDetails';

import DoctorList from './components/Doctors/DoctorsList';
import DoctorDetails from './components/Doctors/DoctorDetails';

import Transaction from './components/Wallet/Transaction';

import ClinicList from './components/Clinic/ClinicList';
import NotesTypeDetails from './components/Wallet/NotesTypeDetails';
import UserDetails from './components/Wallet/UserDetails';

import SupportList from './components/Support/SupportList';

import SupportDetails from './components/Support/SupportDetails';
import Dashboard from './components/Dashboard/Dashboard';

import AssociationList from './components/Association/AssociationList';
import AssociationDetails from './components/Association/AssociationDetails';
import ConsultationIdDetails from './components/Consultation/ConsultationIdDetails';

import LabOrderList from './components/LabOrders/LabOrderList';
import Demo from './components/LabOrders/Demo';
import LabOrderDetails from './components/LabOrders/LabOrderDetails';
import CreateLaborderVariant from "./components/LabOrders/CreateLaborderVariant"
import jwt, { decode } from 'jsonwebtoken';

import { API_URL } from './httpcommon'


const browserHistory = createBrowserHistory();
const App = (props) => {
  const [token, setToken] = React.useState("invalid")
  const uesememo = useMemo(() => ({
    Login: () => {
      const gettoken = localStorage.getItem("token");
      setToken(gettoken);
    },

    LogoutSubmit: () => {

      localStorage.removeItem("token");
      setToken("invalid");
    }
  }))

  React.useEffect(() => {
    getaccesstoken();
    const gettoken = localStorage.getItem("token");
    setToken(gettoken);
  })

  const getaccesstoken = () => {
    fetch(API_URL + '/admin/users')
      .then((res) => res.json())
      .then((res) => {
        // console.log('res : ' + res);
        if (res.data.length !== 0) {
          localStorage.setItem("accesstoken", res.data[0].token)
          console.log(res)
        }
        else {
          localStorage.setItem("accesstoken", "0")
          console.log("users not found")
        }
      })
  }

  let logintoken = jwt.decode(token)

  if (jwt.decode(token)) {
    logintoken = jwt.decode(token).token_password
  }
  else {
    console.log('error')
  }



  const authcontext = createContext(uesememo)
  if (logintoken === 'FACEVAL_RESILIENCE') {
    return (
      <AuthContext.Provider value={authcontext}>
        <BrowserRouter history={browserHistory}>
          <Switch>
            <Route exact path="/" component={CreateEvent} />
            <Route path="/SignupComponent" component={SignupComponent} />
            <Route path="/home" component={CreateEvent} />
            <Route path="/CreateEvent" component={CreateEvent} />
            <Route path="/UpdateEvent" component={EditEvent} />
            <Route path="/EventList" component={EventList} />
            <Route path="/CreateServiceType" component={CreateServiceType} />
            <Route path="/ServiceTypeList" component={ServiceTypeList} />
            <Route path="/ServiceList" component={Services} />
            <Route path="/ForumList" component={ForumList} />
            <Route path="/ForumDetails" component={ForumDetails} />
            <Route path="/HospitalList" component={HospitalList} />
            <Route path="/HospitalDetails" component={HospitalDetails} />
            <Route path="/PatientList" component={PatientList} />
            <Route path="/PatientDetails" component={PatientDetails} />
            <Route path="/TreatmentList" component={TreatmentList} />
            <Route path="/ForumCommentList" component={ForumCommentList} />
            <Route path="/ForumLikes" component={ForumLikes} />
            <Route path="/CreateConsultation" component={CreateConsultation} />
            <Route path="/ConsultationList" component={ConsultationList} />
            <Route path="/AllConsultationList" component={AllConsultationList} />
            <Route path="/EditConsultant" component={EditConsultation} />
            <Route path="/ConsultationDetails" component={ConsultationDetails} />
            <Route path="/ServiceDetails" component={ServiceDetails} />
            <Route path="/EventDetails" component={EventDetails} />
            <Route path="/TransactionList" component={Transaction} />
            <Route path="/TreatmentDetails" component={TreatmentDetails} />
            <Route path="/TreatmentDetailsList" component={TreatmentDetailsList} />
            <Route path="/DoctorList" component={DoctorList} />
            <Route path="/DoctorDetails" component={DoctorDetails} />
            <Route path="/ClinicList" component={ClinicList} />
            <Route path="/NotesTypeDetails" component={NotesTypeDetails} />
            <Route path="/UserDetails" component={UserDetails} />
            <Route path="/SupportList" component={SupportList} />
            <Route path="/SupportDetails" component={SupportDetails} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/AssociationList" component={AssociationList} />
            <Route path="/AssociationDetails" component={AssociationDetails} />
            <Route path="/ConsultantDetails" component={ConsultationIdDetails} />
            <Route path="/LabOrderList" component={LabOrderList} />
            <Route path="/LabOrderDetails" component={LabOrderDetails} />
            <Route path="/CreateLaborderVariant" component={CreateLaborderVariant} />

            <Route path="/Demo" component={Demo} />
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    );
  }

  else {
    return (
      <AuthContext.Provider value={authcontext}>
        <BrowserRouter history={browserHistory}>
          <Route path="/" component={Signin} />

        </BrowserRouter>
      </AuthContext.Provider>
    );
  }

}

export default App 
