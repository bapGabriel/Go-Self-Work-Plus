import React, { useState } from 'react';
import { cardStyle, itemStyle, deleteButtonStyle } from '../styles';

export default function ManageAutonomousService() {
  const [servicos, setServicos] = useState([
    { id: 1, titulo: 'Montagem de móveis', status: 'Ativo' },
    { id: 2, titulo: 'Serviço de limpeza', status: 'Pausado' }
  ]);

  const remover = (id) => setServicos((s) => s.filter((x) => x.id !== id));
  const editar = (id) => alert('Editar (simulação): ' + id);

  return (
    <div style={cardStyle}>
      <h2>Gerenciar Serviços (Autônomo)</h2>
      {servicos.length === 0 ? (
        <p>Nenhum serviço cadastrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {servicos.map((s) => (
            <li key={s.id} style={itemStyle}>
              <div>
                <strong>{s.titulo}</strong>
                <p style={{ margin: 0 }}>Status: {s.status}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => editar(s.id)} style={{ background: '#1f2937', color: '#fff', padding: '6px 10px', borderRadius: 6, border: 'none', cursor: 'pointer' }}>Editar</button>
                <button onClick={() => remover(s.id)} style={deleteButtonStyle}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
