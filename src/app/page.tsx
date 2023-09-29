"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BooksCard from "./BooksCard";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { apiDataState } from "./recoilStates";
import { motion } from "framer-motion";
import { SkeletonCard } from "./SkeletonCard";
import Footer from "./Footer";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [show, setShow] = useState(false);
  const [apiData, setApiData] = useRecoilState(apiDataState);
  const handleFind = () => {
    const res = axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${inputData}`)
      .then((res) => {
        console.log(res.data.items);
        setApiData(res.data.items);
        setInputData("");
        setTimeout(() => {
          setShow(true);
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
            className="text-white mt-32 text-5xl font-bold"
          >
            Find Your Book Here
          </motion.header>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={pAnimation}
            className="text-slate-300"
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
        <motion.footer
          initial="hidden"
          animate="visible"
          variants={FooterAnimation}
        >
          {show && show ? null : <Footer />}
        </motion.footer>
      </div>
    </>
  );
}
