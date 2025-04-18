import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from "axios"

function HomePage() {
  const [state, setstate] = useState("Here's your response ")
  const [input, setinput] = useState("")
  const [loading, setloading] = useState(false)

  function cleanMarkdown(text) {
    return text.replace(/\*+/g, ""); // removes all * and ** and ***
  }

  const handleinput = () => {
    let loading = toast.loading("Generating Response!")

    setloading(true)
    axios.post(import.meta.env.VITE_DOMAIN_NAME + "/generate", { input })
      .then((o) => {
        let { data } = o;
        toast.dismiss(loading)
        setstate(data.response)
        setinput("")
        setloading(false)
      })
      .catch((e) => {
        console.log(e);
        setloading(false)
        setinput("")
      })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 shadow-lg shadow-blue-500/40 transition-all duration-300">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 items-stretch bg-gray-800 p-6 rounded-xl shadow-xl shadow-gray-700/50">
        <textarea
          className="bg-neutral-800 text-white shadow-md rounded-xl p-4 flex-1 min-h-[200px] resize-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all border-2 border-transparent hover:border-blue-400"
          value={input}
          placeholder="Type your prompt here..."
          onChange={(e) => setinput(e.target.value)}
        />

        <button
          onClick={handleinput}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-xl rounded-xl px-6 py-4 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-400 focus:outline-none flex items-center gap-2"
        >
          Generate
          {
            loading ? 
            <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block align-middle"></span>
            : " "
          }
        </button>
      </div>

      <div className="mt-6 w-full max-w-4xl">
        <p className="bg-neutral-800 text-gray-200 text-lg font-semibold md:text-xl rounded-xl shadow-inner shadow-blue-500/40 border border-blue-300 p-5 whitespace-pre-line">
          {cleanMarkdown(state)}
        </p>
      </div>
    </div>
  )
}

export default HomePage
