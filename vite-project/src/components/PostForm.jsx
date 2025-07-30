import { useState } from 'react';

const PostForm = ({ onNewPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, body, userId: 1 }; // userId é obrigatório pela API

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      onNewPost(data); // Atualiza a lista de posts
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Erro ao criar post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Conteúdo"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Postar</button>
    </form>
  );
};

export default PostForm;