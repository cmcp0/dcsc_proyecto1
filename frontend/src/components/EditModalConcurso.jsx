import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import SweetAlert from 'react-bootstrap-sweetalert';
import ListaConcursos from "./ListaConcursos";
import axios from 'axios';
import * as firebase from 'firebase'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)',
        background: 'rgb(0, 0, 0)',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '30px',
        color: '#e5e5e5',
        width: '30%'
    }
};


export default class EditModalConcurso extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            name: this.props.concurso.nombreconcu,
            description: this.props.concurso.premio,
            fechaInicio: this.props.concurso.feini,
            fechaFin: this.props.concurso.feini,
            image:'',
            url:this.props.concurso.urlconcu,

        };

        this.up = false;
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    editarConcurso() {
       var roleObj=
           {
                nombreconcu:this.state.name,
                urlconcu:this.state.url,
                feini:this.state.fechaInicio,
                fefin:this.state.fechaFin,
                premio:this.state.description,
                administraconcu:this.props.user,
                id:this.props.pk,
        }
        axios.put("http://localhost:8000/project1/concurso", roleObj).then(function () {
            console.log("ok");
        }).catch(function (error) {
            console.log(error);
        });
        alert('Se a editado el concurso');
        this.closeModal();
    }

    render() {
        // Just render a placeholder container that will be filled in
        return (
            <div>

                <button className="btn btn-sm btn-primary" onClick={this.openModal.bind(this)}> Editar Concurso
                </button>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
                           contentLabel="Register"
                           shouldCloseOnOverlayClick={true} style={customStyles}>
                       <div >
                            <div className="text-center">
                                <h3>Editar Concurso</h3>
                            </div>
                            <h5> Nombre </h5>
                            <div>
                                <input className="sinput" id="nombreconcu" type="text" value={this.state.name} placeholder="Nombre" required
                                       onChange={(event) => {
                                           this.setState({name: event.target.value})
                                       }}/>
                            </div>
                            <h5> URL </h5>
                            <div>
                                <input id="urlconcu" className="sinput" type="text" value={this.state.url}
                                       placeholder="URL"
                                       required onChange={(event) => {
                                    this.setState({url: event.target.value})
                                }}/>
                            </div>

                            <h5> Fecha Inicio(DD/MM/YYYY o N/A) </h5>
                            <div>
                                <input id="feini" className="sinput" type="text" value={this.state.fechaInicio}
                                       placeholder="Fecha Inicio" required
                                       onChange={(event) => {
                                           this.setState({fechaInicio: event.target.value})
                                       }}/>
                            </div>
                            <h5> Fecha Fin(DD/MM/YYYY o N/A) </h5>
                            <div>
                                <input id="fefin" className="sinput" type="text" value={this.state.fechaFin}
                                       placeholder="Fecha Fin" required
                                       onChange={(event) => {
                                           this.setState({fechaFin: event.target.value})
                                       }}/>
                            </div>

                            <h5> Descripcion Premio </h5>
                            <div>
                            <textarea id="premio" className="sinput" type="text" value={this.state.description} placeholder="Description"
                                      required onChange={(event) => {
                                this.setState({description: event.target.value})
                            }}></textarea>
                            </div>



                            <div className="row" id="registerButtons">
                                <div className="col-md-6 text-center">
                                    <button type="button submit" className="btn btn-lg btn-primary"
                                            onClick={this.closeModal.bind(this)}>Close
                                    </button>
                                </div>
                                <div className="col-md-6 text-center">
                                    <button onClick={this.editarConcurso.bind(this)} className="btn btn-lg btn-primary">Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}

