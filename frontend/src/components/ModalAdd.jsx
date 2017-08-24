import React, {Component} from 'react';
import Modal from 'react-modal';
import SweetAlert from 'react-bootstrap-sweetalert';
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


export default class ModalAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            name: '',
            description: '',
            city: '',
            country: '',
            pay: '',
            currency: '',

        };

        this.up = false;
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    insertarConcurso() {
        this.closeModal();
    }
    render() {
        // Just render a placeholder container that will be filled in
        return (
            <div>

                <button className="btn btn-sm btn-primary" onClick={this.openModal.bind(this)}> Añadir Concurso
                </button>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
                           contentLabel="Register"
                           shouldCloseOnOverlayClick={true} style={customStyles}>
                        <form onSubmit={this.insertarConcurso.bind(this)}>
                            <div className="text-center">
                                <h3>Añadir Concurso</h3>
                            </div>
                            <h5> Name </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.name} placeholder="Name" required
                                       onChange={(event) => {
                                           this.setState({name: event.target.value})
                                       }}/>
                            </div>
                            <h5> Description </h5>
                            <div>
                            <textarea id="sinput" type="text" value={this.state.description} placeholder="Description"
                                      required onChange={(event) => {
                                this.setState({description: event.target.value})
                            }}></textarea>
                            </div>
                            <h5> Country </h5>
                            <div>

                            </div>
                            <h5> City </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.city}
                                       placeholder="City"
                                       required onChange={(event) => {
                                    this.setState({city: event.target.value})
                                }}/>
                            </div>
                            <h5> Pay </h5>
                            <div>
                                <input id="sinput" type="number" value={this.state.pay}
                                       placeholder="Pay"
                                       required onChange={(event) => {
                                    this.setState({pay: event.target.value})
                                }}/>
                            </div>
                            <h5> Currency </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.currency}
                                       placeholder="Currency"
                                       required onChange={(event) => {
                                    this.setState({currency: event.target.value})
                                }}/>
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
