"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type result = {
  review: {
    [key: string]: any
  },
  name: string,
  subname?: string | null,
  description?: string | null,
  background?: string | null,
  cover?: string | null,
  id?: string | null,
  rating?: string | null,
  genres?: string[] | null,
  link: string,
  status?: string | null
}

export default function Home() {
  const [openField, setOpenField] = useState(false)
  const [entry, setEntry] = useState("")
  const [results, setResults] = useState<result | null>(null);

  async function handleSubmit(e: any){
    e.preventDefault()
    setOpenField(true)

    const response = await fetch("/api/search", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: entry
      })
    })
     const data = await response.json();

     const firstEntry = data[1]

     setResults(firstEntry)
  }

  return (
    <div className="grid w-screen h-screen grid-rows-[20%_7%_1px_1fr] bg-[linear-gradient(to_bottom,black,rgb(77,0,0))]">

      <Image src="/Imagens/Logo.png" alt="logo" width={713} height={170} className="block scale-[.75] m-[0_auto] pt-[30px]"/>

      <form className="block m-[0_auto] mt-[5px] mb-[30px] w-[30%] h-[40px] flex justify-between" onSubmit={handleSubmit}>
        <input type="text" className="w-[80%] p-px bg-white text-[rgba(255, 255, 255, 0.455)] border-[rgba(255, 255, 255, 0.171)] rounded-[5px] focus:outline-none text-xl pl-1" onChange={(e) => setEntry(e.target.value)} value={entry}/>

        <button type="submit" className="w-[20%] p-px bg-white text-[rgba(255, 255, 255, 0.455)] border-[rgba(255, 255, 255, 0.171)] rounded-[5px] m-[0_10px] focus:outline-none text-xl hover:cursor-pointer">Search</button>
      </form>

      <div className={`relative row-4 ${openField ? 'w-[60vw]' : 'w-[0vw]'} h-[98%] bg-white rounded-[10px] m-[0_auto] transition-[1s]`}>
        {results && 
        <Link href={results.link}>
          <Image src={results.cover!} width={600} height={700} alt={results.name} className="absolute block scale-[.75] rounded-[25px] top-[-8%] left-[-3%] w-[45%]"/>
        </Link>}

        <div>
          <p></p>
          <p></p>
        </div>

        <div>
          <p></p>

          <div>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
