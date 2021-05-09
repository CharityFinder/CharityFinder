import { GitHubLogo } from "../images/GitHubLogo";
import { PROJECT_PEEPS } from "../utils/constants";
import "../styles/AboutUs.css";

export const About = () => {
  return (
    <div className="about mt-5">
      <h1 className="mt-0">About Us</h1>
      <p></p>
      <p>
        With CharityFinder, we plan to make it easier for individuals to find
        and engage with relevant information about each charity organization by
        giving them a platform where they can easily search information about
        organizations and narrow down the charities they would like to
        contribute to.
      </p>
      <ul className="text-left">
        <li>
          Remove the hassle of finding charitable organizations that you’re
          passionate about with CharityFinder
        </li>
        <li>Search through 1000s of charitable organizations</li>
        <li>Get recommendations for charities that match your passions</li>
        <li>Keep track of your favorite organizations</li>
      </ul>
      <p>This app was developed by a group of motivated college students.</p>
      {PROJECT_PEEPS.map((peep) => (
        <Peeps {...peep} />
      ))}
    </div>
  );
};

const Peeps = ({ name, link }) => (
  <div className="peep-card">
    <p className="d-inline">{name}</p>
    <a href={link} className="d-inline ml-2">
      <GitHubLogo />
    </a>
  </div>
);
