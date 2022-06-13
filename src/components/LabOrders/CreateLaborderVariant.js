import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LeftSide from './../Home/dashboard/LeftSide'
import MUIDataTable from "mui-datatables";
import { SpinnerCircular } from 'spinners-react';
import MenuItem from '@material-ui/core/MenuItem';
import { Row, Col, Grid } from 'react-bootstrap';
import 'react-responsive-modal/styles.css';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactClipboard from 'react-clipboardjs-copy'
import { API_URL } from '../../httpcommon'
const CreateLaborderVariant = (props) => {
    const [services, setServices] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [name, setName] = React.useState("");
    const [relateto, setRelateto] = React.useState("clinic");
    const [success, setSuccess] = React.useState("");
    const [successalert, setSuccessalert] = React.useState(false)
    const [required, setRequired] = React.useState("")
    const [deletealert, setDeletealert] = React.useState(false)
    const [deleteid, setDeleteid] = React.useState("");

    const [category, setCategory] = React.useState("");
    const [cost, setCost] = React.useState("");
    const [label, setLabel] = React.useState("");
    const [subLabel, setSubLabel] = React.useState("");
    React.useEffect(() => {
        fetchVariantTypeList()
    }, [])

    const fetchVariantTypeList = () => {
        fetch(API_URL + "/labOrderVariant/allVariants", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            method: "GET"
        })
            .then((res) => res.json())
            .then((res) => {
                setServices(res.data.map((row) => (

                    [row.category, row.label, row.subLabel, row.cost, <Button type="button" onClick={() => deleteconfirm(row.label)} variant="contained" className="danger-btn" color="primary">Delete</Button>]
                )))
                console.log(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const typedelete = (id) => {
        fetch(API_URL + "/labOrderVariant/deleteByLabel/" + id, {
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
                    fetchVariantTypeList()
                }
            })
            .catch((error) => {
                alert('érror')
                console.log(error)
            })
    }


    const deleteconfirm = (id) => {
        setDeleteid(id);
        setDeletealert(true)
    };

    //const columns = [ "Name", "Relatedto", "Action"];

    const columns = [
        {
            name: "Category",
            label: "Category",
            options: {
                filter: false,
                sort: true,
            }
        },
        {
            name: "Name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "Sub Label",
            label: "Sub Label",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Cost",
            label: "Cost",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "Action",
            label: "Action",
            options: {
                filter: false,
                sort: false,
            }
        }
    ]

    const data = [
        ["Test Corp", "Yonkers", "NY"],
    ];

    const options = {
        filterType: "checkbox",
        download: false,
        print: true,
        viewColumns: true,
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



    const submithandle = () => {
        if (label === "" || category === "" || cost === "" || subLabel === "") {
            setRequired("this field is required.")
        }
        else {
            fetch(API_URL + '/labOrderVariant/create', {
                method: "POST",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Accept-Encoding': 'gzip,deflate,br',
                    'Connection': 'keep-alive',
                },

                body: JSON.stringify({
                    category: category,
                    name: name,
                    cost: cost,
                    label: label,
                    subLabel: subLabel
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === true) {
                        setName("");
                        setCategory("");
                        setCost("");
                        setLabel("");
                        setSubLabel("");
                        console.log(res)
                        setSuccessalert(true)
                        fetchVariantTypeList()
                    }
                    else {
                        alert(res.message)
                        setName("");
                        setCategory("");
                        setCost("");
                        setLabel("");
                        setSubLabel("");
                    }
                })
                .catch((error) => {
                    alert('error')
                    console.log(error)
                })
        }


    }

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
                        onConfirm={() => typedelete(deleteid)}
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
                {loading === false ?
                    <Container style={{ marginBottom: 50 }}>
                        <div className="white-box">
                            <Typography component="h1" variant="h5" className={classes.Typography}>
                                Create Laborder Variants Types

                <h4 style={{ color: "green", fontWeight: "bold" }}>
                                    {success}
                                </h4>
                            </Typography>

                            <div style={{ margin: 10, alignSelf: "center", marginTop: -20 }}>
                                <Row>
                                    <Col>
                                        <TextField id="outlined-basic" label="Category" value={category} onChange={(e) => setCategory(e.target.value)} variant="outlined" className={classes.TextField} required />

                                        <TextField id="outlined-basic" label="Name" value={label} onChange={(e) => setLabel(e.target.value)} variant="outlined" className={classes.TextField} required />
                                    </Col>
                                    <Col>
                                        <TextField id="outlined-basic" label="Cost" value={cost} onChange={(e) => setCost(e.target.value)} variant="outlined" className={classes.TextField} required />
                                        <TextField id="outlined-basic" label="sub-Label" value={subLabel} onChange={(e) => setSubLabel(e.target.value)} variant="outlined" className={classes.TextField} required />

                                    </Col>
                                </Row>
                                <div style={{ margin: 10, alignSelf: "center", marginTop: -20, width: "20%" }}>
                                    <Button className="submit_button" type="submit" variant="contained" color="primary" style={{ marginTop: 25, width: 200 }} onClick={() => submithandle()}>
                                        Submit Variant
          </Button>
                                </div>
                            </div>
                        </div>
                    </Container >
                    : null}


                {loading === false && services ?
                    <MUIDataTable className="table_holder"
                        title={"Lab Order Variant Type List"}
                        data={services}
                        columns={columns}
                        options={options}
                    />
                    : null}
            </React.Fragment>
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
export default withStyles(useStyles)(CreateLaborderVariant);


