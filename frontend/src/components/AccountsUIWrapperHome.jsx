import React, {Component} from 'react';
import Modal from 'react-modal';
import * as firebase from 'firebase';
import axios from 'axios';
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


export default class AccountsUIWrapperHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            name: '',
            lastname: '',
            CV: '',
            CVLink: '',
            email: '',
            password: '',
            cpassword: '',

        };

        this.up = false;
    }

    registerUser() {
        console.log("ENTRO");
        var state = this.state

        if (this.state.password === this.state.cpassword) {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function (snapshot) {
                    snapshot.updateProfile({
                        displayName: state.name
                    }).then(function () {
                        console.log("update done");
                        console.log(snapshot.uid);

                        var roleObj = {token: snapshot.uid,
                            nombres: state.name,
                            apellidos: state.lastname,
                            email: state.email,
                            contrasena:state.password
                        };
                        console.log(JSON.stringify(roleObj));
                        axios.post("http://localhost:8000/project1/usuario", JSON.stringify(roleObj)).then(function () {
                            console.log("ok");
                        }).catch(function () {
                            console.log("err");
                        });
                    }, function (error) {
                        // An error happened.
                    });
                }).catch(function (err) {
                    console.log(err);
                });

            this.closeModal();
        }
        else {
            console.log("T P A N T S");
            alert("The passwords are not the same");
        }
    }

    uploadFile() {
        console.log("ENTRO");
        var file = document.getElementById("file-upload").files[0];
        console.log(file);
        //
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('200 OK');
                }
                else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
        xhr.setRequestHeader('Authorization', 'Bearer ' + process.env.DROPBOX_ACCESS_TOKEN);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        xhr.setRequestHeader('Dropbox-API-Arg', '{"path":"/CV}" )');

        xhr.send(file);
        // $.ajax({
        //     url: 'https://content.dropboxapi.com/2/files/upload',
        //     type: 'post',
        //     data: file.da,
        //     processData: false,
        //     contentType: 'application/octet-stream',
        //     headers: {
        //         "Authorization": "Bearer"+ process.env.DROPBOX_ACCESS_TOKEN,
        //         "Dropbox-API-Arg": '{"path": "/test_upload.txt","mode": "add","autorename": true,"mute": false}'
        //     },
        //     success: function (file) {
        //         console.log(file);
        //     }
        // })
        this.up = true;

    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        // Just render a placeholder container that will be filled in
        return (
            <div>
                <button id="button" onClick={this.openModal.bind(this)}>Register</button>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal.bind(this)}
                           contentLabel="Register"
                           shouldCloseOnOverlayClick={true} style={customStyles}>
                        <form onSubmit={this.registerUser.bind(this)}>
                            <div className="text-center">
                                <h3>Register</h3>
                            </div>
                            <h5> First Name </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.name} placeholder="Name" required
                                       onChange={(event) => {
                                           this.setState({name: event.target.value})
                                       }}/>
                            </div>
                            <h5> Last Name </h5>
                            <div>
                                <input id="sinput" type="text" value={this.state.lastname} placeholder="Lastname"
                                       required onChange={(event) => {
                                    this.setState({lastname: event.target.value})
                                }}/>
                            </div>
                            <h5> Email </h5>
                            <div>
                                <input id="sinput" type="email" value={this.state.email} placeholder="Email" required
                                       onChange={(event) => {
                                           this.setState({email: event.target.value})
                                       }}/>
                            </div>
                            <h5> Password </h5>
                            <div>
                                <input id="sinput" type="password" value={this.state.password} placeholder="Password"
                                       required onChange={(event) => {
                                    this.setState({password: event.target.value})
                                }}/>
                            </div>
                            <h5> Confirm Password </h5>
                            <div>
                                <input id="sinput" type="password" value={this.state.cpassword}
                                       placeholder="Confirm Password"
                                       required onChange={(event) => {
                                    this.setState({cpassword: event.target.value})
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
