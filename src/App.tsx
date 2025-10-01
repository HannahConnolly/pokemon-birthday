import { useState } from 'react'
import './App.css'
import DatePicker from './components/DatePicker'
import PokemonCard from './components/PokemonCard'

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const today = new Date(Date.now());
    return today;
  })

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-green-200 text-shadow-sm">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-8xl text-shadow-lg">Pokémon Birthday</h1>
        <p className="mb-4">find out your Pokémon birthday twin! Year Agnostic</p>
        {/* <div className="flex flex-col lg:flex-row sm:flex-wrap justify-center items-center bg-yellow-50 p-4 rounded-xl shadow-lg gap-4"> */}
        <div className="flex md:flex-row bg-yellow-50 p-4 rounded-xl shadow-lg gap-4 sm:flex-col"> 
          <div className='px-4 w-full md:w-auto justify-center'>
            <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
          <div className='px-4 w-full md:w-auto'>
            <PokemonCard selectedDate={selectedDate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
