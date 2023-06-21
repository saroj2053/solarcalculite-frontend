import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteProject, getSingleProject } from "../../api/projectApi";
import Loader from "../../components/Loader/Loader";
// import { useAuth } from "../../context/AuthContext";
import Map from "../../components/Map/Map";
import { useNavigate } from "react-router-dom";

import "./ProjectDetails.css";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
import EditProjectModal from "../../components/EditProjectModal/EditProjectModal";
// import { useTheme } from "../../context/ThemeContext";

function ProjectDetails() {
  const navigate = useNavigate();
  // const [auth] = useAuth();
  const [project, setProject] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false);
  // const [ownsProject, setOwnsProject] = useState(false);

  // const darkTheme = useTheme();
  // const btnColor = darkTheme ? "btnDark" : "btnLight";

  // getting params id for making an api call
  const params = useParams();
  const projectId = params.id;

  useEffect(() => {
    async function getProjectDetails() {
      let projectResponse = await getSingleProject(projectId);

      if (projectResponse.status === 200) {
        setProject(projectResponse.data.project);
        setProducts(projectResponse.data.project.products);

        // setOwnsProject(
        //   auth.user.username === projectResponse.data.project.author.username
        // );
      }
    }

    getProjectDetails();

    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    const deleteResponse = await deleteProject(projectId);
    if (deleteResponse.status === 200) {
      navigate("/projects");
    }
  };

  const handleGenerateData = async () => {};

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProjectEditModalOpen = () => {
    setIsProjectEditModalOpen(true);
  };

  const handleProjectEditModalClose = () => {
    setIsProjectEditModalOpen(false);
  };
  return (
    <>
      {project.length === 0 ? (
        <Loader text="Project Details" />
      ) : (
        <>
          <div className="projectDetails">
            <p className="project__ownedBy">
              @
              {project.author.name +
                " on " +
                new Date(project.createdAt).toDateString()}
            </p>
            <div className="project__title">{project.title}</div>
            <div className="project__desc">{project.description}</div>
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                {project.images.map((image, idx) => (
                  <div
                    key={image._id}
                    className={` carouselImg carousel-item ${
                      idx === 0 ? "active" : ""
                    }`}
                  >
                    <img
                      key={image._id}
                      className="d-block w-100"
                      style={{
                        width: "500px",
                        height: "300px",
                        objectFit: "contain",
                      }}
                      src={image.url}
                      alt=""
                    />
                  </div>
                ))}{" "}
              </div>

              {project.images.length > 1 ? (
                <>
                  {" "}
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-target="#carouselExampleControls"
                    data-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-target="#carouselExampleControls"
                    data-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="sr-only">Next</span>
                  </button>
                </>
              ) : (
                ""
              )}
            </div>
            {/* {ownsProject && ( */}
            <div className="controls">
              <button
                // className={`edit ${btnColor}`}
                type="button"
                data-toggle="modal"
                data-target="#staticBackdrop"
                className="btn btn-outline-warning btn-sm"
                // onClick={() => navigate(`/project/${project._id}/edit`)}
                onClick={handleProjectEditModalOpen}
              >
                Edit
              </button>
              <button
                // className={`delete ${btnColor}`}
                className="btn btn-outline-danger btn-sm"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                // className={`generateData ${btnColor}`}
                className="btn btn-outline-success btn-sm"
                onClick={handleGenerateData}
              >
                Generate Data
              </button>
              <button
                type="button"
                data-toggle="modal"
                data-target="#staticBackdrop"
                className="btn btn-outline-primary btn-sm"
                onClick={handleOpenModal}
              >
                Add Product
              </button>
            </div>
            {/* )} */}
            <div className="products__section">
              <Map products={products} />
            </div>
          </div>
        </>
      )}
      {isModalOpen && (
        <AddProductModal
          handleCloseModal={handleCloseModal}
          project={project}
        />
      )}
      {isProjectEditModalOpen && (
        <EditProjectModal
          handleProjectEditModalClose={handleProjectEditModalClose}
          project={project}
        />
      )}
    </>
  );
}

export default ProjectDetails;
