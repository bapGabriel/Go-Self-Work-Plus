import React, { useState } from 'react';
import { cardStyle, labelStyle, inputStyle, buttonStyle } from '../styles';

export default function PublishAutonomousService() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [fotos, setFotos] = useState([]);

  const handleFileChange = (e) => {
    const arquivos = Array.from(e.target.files || []);
    const urls = arquivos.map((arq) => ({ id: cryptoRandomId(), url: URL.createObjectURL(arq), name: arq.name }));
    setFotos((prev) => [...prev, ...urls]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Serviço publicado: ${titulo}`);
    setTitulo('');
    setDescricao('');
    setFotos([]);
  };

  const removeFoto = (id) => setFotos((f) => f.filter((x) => x.id !== id));

  return (
    <div style={cardStyle}>
      <h2>Publicar Serviço (Autônomo)</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Título do Serviço</label>
        <input
          type='text'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder='Ex: Manutenção de cadeira de rodas'
          style={inputStyle}
          aria-label='Título do serviço'
        />

        <label style={labelStyle}>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder='Detalhe o serviço oferecido'
          style={{ ...inputStyle, minHeight: 100 }}
          aria-label='Descrição do serviço'
        />

        <label style={labelStyle}>Galeria de Fotos</label>
        <input type='file' multiple onChange={handleFileChange} style={{ marginBottom: 10 }} aria-label='upload de fotos' />

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {fotos.map((foto) => (
            <div key={foto.id} style={{ width: 100, borderRadius: 8, overflow: 'hidden', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <img src={foto.url} alt={foto.name} style={{ width: '100%', height: 80, objectFit: 'cover' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 6 }}>
                <small style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 60 }}>{foto.name}</small>
                <button type='button' onClick={() => removeFoto(foto.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }} aria-label={`Remover ${foto.name}`}>
                  X
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type='submit' style={buttonStyle}>Publicar</button>
      </form>
    </div>
  );
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 9);
}
