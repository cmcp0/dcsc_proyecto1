/**
 * Created by Juan on 18/08/2017.
 */
import React, {Component} from 'react';
import axios from 'axios';
import ModalAddVideo from './ModalAddVideo.jsx'
import SweetAlert from 'react-bootstrap-sweetalert';
import InfoVideo  from './InfoVideo.jsx';
import InfoVideoAdmin  from './InfoVideoAdmin.jsx';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-20%',
        transform: 'translate(-50%, -50%)',
        // background: 'rgb(0, 0, 0)',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '30px',
        color: '#e5e5e5',
        width: '30%'
    }
};

export default class ListaVideos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            concurso: {fields:{nombreconcu:'Este concurso no existe'}},
            alert: false,
            videos:[]

        };
        this.succesAlert = (
            <SweetAlert success
                        title="You apply succesfully"
                        onConfirm={() => this.setState({alert: null})}>

            </SweetAlert>
        );

        this.onSelect = this.onSelect.bind(this);
    }

    addVideo(concurso) {
        console.log(concurso);
        var con = this.state.concursos;
        con.push(concurso)
        this.setState({
            concursos: con
        })
    }

    onSelect(val) {
        this.setState({country: val});
    }


    insertJob() {
        // console.log("Insert A Job");
        // Meteor.call('jobs.insert', this.state.name, this.state.description, this.state.city, this.state.country,
        //     this.state.pay, this.state.currency);
        // console.log(Jobs.find({owner: Meteor.userId()}).fetch())
        // console.log("Insert Job");
        // this.closeModal();
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    getConcurso(callback) {
        axios.get("http://localhost:8000/project1/concurso",
            {headers: {
                token: 'no importa',
                url: this.props.url,
                isurl:'true',
            }

            })
            .then(response => {
                this.setState({
                    concurso: response.data[0]
                })
                this.getVideos();
                console.log(this.state.concurso);
                console.log('SUCCESS');
                console.log(response);
            }).catch(function () {
            console.log("err");
        })
    }
    getVideos() {
        axios.get("http://localhost:8000/project1/video",
            {headers: {
                token: parseInt(this.state.concurso.pk),
            }})
            .then(response => {
                this.setState({
                    videos: response.data
                })
                console.log(this.state.videos);
                console.log('SUCCESS');
                console.log(response);
            }).catch(function (error) {
            console.log(error);
        })
    }
    componentDidMount(){

        this.getConcurso();

    }


    render() {
        console.log(this.state.concurso.fields.administraconcu );
        console.log(this.props.user);
        if(!this.props.user){
            return (
                <div className="container job-container">
                    <div className="row">
                        <div className="col-md-3">
                            <div id="job-filter">
                                <ModalAddVideo pk={this.state.concurso.pk}/>
                            </div>
                        </div>
                        <div className="col-md-9 text">
                            <div id="job-filter">
                                <h1>{this.state.concurso.fields.nombreconcu}</h1>
                                {this.state.alert}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-8" id="job-list">
                            {console.log(this.state.videos)}
                            {this.state.videos.map((video, index) => {
                                return <InfoVideo key={index} video={video.fields}/>
                            })}
                        </div>
                    </div>
                </div>)

        }
        else if(this.state.concurso.fields.administraconcu == this.props.user) {
            return (
                <div className="container job-container">
                    <div className="row">
                        <div className="col-md-3">
                            <div id="job-filter">
                                <ModalAddVideo pk={this.state.concurso.pk}/>
                            </div>
                        </div>
                        <div className="col-md-9 text">
                            <div id="job-filter">
                                <h1>{this.state.concurso.fields.nombreconcu}</h1>
                                {this.state.alert}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-8" id="job-list">
                            {console.log(this.state.videos)}
                            {this.state.videos.map((video, index) => {
                                return <InfoVideoAdmin key={index} video={video.fields}/>
                            })}
                        </div>
                    </div>
                </div>)
        }
        else {
            return (
                <div className="container job-container">
                    <div className="row">
                        <div className="col-md-3">
                            <div id="job-filter">
                                <ModalAddVideo pk={this.state.concurso.pk}/>
                            </div>
                        </div>
                        <div className="col-md-9 text">
                            <div id="job-filter">
                                <h1>{this.state.concurso.fields.nombreconcu}</h1>
                                {this.state.alert}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-8" id="job-list">
                            {console.log(this.state.videos)}
                            {this.state.videos.map((video, index) => {
                                return <InfoVideo key={index} video={video.fields}/>
                            })}
                        </div>
                    </div>
                </div>)

        }
    }

}



