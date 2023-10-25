import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TutorialService from "../services/TutorialService";
import ITutorialData from "../types/Tutorial";

const Tutorial = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [currentTutorial, setCurrentTutorial] =
    useState<ITutorialData>(initialTutorialState);
  const [message, setMessage] = useState<string>("");

  const getTutorial = (id: string) => {
    TutorialService.get(Number(id))
      .then((response: any) => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id) getTutorial(id);
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = (status: boolean) => {
    const data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status,
    };

    if (currentTutorial.id)
      TutorialService.update(currentTutorial.id, data)
        .then((response: any) => {
          console.log(response.data);
          setCurrentTutorial({ ...currentTutorial, published: status });
          setMessage("The status was updated successfully!");
        })
        .catch((err) => console.log(err));
  };

  const updateTutorial = () => {
    if (currentTutorial.id)
      TutorialService.update(currentTutorial.id, currentTutorial)
        .then((response: any) => {
          console.log(response.data);
          setMessage("The tutorial was updated successfully!");
        })
        .catch((err) => console.log(err));
  };

  const deleteTutorial = () => {
    if (currentTutorial.id)
      TutorialService.remove(currentTutorial.id)
        .then((response: any) => {
          console.log(response.data);
          navigate("/tutorials");
        })
        .catch((err) => console.log(err));
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status: </strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge bg-primary me-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge bg-primary me-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <button className="badge bg-danger me-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge bg-success"
            onClick={updateTutorial}
          >
            Update
          </button>

          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
