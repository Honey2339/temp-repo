"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRecoilValue } from "recoil";
import { apiDataState } from "./recoilStates";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// https://www.googleapis.com/books/v1/volumes

function BooksCard() {
  const apiData = useRecoilValue(apiDataState);

  return (
    <div className="grid grid-cols-3 gap-9 mt-10">
      {apiData &&
        apiData.map((data, idx) => (
          <Card className="flex max-w-md">
            <Image
              height={50}
              width={150}
              alt="https://picsum.photos/200"
              src={
                data.volumeInfo.imageLinks
                  ? data.volumeInfo.imageLinks.smallThumbnail
                  : "https://picsum.photos/200"
              }
              className="rounded-xl"
            />
            <div className="flex flex-col justify-between ml-2">
              <div>
                <CardHeader>
                  <CardTitle>{data.volumeInfo.title}</CardTitle>
                  <CardDescription>{data.volumeInfo.publisher}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {data.volumeInfo.description
                      ? `${
                          data.volumeInfo.description.substring(0, 100) + "..."
                        }`
                      : data.volumeInfo.description}
                  </p>
                </CardContent>
              </div>
              <div className="mt-2">
                <a href={data.volumeInfo.infoLink}>
                  <Button>More {"->"}</Button>
                </a>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default BooksCard;
