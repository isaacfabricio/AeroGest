from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/api/reservations/optimize")
async def optimize_reservations(request: Request):
    data = await request.json()
    # Simula processamento e retorna confirmação
    return JSONResponse(content={"message": "Solução recebida", "data": data})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
