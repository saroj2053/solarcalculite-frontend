import React, { useEffect, useState } from "react";
import "./Projects.css";
import { getProjects } from "../../api/projectApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

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

  function getFirstNCharacters(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "...." : str;
  }

  return (
    <>
      {showLoader ? (
        <Loader text="Projects" />
      ) : (
        <>
          {projects.length > 0 ? (
            <>
              <div className="projects__heading">Projects Available</div>
              <div className="projectsWrapper">
                {projects.map(project => (
                  <div key={project._id} className="projects">
                    <div className="project">
                      <div className="project__text">
                        <h4>{project.title}</h4>

                        <p>{getFirstNCharacters(project?.description, 120)}</p>

                        <div className="project__moreInfo">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => navigate(`/project/${project._id}`)}
                          >
                            More Info
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
