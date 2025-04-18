
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from "axios"

function HomePage() {
  const [state,setstate] = useState("Here's your response ")
  const [input,setinput] = useState("")

  function cleanMarkdown(text) {
    return text.replace(/\*+/g, ""); // removes all * and ** and ***
  }
  

  const handleinput  = ()=>{
    // let input = e.target.value;
    
    let loading = toast.loading("Loading!")

    axios.post(import.meta.env.VITE_DOMAIN_NAME+"/generate",{input})
    .then((o)=>{
        let { data}= o;
        // console.log(o);
        let response=data;
        console.log(data)
        toast.dismiss(loading)
        setstate(data.response)
        
    })
    .catch((e)=>{
        console.log(e);
    })
    setinput("")

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex flex-col items-center justify-center p-6">
  
  <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 items-stretch">
    
    <textarea
      className="bg-white text-gray-800 shadow-md rounded-xl p-4 flex-1 min-h-[200px] resize-none focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all"
      value={input}
      placeholder="Type your prompt here..."
      onChange={(e) => setinput(e.target.value)}
    />

    <button
      onClick={handleinput}
      className="bg-green-400 hover:bg-green-500 text-white font-semibold text-xl rounded-xl px-6 py-4 transition-all duration-300 shadow-lg hover:shadow-2xl"
    >
      Generate
    </button>
  </div>

  <div className="mt-6 w-full max-w-4xl">
    <p className="bg-white text-gray-800 text-lg font-semibold md:text-xl rounded-xl shadow-inner border border-blue-300 p-5 whitespace-pre-line">
    {cleanMarkdown(state)}
    </p>
  </div>
</div>

  )
}

export default HomePage
