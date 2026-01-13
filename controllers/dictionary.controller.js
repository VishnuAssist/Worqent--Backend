import Dictionary from "../models/dictionary.model.js";
export const DictionaryGet = async (req, res) => {
  try {
    const dic = await Dictionary.find();
    res.status(200).json(dic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DictionaryGetById = async (req, res) => {
  try {
    const dic = await Dictionary.findById(req.params.id);
    if (dic == null) {
      res.status(400).json({ message: "dictionary not here" });
    } else {
      res.status(200).json(dic);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const DictionaryCreate = async (req, res) => {
  const newdic = new Dictionary({
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    isActive: req.body.isActive,
  });
  try {
    const dic = await newdic.save();
    res.status(201).json(dic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const DictionaryUpdate = async (req, res) => {
  try {
    const updateDic = await Dictionary.findOneAndUpdate(
      { _id: req.params.id },
      {
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        isActive: req.body.isActive,
      }
    );
    res.status(200).json(updateDic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const DictionaryDelete = async (req, res) => {
  const dicId = req.params.id;
  try {
    await Dictionary.deleteOne({ _id: dicId });
    res.json({ message: "dictionary deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
