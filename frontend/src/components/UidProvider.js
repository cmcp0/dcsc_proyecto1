
import React, {Component} from 'react';

class UidProvider extends Component {
    static contextTypes = {
        uid: React.PropTypes.string
    }

    render() {
        return this.props.children(this.context.uid);
    }
}

export default UidProvider;