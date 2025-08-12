# TFG - Análisis de Ejercicios Físicos con Visión Artificial

Este proyecto de TFG permite el reconocimiento, conteo y análisis de ejercicios físicos utilizando **MediaPipe**, **FastAPI** y **Next.js**.

---

## 🚀 Tecnologías principales

- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Frontend:** [Next.js 14](https://nextjs.org/) + [Tailwind CSS](https://tailwindcss.com/)
- **Visión Artificial:** [MediaPipe Pose](https://google.github.io/mediapipe/solutions/pose.html)

---

## 📂 Estructura del proyecto


---

## ⚙️ Requisitos

- Python 3.10 o superior
- Node.js 18 o superior (incluye npm)
- Git (opcional pero recomendado)

---

## 🛠️ Instrucciones de instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone blablabla
cd TFG_PROJECT

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar el servidor
uvicorn backend.main:app --reload

# Ir al directorio frontend
cd frontend/nextjs_app

# Instalar dependencias
npm install

# Ejecutar el servidor de desarrollo
npm run dev

