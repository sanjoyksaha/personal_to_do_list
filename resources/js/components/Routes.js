import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';
import ToDoList from "./ToDo/ToDoList";
import Create from "./ToDo/Create";
import Edit from "./ToDo/Edit";
import NotFound from "./NotFound";

class Routes extends React.Component {
    render() {
        return(
            <div>
                <Switch>
                    <Route path="/" exact component={ ToDoList }/>
                    <Route path="/create" exact component={ Create }/>
                    <Route path="/edit-todo/:slug" exact component={ Edit }/>
                    <Route path="*" exact component= { NotFound } />
                </Switch>
            </div>
        );
    };
}

export default withRouter(Routes);
