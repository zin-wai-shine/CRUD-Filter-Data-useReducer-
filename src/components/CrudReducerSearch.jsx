import React, { useReducer, useRef } from 'react'

const reducer = (state, action) => {
    
    switch (action.type){

        case "text" : 
            return {

                data:[...state.data, action.payloat],
                filterText:""

            }

        case "delete":
            return {
                ...state,
                data:state.data?.filter((res,index) => index !== action.payloat),

            }

        case "update":
            return {
                ...state,
                data:state.data?.map((res, index) => index === action.payloat.id ? action.payloat.text : res )

            };

        case "search":
            return{
                ...state,
                filterText:action.payloat

            };

        default:

            return state;

    }
}


const CrudReducerSearch = () => {

    const [state, dispatch] = useReducer(reducer, { data:[] , filterText:""} );

    //! In there we don't need to ( map ) (main data) just (map) (filterData);
    const filterData = state.data.filter(res => res.toLowerCase().includes(state.filterText.toLowerCase()));

    const textRef = useRef();

    const handleSubmit = (e) => {

        e.preventDefault();

        if(textRef.current.value === "") return ;

        dispatch({

            type:"text",

            payloat:textRef.current.value

        })

        textRef.current.value = "";

    }

    const handleDelete = (id) => {

        dispatch({

            type:"delete",

            payloat:id
            
        });

    }

    const handleEdit = (id, name) => {

        const text = prompt(`edit ${name}`, name);

            if(text === null || text === ""){

                return;

            }

            dispatch({

                type:"update",

                payloat:{id, text}
                
            });

    }

   const handleSearch = (e) => {

    e.preventDefault();

    dispatch({

        type:"search",

        payloat:e.target.value

    })

   }

  return (
    <>

       <div className='p-20 flex flex-col items-center justify-center'>

            <div>

            <input type="search" onChange={handleSearch} className="w-auto h-10 border-2 border-slate-400 rounded-lg px-2 outline-none  mb-2" placeholder='search ...'/>

            <form className="gap-2 flex items-center" onSubmit={handleSubmit}>

                <input type="text" ref={textRef} placeholder="add content ..." className="w-auto h-10 border-2 border-slate-400 rounded-lg px-2 outline-none"/>

                <button className="border-2 border-slate-400 h-10 rounded-lg px-2 active:scale-75 duration-75">ADD</button>

            </form>

            </div>

            <div>
                    
                    <ol className=''>
                        {
                           filterData.map((res,index) => (

                                <li key={index} className=' flex items-center justify-between gap-3 mt-2 p-2 border-2 border-slate-300 w-auto rounded-lg'>
                                    
                                    <div>{res}</div>

                                    <div className='flex items-center gap-2'>
                                        
                                            <button className=' p-1 border-2 border-slate-500 rounded-lg active:scale-75 duration-100' onClick={() => handleEdit(index, res)}>edit</button>

                                            <button className='p-1 border-2 border-slate-500 rounded-lg active:scale-75 duration-100' onClick={() => handleDelete(index)}>delete</button>

                                    </div>

                                </li>

                            ))
                        }
                    </ol>

            </div>

        </div>
      
    </>
  )
}

export default CrudReducerSearch
