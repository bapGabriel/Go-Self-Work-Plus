// publicar-autonomo.js
// Galeria - pré-visualização, lightbox, remoção e submissão simulada

document.addEventListener('DOMContentLoaded', () => {
  const galleryInput = document.getElementById('galleryInput');
  const gallery = document.getElementById('gallery');
  const form = document.getElementById('form-autonomo');

  // Lightbox elements
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  // armazenamos imagens como objetos {id, file, url, name}
  let images = [];
  let currentIndex = -1;

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
  }

  // Renderiza as miniaturas
  function renderGallery() {
    gallery.innerHTML = '';
    images.forEach((imgObj, idx) => {
      const div = document.createElement('div');
      div.className = 'thumb';
      div.dataset.index = idx;

      const img = document.createElement('img');
      img.src = imgObj.url;
      img.alt = imgObj.name || `Imagem ${idx+1}`;

      // botão remover
      const btn = document.createElement('button');
      btn.className = 'remove-btn';
      btn.title = 'Remover imagem';
      btn.type = 'button';
      btn.innerText = '✕';

      btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        images.splice(idx, 1);
        renderGallery();
      });

      // clique na miniatura abre lightbox
      div.addEventListener('click', () => openLightbox(idx));

      div.appendChild(img);
      div.appendChild(btn);
      gallery.appendChild(div);
    });
  }

  // Ao selecionar arquivos
  galleryInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => {
      if (!f.type.startsWith('image/')) return;
      const id = uid();
      const url = URL.createObjectURL(f);
      images.push({ id, file: f, url, name: f.name });
    });
    renderGallery();
    // limpar input para permitir re-upload de mesmos arquivos mais tarde
    galleryInput.value = '';
  });

  // LIGHTBOX
  function openLightbox(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    const imgObj = images[currentIndex];
    lbImage.src = imgObj.url;
    lbImage.alt = imgObj.name || `Imagem ${currentIndex+1}`;
    lbCaption.textContent = imgObj.name || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // evitar scroll atrás do modal
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lbImage.src = '';
    currentIndex = -1;
    document.body.style.overflow = '';
  }

  function showPrev() {
    if (images.length === 0) return;
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    const imgObj = images[currentIndex];
    lbImage.src = imgObj.url;
    lbCaption.textContent = imgObj.name || '';
  }

  function showNext() {
    if (images.length === 0) return;
    currentIndex = (currentIndex + 1) % images.length;
    const imgObj = images[currentIndex];
    lbImage.src = imgObj.url;
    lbCaption.textContent = imgObj.name || '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  // suporte ao teclado
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }
  });

  // clique fora fecha lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // SUBMISSÃO do formulário (simulada)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // coleta básica de campos
    const dados = new FormData(form);
    const objeto = {};
    dados.forEach((v,k) => {
      if (k === 'pagamento') {
        if (!objeto['pagamento']) objeto['pagamento'] = [];
        objeto['pagamento'].push(v);
      } else {
        objeto[k] = v;
      }
    });

    // checagem simples
    if (!objeto.titulo || !objeto.especialidade || !objeto.descricao || !objeto.area || !objeto.valor || !objeto.disponibilidade || !objeto.telefone) {
      alert('Por favor preencha todos os campos obrigatórios.');
      return;
    }

    // adiciona imagens (apenas nomes aqui, no real você enviaria os files para o backend)
    objeto.galeria = images.map(img => ({ name: img.name }));

    // Simulação: mostra resumo breve (JSON) e redireciona
    console.log('Simulação de envio:', objeto);
    alert('Seu serviço foi publicado (simulação). Você adicionou ' + images.length + ' fotos.');
    // liberar object URLs
    images.forEach(i => URL.revokeObjectURL(i.url));
    window.location.href = 'index.html';
  });

});
