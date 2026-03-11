import express from "express";
import fs from "fs";
import csv from "csv-parser";
import { upload } from "../middlewares/upload.js";
import { Record } from "../models/records.model.js";

const router = express.Router();

router.post("/upload", upload.single("csvFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", async () => {
        try {
          // Insert into DATABASE
          await Record.insertMany(results);

          res.status(200).json({
            message: "CSV uploaded & stored successfully",
            totalRecords: results.length,
            preview: results.slice(0, 5)
          });
        } catch (dbError) {
          res.status(500).json({ error: dbError.message });
        }
      });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
