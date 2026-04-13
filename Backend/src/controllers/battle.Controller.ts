import type { NextFunction, Request, Response } from "express";
import useGraph from "../ai/graph.ai.service.js";

export const battleController = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ success: false, message: "Prompt is required" });
      return;
    }

    const result = await useGraph(prompt);

    res.status(200).json({
      success: true,
      message: "Response has been sent !",
      result,
    });
  } catch (error) {
    console.log("Error in response in battle controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
