import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import '../custom-css/app.css';
import Routes from "./Routes";

toast.configure()

function App() {
    return (
        <Router>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h3 className="text-center my-4 app_header">Personal To Do List</h3>

                        <Routes />

                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
