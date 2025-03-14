import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice";

const CategoryCarousel = () => {
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
    "Cybersecurity Specialist",
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="w-full max-w-4xl mx-auto my-20 px-4">
      <Carousel className="relative w-full">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center snap-center md:basis-1/2 lg:basis-1/3"
            >
              <Button onClick={()=>searchJobHandler(cat)} 
                variant="outline"
                className="rounded-full px-6 py-3 text-lg"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
