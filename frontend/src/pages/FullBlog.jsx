import React from "react";
import pic from "../assets/pexels-kyle-miller-20272816.jpg";
import Navbar from "../components/Navbar";
const FullBlog = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="m-5 mt-5 flex flex-col w-2/3 justify-center items-center">
          <div>
            <h1 className="text-3xl font-sans text-black w-11/12">
              Electric vehicles may emit 1,850 times more particulate matter
              than petrol, diesel cars: Study
            </h1>
            <p className="text-gray-400 cursor-pointer mt-4 font-light">
              @anurag
            </p>
          </div>
          <img src={pic} alt="" className="h-1/2 w-1/2 ml-5 rounded-xl mt-5" />
          <div>
            <h2 className="text-gray-700 font-normal text-xl mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
              voluptates animi porro! Facere ducimus sed, odit maxime ipsum
              alias doloremque autem, consectetur cumque at quia quod ipsam iure
              aut sint. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Iste corporis quas quos enim nesciunt eos. Dolor inventore omnis
              accusamus optio magni voluptatibus mollitia alias fugiat officiis
              delectus praesentium autem Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Nam illo quod iusto et eveniet obcaecati debitis
              quam vel, incidunt commodi soluta sint? Repudiandae dolore veniam
              culpa debitis repellendus ducimus eum veritatis dignissimos,
              necessitatibus ex iusto harum sit ipsam neque minima rem autem!
              Quos repellendus culpa velit laboriosam placeat, magnam aperiam.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
