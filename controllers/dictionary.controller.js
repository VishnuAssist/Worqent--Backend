import Dictionary from "../models/dictionary.model.js";
import {
  AllowedCategories,
  CategoryIdToName,
} from "../constants/dictionary.constants.js";

export const DictionaryGet = async (req, res) => {
  try {
    const {
      OrderBy = "createdAt",
      SearchTerm,
      Category,
      IsActive,
      PageNumber = 1,
      PageSize = 10,
    } = req.query;

    const page = Math.max(Number(PageNumber), 1);
    const limit = Math.max(Number(PageSize), 1);
    const skip = (page - 1) * limit;

    const filter = {};

    /* ---------------- CATEGORY FILTER ---------------- */
    if (Category) {
      const categoryKey =
        CategoryIdToName[Number(Category)] || Category.toUpperCase();

      if (!AllowedCategories.includes(categoryKey)) {
        return res.status(400).json({
          message: `Invalid category filter. Allowed: ${AllowedCategories.join(
            ", "
          )}`,
        });
      }

      filter.category = categoryKey;
    }

    /* ---------------- SEARCH ---------------- */
    if (SearchTerm) {
      filter.$or = [
        { name: { $regex: SearchTerm, $options: "i" } },
        { description: { $regex: SearchTerm, $options: "i" } },
      ];
    }

    /* ---------------- IS ACTIVE ---------------- */
    if (IsActive !== undefined) {
      filter.isActive = IsActive === "true";
    }

    /* ---------------- QUERY ---------------- */
    const [items, totalCount] = await Promise.all([
      Dictionary.find(filter)
        .sort({ [OrderBy]: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Dictionary.countDocuments(filter),
    ]);

    /* ---------------- RESPONSE ---------------- */
    res.status(200).json({
      items,
      metaData: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        pageSize: limit,
        totalCount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const DictionaryGet = async (req, res) => {
//   try {
//     const dic = await Dictionary.find();
//     res.status(200).json(dic);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

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
