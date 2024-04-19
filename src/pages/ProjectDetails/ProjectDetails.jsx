import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteProject,
  generateProjectReport,
  getSingleProject,
} from "../../api/projectApi";
import Loader from "../../components/Loader/Loader";

import Map from "../../components/Map/Map";
import { useNavigate } from "react-router-dom";

import "./ProjectDetails.css";

import EditProjectModal from "../../components/EditProjectModal/EditProjectModal";
import { TbTrashFilled } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import HomeLayout from "../../layout/HomeLayout/HomeLayout";

function ProjectDetails() {
  const navigate = useNavigate();

  const [project, setProject] = useState([]);
  const [products, setProducts] = useState([]);

  const [isProjectEditModalOpen, setIsProjectEditModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const params = useParams();
  const projectId = params.id;

  useEffect(() => {
    async function getProjectDetails() {
      let projectResponse = await getSingleProject(projectId);

      if (projectResponse.status === 200) {
        setProject(projectResponse.data.project);
        setProducts(projectResponse.data.project.products);
      }
    }

    getProjectDetails();

    // eslint-disable-next-line
  }, []);

  const activeProducts = products.filter((product) => {
    return product.isReadOnly === false;
  });

  // check if there are active products in a project
  const areActiveProductsPresent = activeProducts.length > 0;

  const handleDelete = async () => {
    const deleteResponse = await deleteProject(projectId);
    if (deleteResponse.status === 200 && deleteResponse.statusText === "OK") {
      navigate("/projects");
    }
  };

  const handleGenerateData = async () => {
    setIsGenerating(true);
    const res = await generateProjectReport(projectId);
    setTimeout(async () => {
      setIsGenerating(false);
      if (res.status === 200) {
        navigate("/success");
      }
    }, 3000);
  };

  const handleProjectEditModalOpen = () => {
    setIsProjectEditModalOpen(true);
  };

  const handleProjectEditModalClose = () => {
    setIsProjectEditModalOpen(false);
  };

  const handleGoBack = () => {
    navigate("/projects");
  };

  return (
    <HomeLayout>
      {project.length === 0 ? (
        <Loader text="Project Details" />
      ) : (
        <>
          <div className="projectDetails">
            <button
              className="btn btn-secondary btn-sm btnGoBack"
              onClick={handleGoBack}
            >
              Go Back
            </button>
            <p className="project__ownedBy mt-3">
              @
              {project.author.name +
                " on " +
                new Date(project.createdAt).toDateString()}
            </p>
            <div className="infoContainer">
              <div className="text__info">
                <div className="project__title">{project.title}</div>
                <div className="project__desc mb-3">{project.description}</div>
              </div>

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
                        // aria-hidden="true"
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
                        // aria-hidden="true"
                      ></span>
                      <span className="sr-only">Next</span>
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {/* <p className="lead">
              Unfortunately, the api for getting weather data is not working. As
              a result, Generate Data button is disabled.
            </p> */}
            {project.isActive === true ? (
              <div className="controls mt-4">
                <button
                  type="button"
                  data-toggle="modal"
                  data-target="#staticBackdrop"
                  className="btn btn-warning btn-sm"
                  onClick={handleProjectEditModalOpen}
                >
                  <div className="button-content">
                    <span className="button-text"> Edit</span>
                    <span className="icon__wrapper">
                      <FaEdit className="react__icon" />
                    </span>
                  </div>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  <div className="button-content">
                    <span className="button-text"> Delete</span>
                    <span className="icon__wrapper">
                      <TbTrashFilled className="react__icon" />
                    </span>
                  </div>
                </button>
                {areActiveProductsPresent && (
                  <>
                    <button
                      className="btn btn-success btn-sm btnGenerateData"
                      onClick={handleGenerateData}
                      disabled
                    >
                      <div className="button-content">
                        <span className="button-text">
                          {" "}
                          {isGenerating
                            ? "Generating Data..."
                            : "Generate Data"}{" "}
                        </span>
                        <span className="icon__wrapper">
                          <FaDatabase className="react__icon" />
                        </span>
                      </div>
                    </button>
                  </>
                )}
              </div>
            ) : (
              <small
                style={{ marginBottom: "1rem" }}
                id="infoHelp"
                className="form-text text-muted"
              >
                Info: This project is read only
              </small>
            )}
            <div className="products__section">
              <Map products={products} project={project} />
            </div>
          </div>
        </>
      )}

      {isProjectEditModalOpen && (
        <EditProjectModal
          handleProjectEditModalClose={handleProjectEditModalClose}
          project={project}
        />
      )}
    </HomeLayout>
  );
}

export default ProjectDetails;
