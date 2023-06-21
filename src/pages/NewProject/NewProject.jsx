import React, { useEffect, useState } from "react";
import "./NewProject.css";
import { createProject } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";
import { getTemplates } from "../../api/templateApi";
import { ToastContainer, toast } from "react-toastify";

function NewProject() {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    async function fetchTemplates() {
      const response = await getTemplates();
      setTemplates(response.data.templateProducts);
    }

    fetchTemplates();
  }, []);

  const handleFileChange = event => {
    setSelectedFiles(Array.from(event.target.files));
  };
  const handleFileUpload = async evt => {
    evt.preventDefault();
    if (!selectedFiles.length === 0) {
      return toast.error("Please include atleast one image");
    }
    if (!selectedTemplate) {
      return toast.error("Please choose one predefined product");
    }
    if (isUploading) {
      return;
    }

    setIsUploading(true);

    const formData = new FormData();

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    formData.append("title", title);
    formData.append("description", description);
    formData.append("product", JSON.stringify(selectedTemplate));

    console.log(formData);

    const response = await createProject(formData);
    console.log(response);

    if (response.status === 201) {
      navigate("/projects");
    } else if (response.code === "ERR_BAD_REQUEST") {
      toast.error(response.response.data.message);
    }

    setIsUploading(false);
  };

  return (
    <>
      <div className="newProjectWrapper">
        <h1 className="text-center">New Project</h1>
        <ToastContainer theme="dark" />
        <form encType="multipart/form-data">
          <div className="mb-3 ">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={evt => setTitle(evt.target.value)}
              id="title"
              name="title"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              className="form-control"
              type="text"
              value={description}
              id="description"
              name="description"
              onChange={evt => setDescription(evt.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <div className="form-file custom-file">
              <input
                type="file"
                className="form-file-input"
                onChange={handleFileChange}
                id="image"
                name="image"
                multiple
              />
              {selectedFiles.length === 0 ? (
                <label className="form-file-label" htmlFor="image">
                  <span className="form-file-text custom-file-label">
                    Select images
                  </span>
                  <span className="form-file-button">Browse</span>
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="mb-3">
            <p className="lead">Choose among the existing three products</p>
            <div className="form-group">
              <p>
                You have selected:{" "}
                <span style={{ color: "green" }}>
                  {" "}
                  {selectedTemplate.productName}
                </span>
              </p>
            </div>
            <div className="btn-group dropright">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                Select PV Product
              </button>

              <div className="dropdown-menu">
                {templates.map(template => (
                  <div key={template._id}>
                    <li
                      className="dropdown-item"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      {template.productName}
                    </li>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleFileUpload}
              disabled={isUploading}
            >
              {isUploading ? "Adding Project..." : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewProject;
