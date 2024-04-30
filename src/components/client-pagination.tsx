"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  image: string;
}

export default function ClientPagination() {
  const [data, setData] = useState<PaginationProps[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  const generateFakeData = () => {
    const newImage = faker.image.urlPicsumPhotos();
    return { image: newImage };
  };

  useEffect(() => {
    const storedData = localStorage.getItem("fakeData");
    if (storedData) {
      setData(JSON.parse(storedData));
      setIsClient(true);
    } else {
      const newData = Array.from({ length: 104 }, generateFakeData);
      setData(newData);
      localStorage.setItem("fakeData", JSON.stringify(newData));
      setIsClient(true);
    }
  }, []);

  const resetLocalStorage = () => {
    localStorage.removeItem("fakeData");
  };

  return (
    <>
      {isClient ? (
        <>
          {/* <Button onClick={resetLocalStorage} className="mb-10">
            Reset
          </Button> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-4 py-6">
            {currentItems.map((image, idx) => {
              return (
                <Card key={idx} className="items-start flex overflow-hidden">
                  <div className="group flex transform flex-col overflow-hidden transition-all duration-150">
                    <div className="overflow-hidden rounded-md">
                      <Image
                        src={image.image}
                        alt="image"
                        width={500}
                        height={500}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <PaginationSection
            totalItems={data.length}
            itemPerPage={itemsPerPage}
            currenPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div className="text-4xl flex items-center justify-center h-screen">
          loading...
        </div>
      )}
    </>
  );
}

const PaginationSection = ({
  totalItems,
  itemPerPage,
  currenPage,
  setCurrentPage,
}: {
  totalItems: any;
  itemPerPage: any;
  currenPage: any;
  setCurrentPage: any;
}) => {
    let pages = [];
    let totalPages = Math.ceil(totalItems / itemPerPage);
    
    // Define the range size and calculate the start and end points
    const rangeSize = 5;
    let start = currenPage - Math.floor(rangeSize / 2);
    start = Math.max(start, 1);
    let end = start + rangeSize - 1;
    end = Math.min(end, totalPages);
    
    // Adjust the start if end was adjusted (to ensure the range size stays consistent)
    start = Math.max(end - rangeSize + 1, 1);
  
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  
    const handleNextPage = () => {
      if (currenPage < totalPages) {
        setCurrentPage(currenPage + 1);
      }
    };
    const handlePrevPage = () => {
      if (currenPage > 1) {
        setCurrentPage(currenPage - 1);
      }
    };

  return (
    <Pagination className="flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} />
        </PaginationItem>
        {pages.map((page, idx) => (
          <PaginationItem
            key={idx}
            className={currenPage === page ? "bg-neutral-100" : ""}
          >
            <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
