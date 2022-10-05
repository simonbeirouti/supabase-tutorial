import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function Create() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  // Create function when form is submitted
  const handleSubmit = async (e) => {
    // Prevent the page reloading
    e.preventDefault();
    // Check that the values are not empty
    if (!title || !method || !rating) {
      setFormError("Please fill out all the fields correctly");
      return;
    }
    // Connect to supabase and insert the data
    const { data, error } = await supabase
      // Choose the table that you want to add to
      .from("smoothies")
      // Add the data which we pull from the form if there isn't an error
      .insert([{ title, method, rating }]);

    // If there is an error, set the form error to the error message
    if (error) {
      console.log(error);
      setFormError("Please fill out all the fields correctly");
    }

    // If there is data, log it and reset any error messages
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
