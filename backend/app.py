from fastapi import FastAPI
from pydantic import BaseModel
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA
from prisma import Prisma
from fastapi.concurrency import run_in_threadpool









# class QACreate(BaseModel):
#     question: str
#     answer: str

""" add server """

app = FastAPI()
db = Prisma()

# @app.on_event("startup")
# async def startup_event():
#     print("App is starting up!")


"""
this genearte data by prisma save my data 
"""

@app.on_event("startup")
async def startup():
    print("App is starting up!")
    await db.connect()

@app.on_event("shutdown")
async def shutdown():
    await db.disconnect()



""" genearte rag ai """

loader = PyPDFLoader("./1337_Student_Han_dbook.pdf")
docs = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
chunks = splitter.split_documents(docs)

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(chunks, embeddings)

llm = Ollama(
    model="mistral",
    base_url="http://host.docker.internal:11434",
    timeout=120
)

qa = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
    return_source_documents=True
)







""" genearte fast api """

@app.get("/")
def red_root():
    return {"message": "Connected to 1337 Handbook database successfully!"}

class Question(BaseModel):
    query: str

# @app.post("/ask")
# async def ask_question(q: Question):
#     result = qa(q.query)

#     return await db.qa.create(
#         data={
#             "question": q.query,
#             "answer": result["result"]
#         }
#     )

@app.post("/ask")
async def ask_question(q: Question):
    try:
        result = await run_in_threadpool(lambda: qa(q.query))
        return await db.qa.create(
            data={
                "question": q.query,
                "answer": result["result"]
            }
        )
    except Exception as e:
        return {"error": str(e)}


@app.get("/data")
async def get_all_data():
    try:
        items = await db.qa.find_many(
            order={"createdAt": "desc"}
        )

        if not items:
            return {"message": "No data stored yet."}

        return [
            {
                "id": item.id,
                "question": item.question,
                "answer": item.answer,
                "createdAt": item.createdAt
            }
            for item in items
        ]

    except Exception as e:
        return {"error": str(e)}


@app.delete("/data/{id}")
async def delete_data(id: int):
    await db.qa.delete(where={"id": id})
    return {"status": "deleted"}




