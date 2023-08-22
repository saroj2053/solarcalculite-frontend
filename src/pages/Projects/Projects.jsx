import React, { useEffect, useState } from "react";
import "./Projects.css";
import { getProjects } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { RiFileInfoFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [activeFilter, setActiveFilter] = useState(true);
  const [inactiveFilter, setInactiveFilter] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects();
        setProjects(response.data.projects);
        setShowLoader(false);
      } catch (error) {
        console.log("Error fetching products:", error);
        setShowLoader(false);
      }
    }
    fetchProjects();
  }, []);

  const handleFilterChange = evt => {
    const { name, checked } = evt.target;
    if (name === "active") {
      setActiveFilter(checked);
    } else if (name === "inactive") {
      setInactiveFilter(checked);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (activeFilter && inactiveFilter) {
      return true;
    } else if (activeFilter) {
      return project.isActive;
    } else if (inactiveFilter) {
      return !project.isActive;
    }
    return false;
  });

  function getFirstNCharacters(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "...." : str;
  }

  return (
    <>
      {showLoader ? (
        <Loader text="Projects" />
      ) : (
        <>
          {" "}
          {projects.length > 0 ? (
            <>
              <div className="projects__heading">Projects Available</div>
              <div className="filter-section">
                <div className="filter-label">Filter By: </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="active"
                    checked={activeFilter}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox1">
                    Active
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="inactive"
                    checked={inactiveFilter}
                    onChange={handleFilterChange}
                  />
                  <label className="form-check-label" htmlFor="inlineCheckbox2">
                    InActive
                  </label>
                </div>
              </div>
              <div className="cta__addProject mt-4">
                <button
                  className="btn btn-primary btn-sm projectAddBtn"
                  onClick={() => navigate("/new-project")}
                >
                  <div className="buttonElements">
                    <span className="iconWrapperAddBtn">
                      <FaPlus className="icon-faplus" />
                    </span>
                    <span className="btnProjectMore"> Add More Projects</span>
                  </div>
                </button>
              </div>

              <div className="projectsWrapper">
                {filteredProjects.map(project => (
                  <div key={project._id} className="projects">
                    <div className="project">
                      <div className="project__text">
                        <h2>{project.title} </h2>

                        <p>{getFirstNCharacters(project?.description, 120)}</p>

                        <div className="project__moreInfo">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => navigate(`/project/${project._id}`)}
                          >
                            <div className="button-content">
                              <span className="button-text"> More Info</span>
                              <span className="icon__wrapper">
                                <RiFileInfoFill className="react__icon" />
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="project__image">
                        <img
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          src={project.images[0].url}
                          alt={project.images[0].filename}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              style={{
                height: "85vh",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>No projects found</div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/new-project")}
              >
                Add New Project
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Projects;
