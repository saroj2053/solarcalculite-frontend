import React, { useState } from "react";
import "./EditProjectModal.css";

import { useParams } from "react-router-dom";
import { updateProject } from "../../api/projectApi";
import { ToastContainer, toast } from "react-toastify";

function EditProjectModal({ project, handleProjectEditModalClose }) {
  const params = useParams();

  const [title, setTitle] = useState(`${project.title}`);
  const [description, setDescription] = useState(`${project.description}`);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!title) {
      return toast.error("Title is required");
    }
    if (!description) {
      return toast.error("Description is required");
    }

    if (description.length < 20) {
      return toast.error("Description should contain atleast 20 characters");
    }
    const updateResponse = await updateProject(params.id, {
      title,
      description,
    });
    if (updateResponse.status === 200) {
      window.location = `/project/${params.id}`;
    }
  };

  return (
    <>
      <div
        style={{
          margin: "5px auto",
        }}
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit {project.title}
              </h5>
              <ToastContainer theme="dark" />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleProjectEditModalClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="form-group">
                  <label htmlFor="title">Project Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={evt => setTitle(evt.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="desc">Project Description</label>
                  <textarea
                    className="form-control"
                    id="desc"
                    rows={6}
                    value={description}
                    onChange={evt => setDescription(evt.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning btn-sm"
                data-dismiss="modal"
                onClick={handleProjectEditModalClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={e => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProjectModal;
