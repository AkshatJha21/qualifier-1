"use client";

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import axios from 'axios'

interface ResponseData {
    numbers?: string[];
    alphabets?: string[];
    highest_lowercase_alphabet?: string[];
}
  
const Form = () => {
    const [inputData, setInputData] = useState<string>("");
    const [responseData, setResponseData] = useState<ResponseData | null>(null);
    const [selectedDataType, setSelectedDataType] = useState<string>("Numbers");
    const [error, setError] = useState<string>("");

    const handleSubmit = async () => {
        setError("");
        try {
          const response = await axios.post<ResponseData>('/api/bfhl', {
            data: inputData.split(',').map(item => item.trim())
          });
          setResponseData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Failed to fetch data. Please try again.");
        }
    };

    const renderResponseData = () => {
        if (!responseData) return null;
    
        switch (selectedDataType) {
          case "Numbers":
            return <div>{responseData.numbers?.join(", ") || "No Numbers"}</div>;
          case "Alphabets":
            return <div>{responseData.alphabets?.join(", ") || "No Alphabets"}</div>;
          case "Highest Lowercase Alphabet":
            return <div>{responseData.highest_lowercase_alphabet?.join(", ") || "No Lowercase Alphabets"}</div>;
          default:
            return null;
        }
    };

  return (
    <div className='my-8 flex flex-col space-y-6 w-[250px] md:w-1/3'>
        <Input 
            placeholder='API Input'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
        />
        <Button onClick={handleSubmit}>
            Submit
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-gray-300 rounded-md px-4 py-2 flex justify-center">
                {selectedDataType}
                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 10 4 4 4-4"/>
                </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedDataType("Numbers")}>Numbers</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDataType("Alphabets")}>Alphabets</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedDataType("Highest Lowercase Alphabet")}>Highest Lowercase Alphabet</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <div className='mt-4'>
            {renderResponseData()}
        </div>
        {error && 
            <div className="text-red-500 mt-2">{error}</div>
        }
    </div>
  )
}

export default Form