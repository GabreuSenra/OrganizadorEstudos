import PomodoroTimer from './components/PomodoroTimer'
import TodoList from './components/TaskList'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [focusedTaskIndex, setFocusedTaskIndex] = useState(null)

  // Atualizar localStorage ao mudar
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])




  return (

    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <div className="min-h-screen bg-gray-100 px-6 py-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <PomodoroTimer
                  focusedTask={focusedTaskIndex !== null ? tasks[focusedTaskIndex] : null}
                  onPomodoroEnd={() => {
                    if (focusedTaskIndex !== null) {
                      const updated = [...tasks]
                      updated[focusedTaskIndex].completed = true
                      setTasks(updated)
                      setFocusedTaskIndex(null)
                    } else {
                      addSessionToHistory(null)
                    }
                  }}
                />
                <TodoList
                  tasks={tasks}
                  setTasks={setTasks}
                  setFocusedTaskIndex={setFocusedTaskIndex}
                  focusedTaskIndex={focusedTaskIndex}
                />
              </div>
            </div>
          </>
        }
      />
    </Routes>
  )
}

export default App
