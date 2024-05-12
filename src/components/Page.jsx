import { useEffect } from "react";
import Container from "./Container";

const Page = ({ children, title }) => {
  useEffect(() => {
    document.title = `${title} | SocialApp`;
  }, []);

  return <Container>{children}</Container>;
};

export default Page;
