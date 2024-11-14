require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

function readArticleFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

async function processArticleWithOpenAI(articleText, prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: `Please process the article and generate a well-structured, aesthetically pleasing HTML document. Follow these instructions: ${prompt} \n\n Article content: ${articleText}`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
  }
}

function saveHTMLToFile(htmlContent, outputPath) {
  fs.writeFileSync(outputPath, htmlContent, 'utf-8');
  console.log(`HTML file has been saved to ${outputPath}`);
}

async function main() {
  const filePath = 'article.txt';
  const outputFilePath = 'output/artykul.html';
  const prompt = `Create a clean and visually organized HTML structure for the article. 
  - Use appropriate HTML tags to organize the content, such as <h1>, <h2>, <h3> for headings, and <p> for paragraphs.
  - Where suitable, insert <img src="image_placeholder.jpg" alt="describe the image"> tags for images, adding an alt attribute with a clear, descriptive prompt for image generation.
  - Add captions under images using the <figcaption> tag, and enclose images and captions in <figure> tags to make the layout clear and cohesive.
  - Ensure the HTML is easy to read and visually balanced without any inline CSS or JavaScript. Only the HTML body content should be returned.`;

  const articleText = readArticleFile(filePath);
  const generatedHTML = await processArticleWithOpenAI(articleText, prompt);
  if (generatedHTML) {
    saveHTMLToFile(generatedHTML, outputFilePath);
  }
}

main();
