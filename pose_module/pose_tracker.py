# Encapsularé el uso de MediaPipe para que no esté duplicado en cada script

import cv2
import mediapipe as mp

class PoseTracker:

    ''' Configuración inicial: Inicializo el modelo de pose de Mediapipe con mis parámetros 
        - static_image_mode --> Para gestionar si capturamos vídeo en tiempo real o no
        - model_complexity --> Nivel de precisión que usaremos (1=preciso y lento, 2=aceptable y rápido)-
        - min_detection_confidence --> Confianza mínima para detectar
        - min_tracking_confidence --> Confianza mínima para seguir el movimiento
    '''
    def __init__(self, static_image_mode=False, model_complexity=1,
                 min_detection_confidence=0.5, min_tracking_confidence=0.5):
        self.pose = mp.solutions.pose.Pose(
            static_image_mode = static_image_mode,
            model_complexity = model_complexity,
            min_detection_confidence = min_detection_confidence,
            min_tracking_confidence = min_tracking_confidence
        )
        
        self.drawing_utils = mp.solutions.drawing_utils # Para dibujar puntos y líneas
        self.drawing_styles = mp.solutions.drawing_styles # Para obtener los colores y estilos por defecto
        self.pose_connections = mp.solutions.pose.POSE_CONNECTIONS # Cómo se conectan los puntos del cuerpo
    
    ''' Detección de landmarks
    Convierte el frame de BGR (formato de OpenCV) a RGB (formato de MediaPipe) y luego
    lo pasa por el modelo para obtener los landmarks (puntos del cuerpo)'''
    def procesar(self, frame):
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(frame_rgb)
        return results # Results contiene toda la información de la pose
    
    
    ''' Dibuja la pose (Esqueleto)
    Es decir, dibujo los landmarks y las conexiones entre ellos para mostrar
    visualmente la pose en pantalla'''
    def dibuja_landmarks(self, frame, results):
        if(results.pose_landmarks):
            self.drawing_utils.draw_landmarks(
                frame,
                results.pose_landmarks,
                self.pose_connections,
                self.drawing_styles.get_default_pose_landmarks_style()
            )
        return frame
    
    
    ''' Extraemos las coordenadas de los landmarks
    Convierto los landmarks a coordenadas reales en píxeles según el tamaño del frame (alto,ancho),
    ya que los landmarks están en coordenadas normalizadas (0,1)'''
    def extraer_landmarks(self, results, frame_shape):
        height, width, _ = frame_shape
        puntos = {}
        
        if(results.pose_landmarks):
            for idx, landmark in enumerate(results.pose_landmarks.landmark):
                puntos[idx] = {
                    'x': int(landmark.x * width),
                    'y': int(landmark.y * height),
                    'z': landmark.z,
                    'visibilidad': landmark.visibility
                }
        return puntos
    
    
    
        