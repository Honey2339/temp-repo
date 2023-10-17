"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BooksCard from "./BooksCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { apiDataState, previousSearchesState } from "./recoilStates";
import { motion } from "framer-motion";
import { SkeletonCard } from "./SkeletonCard";
import Footer from "./Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(true);
  const [apiData, setApiData] = useRecoilState(apiDataState);
  const [previousSearches, setPreviousSearches] = useRecoilState<
    Array<{ query: string; results: any[] }>
  >(previousSearchesState);

  const handleFind = () => {
    const res = axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${inputData}`)
      .then((res) => {
        console.log(res.data.items);
        setApiData(res.data.items);
        const newSearch = { query: inputData, results: res.data.items };
        setPreviousSearches((prevSearches) => [...prevSearches, newSearch]);
        localStorage.setItem(
          "previousSearches",
          JSON.stringify([...previousSearches, newSearch])
        );
        setInputData("");

        setTimeout(() => {
          setShow(true);
          setShowTwo(false);
        }, 1000);
      });
  };
  const headerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const pAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
  };
  const LastAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } },
  };
  const FooterAnimation = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1 } },
  };
  useEffect(() => {
    const storedSearches = localStorage.getItem("previousSearches");
    if (storedSearches) {
      setPreviousSearches(JSON.parse(storedSearches));
    }
  }, []);
  return (
    <>
      <div className="h-full">
        {/* <Image
        width={1200}
        height={1200}
        alt="gradient"
        src={assets.gradient}
        className="fixed inset-0 w-screen h-screen object-cover z-[-1]"
      /> */}
        <div className="flex flex-col items-center space-y-5">
          <motion.header
            initial="hidden"
            animate="visible"
            variants={headerAnimation}
            className="text-white mt-32 text-5xl max-sm:text-4xl font-bold"
          >
            Find Your Book Here
          </motion.header>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={pAnimation}
            className="text-slate-300 max-sm:text-sm"
          >
            Find the book that you are looking for. All latest books are
            avaliable here
          </motion.p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={LastAnimation}
          className="flex justify-center mt-10"
        >
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Type Author (or) Book Name"
              className="focus:border-black"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            <Button
              onClick={handleFind}
              className="transition duration-200 hover:bg-white hover:text-black"
            >
              Find
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={LastAnimation}
          className="flex justify-center"
        >
          {show && show ? <BooksCard /> : <SkeletonCard />}
        </motion.div>
        {showTwo && showTwo ? (
          <div className="flex flex-col justify-center items-center">
            {previousSearches &&
              [...previousSearches]
                .reverse()
                .slice(0, 2)
                .map((search, index) => (
                  <div key={index}>
                    <h2>Previous Search: {search.query}</h2>
                    <div className=" grid grid-cols-3  gap-10 mr-20">
                      {search.results && Array.isArray(search.results)
                        ? search.results.slice(0, 3).map((data, idx) => (
                            <Card key={idx} className="flex max-w-md">
                              <div className="flex flex-col justify-between ml-2">
                                <div>
                                  <CardHeader>
                                    <CardTitle>
                                      {data.volumeInfo?.title}
                                    </CardTitle>
                                    <CardDescription>
                                      {data.volumeInfo?.publisher}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <p>
                                      {data.volumeInfo?.description
                                        ? `${
                                            data.volumeInfo?.description.substring(
                                              0,
                                              100
                                            ) + "..."
                                          }`
                                        : data.volumeInfo?.description}
                                    </p>
                                  </CardContent>
                                </div>
                                <div className="mt-2">
                                  <a href={data.volumeInfo?.infoLink}>
                                    <Button>More {"->"}</Button>
                                  </a>
                                </div>
                              </div>
                            </Card>
                          ))
                        : null}
                    </div>
                  </div>
                ))}
          </div>
        ) : null}

        {/* <motion.footer
          initial="hidden"
          animate="visible"
          variants={FooterAnimation}
        >
          {show && show ? null : <Footer />}
        </motion.footer> */}
      </div>
    </>
  );
}
