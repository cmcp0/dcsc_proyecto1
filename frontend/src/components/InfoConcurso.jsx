/**
 * Created by Juan on 17/05/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import EditModalConcurso from "./EditModalConcurso.jsx";
import axios from 'axios'

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

    deleteConcurso(){
        axios.delete("http://localhost:8000/project1/concurso",
            {headers: {
                token: this.props.user,
                pk: this.props.pk,
            }})
            .then(response => {
                this.setState({
                    concursos: response.data
                })
                console.log(this.state.concursos);
                console.log('SUCCESS');
                console.log(response);
            }).catch(function () {
            console.log("err");
        })
    }

    getPath() {
        return 'concursos/'+ this.props.concurso.urlconcu;
    }


    render() {
        console.log(this.props.concurso)
        return (
                <div>
                    <div className="job row">
                        <div className="panel panel-info">

                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-md-10">
                                        <h3 className="panel-title">{this.props.concurso.nombreconcu}</h3 >
                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={this.deleteConcurso.bind(this)} className="deleteAnimal">
                                            &times;
                                        </button>
                                    </div>
                                </div>


                            </div>

                            <div className="col-md-3">


                                <img alt="User Pic"
                                     src={ROOT_URL + this.props.concurso.imagenconcu}
                                     className="img-circle img-responsive"/>
                            </div>

                            <div className="col-md-9">
                                <table className="table table-user-information">
                                    <tbody>
                                    <tr>
                                        <td>Fecha inicio:</td>
                                        <td>{this.props.concurso.feini}</td>
                                    </tr>
                                    <tr>
                                        <td>Fecha fin:</td>
                                        <td>{this.props.concurso.fefin}</td>
                                    </tr>
                                    <tr>
                                        <td>Descripcion:</td>
                                        <td>{this.props.concurso.premio}</td>
                                    </tr>
                                    <tr>
                                        <td>Edit:</td>
                                        <EditModalConcurso edit={this.props.edit} pk={this.props.pk} concurso={this.props.concurso} user={this.props.user}/>
                                    </tr>
                                    <tr>
                                        <a href= {this.props.concurso.urlconcu}>
                                            <button> Ver concurso </button>
                                        </a>
                                    </tr>



                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

}

