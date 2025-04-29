# Script: CleanPycache.ps1
# Descripción: Elimina todos los directorios __pycache__ desde la ruta en que se ejecuta el script.

Write-Output "Buscando y eliminando carpetas '__pycache__'..."

# Obtener todas las carpetas __pycache__ de manera recursiva
$pycacheDirs = Get-ChildItem -Recurse -Directory -Filter "__pycache__"

foreach ($dir in $pycacheDirs) {
    try {
        Remove-Item $dir.FullName -Recurse -Force -ErrorAction Stop
        Write-Output "Eliminado: $($dir.FullName)"
    } catch {
        Write-Warning "No se pudo eliminar: $($dir.FullName) - $($_.Exception.Message)"
    }
}

Write-Output "Proceso terminado."
