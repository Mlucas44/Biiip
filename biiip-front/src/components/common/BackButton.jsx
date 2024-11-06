import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton () {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="text-principale text-xl">
      ←
    </button>
  );
}

export default BackButton;
