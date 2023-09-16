import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

// Example: https://js.langchain.com/docs/modules/indexes/document_loaders/examples/file_loaders/pdf
export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("Inside the PDF handler");
    // Enter your code here
    /** STEP ONE: LOAD DOCUMENT */
    const bookPath = "C:/Users/Rencas/Desktop/frontend/openai-javascript-course/data/document_loaders/naval-ravikant-book.pdf"
    const loader = new PDFLoader(bookPath);

    const docs = await loader.load();
    // Chunk it

    if (docs.length === 0) {
      console.log('No docs found');
      return;
    }

    // Chunk size
    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 250,
      chunkOverlap: 10,
    })

    const splitDocs = await splitter.splitDocuments(docs);

    //Reduce the size of the metadata
    const reducedDocs = splitDocs.map((doc) => {
      const reducerMetadata = { ...doc.metadata }
      delete reducerMetadata.pdf;
      return new Document({
        pageContent: doc.pageContent,
        metadata: reducerMetadata,
      })
    })

    console.log(reducedDocs[0]);
    console.log(splitDocs.length);

    // Reduce the size of the metadata

    /** STEP TWO: UPLOAD TO DATABASE */
    const client = new PineconeClient();

    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    // langchain-js
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

    // upload documents to Pinecone
    await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), { pineconeIndex });


    console.log('Successfully uploaded to Database!');

    // upload documents to Pinecone
    return res.status(200).json({ result: docs });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
