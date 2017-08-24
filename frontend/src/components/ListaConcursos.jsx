/**
 * Created by Juan on 18/08/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import ModalAdd from './ModalAdd.jsx'

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

export default class ListaConcursos extends Component {

    constructor(props) {
        super(props);

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(val) {
        this.setState({country: val});
    }

    onSliderChange(value) {
        this.setState({filterPay: value});
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

    render() {

        return (
            <div className="container job-container">
                <div className="col-md-3">
                    <div id="job-filter">
                        <ModalAdd/>
                    </div>

                </div>
                <div className="col-md-9" id="job-list">
                    {/*{filteredJobs.map((job, index) => {*/}
                    {/*return <Job key={index} delete={true} job={job}/>*/}
                {/*})}*/}
                </div>
            </div>

        )
    }

}

ListaConcursos.propTypes = {
    jobs: PropTypes.array,
    currentUser: PropTypes.object,
    onSelect: React.PropTypes.func
};

