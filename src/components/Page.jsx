import { useEffect } from "react";
import Container from "./Container";

const Page = ({ children, title }) => {
  useEffect(() => {
    document.title = `${title} | SocialApp`;
    window.scrollTo(0, 0);
  }, [title]);

  return <Container>{children}</Container>;
};

export default Page;
