import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";
import Activity from "./Activity";

export default function ActivitiesPage() {
  // todo

  // grab activities
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  // invalidates tags -> trigger API call -> trigger rerender
  // rename so no conflict with query variables!
  const {
    mutate,
    data: addedActivity,
    loading: adding,
    error: addError,
  } = useMutation("POST", "/activities", ["activities"]);

  // const addActivity = () => {};

  // grab token
  const { token } = useAuth();

  return (
    <>
      <h1>Activities</h1>
      <p>Imagine all the activities!</p>

      {!activities && (
        <>
          <p>No activities yet...</p>
        </>
      )}

      {activities &&
        activities.map((item) => {
          {
            if (token) {
              return (
                <div key={item.id}>
                  <p>{item.name}</p>
                  <button>Remove</button>
                </div>
              );
            }
            return <p key={item.id}>{item.name}</p>;
          }
        })}
    </>
  );
}
