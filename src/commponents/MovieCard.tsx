export const MovieCard = () => {
  return (
    <div className="max-h-fit min-w-max p-[15px] border-solid border-2 border-neutral-300 rounded-xl bg-neutral-800 my-5 mx-8">
      <h1 className="text-center text-3xl  text-slate-100 font-bold">Fast X</h1>
      <div className="m-2 flex items-center justify-center">
        <img
          className="h-[350px] rounded-3xl "
          src="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
          alt="fastX"
        />
      </div>
      <div className="text-lg text-center font-light text-neutral-200">
        rating : 4.5/5
      </div>
      <div className="text-center text-neutral-300 text-xl">
        Lorem ipsum dolor sit amet.
      </div>{" "}
      <div className="flex items-center justify-center">
        <button className="bg-neutral-600 cursor-pointer text-neutral-300 text-center rounded-lg px-1 py-0.5">
          read more
        </button>
      </div>
    </div>
  );
};
