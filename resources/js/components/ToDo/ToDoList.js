 import React from 'react';
 import {Link} from "react-router-dom";
 import {toast} from "react-toastify";
 import ReactPaginate from "react-paginate";
 import '../../custom-css/pagination.css';

class ToDoList extends React.Component {

     constructor(props) {
         super(props);

         this.state = {
             offset: 0,
             todos: [],
             originalData: [],
             perPage: 5,
             currentPage: 0
         };

         this.handlePageClick = this.handlePageClick.bind(this);
     }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.originalData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);

        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            todos:slice
        })

    }

    componentDidMount() {
        this.getAllToDo();
    }

    getAllToDo = () => {
        axios.get("/api/todo")
            .then(res=>{
                // console.log(res.data.todos);
                let data = res.data.todos;

                let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    originalData :res.data.todos,
                    todos:slice,
                });
            })
            .catch((errors)=>{
                // console.log(errors);
                alert('Something went wrong');
            })
    };

    deleteToDo = (slug) => {
        // console.log(slug);
        if(confirm('Are you sure you want to delete this data?')){
            axios.delete("/api/todo/"+slug)
                .then(res=>{
                    const isNotId = todo => todo.slug !== slug;
                    const updateToDos = this.state.todos.filter(isNotId);
                    this.setState({
                        todos: updateToDos,
                    });
                    toast.success(res.data);
                })
                .catch((error)=>{
                    // console.log(error.response.data);
                    alert('Something went wrong');
                })
        } else {
            return false;
        }
    };

    render(){
        return (
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title float-left">ToDo List</h5>
                    <Link to={`/create`} className="btn btn-primary float-right btn-sm"><i className="fas fa-plus mr-2"/>Add New ToDo</Link>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sl No.</th>
                                <th>ToDo Name</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { this.state.todos.map((todo, index) => (
                            <tr key={todo.id}>
                                <td>{++index}</td>
                                <td>{ todo.name }</td>
                                <td>{ todo.created_at }</td>
                                <td>
                                    <Link to={`edit-todo/${ todo.slug }`} className="btn btn-outline-success btn-sm mr-2"><i className="fas fa-pencil-alt"/></Link>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => this.deleteToDo(todo.slug)}><i className="fas fa-times"/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>

                </div>
            </div>
        );
    };
}

export default ToDoList;
