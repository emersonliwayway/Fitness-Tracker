import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

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

  const addActivity = (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    mutate({ name, description });
  };

  // activity component
  const ActivityItem = ({ activity }) => {
    const { token } = useAuth();

    const {
      mutate: deleteActivity,
      loading: adding,
      error: addError,
    } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

    return (
      <li>
        <p>{activity.name}</p>
        {token && (
          <>
            <p>{activity.description}</p>
            <button onClick={() => deleteActivity()}>Remove</button>
          </>
        )}
      </li>
    );
  };

  // form component
  const Form = ({ addActivity }) => {
    return (
      <>
        <h2>Add a new activity</h2>
        <form action={addActivity}>
          <label>
            Activity:
            <input name="name" />
          </label>
          <br />
          <label>
            Description:
            <input type="text" name="description" />
          </label>
          <br />
          <button>Submit</button>
        </form>
      </>
    );
  };

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
      <ul>
        {activities &&
          activities.map((item) => {
            return <ActivityItem key={item.id} activity={item} />;
          })}
      </ul>
      {token && <Form addActivity={addActivity} />}
    </>
  );
}
