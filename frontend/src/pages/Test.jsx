import { useState } from "react";
import axios from "axios";

const Test = () => {
  const [content, setContent] = useState("");
  const [magicTitle, setMagicTitle] = useState("");
//   const [answer, setAnswer] = useState("");

  async function generateTitle() {
    setMagicTitle("Generating Title...");

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCqiytAeq3_LOF7-hJaUKxPaH5XMICEy2U",
        method: "post",
        data: {
          contents: [
            {
              parts: [{
                text: `Generate a short, concise and engaging title for the following content within a few words: ${content}`,
              },],
            },
          ],
          // Add any specific parameters or prompt settings needed to tailor the output
        },
      });

      // Assuming the title is generated in the first candidate of the response
      setMagicTitle(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating title:", error);
      setMagicTitle("Failed to generate title. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-10">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-black w-96 ml-20 h-96 mt-10"
          placeholder="Write your content"
        ></textarea>
        <button
          className="border border-black bg-black text-white w-fit h-14 px-4 py-2 ml-20 mb-20"
          onClick={generateTitle}
        >
          Generate Magic Title
        </button>
        <p>{magicTitle}</p>
      </div>
    </div>
  );
};

export default Test;
