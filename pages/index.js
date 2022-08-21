import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutMain, Head } from '../components';

export default function IndexPage() {
  return (
    <>
      <Head
        title="Akash Geethanjana | Frontend Developer"
        description="My name is Akash Geethanjana.I'm a frontend developer with passion for creating beautiful and functional user interfaces with best technologies."
        keywords="developer, frontend, fullstack, websites, ui, ux, react, django, python, javascript, agile, design"
        ogImage="/assets/image/og-image.png"
        siteName="GeethAkash"
        url="https://geethakash.com/"
        socialImage="/assets/image/profile-img.png"
      />
      <LayoutMain>
        <section className="w-full relative  bg-black">
          <div className="flex flex-col lg:flex-row container justify-center items-center mx-auto px-10 lg:px-20 pt-32">
            <div className="lg:w-2/3">
              <LandingText />
              <div className="mt-8 lg:mt-5">
                <p className="text-gray-200  text-lg  lg:w-2/3">
                  Hi, My name is <b>Akash Geethanjana.</b>
                  <br />
                  I'm a <b>frontend developer</b> with a passion for creating
                  beautiful and functional user interfaces with the latest
                  technologies.
                </p>
              </div>
              <div className=" mt-10 md:mt-5 flex flex-col md:flex-row gap-x-10 text-4xl md:text-base">
                <a
                  href="#"
                  className="flex items-center flex-row gap-x-3  md:gap-x-1 "
                >
                  <svg
                    className="w-6 inline-block"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.5 27.4019C51.5 28.5566 51.5 31.4434 49.5 32.5981L22.5 48.1865C20.5 49.3412 18 47.8979 18 45.5885L18 14.4115C18 12.1021 20.5 10.6588 22.5 11.8135L49.5 27.4019Z"
                      fill="#66F9F2"
                    />
                  </svg>

                  <div className=" text-gray-400 regular-link">Portfolio</div>
                </a>
                <a
                  href="#"
                  className="flex items-center flex-row gap-x-3 md:gap-x-1"
                >
                  <svg
                    className="w-6 inline-block"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.5 27.4019C51.5 28.5566 51.5 31.4434 49.5 32.5981L22.5 48.1865C20.5 49.3412 18 47.8979 18 45.5885L18 14.4115C18 12.1021 20.5 10.6588 22.5 11.8135L49.5 27.4019Z"
                      fill="#66F9F2"
                    />
                  </svg>

                  <div className=" text-gray-400 ">Experience</div>
                </a>
                <a
                  href="#"
                  className="flex items-center flex-row gap-x-3 md:gap-x-1"
                >
                  <svg
                    className="w-6 inline-block"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M49.5 27.4019C51.5 28.5566 51.5 31.4434 49.5 32.5981L22.5 48.1865C20.5 49.3412 18 47.8979 18 45.5885L18 14.4115C18 12.1021 20.5 10.6588 22.5 11.8135L49.5 27.4019Z"
                      fill="#66F9F2"
                    />
                  </svg>

                  <div className=" text-gray-400 ">Contact</div>
                </a>
              </div>
            </div>
            <div className=" hidden lg:flex w-1/3 justify-center items-center ">
              <div className="relative w-10/12 aspect-square  z-20 group">
                <div className="w-full h-full bg-gray-800 rounded-md z-20 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>
                <img
                  className="absolute top-0 left-0 w-full rounded-md border translate-x-2 -translate-y-2  border-gray-500  h-full object-cover transition-all duration-300"
                  src="/assets/img/profile-img.png"
                  alt="Akash Geethanjana"
                />
              </div>
            </div>
          </div>
          <div className="contact text-2xl text-gray-300 container mx-auto px-10 lg:px-20 mt-5 ">
            <a
              className="border-b-2 border-transparent hover:border-teal-400 hover:text-teal-400 transition-colors duration-300 pb-1"
              href="mailto:hello@geethakash.com"
            >
              hello@geethakash.com
            </a>
          </div>
        </section>
      </LayoutMain>
    </>
  );
}

const titleAnimation = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const textRevealAnimation = {
  initial: { y: 100 },
  animate: {
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 0.8,
    },
  },
};

function LandingText({ landingText = 'Frontend Developer' }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="mt-5 ">
      <h1
        className={`${
          !isLoading ? 'landing-text text-transparent' : 'text-white '
        } w-full font-bold   text-5xl lg:text-8xl tracking-wider `}
      >
        {landingText.split(' ').map((word, wrdindex) => (
          <>
            <motion.span
              variants={titleAnimation}
              initial="initial"
              animate="animate"
              key={wrdindex}
              className={` overflow-hidden inline-block ${
                wrdindex === 0 ? '' : 'uppercase '
              }`}
            >
              {[...word].map((letter, index) => (
                <motion.span
                  className="inline-block -translate-y-10"
                  variants={textRevealAnimation}
                  key={index}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>{' '}
          </>
        ))}
      </h1>
    </div>
  );
}
