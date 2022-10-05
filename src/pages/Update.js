import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

export default function Update() {
  // Pull the id from the URL using the useParams hook
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill out all the fields correctly");
      return;
    }

    // Send data to supabase
    const { data, error } = await supabase
      // Choose the table
      .from("smoothies")
      // Update the record
      .update({ title, method, rating })
      // Where the id matches the id in the URL
      .eq("id", id);

    if (error) {
      console.log(error);
      setFormError("Please fill out all the fields correctly");
    }
    if (data) {
      console.log(data);
      setFormError(null);
      navigate("/");
    }
  };

  // When the page loads, fire the hook to fetch the smoothie
  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        // Select all entries
        .select()
        // Pull the row where id matches the id from the URL
        .eq("id", id)
        // Only one row
        .single();

      if (error) {
        // Replace the route with the home page if error
        navigate("/", { replace: true });
      }
      if (data) {
        setTitle(data.title);
        setMethod(data.method);
        setRating(data.rating);
        console.log(data);
      }
    };
    fetchSmoothie();
  }, [id, navigate]);

  return (
    <div className="page update">
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

        <button>Update Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
