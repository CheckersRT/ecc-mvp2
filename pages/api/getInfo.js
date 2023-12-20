import { v1 } from "@google-cloud/vision";
import OpenAI from "openai";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const openai = new OpenAI({
  apiKey:
    // process.env.openaiapikey,
    "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",
});

export default async function getInfo(req, res) {
  // console.log("Request body: ", req.body);

  const { text } = req.body;

  const prompt = `
  Extract the composer, song title and music publicher from this text: ${text}. 
  `;

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const completion = response.choices[0].message.content;

  res.status(200).json({ output: completion });
  // res.status(200).json({ name: 'John Doe' })
}



