import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: ""
  });
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);


  useEffect(() => {
    if (mode === "update") {
      const config = { url: `/tasks/${taskId}`, method: "get", headers: { Authorization: authState.token } };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);



  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({
      description: task.description
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    if (mode === "add") {
      const config = { url: "/tasks", method: "post", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
    else {
      const config = { url: `/tasks/${taskId}`, method: "put", data: formData, headers: { Authorization: authState.token } };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  }


  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
<MainLayout>
  <form className='m-auto my-16 max-w-[1000px] bg-richblack-800 p-8 border-0  shadow-md rounded-md text-richblack-5 '>
    {loading ? (
      <Loader />
    ) : (
      <>
        <h2 className='text-center mb-4 font-bold'>{mode === "add" ? "Add New Task" : "Edit Task"}</h2>
        <div className="mb-4">
          <label htmlFor="description" className="text-richblack-5">Description</label>
          <Textarea type="description" name="description" id="description" value={formData.description} placeholder="Write here.." onChange={handleChange} className="w-full rounded-md bg-richblack-700 p-2 text-richblack-5" />
          {fieldError("description")}
        </div>

        <button className='bg-yellow-50 text-richblack-900 px-4 py-2 font-medium hover:bg-yellow-100 rounded-md transition-all' onClick={handleSubmit}>
          {mode === "add" ? "Add task" : "Update Task"}
        </button>
        <button className='ml-4 bg-red-500 text-white px-4 py-2 font-medium hover:bg-red-600 transition-all rounded-md' onClick={() => navigate("/")}>
          Cancel
        </button>
        {mode === "update" && 
          <button className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600 transition-all rounded-md' onClick={handleReset}>
            Reset
          </button>
        }
      </>
    )}
  </form>
</MainLayout>

    </>
  )
}

export default Task