import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>404</h1>
      <p>{error.data}</p>
    </div>
  );
}