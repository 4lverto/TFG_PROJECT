from pathlib import Path


class _VideoPath:
    def __init__(self, path: Path):
        self._path = path

    def __str__(self):
        return str(self._path)

    def __fspath__(self):
        return str(self._path) # Para que lo acepte también directamente cv2.VideoCapture

    def path(self):
        return self._path

    def exists(self):
        return self._path.exists()


# Base folder
BASE = Path("recursos/videos")


class curl_bicep:
    curl_bicep1 = _VideoPath(BASE/"curl_bicep"/"curl_bicep_1.mp4")
    # Añade más si tienes: curl_bicep2 = _VideoPath(...)


class flexiones:
    flexiones1 = _VideoPath(BASE / "flexiones" / "flexiones_1.mp4")
    # flexiones2 = _VideoPath(...)


