import React, {useRef, useState } from "react";

const DotoLilst = () => {

    const [items, setItems] = useState([]);

    const [search, setSearch] = useState("");

    const filterItems = items.filter(res => res.toLowerCase().includes(search.toLowerCase()))

    console.log(filterItems);

    const inputRef = useRef();

    const handleSubmit = (e) => {

        e.preventDefault();

        const textValue = inputRef.current.value;

        if(textValue === "") return ;

        setItems((prev) => [

            ...prev,textValue


        ]);

        inputRef.current.value = "";
    }


  return (
    <>

            <div className="p-10">

                <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="search..."   className="mb-2 w-[200px] h-10 border-2 border-slate-400 rounded-lg px-2"/>

                    <form className="gap-2 flex items-center" onSubmit={handleSubmit}>

                        <input type="text" ref={inputRef}  className="w-[200px] h-10 border-2 border-slate-400 rounded-lg px-2"/>
                        
                        <button className="border-2 border-slate-400 h-10 rounded-lg px-2 active:scale-75 duration-75">ADD</button>

                    </form>

                    <ol>
                        {
                            filterItems.map((res) => (

                                <li className="duration-500"> {res} </li>

                            ))
                        }
                    </ol>

            </div>

    </>
  );
};

export default DotoLilst;
