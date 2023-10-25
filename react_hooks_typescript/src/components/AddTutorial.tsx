import { useState } from "react";
import TutorialService from "../services/TutorialService";
import ITutorialData from "../types/Tutorial";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [tutorial, setTutorial] = useState<ITutorialData>(initialTutorialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description,
    };

    TutorialService.create(data)
      .then((response: any) => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const newtutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newtutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <button onClick={saveTutorial} className="btn btn-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTutorial;
