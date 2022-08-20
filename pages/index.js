import Head from 'next/head';
import LayoutMain from '../components/layouts/LayoutMain';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Akash Geethanjana</title>
      </Head>
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
              <img className="w-10/12 z-20" src="/assets/img/profile-img.png" />
            </div>
          </div>
          <div className="contact text-2xl text-gray-300 container mx-auto px-10 lg:px-20 mt-10 ">
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

import React from 'react';

function LandingText() {
  return (
    <div className="mt-5">
      <h1 className="landing-text font-bold text-white text-5xl lg:text-8xl tracking-wider">
        Frontend
        <br />
        <span className=" uppercase">Developer</span>
      </h1>
    </div>
  );
}
