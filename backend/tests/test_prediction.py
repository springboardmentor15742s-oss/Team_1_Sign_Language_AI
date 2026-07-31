from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)



def test_prediction_api():


    response = client.post(
        "/prediction/sign"
    )


    assert response.status_code in [
        200,
        422
    ]