import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState(''); 
  
  const addTasks = () => {
    if (newTask.trim()){
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updateTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task 
    );
    setTasks(updateTasks);
  };

  const deleteTask = (index) => {
    const updateTasks = tasks.filter((_, i) => i !== index);
    setTasks(updateTasks);
  }

  return (
    <>
      <section className="min-h-screen bg-slate-100 py-10 antialiased">
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h1 className="text-2xl font-bold mb-5 text-gray-800 flex items-center gap-2">To-Do List</h1>
          
          <div className="flex mb-5 items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
            <input 
              type="text" 
              className='flex-1 p-2 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder='Tambahkan Tugas Baru...'  
            />
            <button
             onClick={addTasks}
             className='px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 transition-colors shadow-sm active:scale-95'
            >
              Tambah
             </button>
          </div>

          <ul className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-4">Belum ada tugas hari ini.</p>
            ) : (
              tasks.map((task, index) => (
                <li 
                  key={index} 
                  className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
                    task.completed 
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white border-gray-100 text-gray-700 shadow-sm'
                  }`}
                >
                  <span
                    className={`text-sm font-medium break-all cursor-pointer flex-1 pr-2 ${
                      task.completed ? 'line-through opacity-90' : ''
                    }`}
                    onClick={() => toggleTaskCompletion(index)}
                  >
                    {task.text}
                  </span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleTaskCompletion(index)}
                      className={`p-1.5 rounded transition-all active:scale-95 border ${
                        task.completed
                          ? 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                          : 'bg-emerald-500 border-emerald-500 text-white hover:bg-emerald-600'
                      }`}
                      title={task.completed ? "Tandai Belum Selesai" : "Tandai Selesai"}
                    >
                      Selesai
                    </button>

                    <button
                      onClick={() => deleteTask(index)}
                      className={`p-1.5 rounded transition-all active:scale-95 ${
                        task.completed
                          ? 'bg-white/20 text-white hover:bg-red-500 hover:text-white'
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      title="Hapus Tugas"
                    >
                      Hapus
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </>
  )
}

export default App
