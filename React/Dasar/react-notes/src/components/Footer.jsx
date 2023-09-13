import { BsFillHeartFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="mt-8 rounded-t-2xl border-t border-slate-300 py-4">
      <p className="text-center text-sm">
        Made with
        <BsFillHeartFill className="mx-2 inline-block" color="red" />
        by
        <a
          href="https://github.com/msuryaditriputraR"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-block font-semibold text-green-500 underline underline-offset-2"
        >
          Suryadi
        </a>
      </p>
    </footer>
  );
};

export default Footer;
