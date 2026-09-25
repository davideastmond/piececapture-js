import { useState } from "react";

export const Home: React.FC = () => {
  const [username, setUsername] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-3xl font-bold tracking-wider mb-6 text-emerald-400">
        Tactical Matrix
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg w-full max-w-sm"
      >
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          Username
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg px-4 py-2 transition-colors"
        >
          Create game
        </button>
      </form>
    </div>
  );
};
