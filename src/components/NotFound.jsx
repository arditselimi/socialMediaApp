import Page from "./Page";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Page title="Not found">
      <div className="container mx-auto px-4 py-2 md:py-12 flex flex-col justify-center gap-4">
        <h2 className="text-4xl text-center">
          Sorry, we could not find anything
        </h2>
        <Link to="/" className="text-center text-blue-800 underline font-bold">
          Back to homepage?
        </Link>
      </div>
    </Page>
  );
};
export default NotFound;
