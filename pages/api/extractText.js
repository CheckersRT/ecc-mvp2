import { v1 } from "@google-cloud/vision";

const client = new v1.ImageAnnotatorClient();

export default async function extractText(req, res) {
  console.log("Request body from extractText: ", req);

//   const { fileName } = req.body;

  let extractedText = [];
  let extractedString = "";

    const fileName = "public/IMG_7482.jpg";

  try {
      const [response] = await client.textDetection(fileName);
    
        const detections = response.textAnnotations;
        // console.log("Detections response: ", detections);
        detections.forEach((word) => {
          extractedText.push(word.description);
        });
        extractedString = extractedText.toString();
        // console.log("Extracted text from API: ", extractedString);

        res.status(200).json({ "text": extractedString})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Something bad happened" });

  }

}
