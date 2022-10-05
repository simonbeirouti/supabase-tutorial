import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import SmoothieCard from "../components/SmoothieCard";

export default function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  // Delete the smoothie from the local state by checking for the id
  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) => {
      return prevSmoothies.filter((smoothie) => smoothie.id !== id);
    });
  };

  // Fetching the smoothies from the database
  useEffect(() => {
    // Function to fetch the smooothis from the database
    const fetchSmoothies = async () => {
      // We get two things back, data and error
      const { data, error } = await supabase
        // Choosing the table
        .from("smoothies")
        // Selecting all results
        .select()
        .order(orderBy, { ascending: false });
      // If there is an error, we set the error state
      if (error) {
        // Return an custom message
        setFetchError("Could not fetch the smoothies");
        // Set smoothies to null (in case there is values already)
        setSmoothies(null);
      }
      // If there is no error, we set the smoothies state
      if (data) {
        // Set the smoothies state to the smoothies we got back
        setSmoothies(data);
        // Set the error state to null (in case there is an error already)
        setFetchError(null);
      }
    };
    // Calling the function to get the data
    fetchSmoothies();
  }, [orderBy]);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>
              Time Created
            </button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                smoothie={smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
