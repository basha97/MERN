import React, {useState, useEffect} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { updateCategory, getACategory } from './helper/adminapicall';


const UpdateCategories = ({match})  => {

    const [category, setCategory] = useState({
        name: ""
    });
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const {name} = category;

    const preload = (catId) => {
        getACategory(catId).then(data => {
            console.log(data)
            if (data.error) {
                setError(data.error)
            } else {
                setCategory({
                    ...category,
                    name: data.name
                })
            }
        })
    }

    useEffect(() => {
        preload(match.params.catId)
    }, [])

    const {user, token} = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">Go Back</Link>
        </div>
    )

    const handleChange = event => {
        setError("");
        setCategory({
            ...category,
            name: event.target.value
        })
    }

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category Updated Successfully</h4>
        }
    }

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-success">Failed to Update</h4>
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        //backend request fired
        updateCategory(match.params.catId, user._id, token, category)
        .then(data => {
            console.log(data)
            // if (data.error) {
            //     setError(data.error)
            // }else{
            //     setError("");
            //     setSuccess(true);
            //     setName("")
            // }
        })
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input 
                    className="form-control my-3"
                    autoFocus
                    required
                    placeholder="For Ex. Summer"
                    onChange={handleChange}
                    value={name}
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">Update Category</button>
                </div>
            </form>
        )
    }

    return (
        <Base title="Create a Category"
        description="Add a new category for tshirts"
        className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
}

export default UpdateCategories;