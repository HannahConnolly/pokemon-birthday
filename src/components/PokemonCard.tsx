import React, { useEffect, useState } from "react";

const MAX_POKEMON_ID = 1025; // As of now, there are 1025 Pokémon in the Pokédex

interface PokemonData {
  id: number;
  name: string;
  sprite?: string | null;
  types: string[];
  height: number;
  weight: number;
}

const PokemonCard: React.FC<{ selectedDate: Date | undefined }> = ({
  selectedDate,
}) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [rollover, setRollover] = useState<boolean>(false);
  const [dateFormat, setDateFormat] = useState<"US" | "UK">("US");

  async function handleFetch() {
    if (!selectedDate) return;

    setLoading(true);
    setError("");
    setPokemon(null);
    const rawId = computeId(selectedDate);
    const id = ((rawId - 1) % MAX_POKEMON_ID) + 1; // wrap into 1..MAX
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();
      setPokemon({
        id,
        name: data.name.replace("-", " "),
        sprite:
          data.sprites?.other?.["official-artwork"]?.front_default ||
          data.sprites?.front_default ||
          null,
        types: data.types?.map((t: any) => t.type.name) || [],
        height: data.height,
        weight: data.weight,
      });
    } catch (err) {
      setError("No Pokémon found for this date’s ID.");
    } finally {
      setLoading(false);
    }
  }

  function computeId(date: Date | undefined) {
    if (!date) return 1;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // US format: MMDD, UK format: DDMM
    const raw = dateFormat === "US" ? month * 100 + day : day * 100 + month;
    const rolloverOccurred = raw > MAX_POKEMON_ID;
    setRollover(rolloverOccurred);
    console.log("Computed raw ID:", raw);
    return raw;
  }

  useEffect(() => {
    // auto-fetch when the selected date changes
    if (selectedDate || dateFormat) {
      handleFetch();
    } else {
      setPokemon(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, dateFormat]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && pokemon && (
        <div>
          <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
          {pokemon.sprite && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="mx-auto mb-2"
            />
          )}
          <p className="text-gray-600">ID: {pokemon.id}</p>
          <p className="text-gray-600">
            Height: {pokemon.height} — Weight: {pokemon.weight}
          </p>
          <p className="text-gray-600">Types: {pokemon.types.join(", ")}</p>
          {rollover && (
            <div>
              <p className="text-red-600">
                Rollover occurred! ≈ ID exceeded maximum.
              </p>
              <p className="text-red-600">
                A temporary Pokémon has been assigned
              </p>
            </div>
          )}
        </div>
      )}

      {!loading && !error && !pokemon && (
        <p className="text-gray-600">No Pokémon loaded yet.</p>
      )}

      <p className="text-gray-600">Date format: </p>
      <div className="flex flex-row justify-center">
        <p
          onClick={() => setDateFormat("US")}
          className={"text-6xl " + (dateFormat === "US" ? "bg-green-100" : "")}
        >
          🇺🇸
        </p>
        <p
          onClick={() => setDateFormat("UK")}
          className={"text-6xl " + (dateFormat === "UK" ? "bg-green-100" : "")}
        >
          🇬🇧
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;
