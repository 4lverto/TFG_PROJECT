Write-Output "Arrancando backend"
uvicorn app.main:app --reload