import Naujienos from '../models/naujienosModel.js';
import mongoose from 'mongoose';

// GET - Pasiimti visas naujienas
export const getAllNews = async (req, res) => {
  const naujienos = await Naujienos.find().sort({ createdAt: -1 });
  res.json(naujienos);
};

// GET - Pasiimti vieną naujieną pagal ID
export const getNewById = async (req, res) => {
  const { id } = req.params;
  // Patikrinti ar teisingas ID formatas
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Tokios naujienos nėra.' });
  }

  const naujiena = await Naujienos.findById(id);
  // Patikrinti ar naujiena egzistuoja
  if (!naujiena) {
    return res.status(404).json({ error: 'Tokios naujienos nėra.' });
  }

  res.status(200).json(naujiena);
};

// POST - Sukurti naujieną
export const createNew = async (req, res) => {
  const { title, content, author } = req.body;

  // Patikrinti tuščius laukus
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Visi laukai privalomi' });
  }

  try {
    const newNaujiena = await Naujienos.create({ title, content, author });
    res.status(201).json(newNaujiena);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT - Atnaujinti naujieną pagal ID
export const updateNew = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  // Patikrinti tuščius laukus
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Visi laukai yra privalomi' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Tokios naujienos nėra.' });
  }

  const naujiena = await Naujienos.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!naujiena) {
    return res.status(404).json({ error: 'Naujiena nerasta' });
  }

  res.status(200).json(naujiena);
};

// DELETE - Ištrinti naujieną pagal ID
export const deleteNew = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Naujiena nerasta' });
  }

  const naujiena = await Naujienos.findOneAndDelete({ _id: id });

  if (!naujiena) {
    return res.status(404).json({ error: 'Naujiena nerasta' });
  }

  res.status(200).json(naujiena);
};
