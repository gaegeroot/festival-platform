import { useEffect, useState } from 'react'
import { getFestival, getFestivals } from './api/festivals'
import type { Festival, FestivalSummary } from '@festival/contracts'
import './App.css'

function App() {
  const [festivals, setFestivals] = useState<FestivalSummary[]>([])
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getFestivals()
      .then((response) => {
        setFestivals(response.data)
      })
      .catch(() => {
        setError('Unable to load festivals.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  async function handleFestivalSelect(festivalId: string) {
    setError(null)
    setSelectedFestival(null)
    setLoading(true)

    try {
      const response = await getFestival(festivalId)
      setSelectedFestival(response.data)
    } catch {
      setError('Unable to load festival.')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !selectedFestival) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  if (selectedFestival) {
    return (
      <main>
        <button onClick={() => setSelectedFestival(null)}>
          ← Back to festivals
        </button>

        <h1>{selectedFestival.name}</h1>

        <p>
          {selectedFestival.startTime} → {selectedFestival.endTime}
        </p>

        {selectedFestival.stages.map((stage) => (
          <section key={stage.id}>
            <h2>{stage.name}</h2>

            <ul>
              {stage.sets.map((set) => (
                <li key={set.id}>
                  <strong>{set.artist.name}</strong>
                  <span>
                    {set.startTime} → {set.endTime}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    )
  }

  return (
    <main>
      <h1>Festivals</h1>

      <ul>
        {festivals.map((festival) => (
          <li key={festival.id}>
            <button onClick={() => handleFestivalSelect(festival.id)}>
              <strong>{festival.name}</strong>
              <span>{festival.startTime}</span>
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default App