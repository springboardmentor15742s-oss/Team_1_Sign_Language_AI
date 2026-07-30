# AI & Datasets — Documentation
**Project:** Sign Language Learning & Assessment Platform
**Track:** AI & Datasets
**Maps to backend folder:** `backend/app/ai/`

---

## 1. Scope

| File | Responsibility |
|---|---|
| `ai/mediapipe_detector.py` | Hand + pose landmark extraction from video/webcam frames |
| `ai/gesture_classifier.py` | Sign/gesture classification model (static + dynamic) |
| `ai/accuracy_engine.py` | Compares learner landmarks vs reference sign, produces accuracy score |
| `ai/recommendation_engine.py` | Suggests next lessons based on weak areas |

---

## 2. Datasets

### Primary — landmark-native (MediaPipe format)
| Dataset | Link | Use |
|---|---|---|
| Google – Isolated Sign Language Recognition | kaggle.com/competitions/asl-signs | Pre-extracted MediaPipe Holistic landmarks — direct input for `gesture_classifier.py` |
| Google – ASL Fingerspelling | kaggle.com/competitions/asl-fingerspelling | Letter-level landmark sequences for fingerspelling assessment |

### Static alphabet (bootstrap classifier)
| Dataset | Link | Use |
|---|---|---|
| ASL Alphabet Dataset | kaggle.com/datasets/grassknoted/asl-alphabet | Image-based static alphabet classifier |
| Sign Language MNIST | kaggle.com/datasets/datamunge/sign-language-mnist | Lightweight dataset for fast pipeline iteration |

### Word / sentence level (dynamic signs)
| Dataset | Link | Use |
|---|---|---|
| WLASL (Processed) | kaggle.com/datasets/risangbaskoro/wlasl-processed | Word-level continuous sign videos |
| MS-ASL | kaggle.com/datasets/nadayoussefamrawy/ms-asl | Large-vocabulary word-level signs |
| RWTH-PHOENIX-Weather (reference only) | rwth-aachen.de official site (not Kaggle) | Continuous/sentence-level structure reference |

---

## 3. Pipeline

1. Ingest raw datasets → `datasets/raw/` (git-ignored)
2. Extract/normalize landmarks to a single MediaPipe schema (wrist-relative coordinates)
3. Train models — CNN for static signs, LSTM/Transformer for dynamic sequences
4. Score accuracy via DTW or frame-wise landmark distance
5. Feed weak-area signal into `recommendation_engine.py`

---

## 4. Scoring Model

- Gesture Accuracy — 40%
- Assessment Performance — 25%
- Lesson Completion — 15%
- Practice Consistency — 10%
- Skill Improvement Rate — 10%

---

## 5. Tech Stack

- **Computer Vision:** TensorFlow, PyTorch, OpenCV, MediaPipe
- **Model Architectures:** CNN, LSTM, Transformer, Scikit-learn
- **Tracking:** MediaPipe Hands, MediaPipe Pose, OpenPose
- **Video/Analytics:** OpenCV, FFmpeg, Pandas, NumPy, XGBoost

---

## 6. Notes

- Keep raw dataset files out of git (`datasets/` in `.gitignore`); commit only preprocessing scripts and small samples if needed.
- Standardize the landmark schema early so `accuracy_engine.py` works across all dataset sources without per-dataset special-casing.
