import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-300 mt-12">
      <div className="flex justify-center py-2">
        <ul className="flex gap-2 text-indigo-500">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
        </ul>
      </div>
      <div className="text-neutral-400 text-center py-2">
        Copyright &copy; {new Date().getFullYear()}. All right reserved.{" "}
      </div>
    </footer>
  );
};

export default Footer;
