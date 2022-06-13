
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Button from '@material-ui/core/Button';
import 'react-responsive-modal/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LeftSide from './../Home/dashboard/LeftSide'
import "../../index.css";
import { Link } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import MUIDataTable from "mui-datatables";
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import SweetAlert from 'react-bootstrap-sweetalert';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { API_URL } from '../../httpcommon'

const EventList = (props) => {
  const [services, setServices] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [deletealert, setDeletealert] = React.useState(false)
  const [deleteid, setDeleteid] = React.useState("");
  const [successalert, setSuccessalert] = React.useState(false)

  React.useEffect(() => {
    fetchlist()
  }, [])

  const fetchlist = () => {
    setLoading(true)
    fetch(API_URL + "/admin/event/list")
      .then((res) => {
        res.json().then((result) => {
          if (result.status) {
            setServices(result.data.map((row) => (
              [row._id, row.Category, row.event_date, row.event_type, row.title, row.entryfee, row.tags.map((row=>{return `${row}  `})).toString(), row.seatsBooked, row.seatAvailable, <Button>
                <Button class="warning-btn" type="button" onClick={() => viewdetails(row._id)} style={{ border: "none", width: 25 }} variant="contained" color="primary" ><i className="fa fa-info" /></Button>
                <Link to="/UpdateEvent"><Button class="success-btn" type="button" variant="contained" style={{ border: "none", width: 25 }} color="primary" onClick={() => EventUpdate(row._id)} ><i className="fa fa-pencil" /></Button></Link>
                <Button type="button" class="danger-btn" onClick={() => deleteconfirm(row._id)} style={{ border: "none", width: 25 }} variant="contained" color="primary" ><i className="fa fa-trash" /></Button></Button>]
            )))
            setLoading(false)
          } else {
            setServices(null)
          }
          console.warn(result)
        })
      })
  }

  const viewdetails = (id) => {
    localStorage.setItem('eventid', id)
    props.history.push('/EventDetails')
  };


  const deleteconfirm = (id) => {
    setDeleteid(id);
    setDeletealert(true)
  };

  const eventdelete = (id) => {
    fetch(API_URL + "/admin/event/" + id, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      method: "DELETE"
    })
      .then((res) => res.json())
      .then((res) => {

        if (res.status === true) {
          setDeletealert(false)
          setSuccessalert(true)
          fetchlist()
        }
      })
      .catch((error) => {
        alert('érror')
        console.log(error)
      })
  }

  const EventUpdate = (eventid) => {
    localStorage.setItem('eventid', eventid)
  }

  //const columns = ["Id", "Category", "EventDate", "EventType", "Title", "EntryFee", "Tags", "seatBooked", "seatAvailable", "Action"];

  const columns = [
  {
  name: "Id",
  label: "Id",
  options: {
   filter: false,
   sort: true,
  }
 },

 {
  name: "Category",
  label: "Category",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "EventDate",
  label: "EventDate",
  options: {
   filter: false,
   sort: true,
   customBodyRender: (value, tableMeta, updateValue) => {
    return(
      <Moment format="HH:MM:SS, DD:MM:YYYY">{value}</Moment> 
    )
  }
  }
 },

 {
  name: "EventType",
  label: "EventType",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "Title",
  label: "Title",
  options: {
   filter: false,
   sort: true,
  }
 },


 {
  name: "EntryFee",
  label: "EntryFee",
  options: {
   filter: false,
   sort: true,
  }
 },

  {
  name: "Tags",
  label: "Tags",
  options: {
   filter: false,
   sort: true,
  }
 },

  {
  name: "SeatBooked",
  label: "SeatBooked",
  options: {
   filter: false,
   sort: true,
  }
 },

  {
  name: "SeatAvailable",
  label: "SeatAvailable",
  options: {
   filter: false,
   sort: true,
  }
 },


 {
  name: "Action",
  label: "Action",
  options: {
   filter: false,
   sort: true,
  }
 },

 
]

  const options = {
     filter: true,
        filterType: "checkbox",
        print: true,
        viewColumns: true,
        download:false,
        selectableRows: 'none',
        onRowClick: (rowData) => {
            console.log("RowClicked->", rowData);
        },
        responsive: "stacked",
        fixedHeaderOptions: {
            xAxis: true,
            yAxis: true,
        },
  };


  const { classes } = props;
  return (
    <LeftSide mainsection={

      <React.Fragment>
        {deletealert === true ?
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={() => eventdelete(deleteid)}
            onCancel={() => setDeletealert(false)}
            focusCancelBtn
          >

            You will not be able to recover this data!
</SweetAlert>
          : null}
        {successalert === true ?
          <SweetAlert
            success
            title="Success Data!"
            timeout={2000}
            onConfirm={() => setSuccessalert(false)}
          >
            This success message will automatically close after 2 seconds
</SweetAlert>
          : null}


        {loading === true ?
          <div style={{ textAlign: "center", marginTop: 150 }}>
            <SpinnerCircular enabled={loading} />
          </div>
          : null}

        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link color="inherit" style={{ color: "gray", cursor: "none" }}>
            EventList
      </Link>
        </Breadcrumbs>
        {
          loading === false && services ?
            <MUIDataTable className="table_holder"
              title={"Event List"}
              data={services}
              columns={columns}
              options={options}

            />
            : null}

      </React.Fragment>
    } />
  );
}
export default EventList;