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


export default class ModalAddVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            name: '',
            description: '',
            apellidos:'',
            video:'',
            email:'',

        };

        this.up = false;
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    insertarVideo() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0'+dd
        }
        if(mm<10) {
            mm = '0'+mm
        }
        today = mm + '/' + dd + '/' + yyyy;
        var formData = new FormData();
        formData.append('nombres',this.state.name);
        formData.append('apellidos',this.state.apellidos);
        formData.append('video',document.getElementById('video').files[0]);
        formData.append('email',this.state.email);
        formData.append('mensaje',this.state.description);
        formData.append('pk',this.props.pk);
        formData.append('fecha',today);
        formData.append('formato',document.getElementById('video').files[0].name.split('.')[1]);
        console.log(formData);
        console.log(document.getElementById('video').files[0]);
        axios.post("http://localhost:8000/project1/video", formData).then(function () {
            console.log("ok");
        }).catch(function () {
            console.log("err");
        });
        alert('Hemos recibido tu video y lo estamos procesado para que sea publicado. Tan pronto el video quede publicado en la página del concurso te notificaremos por email.');

        this.closeModal();
    }

    render() {
        // Just render a placeholder container that will be filled in
        return (
            <div>

                <button className="btn btn-sm btn-primary" onClick={this.openModal.bind(this)}> Añadir Video
                </button>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
                           contentLabel="Register"
                           shouldCloseOnOverlayClick={true} style={customStyles}>
                        <form id="form-insertar" onSubmit={this.insertarVideo.bind(this)}>
                            <div className="text-center">
                                <h3>Añadir Video</h3>
                            </div>
                            <h5> Nombres </h5>
                            <div>
                                <input className="sinput" id="nombres" type="text" value={this.state.name} placeholder="Nombre" required
                                       onChange={(event) => {
                                           this.setState({name: event.target.value})
                                       }}/>
                            </div>

                            <h5> Apellidos </h5>
                            <div>
                                <input id="apellidos" className="sinput" type="text" value={this.state.apellidos}
                                       placeholder="Apellidos"
                                       required onChange={(event) => {
                                    this.setState({apellidos: event.target.value})
                                }}/>
                            </div>
                            <h5> Email </h5>
                            <div>
                            <input id="email" className="sinput" type="email" value={this.state.email} placeholder="Email"
                                      required onChange={(event) => {
                                this.setState({email: event.target.value})
                            }}></input>
                            </div>
                            <h5> Video </h5>
                            <div>

                                <input id="video" type="file" value={this.state.video}
                                       placeholder="Seleccione la imagen"
                                       onChange={(event) => {
                                        this.setState({video: event.target.value})
                                }}/>
                            </div>

                            <h5> Mensaje </h5>
                            <div>
                            <textarea id="mensaje" className="sinput" type="text" value={this.state.description} placeholder="Mensaje"
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
                                    <button type="submit" className="btn btn-lg btn-primary">Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                    <div className="col-md-3"></div>
                </div>
            </div>
        )
    }
}

