import * as React from "react";
import {reduxForm} from "redux-form";
// import {validate} from "../utilities/validate";

class Form extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.onSubmit(values);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                {this.props.children}
            </form>
        )
    }
}

//export default reduxForm()(Form);
export default reduxForm({
    form: 'Form',
    // validate
})(Form);