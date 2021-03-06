import React from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

class Create extends React.Component {

    state = {
        name: '',
        errors: {},
    };

    changeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    createToDo = (e) => {
        e.preventDefault();
        const { history } = this.props;

        const formData = {
            name: this.state.name,
        };

        axios.post("/api/todo", formData)
            .then(res=>{
                this.setState({
                    name: ''
                });
                toast.success(res.data.success);
                history.push(`/`);
            })
            .catch((errors)=>{
                this.setState({
                    errors: errors.response.data.errors,
                });
            })
    };


    render () {
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Add New To Do</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={ this.createToDo }>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-md-3">To Do Name</label>
                            <div className="col-md-9">
                                <input type="text" name="name" value={ this.state.name } onChange={ (e) => this.changeInput(e) } className="form-control" id="name" />

                                {this.state.errors && (
                                    <p className={`text-danger`}>{this.state.errors.name}</p>
                                )}
                            </div>
                        </div>
                        <div className="col-md-9 offset-md-3">
                            <Link to={`/`} className="btn btn-success btn-sm mr-2"><i className="fas fa-arrow-left"/></Link>
                            <button className="btn btn-primary btn-sm"><i className="fas fa-plus"/></button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

export default Create;
