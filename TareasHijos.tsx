import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Save, X, GamepadIcon, Clock, Star, RotateCcw, Check, User, UserPlus, Sun, BookOpen, Moon, Shield } from 'lucide-react';

const KidsTaskBoard = () => {
  const [children, setChildren] = useState([
    { id: 1, name: 'Rodrigo', color: 'bg-blue-500' },
    { id: 2, name: 'Antonella', color: 'bg-pink-500' }
  ]);

  const [categories] = useState([
    { id: 'morning', name: 'Mañana', icon: Sun, time: 15, color: 'bg-yellow-100 border-yellow-300' },
    { id: 'afternoon', name: 'Tarde', icon: BookOpen, time: 15, color: 'bg-orange-100 border-orange-300' },
    { id: 'night', name: 'Noche', icon: Moon, time: 15, color: 'bg-purple-100 border-purple-300' },
    { id: 'global', name: 'Regla Global', icon: Shield, time: 0, color: 'bg-red-100 border-red-300' }
  ]);

  const [tasks, setTasks] = useState([
    // Tareas de Mañana
    {
      id: 1,
      title: "Asearse en la mañana",
      description: "Lavarse la cara, peinarse, lavarse los dientes",
      category: "morning",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 2,
      title: "Echarse cremas al rostro",
      description: "",
      category: "morning",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 3,
      title: "Tomar desayuno",
      description: "",
      category: "morning",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    // Tareas de Tarde
    {
      id: 4,
      title: "Ordenar su ropa",
      description: "",
      category: "afternoon",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 5,
      title: "Cambiarse la ropa del colegio",
      description: "",
      category: "afternoon",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 6,
      title: "Hacer tareas del colegio",
      description: "En caso no haya, practicar",
      category: "afternoon",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    // Tareas de Noche
    {
      id: 7,
      title: "Ponerse la ropa de dormir",
      description: "",
      category: "night",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 8,
      title: "Ir al baño",
      description: "",
      category: "night",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 9,
      title: "Asearse en la noche",
      description: "Lavarse los dientes",
      category: "night",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 10,
      title: "Lavar los trastes / Recoger ropa",
      description: "",
      category: "night",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    // Reglas Globales
    {
      id: 11,
      title: "No hacer mañana ni pelearse con el hermano",
      description: "Se debe cumplir sí o sí",
      category: "global",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 12,
      title: "Llegar temprano al colegio",
      description: "Se debe cumplir sí o sí",
      category: "global",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    },
    {
      id: 13,
      title: "Traer cuadernos del colegio",
      description: "Se debe cumplir sí o sí",
      category: "global",
      assignedChildren: [1, 2],
      completedBy: [],
      date: new Date().toDateString()
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'morning',
    assignedChildren: [1]
  });

  const [newChild, setNewChild] = useState({
    name: '',
    color: 'bg-green-500'
  });

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [showNewChildForm, setShowNewChildForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingChild, setEditingChild] = useState(null);
  const [selectedChild, setSelectedChild] = useState(0);
  const draggedTask = useRef(null);

  const colorOptions = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
    'bg-orange-500', 'bg-cyan-500'
  ];

  const getTodaysTasks = (childId = null, category = null) => {
    const today = new Date().toDateString();
    return tasks.filter(task => {
      const isToday = task.date === today;
      let matchesChild = true;
      let matchesCategory = true;
      
      if (childId) {
        matchesChild = task.assignedChildren.includes(childId);
      }
      
      if (category) {
        matchesCategory = task.category === category;
      }
      
      return isToday && matchesChild && matchesCategory;
    });
  };

  const checkGlobalRulesCompleted = (childId) => {
    const globalTasks = getTodaysTasks(childId, 'global');
    return globalTasks.every(task => task.completedBy.includes(childId));
  };

  const calculateCategoryTime = (childId, category) => {
    const categoryTasks = getTodaysTasks(childId, category);
    const completedTasks = categoryTasks.filter(task => task.completedBy.includes(childId)).length;
    const totalTasks = categoryTasks.length;
    
    if (totalTasks === 0) return 0;
    
    const categoryInfo = categories.find(cat => cat.id === category);
    if (!categoryInfo || categoryInfo.time === 0) return 0;
    
    // Solo dar tiempo si completa TODAS las tareas de la categoría
    if (completedTasks === totalTasks) {
      return categoryInfo.time;
    }
    
    return 0;
  };

  const calculateTotalGameTime = (childId) => {
    // Primero verificar si cumplió las reglas globales
    if (!checkGlobalRulesCompleted(childId)) {
      return 0; // Sin reglas globales, no hay tiempo de juego
    }
    
    // Sumar tiempo de cada categoría (excluyendo global)
    const gameCategories = categories.filter(cat => cat.id !== 'global');
    return gameCategories.reduce((total, category) => {
      return total + calculateCategoryTime(childId, category.id);
    }, 0);
  };

  const addTask = () => {
    if (newTask.title.trim() && newTask.assignedChildren.length > 0) {
      const task = {
        ...newTask,
        id: Date.now(),
        completedBy: [],
        date: new Date().toDateString()
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '', category: 'morning', assignedChildren: [1] });
      setShowNewTaskForm(false);
    }
  };

  const addChild = () => {
    if (newChild.name.trim()) {
      const child = {
        id: Date.now(),
        name: newChild.name,
        color: newChild.color
      };
      setChildren([...children, child]);
      setNewChild({ name: '', color: 'bg-green-500' });
      setShowNewChildForm(false);
    }
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setEditingTask(null);
  };

  const updateChild = (updatedChild) => {
    setChildren(children.map(child => 
      child.id === updatedChild.id ? updatedChild : child
    ));
    setEditingChild(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const deleteChild = (childId) => {
    if (children.length > 1) {
      setChildren(children.filter(child => child.id !== childId));
      setTasks(tasks.map(task => ({
        ...task,
        assignedChildren: task.assignedChildren.filter(id => id !== childId),
        completedBy: task.completedBy.filter(id => id !== childId)
      })).filter(task => task.assignedChildren.length > 0));
    }
  };

  const toggleTaskCompletion = (taskId, childId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const isCompleted = task.completedBy.includes(childId);
        return {
          ...task,
          completedBy: isCompleted 
            ? task.completedBy.filter(id => id !== childId)
            : [...task.completedBy, childId]
        };
      }
      return task;
    }));
  };

  const resetDailyTasks = () => {
    const today = new Date().toDateString();
    setTasks(tasks.map(task => 
      task.date === today ? { ...task, completedBy: [] } : task
    ));
  };

  const handleDragStart = (e, task) => {
    draggedTask.current = task;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, childId) => {
    e.preventDefault();
    if (draggedTask.current && draggedTask.current.assignedChildren.includes(childId)) {
      toggleTaskCompletion(draggedTask.current.id, childId);
      draggedTask.current = null;
    }
  };

  const getChildName = (childId) => {
    return children.find(child => child.id === childId)?.name || 'Desconocido';
  };

  const getChildColor = (childId) => {
    return children.find(child => child.id === childId)?.color || 'bg-gray-500';
  };

  const getCategoryName = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Sin categoría';
  };

  const getCategoryIcon = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)?.icon || Clock;
  };

  const getTasksByCategory = () => {
    const todaysTasks = getTodaysTasks();
    const tasksByCategory = {};
    
    categories.forEach(category => {
      const categoryTasks = todaysTasks.filter(task => task.category === category.id);
      
      if (selectedChild > 0) {
        tasksByCategory[category.id] = categoryTasks.filter(task => 
          task.assignedChildren.includes(selectedChild)
        ).sort((a, b) => a.title.localeCompare(b.title));
      } else {
        tasksByCategory[category.id] = categoryTasks.sort((a, b) => a.title.localeCompare(b.title));
      }
    });
    
    return tasksByCategory;
  };

  const TaskCard = ({ task, isCompleted = false, showChildBadges = true }) => {
    const isEditing = editingTask?.id === task.id;
    
    if (isEditing) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-300">
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
            className="w-full mb-2 p-2 border rounded"
            placeholder="Título de la tarea"
          />
          <textarea
            value={editingTask.description}
            onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
            className="w-full mb-2 p-2 border rounded resize-none"
            rows={2}
            placeholder="Descripción"
          />
          <select
            value={editingTask.category}
            onChange={(e) => setEditingTask({...editingTask, category: e.target.value})}
            className="w-full mb-2 p-2 border rounded"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Asignar a:</label>
            <div className="space-y-2">
              {children.map(child => (
                <label key={child.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingTask.assignedChildren.includes(child.id)}
                    onChange={(e) => {
                      const updatedChildren = e.target.checked
                        ? [...editingTask.assignedChildren, child.id]
                        : editingTask.assignedChildren.filter(id => id !== child.id);
                      setEditingTask({...editingTask, assignedChildren: updatedChildren});
                    }}
                    className="mr-2"
                  />
                  <span className={`px-2 py-1 text-xs rounded text-white ${child.color}`}>
                    {child.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => updateTask(editingTask)}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Save size={14} />
              Guardar
            </button>
            <button
              onClick={() => setEditingTask(null)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <X size={14} />
              Cancelar
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{task.title}</h3>
          <div className="flex gap-1">
            {children.map(child => (
              task.assignedChildren.includes(child.id) && (
                <button
                  key={child.id}
                  onClick={() => toggleTaskCompletion(task.id, child.id)}
                  className={`p-1 rounded text-xs ${
                    task.completedBy.includes(child.id)
                      ? `${child.color} text-white`
                      : 'text-gray-400 hover:text-gray-600 border border-gray-300'
                  }`}
                  title={`${task.completedBy.includes(child.id) ? 'Completado' : 'Pendiente'} por ${child.name}`}
                >
                  <Check size={12} />
                </button>
              )
            ))}
            <button
              onClick={() => setEditingTask(task)}
              className="p-1 text-gray-500 hover:text-blue-500 ml-2"
            >
              <Edit2 size={14} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-1 text-gray-500 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        
        {task.description && (
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
        )}
        
        <div className="flex justify-between items-center">
          {showChildBadges && (
            <div className="flex gap-1 flex-wrap">
              {task.assignedChildren.map(childId => (
                <span key={childId} className={`px-2 py-1 text-xs rounded text-white ${getChildColor(childId)}`}>
                  {getChildName(childId)}
                  {task.completedBy.includes(childId) && <span className="ml-1">✓</span>}
                </span>
              ))}
            </div>
          )}
          <span className="text-xs text-gray-500 capitalize">
            {getCategoryName(task.category)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🎮 Control de Tareas por Categorías</h1>
          <p className="text-gray-600">Completa todas las tareas de cada categoría para ganar tiempo de videojuegos</p>
          <p className="text-sm text-gray-500 mt-1">
            Fecha: {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Panel de Control de Tiempo de Juego */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {children.map(child => {
            const totalGameTime = calculateTotalGameTime(child.id);
            const globalRulesCompleted = checkGlobalRulesCompleted(child.id);
            
            return (
              <div key={child.id} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${child.color}`}></div>
                    <h2 className="text-xl font-bold text-gray-800">{child.name}</h2>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingChild(child)}
                      className="p-1 text-gray-500 hover:text-blue-500"
                    >
                      <Edit2 size={14} />
                    </button>
                    {children.length > 1 && (
                      <button
                        onClick={() => deleteChild(child.id)}
                        className="p-1 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Estado de Reglas Globales */}
                <div className={`p-3 rounded-lg mb-4 ${globalRulesCompleted ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className={globalRulesCompleted ? 'text-green-600' : 'text-red-600'} />
                    <span className={`text-sm font-medium ${globalRulesCompleted ? 'text-green-800' : 'text-red-800'}`}>
                      Reglas Globales: {globalRulesCompleted ? 'CUMPLIDAS ✓' : 'PENDIENTES ✗'}
                    </span>
                  </div>
                  {!globalRulesCompleted && (
                    <p className="text-xs text-red-600 mt-1">Debe cumplir las reglas globales para ganar tiempo de videojuegos</p>
                  )}
                </div>
                
                {/* Tiempo de videojuegos */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <GamepadIcon className={globalRulesCompleted ? "text-green-500" : "text-gray-400"} size={32} />
                    <span className={`text-3xl font-bold ${globalRulesCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                      {totalGameTime}
                    </span>
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                  <p className="text-sm text-gray-600">Tiempo de videojuegos ganado</p>
                </div>

                {/* Progreso por categoría */}
                <div className="space-y-3">
                  {categories.filter(cat => cat.id !== 'global').map(category => {
                    const categoryTasks = getTodaysTasks(child.id, category.id);
                    const completedTasks = categoryTasks.filter(task => task.completedBy.includes(child.id)).length;
                    const totalTasks = categoryTasks.length;
                    const timeEarned = calculateCategoryTime(child.id, category.id);
                    const IconComponent = category.icon;
                    
                    return (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent size={16} className="text-gray-600" />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {completedTasks}/{totalTasks}
                          </span>
                          <span className={`text-sm font-bold ${timeEarned > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            {timeEarned}min
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gestión de Niños */}
        {editingChild && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Editar niño</h3>
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={editingChild.name}
                  onChange={(e) => setEditingChild({...editingChild, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <select
                  value={editingChild.color}
                  onChange={(e) => setEditingChild({...editingChild, color: e.target.value})}
                  className="p-2 border rounded"
                >
                  {colorOptions.map(color => (
                    <option key={color} value={color}>{color.replace('bg-', '').replace('-500', '')}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => updateChild(editingChild)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingChild(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Filtros y controles */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <button
            onClick={() => setSelectedChild(0)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedChild === 0 ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Todos los niños
          </button>
          {children.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedChild === child.id 
                  ? `${child.color} text-white` 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {child.name}
            </button>
          ))}
          
          <div className="flex gap-2 ml-auto">
            {!showNewChildForm ? (
              <button
                onClick={() => setShowNewChildForm(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
              >
                <UserPlus size={16} />
                Añadir niño
              </button>
            ) : (
              <div className="flex gap-2 items-center bg-white p-2 rounded-lg shadow">
                <input
                  type="text"
                  value={newChild.name}
                  onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                  placeholder="Nombre del niño"
                  className="p-2 border rounded"
                />
                <select
                  value={newChild.color}
                  onChange={(e) => setNewChild({...newChild, color: e.target.value})}
                  className="p-2 border rounded"
                >
                  {colorOptions.map(color => (
                    <option key={color} value={color}>{color.replace('bg-', '').replace('-500', '')}</option>
                  ))}
                </select>
                <button onClick={addChild} className="px-3 py-2 bg-green-500 text-white rounded">
                  <Save size={16} />
                </button>
                <button onClick={() => setShowNewChildForm(false)} className="px-3 py-2 bg-gray-500 text-white rounded">
                  <X size={16} />
                </button>
              </div>
            )}
            
            <button
              onClick={resetDailyTasks}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reiniciar día
            </button>
          </div>
        </div>

        {/* Tareas organizadas por categoría */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {categories.map(category => {
            const categoryTasks = getTasksByCategory()[category.id] || [];
            const IconComponent = category.icon;
            
            return (
              <div key={category.id} className={`${category.color} rounded-lg p-4 min-h-96`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <IconComponent size={20} />
                    {category.name}
                    {category.time > 0 && (
                      <span className="text-sm bg-white px-2 py-1 rounded-full">
                        {category.time}min
                      </span>
                    )}
                  </h2>
                  <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
                    {categoryTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {categoryTasks.map(task => (
                    <TaskCard key={task.id} task={task} showChildBadges={selectedChild === 0} />
                  ))}
                </div>

                {category.id === 'morning' && (
                  <div className="mt-4">
                    {showNewTaskForm ? (
                      <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-300">
                        <input
                          type="text"
                          value={newTask.title}
                          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                          className="w-full mb-2 p-2 border rounded"
                          placeholder="Título de la tarea"
                        />
                        <textarea
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                          className="w-full mb-2 p-2 border rounded resize-none"
                          rows={2}
                          placeholder="Descripción (opcional)"
                        />
                        <select
                          value={newTask.category}
                          onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                          className="w-full mb-2 p-2 border rounded"
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Asignar a:</label>
                          <div className="space-y-2">
                            {children.map(child => (
                              <label key={child.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={newTask.assignedChildren.includes(child.id)}
                                  onChange={(e) => {
                                    const updatedChildren = e.target.checked
                                      ? [...newTask.assignedChildren, child.id]
                                      : newTask.assignedChildren.filter(id => id !== child.id);
                                    setNewTask({...newTask, assignedChildren: updatedChildren});
                                  }}
                                  className="mr-2"
                                />
                                <span className={`px-2 py-1 text-xs rounded text-white ${child.color}`}>
                                  {child.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={addTask}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            <Plus size={14} />
                            Añadir
                          </button>
                          <button
                            onClick={() => {
                              setShowNewTaskForm(false);
                              setNewTask({ title: '', description: '', category: 'morning', assignedChildren: [1] });
                            }}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                          >
                            <X size={14} />
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowNewTaskForm(true)}
                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={20} />
                        Añadir nueva tarea
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Resumen del día */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">📊 Resumen del día</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getTodaysTasks().length}</div>
              <div className="text-sm text-gray-600">Total de asignaciones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {getTodaysTasks().reduce((total, task) => total + task.completedBy.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Tareas completadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {children.reduce((total, child) => total + calculateTotalGameTime(child.id), 0)}
              </div>
              <div className="text-sm text-gray-600">Minutos totales ganados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {children.filter(child => checkGlobalRulesCompleted(child.id)).length}
              </div>
              <div className="text-sm text-gray-600">Niños con reglas cumplidas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsTaskBoard;