"use client"

  export default function error({error, reset}) {
    return (
      <div className="w-full h-screen relative bg-white object-fit py-4 place-content-center  grid">
        <div className="w-96 max-md:w-11/12 mx-auto p-3 rounded-lg shadow border border-gray-200">
          <h5 className="text-sm font-semibold pb-2">Error Message</h5>
            <p className="text-base text-gray-800">{error.message}</p>
            <button className="rounded-md bg-primary text-black px-2 py-1.5 text-sm mt-3 w-full" onClick={reset}>Reload</button>
        </div>
      </div>
    );
  }
  