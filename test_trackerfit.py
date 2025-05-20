# test_trackerfit.py
from trackerfit import SessionManager, TipoEntrada

def test():
    manager = SessionManager()
    assert manager.sesion_activa() is False
    print("✅ trackerfit está correctamente instalado y funcional.")

if __name__ == "__main__":
    test()
