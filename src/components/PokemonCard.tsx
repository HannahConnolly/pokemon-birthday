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

const PokemonCard: React.FC<{ selectedDate: Date | undefined }> = ({ selectedDate }) => {

  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [rollover, setRollover] = useState<boolean>(false);

  async function handleFetch() {

  if (!selectedDate) return;

  setLoading(true);
  setError("");
  setPokemon(null);
  const rawId = computeId(selectedDate);
  const rolloverOccurred = rawId > MAX_POKEMON_ID;
  setRollover(rolloverOccurred);
  const id = ((rawId - 1) % MAX_POKEMON_ID) + 1; // wrap into 1..MAX
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!res.ok) throw new Error("Pokémon not found");
      const data = await res.json();
      setPokemon({
        id,
        name: data.name,
        sprite:
          data.sprites?.other?.["official-artwork"]?.front_default ||
          data.sprites?.front_default || null,
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
    const raw = (month * 100) + day; // e.g., Jan 1 => 101
    return raw;
  }

  useEffect(() => {
    // auto-fetch when the selected date changes
    if (selectedDate) {
      handleFetch();
    } else {
      setPokemon(null);
      setRollover(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);


  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && pokemon && (
        <div>
          <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
          {pokemon.sprite && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pokemon.sprite} alt={pokemon.name} className="mx-auto mb-2" />
          )}
          <p className="text-gray-600">ID: {pokemon.id}</p>
          <p className="text-gray-600">Height: {pokemon.height} — Weight: {pokemon.weight}</p>
          <p className="text-gray-600">Types: {pokemon.types.join(", ")}</p>
          {rollover && (
            <div>
              <p className="text-red-600">Rollover occurred! ≈ ID exceeded maximum.</p>
              <p className="text-red-600">A temporary Pokémon has been assigned</p>
            </div>
          )}
        </div>
      )}

      {!loading && !error && !pokemon && (
        <p className="text-gray-600">No Pokémon loaded yet.</p>
      )}
    </div>
  );
};

export default PokemonCard;
