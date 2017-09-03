/**
 * Created by Juan on 19/08/2017.
 */
import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import ListaConcursos from './ListaConcursos.jsx'
import ListaVideos from './ListaVideos.jsx'
import axios from 'axios';
import UidProvider from './UidProvider.js'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends Component {

    constructor(props) {
        super(props);

        console.log(this.props);
        this.up = false;
    }

    render() {

        return (
            <UidProvider>
                {(uid) => (
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/concursos' render={(props) => (
                            <ListaConcursos user={uid}/> )}/>
                        <Route path='/:url' render={({match}) => (
                            <ListaVideos
                                user={uid} url={match.params.url}
                            />
                        )}/>
                    </Switch>)
                }
            </UidProvider>)

    }
}

export default Main