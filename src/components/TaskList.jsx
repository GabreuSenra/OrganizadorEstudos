import React, { useState } from 'react'
import { Trash2, Play } from 'lucide-react'

const TodoList = ({ tasks, setTasks, setFocusedTaskIndex, focusedTaskIndex }) => {
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() === '') return
    setTasks([...tasks, { text: newTask, completed: false }])
    setNewTask('')
  }

  const toggleTask = index => {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)
  }

  const deleteTask = index => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
    if (focusedTaskIndex === index) setFocusedTaskIndex(null)
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Tarefas</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Nova tarefa"
          className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addTask}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-3 rounded-xl shadow-sm ${
              focusedTaskIndex === index
                ? 'bg-purple-100 border border-purple-500'
                : 'bg-gray-50'
            }`}
          >
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className={`text-gray-800 ${task.completed ? 'line-through opacity-60' : ''}`}>
                {task.text}
              </span>
            </label>

            <div className="flex gap-2">
              <button
                onClick={() => setFocusedTaskIndex(index)}
                className="text-purple-500 hover:text-purple-700"
                title="Focar tarefa"
              >
                <Play size={18} />
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
                title="Excluir"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList
