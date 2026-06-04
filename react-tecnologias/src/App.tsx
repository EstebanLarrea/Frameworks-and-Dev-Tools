import { useState, useEffect, useRef } from 'react';
import { type Item, calculateProgress } from './utils';
import './App.css';

function App() {
  // useState: Inicializa el estado leyendo de LocalStorage
  const [items, setItems] = useState<Item[]>(() => {
    const saved = localStorage.getItem('smart-shopping-list');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");
  
  // useRef: Referencia directa al input del DOM
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect: Cada vez que 'items' cambia, lo guarda en LocalStorage
  useEffect(() => {
    localStorage.setItem('smart-shopping-list', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false
    };

    setItems([...items, newItem]);
    setInputValue("");
    
    // useRef en acción: Focus automático al agregar
    inputRef.current?.focus();
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    inputRef.current?.focus();
  };

  const progress = calculateProgress(items);
  const completedCount = items.filter(item => item.completed).length;
  const pendingCount = items.length - completedCount;

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>🛒 Smart Shopping List</h2>

      <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Escribe un producto..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          data-testid="input-producto"
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" data-testid="btn-agregar" style={{ padding: '8px 16px' }}>Agregar</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleItem(item.id)}
              data-testid={`checkbox-${item.text}`}
            />
            <span style={{ flex: 1, textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? '#888' : '#000' }}>
              {item.text}
            </span>
            <button onClick={() => deleteItem(item.id)} data-testid={`btn-eliminar-${item.text}`}>🗑</button>
          </li>
        ))}
      </ul>

      <hr />

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '10px' }}>
        <p>Pendientes: <strong data-testid="count-pendientes">{pendingCount}</strong></p>
        <p>Comprados: <strong data-testid="count-comprados">{completedCount}</strong></p>
        <p>Total: <strong data-testid="count-total">{items.length}</strong></p>
      </div>

      <div>
        <p style={{ fontSize: '14px', margin: '0 0 5px 0' }}>Progreso: {progress}%</p>
        <div style={{ width: '100%', background: '#eee', borderRadius: '4px', height: '10px' }}>
          <div 
            data-testid="progress-bar-fill"
            style={{ width: `${progress}%`, background: '#4caf50', height: '100%', borderRadius: '4px', transition: 'width 0.3s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;