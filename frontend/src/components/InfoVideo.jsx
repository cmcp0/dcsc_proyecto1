/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditModalConcurso from "./EditModalConcurso.jsx";

const ROOT_URL = "http://localhost:8000/media/";
export default class InfoConcurso extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alert: null,
        };
        this.warningAlert = (
            <SweetAlert warning
                        confirmBtnText="OK!"
                        confirmBtnBsStyle="danger"
                        cancelBtnBsStyle="default"
                        title="You already apply for this job"
                        onConfirm={() => this.setState({alert: null})}>

            </SweetAlert>
        );
        this.succesAlert = (
            <SweetAlert success
                        title="You apply succesfully"
                        onConfirm={() => this.setState({alert: null})}>

            </SweetAlert>
        );
    }

    deleteJob() {
        const texto = "The job have been deleted";
        const hideAlert = () => {
            this.setState({
                alert: null
            });
        };
        const succesA = () => {
            console.log("delete");
            this.setState({
                alert: getSuccessAlert
            });

        };
        const deleteThisJob = () => {
            this.setState({
                alert: null
            });

        };

        const getWAlert = (

            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={succesA}
                onCancel={hideAlert}
            >
                You would not recover this information!
            </SweetAlert>
        );
        const getSuccessAlert = (
            <SweetAlert
                success
                title={texto}
                onConfirm={deleteThisJob}>
            </SweetAlert>

        );
        this.setState({
            alert: getWAlert
        });


    }

    getPath() {
        return 'concursos/'+ this.props.concurso.urlconcu;
    }


    render() {
        console.log(this.props.video)
        return (
            <div className="container" id="job-filter">
                <div>
                    <h2> {this.props.video.estado}</h2>
                    <h4>{this.props.video.nombreconcursante} {this.props.video.apellidoconcursante}</h4>
                    <h4>Email: {this.props.video.emailconcursante}</h4>
                    <h4> Mensaje: {this.props.video.descrip}</h4>
                    <br/>
                    <h4>Video original</h4>
                    <video width="400" controls>
                    <source src={ROOT_URL+ this.props.video.videoSubido} type="video/mp4"/>
                    Your browser does not support HTML5 video.</video>

                    <h4>Video convertido</h4>
                    <video width="400" controls>
                        <source src={ROOT_URL+ this.props.video.videoPublicado} type="video/mp4"/>
                        Your browser does not support HTML5 video.</video>

                </div>
            </div>
        )
    }

}

